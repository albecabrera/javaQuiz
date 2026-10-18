const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(require.resolve('../editor-adapter.js'), 'utf8');

test('editor adapter does not register code completion suggestions', () => {
  assert.doesNotMatch(source, /registerCompletionItemProvider/);
  assert.doesNotMatch(source, /requestCompletion|triggerSuggest|type: "complete"/);
});

test('editor adapter uses only the local Monaco loader and diagnostic bridge protocol', () => {
  assert.match(source, /\/vendor\/vs/);
  assert.doesNotMatch(source, /https?:\/\//);
  assert.match(source, /type: "change"/);
  assert.match(source, /message\.type === "diagnostics"/);
  assert.match(source, /setModelMarkers/);
});

test('JDT LS reconnects without enabling code completion', () => {
  assert.match(source, /JDT LS wird neu verbunden/);
  assert.match(source, /scheduleReconnect/);
  assert.doesNotMatch(source, /registerCompletionItemProvider|requestCompletion/);
});

test('JDT LS disconnects are retried without treating Docker execution as unavailable', () => {
  assert.match(source, /JDT LS wird neu verbunden/);
  assert.match(source, /scheduleReconnect/);
});

test('editor remains writable across exercises, accepts spaces, runs code, and keeps diagnostics', async () => {
  let socket;
  let value = 'System.out.println("Hallo");';
  let onModelChange;
  let editorOptions;
  let themeData;
  let readOnly;
  let adaptiveFontSize;
  let layoutCount = 0;
  let completionProviderRegistrations = 0;
  let executeCount = 0;
  let markers;
  const actions = [];
  const statusEvents = [];
  const model = {
    getValue: () => value,
    setValue(next) { value = next; },
    getPositionAt(offset) { return { lineNumber: 1, column: offset + 1 }; },
    onDidChangeContent(handler) { onModelChange = handler; },
  };
  const editor = {
    addAction(action) { actions.push(action); },
    onKeyDown(handler) { this.keydown = handler; },
    focus() {},
    updateOptions(options) { if (Object.hasOwn(options, 'readOnly')) readOnly = options.readOnly; if (options.fontSize) adaptiveFontSize = options.fontSize; },
    layout() { layoutCount++; },
    setSelection() {},
  };
  const monaco = {
    editor: {
      createModel: () => model,
      defineTheme(name, data) { if (name === 'devquiz-atom-one-dark') themeData = data; },
      create: (_, options) => { editorOptions = options; return editor; },
      setModelMarkers(_, owner, nextMarkers) { markers = { owner, values: nextMarkers }; },
    },
    languages: { setLanguageConfiguration() {}, registerCompletionItemProvider() { completionProviderRegistrations++; } },
    KeyCode: { Enter: 3, F10: 4, Space: 5, Slash: 6, KeyD: 7, KeyY: 8, Backspace: 9, KeyL: 10 },
    KeyMod: { Ctrl: 16384, CtrlCmd: 2048, Shift: 4096, Alt: 8192 },
    MarkerSeverity: { Warning: 4, Error: 8 },
  };
  class Socket {
    constructor() { socket = this; this.readyState = 0; this.handlers = {}; this.sent = []; }
    addEventListener(name, callback) { this.handlers[name] = callback; }
    send(raw) { this.sent.push(JSON.parse(raw)); }
  }
  const window = {
    monaco,
    WebSocket: Socket,
    navigator: { platform: 'MacIntel' },
    location: { protocol: 'http:', host: '127.0.0.1:3000' },
    dispatchEvent(event) { statusEvents.push(event.detail); },
  };
  vm.runInNewContext(source, {
    window,
    CustomEvent: class { constructor(name, options) { this.name = name; this.detail = options.detail; } },
    setTimeout,
  });
  const container = { hidden: true, clientWidth: 900, style: {} };
  const onExecute = () => { executeCount++; };
  assert.ok(await window.devquizEditor.mount(container, value, null, onExecute));
  assert.ok(adaptiveFontSize >= 18);
  assert.ok(layoutCount > 0);
  assert.equal(completionProviderRegistrations, 0);
  assert.equal(editorOptions.theme, 'devquiz-atom-one-dark');
  assert.equal(themeData.base, 'vs-dark');
  assert.equal(editorOptions.fontFamily.includes('Fira Code'), true);
  assert.equal(editorOptions.bracketPairColorization.enabled, true);
  assert.equal(editorOptions.suggestOnTriggerCharacters, false);
  assert.equal(editorOptions.quickSuggestions, false);
  assert.equal(editorOptions.wordBasedSuggestions, 'off');
  assert.equal(actions.some(({ id }) => id === 'devquiz.complete' || id === 'devquiz.completeStatement'), false);

  socket.readyState = 1;
  socket.handlers.message({ data: JSON.stringify({ type: 'ready' }) });
  assert.ok(statusEvents.some(({ text }) => text === 'JDT LS bereit · Live-Diagnosen aktiv'));
  assert.ok(socket.sent.some(({ type }) => type === 'change' && value));
  socket.handlers.message({ data: JSON.stringify({ type: 'diagnostics', diagnostics: [{ message: 'Error', severity: 1, range: { start: { line: 0, character: 0 }, end: { line: 0, character: 1 } } }] }) });
  assert.equal(markers.owner, 'jdtls');
  assert.equal(markers.values[0].message, 'Error');

  let preventedSpace = false;
  editor.keydown({ keyCode: 5, shiftKey: false, preventDefault() { preventedSpace = true; }, stopPropagation() {} });
  assert.equal(preventedSpace, false);
  value = 'System.out.println("Hallo Welt");';
  onModelChange({ changes: [{ text: ' ' }] });
  assert.ok(socket.sent.some(({ type, source }) => type === 'change' && source === value));
  assert.equal(socket.sent.some(({ type }) => type === 'complete'), false);
  value = Array.from({ length: 12 }, () => 'int n = 1;').join('\n');
  onModelChange({ changes: [{ text: '\n' }] });
  assert.equal(container.style.height, '680px');
  let preventedEnter = false;
  editor.keydown({ keyCode: 3, shiftKey: false, isComposing: false, preventDefault() { preventedEnter = true; }, stopPropagation() {} });
  assert.equal(preventedEnter, true);
  assert.equal(executeCount, 1);

  window.devquizEditor.setReadOnly(true);
  assert.equal(readOnly, true);
  await window.devquizEditor.mount(container, 'public class Main { }', null, onExecute);
  assert.equal(readOnly, false);
  assert.equal(value, 'public class Main { }');
});
