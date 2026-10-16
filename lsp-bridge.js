"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const fsSync = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

const HOST = "127.0.0.1";
const IMAGE = "eclipse-temurin:21-jdk";
const SOURCE_URI = "file:///workspace/project/src/Main.java";
const MAX_SOURCE_BYTES = 128 * 1024;
const MAX_MESSAGE_BYTES = 256 * 1024;
const SESSION_TIMEOUT_MS = 5 * 60_000;
const LSP_TIMEOUT_MS = 30_000;
const ROOT = path.resolve(__dirname);
const JDTLS_DIR = path.join(ROOT, ".local", "jdtls-compatible");
const WORKSPACES_DIR = path.join(ROOT, ".local", "workspaces");

function byteLength(value) { return Buffer.byteLength(value, "utf8"); }

class ContentLengthParser {
  constructor(onMessage, maxBytes = MAX_MESSAGE_BYTES) {
    this.onMessage = onMessage;
    this.maxBytes = maxBytes;
    this.buffer = Buffer.alloc(0);
  }

  push(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    if (this.buffer.length > this.maxBytes + 1024) throw new Error("LSP message exceeds the configured limit");
    while (true) {
      const separator = this.buffer.indexOf("\r\n\r\n");
      if (separator < 0) return;
      const headers = this.buffer.subarray(0, separator).toString("ascii");
      const match = /^Content-Length:\s*(\d+)\r\n(?:[A-Za-z-]+:\s*[^\r\n]*\r\n)*$/i.exec(headers + "\r\n");
      if (!match) throw new Error("invalid LSP headers");
      const length = Number(match[1]);
      if (!Number.isSafeInteger(length) || length > this.maxBytes) throw new Error("LSP message exceeds the configured limit");
      const start = separator + 4;
      if (this.buffer.length < start + length) return;
      const body = this.buffer.subarray(start, start + length).toString("utf8");
      this.buffer = this.buffer.subarray(start + length);
      this.onMessage(JSON.parse(body));
    }
  }
}

function lspFrame(message) {
  const body = Buffer.from(JSON.stringify(message), "utf8");
  if (body.length > MAX_MESSAGE_BYTES) throw new Error("LSP message exceeds the configured limit");
  return Buffer.concat([Buffer.from(`Content-Length: ${body.length}\r\n\r\n`), body]);
}

function errorPayload(message, code = "invalid_request") {
  return { type: "error", code, message };
}

function validateBrowserMessage(message) {
  if (!message || typeof message !== "object" || Array.isArray(message) || typeof message.type !== "string") return "message must have a type";
  if (message.type === "change") {
    if (typeof message.source !== "string" || !message.source) return "change.source must be a non-empty string";
    if (byteLength(message.source) > MAX_SOURCE_BYTES) return `source must be at most ${MAX_SOURCE_BYTES} bytes`;
    return null;
  }
  if (message.type === "complete") {
    if (!Number.isSafeInteger(message.id) || message.id < 0) return "complete.id must be a non-negative integer";
    if (!Number.isSafeInteger(message.line) || message.line < 0 || !Number.isSafeInteger(message.character) || message.character < 0) return "complete position must be non-negative integers";
    return null;
  }
  return "unsupported message type";
}

function dockerArgs(workspace, containerName) {
  const launcher = fsSync.readdirSync(path.join(JDTLS_DIR, "plugins"))
    .find((name) => /^org\.eclipse\.equinox\.launcher_.*\.jar$/.test(name));
  if (!launcher) throw new Error("JDT LS launcher is not installed");
  return [
    "run", "--rm", "--name", containerName, "-i", "--network", "none", "--read-only",
    "--tmpfs", "/tmp:rw,nosuid,nodev,size=64m", "--cpus", "1", "--memory", "1280m", "--pids-limit", "128",
    "--cap-drop", "ALL", "--security-opt", "no-new-privileges", "--user", `${process.getuid()}:${process.getgid()}`, "--env", "HOME=/tmp", "--env", "LANG=C.UTF-8",
    "--mount", `type=bind,src=${JDTLS_DIR},dst=/opt/jdtls,readonly`,
    "--mount", `type=bind,src=${workspace},dst=/workspace`,
    IMAGE, "java", "-Declipse.application=org.eclipse.jdt.ls.core.id1",
    "-Dosgi.bundles.defaultStartLevel=4", "-Declipse.product=org.eclipse.jdt.ls.core.product",
    "-Dosgi.sharedConfiguration.area=/opt/jdtls/config_linux_arm",
    "-Dosgi.sharedConfiguration.area.readOnly=true", "-Dosgi.configuration.cascaded=true",
    "-Xms128m", "-Xmx768m", "--add-modules=ALL-SYSTEM",
    "--add-opens", "java.base/java.util=ALL-UNNAMED", "--add-opens", "java.base/java.lang=ALL-UNNAMED",
    "-jar", `/opt/jdtls/plugins/${launcher}`, "-configuration", "/workspace/config", "-data", "/workspace/data",
  ];
}

