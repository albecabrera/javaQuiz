const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function terminal(fetch) {
  const saved = new Map();
  const elements = new Map();
  const document = {
    activeElement: null, fullscreenElement: null, listeners: {},
    body: { classList: { add() {}, remove() {}, contains() { return false; }, toggle() {} } },
    querySelector(selector) { if (!elements.has(selector)) elements.set(selector, element()); return elements.get(selector); },
    createElement: element,
    addEventListener(name, listener) { this.listeners[name] = listener; }
  };
  function element() {
    const listeners = {};
    return {
      value: '', hidden: false, disabled: false, style: {}, children: [], listeners,
      scrollHeight: 0, selectionStart: 0, selectionEnd: 0,
      set innerHTML(value) { this._html = value; if (!value) this.children = []; },
      get innerHTML() { return this._html || ''; },
      setAttribute(name, value) { this[name] = value; },
      appendChild(child) { this.children.push(child); },
      addEventListener(name, handler) { listeners[name] = handler; },
      focus() { document.activeElement = this; }
    };
  }
  const window = { location: { search: '', href: '' }, clearTimeout() {},
    localStorage: { getItem(key) { return saved.get(key) ?? null; }, setItem(key, value) { saved.set(key, value); } } };
  const context = vm.createContext({ document, window, fetch, setTimeout, console });
  for (const file of ['quiz.js', 'progress.js', 'app.js']) vm.runInContext(fs.readFileSync(require.resolve(`../${file}`), 'utf8'), context);
  return { context, get: document.querySelector.bind(document), saved };
}

test('only successful code execution records progress; wrong output and skipping do not', async () => {
  const expected = 'Alle Attribute dieses Objekts hintereinander: Das Ergebnis lautet: 21.2';
  const passed = terminal(async () => ({ json: async () => ({ ok: true, stdout: `${expected}\n`, stderr: '' }) }));
  vm.runInContext('currentExerciseIndex = codeExercises.findIndex(({ id }) => id === "1.8.1"); switchToCode()', passed.context);
  passed.get('#terminal-editor').value = 'public class Main {}';
  await vm.runInContext('submitCode()', passed.context);
  assert.match(passed.get('#terminal-output').children.map((child) => child.innerHTML).join(' '), /Ergebnis richtig/);
  assert.equal(passed.context.window.devquizProgress.status('chapter8', 0, ['1.8.1']), 'started');

  const skipped = terminal(async () => { throw new Error('unexpected execution'); });
  vm.runInContext('currentExerciseIndex = codeExercises.findIndex(({ id }) => id === "1.8.1"); switchToCode()', skipped.context);
  skipped.get('#skip-exercise').listeners.click();
  assert.equal(skipped.context.window.devquizProgress.status('chapter8', 0, ['1.8.1']), 'new');
  assert.equal(skipped.saved.size, 0);

  const wrong = terminal(async () => ({ json: async () => ({ ok: true, stdout: 'Falsch\n', stderr: '' }) }));
  vm.runInContext('currentExerciseIndex = codeExercises.findIndex(({ id }) => id === "1.8.1"); switchToCode()', wrong.context);
  wrong.get('#terminal-editor').value = 'public class Main {}';
  await vm.runInContext('submitCode()', wrong.context);
  assert.match(wrong.get('#terminal-output').children.map((child) => child.innerHTML).join(' '), /Ausgabe stimmt nicht/);
  assert.equal(wrong.context.window.devquizProgress.status('chapter8', 0, ['1.8.1']), 'new');
  assert.equal(wrong.saved.size, 0);
});
