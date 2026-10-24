const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function terminal(fetch, fastBoot = false) {
  const elements = new Map();
  const document = {
    activeElement: null,
    body: { classList: { values: new Set(), add(name) { this.values.add(name); }, remove(name) { this.values.delete(name); }, contains(name) { return this.values.has(name); }, toggle(name, enabled) { if (enabled) this.values.add(name); else this.values.delete(name); } } },
    listeners: {},
    fullscreenElement: null,
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, element());
      return elements.get(selector);
    },
    createElement: () => element(),
    addEventListener(name, handler) { this.listeners[name] = handler; },
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
  const context = vm.createContext({ document, fetch, window: { clearTimeout() {}, location: { search: "", href: "" } }, setTimeout: fastBoot ? (callback) => setImmediate(callback) : setTimeout, console });
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

test('Cmd+Shift+L toggles the DevQuiz theme with a visible control', () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  let prevented = 0;
  const keydown = ui.document.listeners.keydown;
  keydown({ key: 'l', metaKey: true, shiftKey: true, preventDefault() { prevented++; } });
  assert.equal(ui.document.body.classList.contains('devquiz-light'), true);
  assert.equal(ui.get('#devquiz-theme-toggle').textContent, 'Dunkles Design');
  ui.get('#devquiz-theme-toggle').listeners.click();
  assert.equal(ui.document.body.classList.contains('devquiz-light'), false);
  assert.equal(ui.get('#devquiz-theme-toggle').textContent, 'Helles Design');
  assert.equal(prevented, 1);
});

test('Cmd+P presents the code editor and Escape restores it without affecting quiz mode', () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  const shell = ui.get('.app-shell');
  const classes = new Set();
  shell.classList = {
    add(name) { classes.add(name); },
    remove(name) { classes.delete(name); },
    contains(name) { return classes.has(name); },
    toggle(name, enabled) { if (enabled) classes.add(name); else classes.delete(name); }
  };
  const terminalWindow = ui.get('#devquiz-terminal');
  let nativeFullscreen = 0;
  terminalWindow.requestFullscreen = () => { nativeFullscreen++; ui.document.fullscreenElement = terminalWindow; return Promise.resolve(); };
  ui.document.exitFullscreen = () => { nativeFullscreen--; ui.document.fullscreenElement = null; };
  vm.runInContext('switchToCode()', ui.context);
  let prevented = 0;
  const keydown = ui.document.listeners.keydown;
  keydown({ key: 'p', metaKey: true, preventDefault() { prevented++; } });
  assert.equal(classes.has('is-editor-presenting'), true);
  assert.equal(nativeFullscreen, 1);
  assert.equal(ui.get('#editor-presentation-toggle').textContent, 'Ansicht schließen');
  keydown({ key: 'Escape', preventDefault() { prevented++; } });
  assert.equal(classes.has('is-editor-presenting'), false);
  assert.equal(nativeFullscreen, 0);
  ui.get('#editor-presentation-toggle').listeners.click();
  assert.equal(classes.has('is-editor-presenting'), true);
  ui.document.fullscreenElement = null;
  ui.document.listeners.fullscreenchange();
  assert.equal(classes.has('is-editor-presenting'), false);
  ui.get('#mode-toggle').listeners.click();
  keydown({ key: 'p', metaKey: true, preventDefault() { prevented++; } });
  assert.equal(classes.has('is-editor-presenting'), false);
  assert.equal(prevented, 2);
});

test('clicking Monaco content does not steal focus for the hidden textarea', () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  vm.runInContext('switchToCode()', ui.context);
  const body = ui.get('#terminal-body');
  const monaco = ui.get('#monaco-editor');
  monaco.focus();
  body.listeners.click({ target: monaco });
  assert.equal(ui.document.activeElement, monaco);
});

test('only the active exercise remains visible after skipping', () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  vm.runInContext('switchToCode()', ui.context);
  assert.ok(ui.get('#terminal-output').children.some((child) => child.innerHTML.includes('Mehrzeiliger Kommentar und Ausgabe')));
  ui.get('#skip-exercise').listeners.click();
  const html = ui.get('#terminal-output').children.map((child) => child.innerHTML).join(' ');
  assert.match(html, /Eine Ausgabe mit println/);
  assert.doesNotMatch(html, /Mehrzeiliger Kommentar und Ausgabe/);
});

test('skip advances to the next answer and focuses its selected marker', () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  vm.runInContext('switchToCode()', ui.context);
  assert.equal(ui.get('#terminal-progress').textContent, '01 / 10');
  ui.get('#skip-exercise').listeners.click();
  assert.equal(ui.get('#terminal-progress').textContent, '02 / 10');
  const editor = ui.get('#terminal-editor');
  assert.equal(ui.document.activeElement, editor);
  assert.equal(editor.value.slice(editor.selectionStart, editor.selectionEnd), '/* DEIN_CODE_HIER */');
});

test('successful execution keeps the result visible until Weiter is clicked', async () => {
  const ui = terminal(async () => ({ json: async () => ({ ok: true, stdout: 'Hallo, ich bin Duke.\nWie heißt Du?\n' }) }));
  vm.runInContext('switchToCode()', ui.context);
  const nextButton = ui.get('#next-exercise');
  assert.equal(ui.get('#terminal-progress').textContent, '01 / 10');
  assert.equal(nextButton.hidden, true);
  ui.get('#terminal-editor').listeners.keydown({ key: 'Enter', shiftKey: false, preventDefault() {} });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(ui.get('#terminal-progress').textContent, '01 / 10');
  assert.equal(nextButton.hidden, false);
  assert.match(ui.get('#terminal-output').children.map((child) => child.innerHTML).join(' '), /Hallo, ich bin Duke/);
  nextButton.listeners.click();
  assert.equal(ui.get('#terminal-progress').textContent, '02 / 10');
  assert.equal(nextButton.hidden, true);
});