class LspSession {
  constructor(socket, onClose, options = {}) {
    this.socket = socket;
    this.onClose = onClose;
    this.options = options;
    this.pending = new Map();
    this.closed = false;
    this.containerName = `devquiz-jdtls-${process.pid}-${crypto.randomUUID()}`;
    this.workspace = null;
    this.child = null;
    this.timer = null;
    this.nextRequestId = 1;
    this.documentVersion = 1;
  }

  send(message) { if (!this.closed && this.socket.readyState === 1) this.socket.send(JSON.stringify(message)); }

  async start() {
    try {
      await fs.mkdir(WORKSPACES_DIR, { recursive: true });
      this.workspace = await fs.mkdtemp(path.join(WORKSPACES_DIR, "session-"));
      // The container uses the current host UID so this private workspace stays owner-only.
      await fs.chmod(this.workspace, 0o700);
      const project = path.join(this.workspace, "project");
      const source = path.join(project, "src");
      await fs.mkdir(source, { recursive: true });
      await fs.writeFile(path.join(project, ".project"), '<?xml version="1.0" encoding="UTF-8"?><projectDescription><name>devquiz</name><buildSpec><buildCommand><name>org.eclipse.jdt.core.javabuilder</name><arguments/></buildCommand></buildSpec><natures><nature>org.eclipse.jdt.core.javanature</nature></natures></projectDescription>');
      await fs.writeFile(path.join(project, ".classpath"), '<?xml version="1.0" encoding="UTF-8"?><classpath><classpathentry kind="src" path="src"/><classpathentry kind="con" path="org.eclipse.jdt.launching.JRE_CONTAINER"/><classpathentry kind="output" path="bin"/></classpath>');
      await fs.writeFile(path.join(source, "Main.java"), "", { mode: 0o644 });
      this.child = spawn("docker", dockerArgs(this.workspace, this.containerName), { stdio: ["pipe", "pipe", "pipe"], env: { PATH: process.env.PATH } });
      const parser = new ContentLengthParser((message) => this.receive(message));
      this.child.stdout.on("data", (chunk) => { try { parser.push(chunk); } catch (error) { this.fail(error.message, "lsp_protocol"); } });
      this.child.stderr.on("data", () => {});
      this.child.once("error", () => this.fail("local Java language server is unavailable", "unavailable"));
      this.child.once("close", (code) => { if (!this.closed && code !== 0) this.fail("local Java language server stopped unexpectedly", "unavailable"); });
      this.armTimeout();
      await this.request("initialize", { processId: process.pid, clientInfo: { name: "devquiz" }, rootUri: "file:///workspace/project", workspaceFolders: [{ uri: "file:///workspace/project", name: "devquiz" }], capabilities: { textDocument: { completion: { completionItem: { snippetSupport: false } } } } });
      this.notify("initialized", {});
      this.notify("textDocument/didOpen", { textDocument: { uri: SOURCE_URI, languageId: "java", version: 1, text: "" } });
      this.send({ type: "ready" });
      this.armTimeout();
    } catch (error) { this.fail(error.message || "local Java language server is unavailable", error.code === "ENOENT" ? "unavailable" : "startup_error"); }
  }

