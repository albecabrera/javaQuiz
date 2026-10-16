const { test } = require('node:test');
const assert = require('node:assert/strict');
const {
  ContentLengthParser,
  LspSession,
  validateBrowserMessage,
  createBridge,
  MAX_SOURCE_BYTES,
  MAX_MESSAGE_BYTES,
} = require('../lsp-bridge');

test('parses fragmented Content-Length LSP frames', () => {
  const messages = [];
  const parser = new ContentLengthParser((message) => messages.push(message));
  const body = Buffer.from(JSON.stringify({ jsonrpc: '2.0', method: 'initialized' }));
  const frame = Buffer.concat([Buffer.from(`Content-Length: ${body.length}\r\n\r\n`), body]);
  parser.push(frame.subarray(0, 9));
  parser.push(frame.subarray(9));
  assert.deepEqual(messages, [{ jsonrpc: '2.0', method: 'initialized' }]);
});

test('rejects malformed or oversized browser messages', () => {
  assert.equal(validateBrowserMessage({ type: 'change', source: '' }), 'change.source must be a non-empty string');
  assert.equal(validateBrowserMessage({ type: 'change', source: 'x'.repeat(MAX_SOURCE_BYTES + 1) }), `source must be at most ${MAX_SOURCE_BYTES} bytes`);
  assert.equal(validateBrowserMessage({ type: 'complete', id: -1, line: 0, character: 0 }), 'complete.id must be a non-negative integer');
  assert.equal(validateBrowserMessage({ type: 'execute', command: 'rm -rf /' }), 'unsupported message type');
  assert.ok(MAX_MESSAGE_BYTES > MAX_SOURCE_BYTES);
});

test('document changes use increasing Java-compatible versions', () => {
  const session = new LspSession({ readyState: 1, send() {} }, () => {});
  const updates = [];
  session.notify = (method, params) => updates.push({ method, params });
  session.change('class Main {}');
  session.change('class Main { }');
  assert.deepEqual(updates.map(({ params }) => params.textDocument.version), [2, 3]);
});

test('allows only the loopback browser origin and one bridge session', () => {
  const bridge = createBridge({ port: 4321 });
  assert.equal(bridge.originAllowed('http://127.0.0.1:4321'), true);
  assert.equal(bridge.originAllowed('http://localhost:4321'), false);
  assert.equal(bridge.originAllowed('https://127.0.0.1:4321'), false);
});
