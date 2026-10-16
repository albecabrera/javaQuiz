const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const net = require('node:net');

let server;
let base;

before(async () => {
  const probe = net.createServer();
  await new Promise((resolve) => probe.listen(0, '127.0.0.1', resolve));
  const port = probe.address().port;
  await new Promise((resolve) => probe.close(resolve));
  base = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, ['server.js'], { cwd: require('node:path').resolve(__dirname, '..'), env: { ...process.env, PORT: String(port) }, stdio: 'ignore' });
  for (let i = 0; i < 30; i++) {
    try { if ((await fetch(`${base}/health`)).ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('local executor failed to start');
});

after(() => { server?.kill('SIGTERM'); });

async function execute(source) {
  const response = await fetch(`${base}/api/execute`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ source }) });
  return { status: response.status, json: await response.json() };
}

test('oversized body returns JSON 413 and leaves the service usable', async () => {
  const response = await fetch(`${base}/api/execute`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ source: 'x'.repeat(270000) }) });
  assert.equal(response.status, 413);
  assert.deepEqual(await response.json(), { ok: false, error: { type: 'invalid_request', message: 'request body is too large' } });
  assert.deepEqual(await (await fetch(`${base}/health`)).json(), { ok: true, service: 'devquiz-java-executor' });
});

test('aggregate stdout and stderr over 64 KiB returns resource limit', async () => {
  const source = 'public class Main { public static void main(String[] args) { for (int i=0;i<40000;i++) System.out.print("a"); for (int i=0;i<40000;i++) System.err.print("b"); } }';
  const result = await execute(source);
  assert.equal(result.status, 413);
  assert.deepEqual(result.json, { ok: false, error: { type: 'resource_limit', message: 'execution output exceeded the configured limit' } });
});

test('existing valid execution still returns exact stdout and stderr', async () => {
  const result = await execute('public class Main { public static void main(String[] args) { System.out.println("Hello World"); } }');
  assert.equal(result.status, 200);
  assert.deepEqual(result.json, { ok: true, output: 'Hello World\n', stdout: 'Hello World\n', stderr: '' });
});
