"use strict";

const crypto = require("node:crypto");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const fs = require("node:fs/promises");
const { spawn } = require("node:child_process");
const { WebSocketServer } = require("ws");
const { createBridge } = require("./lsp-bridge");

const HOST = "127.0.0.1";
const PORT = Number.parseInt(process.env.PORT || "3000", 10);
const IMAGE = "eclipse-temurin:21-jdk";
const MAX_BODY_BYTES = 256 * 1024;
const MAX_SOURCE_BYTES = 128 * 1024;
const MAX_STDIN_BYTES = 32 * 1024;
const MAX_OUTPUT_BYTES = 64 * 1024;
const EXECUTION_TIMEOUT_MS = 5_000;
const COMPILE_SUCCESS_MARKER = "__DEVQUIZ_COMPILE_OK__";
const PUBLIC_ROOT = path.resolve(__dirname);
const CONTENT_TYPES = {
  "/": "text/html; charset=utf-8",
  "/index.html": "text/html; charset=utf-8",
  "/presentation.html": "text/html; charset=utf-8",
  "/app.js": "text/javascript; charset=utf-8",
  "/presentation.js": "text/javascript; charset=utf-8",
  "/assets/presentation/robot.jpeg": "image/jpeg",
  "/assets/presentation/robot-transparent.png": "image/png",
  "/assets/presentation/detective.webp": "image/webp",
  "/assets/presentation/detective.png": "image/png",
  "/assets/presentation/detective-transparent.png": "image/png",
  "/assets/presentation/school-logo.svg": "image/svg+xml",
  "/assets/presentation/java.png": "image/png",
  "/assets/presentation/java-transparent.png": "image/png",
  "/assets/fonts/FiraCode-Regular.woff2": "font/woff2",
  "/quiz.js": "text/javascript; charset=utf-8",
  "/editor-adapter.js": "text/javascript; charset=utf-8",
  "/styles.css": "text/css; charset=utf-8",
};
const VENDOR_ROOT = path.resolve(__dirname, "node_modules/monaco-editor/min/vs");
const VENDOR_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function jsonResponse(response, statusCode, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
  });
  response.end(body);
}

function errorResponse(response, statusCode, type, message, details = {}) {
  jsonResponse(response, statusCode, {
    ok: false,
    error: { type, message, ...details },
  });
}

function byteLength(value) {
  return Buffer.byteLength(value, "utf8");
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    let tooLarge = false;

    request.on("data", (chunk) => {
      if (tooLarge) return; // Drain the remaining body without buffering it, so the 413 can reach the client.
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        tooLarge = true;
        reject(Object.assign(new Error("request body is too large"), { code: "BODY_TOO_LARGE" }));
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

function validateRequest(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "request body must be a JSON object";
  }
  if (typeof value.source !== "string" || value.source.trim() === "") {
    return "source must be a non-empty string";
  }
  if (byteLength(value.source) > MAX_SOURCE_BYTES) {
    return `source must be at most ${MAX_SOURCE_BYTES} bytes`;
  }
  if (value.stdin !== undefined && typeof value.stdin !== "string") {
    return "stdin must be a string when provided";
  }
  if (typeof value.stdin === "string" && byteLength(value.stdin) > MAX_STDIN_BYTES) {
    return `stdin must be at most ${MAX_STDIN_BYTES} bytes`;
  }
  return null;
}

function dockerArgs(directory, containerName) {
  return [
    "run",
    "--rm",
    "--name", containerName,
    "--network", "none",
    "--read-only",
    "--tmpfs", "/tmp:rw,noexec,nosuid,nodev,size=16m",
    "--cpus", "0.5",
    "--memory", "128m",
    "--pids-limit", "64",
    "--cap-drop", "ALL",
    "--security-opt", "no-new-privileges",
    "--user", "1000:1000",
    "--env", "HOME=/tmp",
    "--env", "LANG=C.UTF-8",
    "--mount", `type=bind,src=${directory},dst=/workspace,readonly`,
    IMAGE,
    "sh",
    "-c",
    `javac -encoding UTF-8 -d /tmp /workspace/Main.java && printf '%s\\n' '${COMPILE_SUCCESS_MARKER}' >&2 && exec java -cp /tmp Main`,
  ];
}

function removeDockerContainer(containerName) {
  return new Promise((resolve) => {
    const cleanup = spawn("docker", ["rm", "-f", containerName], {
      stdio: ["ignore", "ignore", "ignore"],
      env: { PATH: process.env.PATH },
    });
    cleanup.on("error", () => resolve());
    cleanup.on("close", () => resolve());
  });
}

function runInDocker(directory, stdin) {
  return new Promise((resolve) => {
    const containerName = `devquiz-java-${process.pid}-${crypto.randomUUID()}`;
    const child = spawn("docker", dockerArgs(directory, containerName), {
      stdio: ["pipe", "pipe", "pipe"],
      env: { PATH: process.env.PATH },
    });
    let stdout = Buffer.alloc(0);
    let stderr = Buffer.alloc(0);
    let outputLimitExceeded = false;
    let outputBytes = 0;
    let timedOut = false;
    let settled = false;
    let timeout;

    const finish = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve(result);
    };

    const append = (current, chunk) => {
      if (outputLimitExceeded) return current;
      outputBytes += chunk.length;
      if (outputBytes > MAX_OUTPUT_BYTES) {
        outputLimitExceeded = true;
        child.kill("SIGKILL");
        return current;
      }
      return Buffer.concat([current, chunk]);
    };

    child.stdout.on("data", (chunk) => { stdout = append(stdout, chunk); });
    child.stderr.on("data", (chunk) => { stderr = append(stderr, chunk); });
    child.on("error", (error) => finish({ kind: "spawn_error", error }));
    child.on("close", async (code, signal) => {
      await removeDockerContainer(containerName);
      if (timedOut) return finish({ kind: "timeout" });
      if (outputLimitExceeded) return finish({ kind: "output_limit" });
      finish({
        kind: "exit",
        code,
        signal,
        stdout: stdout.toString("utf8"),
        stderr: stderr.toString("utf8"),
      });
    });

    child.stdin.end(stdin || "");
    timeout = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, EXECUTION_TIMEOUT_MS);
  });
}

