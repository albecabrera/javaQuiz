const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function terminal(fetch, fastBoot = false) {
  const elements = new Map();
  const document = {
    activeElement: null,
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, element());
      return elements.get(selector);
    },
    createElement: () => element(),
    addEventListener() {},
  };
  function element() {
    const listeners = {};
    return {
      value: '', textContent: '', hidden: false, disabled: false,
      set innerHTML(value) { this._html = value; if (!value) this.children = []; },
      get innerHTML() { return this._html || ''; },
      style: {}, scrollHeight: 0, selectionStart: 0, selectionEnd: 0,
      children: [], listeners,
      appendChild(child) { this.children.push(child); },
      addEventListener(name, handler) { listeners[name] = handler; },
      focus() { document.activeElement = this; },
    };
  }
  const context = vm.createContext({ document, fetch, window: { clearTimeout() {} }, setTimeout: fastBoot ? (callback) => setImmediate(callback) : setTimeout, console });
  vm.runInContext(fs.readFileSync(require.resolve('../quiz.js'), 'utf8'), context);
  vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context);
  return { context, document, get: (selector) => document.querySelector(selector) };
}

test('startup opens the first code exercise with its answer marker selected', async () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); }, true);
  for (let i = 0; i < 150 && ui.get('#terminal-mode').textContent !== 'CODE-MODUS'; i++) {
    await new Promise((resolve) => setImmediate(resolve));
  }
  const editor = ui.get('#terminal-editor');
  assert.equal(ui.get('#terminal-mode').textContent, 'CODE-MODUS');
  assert.equal(ui.document.activeElement, editor);
  assert.equal(editor.value.slice(editor.selectionStart, editor.selectionEnd), '/* DEIN_CODE_HIER */');
});

test('mode button keeps multiple choice accessible and restores code focus', () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  vm.runInContext('switchToCode()', ui.context);
  ui.get('#mode-toggle').listeners.click();
  assert.equal(ui.get('#terminal-mode').textContent, 'QUIZ-MODUS');
  assert.equal(ui.document.activeElement, ui.get('#terminal-input'));
  ui.get('#mode-toggle').listeners.click();
  assert.equal(ui.get('#terminal-mode').textContent, 'CODE-MODUS');
  assert.equal(ui.document.activeElement, ui.get('#terminal-editor'));
});

test('only the active exercise remains visible after skipping', () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  vm.runInContext('switchToCode()', ui.context);
  assert.ok(ui.get('#terminal-output').children.some((child) => child.innerHTML.includes('Hallo Welt')));
  ui.get('#skip-exercise').listeners.click();
  const html = ui.get('#terminal-output').children.map((child) => child.innerHTML).join(' ');
  assert.match(html, /Eine Variable deklarieren/);
  assert.doesNotMatch(html, /Hallo Welt/);
});

test('skip advances to the next answer and focuses its selected marker', () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  vm.runInContext('switchToCode()', ui.context);
  assert.equal(ui.get('#terminal-progress').textContent, '01 / 14');
  ui.get('#skip-exercise').listeners.click();
  assert.equal(ui.get('#terminal-progress').textContent, '02 / 14');
  const editor = ui.get('#terminal-editor');
  assert.equal(ui.document.activeElement, editor);
  assert.equal(editor.value.slice(editor.selectionStart, editor.selectionEnd), '/* DEIN_CODE_HIER */');
});

test('successful execution keeps the result visible until Weiter is clicked', async () => {
  const ui = terminal(async () => ({ json: async () => ({ ok: true, stdout: 'Hallo Welt\n' }) }));
  vm.runInContext('switchToCode()', ui.context);
  const nextButton = ui.get('#next-exercise');
  assert.equal(nextButton.hidden, true);
  ui.get('#terminal-editor').listeners.keydown({ key: 'Enter', shiftKey: false, preventDefault() {} });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(ui.get('#terminal-progress').textContent, '01 / 14');
  assert.equal(nextButton.hidden, false);
  assert.match(ui.get('#terminal-output').children.map((child) => child.innerHTML).join(' '), /Hallo Welt/);
  nextButton.listeners.click();
  assert.equal(ui.get('#terminal-progress').textContent, '02 / 14');
  assert.equal(nextButton.hidden, true);
});

test('wrong output allows retry without advancing or losing focus', async () => {
  const ui = terminal(async () => ({ json: async () => ({ ok: true, stdout: 'Falsch\n' }) }));
  vm.runInContext('switchToCode()', ui.context);
  ui.get('#terminal-editor').listeners.keydown({ key: 'Enter', shiftKey: false, preventDefault() {} });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(ui.get('#terminal-progress').textContent, '01 / 14');
  assert.equal(ui.document.activeElement, ui.get('#terminal-editor'));
  assert.equal(ui.get('#terminal-editor').disabled, false);
  assert.equal(ui.get('#next-exercise').hidden, true);
});

test('skip on the final exercise returns to quiz with input focused', () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  vm.runInContext('switchToCode(); currentExerciseIndex = codeExercises.length - 1; printExercise()', ui.context);
  ui.get('#skip-exercise').listeners.click();
  assert.equal(ui.get('#terminal-mode').textContent, 'QUIZ-MODUS');
  assert.equal(ui.get('#terminal-editor').hidden, true);
  assert.equal(ui.document.activeElement, ui.get('#terminal-input'));
});

test('unavailable backend leaves the current code editable and focused', async () => {
  const ui = terminal(async () => { throw new Error('offline'); });
  vm.runInContext('switchToCode()', ui.context);
  ui.get('#terminal-editor').listeners.keydown({ key: 'Enter', shiftKey: false, preventDefault() {} });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(ui.get('#terminal-progress').textContent, '01 / 14');
  assert.equal(ui.document.activeElement, ui.get('#terminal-editor'));
  assert.equal(ui.get('#terminal-editor').disabled, false);
});

test('existing multiple-choice answer still awards a point', async () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  await vm.runInContext("submitAnswer('B')", ui.context);
  assert.equal(ui.get('#score-badge').textContent, 1);
});