  armTimeout() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.fail("language server session timed out", "timeout"), SESSION_TIMEOUT_MS);
    this.timer.unref();
  }
  request(method, params) { const id = this.nextRequestId++; return new Promise((resolve, reject) => { this.pending.set(id, { resolve, reject }); this.write({ jsonrpc: "2.0", id, method, params }); setTimeout(() => { if (this.pending.has(id)) { this.pending.delete(id); reject(new Error("language server request timed out")); } }, LSP_TIMEOUT_MS); }); }
  notify(method, params) { this.write({ jsonrpc: "2.0", method, params }); }
  write(message) { if (!this.closed && this.child && this.child.stdin.writable) this.child.stdin.write(lspFrame(message)); }
  receive(message) {
    if (process.env.DEVQUIZ_LSP_TRACE === "1" && message.method) console.error("JDT LS:", message.method);
    if (message.id !== undefined && this.pending.has(message.id)) { const pending = this.pending.get(message.id); this.pending.delete(message.id); if (message.error) pending.reject(new Error(message.error.message || "language server error")); else pending.resolve(message.result); return; }
    if (message.method && message.id !== undefined) {
      const result = message.method === "workspace/configuration"
        ? (message.params?.items || []).map(() => ({}))
        : null;
      if (["workspace/configuration", "client/registerCapability", "window/workDoneProgress/create"].includes(message.method)) {
        this.write({ jsonrpc: "2.0", id: message.id, result });
      } else {
        this.write({ jsonrpc: "2.0", id: message.id, error: { code: -32601, message: "Method not supported" } });
      }
      return;
    }
    if (message.method === "textDocument/publishDiagnostics") this.send({ type: "diagnostics", uri: SOURCE_URI, diagnostics: Array.isArray(message.params && message.params.diagnostics) ? message.params.diagnostics : [] });
  }
  change(source) {
    this.armTimeout();
    this.notify("textDocument/didChange", { textDocument: { uri: SOURCE_URI, version: ++this.documentVersion }, contentChanges: [{ text: source }] });
  }
  async complete(id, line, character) { try { this.armTimeout(); const result = await this.request("textDocument/completion", { textDocument: { uri: SOURCE_URI }, position: { line, character }, context: { triggerKind: 1 } }); this.send({ type: "completion", id, items: Array.isArray(result) ? result : (result && Array.isArray(result.items) ? result.items : []) }); } catch (error) { this.send(errorPayload(error.message, "completion_error")); } }
  fail(message, code) { this.send(errorPayload(message, code)); this.close(); }
  async close() {
    if (this.closed) return;
    this.closed = true; clearTimeout(this.timer);
    for (const pending of this.pending.values()) pending.reject(new Error("session closed"));
    this.pending.clear();
    if (this.child && this.child.exitCode === null && this.child.signalCode === null) this.child.kill("SIGTERM");
    // Killing the Docker CLI does not guarantee that its container exits.
    await new Promise((resolve) => {
      const cleanup = spawn("docker", ["rm", "-f", this.containerName], { stdio: "ignore", env: { PATH: process.env.PATH } });
      const timer = setTimeout(() => { cleanup.kill("SIGKILL"); resolve(); }, 5_000);
      cleanup.once("close", () => { clearTimeout(timer); resolve(); });
      cleanup.once("error", () => { clearTimeout(timer); resolve(); });
    });
    if (this.child && this.child.exitCode === null && this.child.signalCode === null) {
      await Promise.race([
        new Promise((resolve) => this.child.once("close", resolve)),
        new Promise((resolve) => setTimeout(resolve, 2_000)),
      ]);
    }
    try { if (this.workspace) await fs.rm(this.workspace, { recursive: true, force: true }); }
    finally { this.onClose(this); if (this.socket.readyState === 1) this.socket.close(); }
  }
}

function createBridge({ port = 3000, root = ROOT } = {}) {
  const active = { session: null };
  return {
    originAllowed(origin) { return origin === `http://${HOST}:${port}`; },
    async attach(socket) {
      if (active.session) { socket.send(JSON.stringify(errorPayload("another Java analysis session is already active", "busy"))); socket.close(1013); return null; }
      active.session = new LspSession(socket, (session) => { if (active.session === session) active.session = null; }, { root });
      const session = active.session;
      socket.on("message", (raw) => { if (raw.length > MAX_MESSAGE_BYTES) return session.fail(`message must be at most ${MAX_MESSAGE_BYTES} bytes`, "message_too_large"); let message; try { message = JSON.parse(raw.toString()); } catch { session.send(errorPayload("message must contain valid JSON")); return; } const error = validateBrowserMessage(message); if (error) { session.send(errorPayload(error)); return; } if (message.type === "change") session.change(message.source); else session.complete(message.id, message.line, message.character); });
      socket.on("close", () => session.close());
      await session.start();
      return session;
    },
    close() { return active.session ? active.session.close() : Promise.resolve(); },
  };
}

module.exports = { ContentLengthParser, LspSession, validateBrowserMessage, createBridge, dockerArgs, MAX_SOURCE_BYTES, MAX_MESSAGE_BYTES, SOURCE_URI };