test('completed presentation exercise returns to the next slide', async () => {
  const ui = terminal(async () => ({ json: async () => ({ ok: true, stdout: 'Hallo, ich bin Duke.\nWie heißt Du?\n' }) }));
  ui.context.window.location.search = '?exercise=1.1.1&returnChapter=chapter1&returnSlide=3';
  vm.runInContext('selectRequestedExercise(); switchToCode()', ui.context);
  ui.get('#terminal-editor').listeners.keydown({ key: 'Enter', shiftKey: false, preventDefault() {} });
  await new Promise((resolve) => setImmediate(resolve));
  ui.get('#next-exercise').listeners.click();
  assert.equal(ui.context.window.location.href, 'presentation.html?chapter=chapter1&slide=3');
});

test('incomplete presentation exercise can return without passing', async () => {
  const ui = terminal(async () => ({ json: async () => ({ ok: true, stdout: 'Falsch\n' }) }));
  ui.context.window.location.search = '?exercise=1.1.1&returnChapter=chapter1&returnSlide=3';
  vm.runInContext('selectRequestedExercise(); switchToCode()', ui.context);
  ui.get('#terminal-editor').listeners.keydown({ key: 'Enter', shiftKey: false, preventDefault() {} });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(ui.get('#next-exercise').hidden, false);
  assert.equal(ui.get('#next-exercise').textContent, 'Zur Präsentation →');
  assert.equal(ui.get('#terminal-editor').disabled, false);
  ui.get('#next-exercise').listeners.click();
  assert.equal(ui.context.window.location.href, 'presentation.html?chapter=chapter1&slide=3');
});

test('failed code reveals one exercise-specific hint per attempt, then resets on next exercise', async () => {
  const ui = terminal(async () => ({ json: async () => ({ ok: true, stdout: 'Falsch\n' }) }));
  vm.runInContext('switchToCode()', ui.context);
  const hint = ui.get('#exercise-hint');
  assert.equal(hint.hidden, true);
  const attempt = async () => {
    ui.get('#terminal-editor').listeners.keydown({ key: 'Enter', shiftKey: false, preventDefault() {} });
    await new Promise((resolve) => setImmediate(resolve));
  };
  await attempt();
  assert.equal(hint.hidden, false);
  hint.listeners.click();
  assert.equal(hint.hidden, true);
  assert.match(ui.get('#terminal-output').children.at(-1).innerHTML, /Hinweis 1 von 3/);
  await attempt();
  hint.listeners.click();
  assert.match(ui.get('#terminal-output').children.at(-1).innerHTML, /Hinweis 2 von 3/);
  ui.get('#skip-exercise').listeners.click();
  assert.equal(hint.hidden, true);
  await attempt();
  hint.listeners.click();
  assert.match(ui.get('#terminal-output').children.at(-1).innerHTML, /Hinweis 1 von 3/);
});

test('wrong output allows retry without advancing or losing focus', async () => {
  const ui = terminal(async () => ({ json: async () => ({ ok: true, stdout: 'Falsch\n' }) }));
  vm.runInContext('switchToCode()', ui.context);
  ui.get('#terminal-editor').listeners.keydown({ key: 'Enter', shiftKey: false, preventDefault() {} });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(ui.get('#terminal-progress').textContent, '01 / 10');
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
  assert.equal(ui.get('#terminal-progress').textContent, '01 / 10');
  assert.equal(ui.document.activeElement, ui.get('#terminal-editor'));
  assert.equal(ui.get('#terminal-editor').disabled, false);
});

test('existing multiple-choice answer still awards a point', async () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  await vm.runInContext("submitAnswer('B')", ui.context);
  assert.equal(ui.get('#score-badge').textContent, 1);
});


test('correct answer offers Weiter and ArrowRight advances the quiz', async () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  await vm.runInContext("submitAnswer('B')", ui.context);
  const nextButton = ui.get('#next-exercise');
  assert.equal(nextButton.hidden, false);
  assert.equal(nextButton.textContent, 'Weiter →');
  assert.equal(ui.get('#terminal-form')['data-awaiting-next'], 'true');

  ui.document.listeners.keydown({ key: 'ArrowRight', preventDefault() {} });
  await new Promise((resolve) => setTimeout(resolve, 220));
  assert.equal(ui.get('#terminal-progress').textContent, '02 / 10');
  assert.equal(nextButton.hidden, true);
  assert.equal(ui.document.activeElement, ui.get('#terminal-input'));
});


test('final results include topic graph and actionable learning links', () => {
  const ui = terminal(async () => { throw new Error('unexpected fetch'); });
  vm.runInContext('questionResults = [true, false, true, false, true, false, true, false, true, false]; score = 5; showResults()', ui.context);
  const html = ui.get('#terminal-output').children.map((child) => child.innerHTML).join(' ');
  assert.match(html, /DEIN LERNPROFIL/);
  assert.match(html, /Datentypen und Variablen/);
  assert.match(html, /presentation\.html\?chapter=chapter3/);
  assert.match(html, /index\.html\?exercise=1\.1\.1/);
});
