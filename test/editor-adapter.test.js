const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(require.resolve('../editor-adapter.js'), 'utf8');

test('editor adapter uses only the local Monaco loader and bridge protocol', () => {
  assert.match(source, /\/vendor\/vs/);
  assert.doesNotMatch(source, /https?:\/\//);
  assert.match(source, /type: "change"/);
  assert.match(source, /type: "complete"/);
  assert.match(source, /setModelMarkers/);
});

test('editor adapter reconnects JDT LS without fabricating completions', () => {
  assert.match(source, /JDT LS wird neu verbunden/);
  assert.match(source, /Promise\.resolve\(\[\]\)/);
});

test('typing sout triggers the local completion popup immediately', () => {
  assert.match(source, /return Promise\.resolve\(\{ suggestions: localSuggestions \}\)/);
  assert.match(source, /editor\?\.trigger\?\.\("keyboard", "editor\.action\.triggerSuggest"/);
});

test('JDT LS disconnects are retried without treating Docker execution as unavailable', () => {
  assert.match(source, /JDT LS wird neu verbunden/);
  assert.match(source, /scheduleReconnect/);
});

test('ready sends current source and completion edits map LSP positions to Monaco positions', async () => {
  let provider;
  let socket;
  let value = 'System.out.';
  const model = {
    getValue: () => value,
    setValue: (next) => { value = next; },
    getPositionAt: (offset) => ({ lineNumber: 1, column: offset + 1 }),
    onDidChangeContent() {},
  };
  let executeCount = 0;
  const editor = { addAction() {}, onKeyDown(handler) { this.keydown = handler; }, focus() {}, updateOptions() {}, setSelection() {} };
  const monaco = {
    editor: { createModel: () => model, create: () => editor, setModelMarkers() {} },
    languages: { setLanguageConfiguration() {}, registerCompletionItemProvider: (_, impl) => { provider = impl; }, CompletionItemKind: { Method: 1 } },
    KeyCode: { Enter: 3 }, KeyMod: { CtrlCmd: 2048 }, MarkerSeverity: { Warning: 4, Error: 8 },
  };
  class Socket {
    constructor() { socket = this; this.readyState = 0; this.handlers = {}; this.sent = []; }
    addEventListener(name, callback) { this.handlers[name] = callback; }
    send(raw) { this.sent.push(JSON.parse(raw)); }
  }
  const window = { monaco, WebSocket: Socket, location: { protocol: 'http:', host: '127.0.0.1:3000' }, dispatchEvent() {} };
  vm.runInNewContext(source, { window, CustomEvent: class { constructor(name, options) { this.detail = options.detail; } }, setTimeout });
  const container = { hidden: true, querySelector: () => null };
  assert.ok(await window.devquizEditor.mount(container, value, null, () => { executeCount++; }));
  editor.keydown({ keyCode: 3, shiftKey: false, preventDefault() {}, stopPropagation() {} });
  assert.equal(executeCount, 1);
  container.querySelector = () => ({}); // Monaco suggestion widget is open.
  editor.keydown({ keyCode: 3, shiftKey: false, preventDefault() {}, stopPropagation() {} });
  assert.equal(executeCount, 1);
  socket.readyState = 1;
  socket.handlers.message({ data: JSON.stringify({ type: 'ready' }) });
  assert.ok(socket.sent.some((message) => message.type === 'change' && message.source === value));
  const resultPromise = provider.provideCompletionItems(null, { lineNumber: 1, column: 12 });
  const request = socket.sent.find((message) => message.type === 'complete');
  socket.handlers.message({ data: JSON.stringify({ type: 'completion', id: request.id, items: [{ label: 'println', textEdit: { newText: 'println()', range: { start: { line: 0, character: 7 }, end: { line: 0, character: 11 } } } }] }) });
  const result = await resultPromise;
  assert.equal(result.suggestions[0].insertText, 'println()');
  assert.deepEqual(JSON.parse(JSON.stringify(result.suggestions[0].range)), { startLineNumber: 1, startColumn: 8, endLineNumber: 1, endColumn: 12 });

  value = 'sout';
  const completeRequestsBeforeSout = socket.sent.filter((message) => message.type === 'complete').length;
  const soutResult = await provider.provideCompletionItems(null, { lineNumber: 1, column: 5 });
  assert.equal(socket.sent.filter((message) => message.type === 'complete').length, completeRequestsBeforeSout);
  assert.equal(soutResult.suggestions[0].label, 'System.out.println');
  assert.equal(soutResult.suggestions[0].insertText, 'System.out.println($0);');
  assert.deepEqual(JSON.parse(JSON.stringify(soutResult.suggestions[0].range)), { startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 5 });
});