async function execute(source, stdin) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "devquiz-java-"));
  try {
    await fs.writeFile(path.join(directory, "Main.java"), source, { encoding: "utf8", mode: 0o644 });
    return await runInDocker(directory, stdin);
  } finally {
    await fs.rm(directory, { recursive: true, force: true });
  }
}

async function handleExecute(request, response) {
  let body;
  try {
    body = await readRequestBody(request);
  } catch (error) {
    if (error.code === "BODY_TOO_LARGE") {
      errorResponse(response, 413, "invalid_request", error.message);
      return;
    }
    errorResponse(response, 400, "invalid_request", "could not read request body");
    return;
  }

  let value;
  try {
    value = JSON.parse(body);
  } catch {
    errorResponse(response, 400, "invalid_request", "request body must contain valid JSON");
    return;
  }

  const validationError = validateRequest(value);
  if (validationError) {
    errorResponse(response, 400, "invalid_request", validationError);
    return;
  }

  let result;
  try {
    result = await execute(value.source, value.stdin || "");
  } catch {
    errorResponse(response, 500, "execution_error", "could not prepare the isolated execution");
    return;
  }

  if (result.kind === "timeout") {
    errorResponse(response, 408, "timeout", `execution exceeded ${EXECUTION_TIMEOUT_MS} ms`);
    return;
  }
  if (result.kind === "output_limit") {
    errorResponse(response, 413, "resource_limit", "execution output exceeded the configured limit");
    return;
  }
  if (result.kind === "spawn_error") {
    errorResponse(response, 503, "execution_unavailable", "Docker execution is unavailable");
    return;
  }

  const stderr = result.stderr.replace(`${COMPILE_SUCCESS_MARKER}\n`, "");
  if (!result.stderr.includes(COMPILE_SUCCESS_MARKER)) {
    jsonResponse(response, 422, {
      ok: false,
      error: {
        type: "compilation_error",
        message: "Java source did not compile",
        stdout: result.stdout,
        stderr,
      },
    });
    return;
  }
  if (result.code !== 0) {
    jsonResponse(response, 200, {
      ok: false,
      error: {
        type: "runtime_error",
        message: "Java program exited with an error",
        exitCode: result.code,
        stdout: result.stdout,
        stderr,
      },
    });
    return;
  }

  jsonResponse(response, 200, {
    ok: true,
    output: result.stdout,
    stdout: result.stdout,
    stderr,
  });
}

async function serveFrontend(request, response) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host || `${HOST}:${PORT}`}`).pathname);
  } catch {
    errorResponse(response, 400, "invalid_request", "invalid URL");
    return;
  }
  const isVendor = pathname.startsWith("/vendor/vs/");
  const contentType = isVendor ? VENDOR_TYPES[path.extname(pathname).toLowerCase()] : CONTENT_TYPES[pathname];
  if (!contentType) {
    errorResponse(response, 404, "not_found", "file not found");
    return;
  }

  const root = isVendor ? VENDOR_ROOT : PUBLIC_ROOT;
  const relativePath = isVendor ? pathname.slice("/vendor/vs/".length) : (pathname === "/" ? "index.html" : pathname.slice(1));
  const filePath = path.resolve(root, relativePath);
  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    errorResponse(response, 404, "not_found", "file not found");
    return;
  }
  try {
    const content = await fs.readFile(filePath);
    response.writeHead(200, {
      "content-type": contentType,
      "content-length": content.length,
      "cache-control": "no-cache",
    });
    response.end(content);
  } catch {
    errorResponse(response, 404, "not_found", "file not found");
  }
}

const lspBridge = createBridge({ port: PORT });
const webSocketServer = new WebSocketServer({ noServer: true, maxPayload: 256 * 1024 });

const server = http.createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/health") {
    jsonResponse(response, 200, { ok: true, service: "devquiz-java-executor" });
    return;
  }
  if (request.method === "GET") {
    await serveFrontend(request, response);
    return;
  }
  if (request.method === "POST" && request.url === "/api/execute") {
    await handleExecute(request, response);
    return;
  }
  errorResponse(response, 404, "not_found", "route not found");
});

server.listen(PORT, HOST, () => {
  console.log(`DevQuiz Java executor listening on http://${HOST}:${PORT}`);
});

server.on("upgrade", (request, socket, head) => {
  const url = new URL(request.url, `http://${HOST}:${PORT}`);
  const origin = request.headers.origin;
  if (url.pathname !== "/lsp" || !lspBridge.originAllowed(origin)) {
    socket.write("HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n");
    socket.destroy();
    return;
  }
  webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
    webSocketServer.emit("connection", webSocket, request);
    lspBridge.attach(webSocket).catch(() => webSocket.close());
  });
});

async function shutdown() {
  await lspBridge.close();
  server.close(() => process.exit(0));
}
process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
