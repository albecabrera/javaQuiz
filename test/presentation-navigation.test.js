const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function element() {
  const children = [];
  const classes = new Set();
  return {
    children, style: {}, dataset: {}, hidden: false,
    classList: {
      add(name) { classes.add(name); }, remove(name) { classes.delete(name); },
      contains(name) { return classes.has(name); }, toggle(name, force) {
        const enabled = force === undefined ? !classes.has(name) : force;
        if (enabled) classes.add(name); else classes.delete(name);
        return enabled;
      }
    },
    appendChild(child) { children.push(child); },
    append(...items) { children.push(...items); },
    set innerHTML(value) { if (value === '') children.length = 0; this._html = value; },
    get innerHTML() { return this._html; },
    addEventListener(name, handler) { (this.listeners ||= {})[name] = handler; },
    setAttribute(name, value) { (this.attributes ||= {})[name] = value; },
    querySelector(selector) { if (selector === '.slide-exercise-check') return children.find((child) => child.className === 'slide-exercise-check'); return element(); },
    querySelectorAll(selector) { return selector === '.slide-thumbnail' ? children.filter((child) => child.className?.includes('slide-thumbnail')) : children.filter((child) => child.type === 'button'); },
    click() { this.listeners?.click?.(); }
  };
}

function presentation(chapter = 'chapter1', slide = 0) {
  const nodes = new Map();
  const get = (selector) => nodes.get(selector) || (nodes.set(selector, element()), nodes.get(selector));
  const chapterButtons = Array.from({ length: 7 }, (_, index) => Object.assign(element(), { dataset: { chapter: `chapter${index + 1}`, module: 'module1' } }));
  const moduleButtons = ['module1', 'module2', 'module3'].map((name) => Object.assign(element(), { dataset: { module: name } }));
  const document = {
    querySelector: get, createElement: element,
    querySelectorAll(selector) { return selector === '.chapter-button' ? chapterButtons : moduleButtons; },
    addEventListener() {}, body: { classList: element().classList }
  };
  const window = { location: { search: `?chapter=${chapter}&slide=${slide}` }, localStorage: { getItem: () => null, setItem() {} } };
  const source = fs.readFileSync(require.resolve('../presentation.js'), 'utf8');
  vm.runInNewContext(source, { document, window, URLSearchParams });
  return { get, window, chapterButtons };
}

test('chapter sidebar navigates concept, question and code steps in order', () => {
  const ui = presentation('chapter1');
  const buttons = ui.get('#slide-overview-list').querySelectorAll('.slide-thumbnail');
  const labels = ui.get('#slide-overview-list').children.filter((child) => child.className === 'overview-section-label');
  assert.deepEqual(labels.map((node) => node.textContent), ['01 · Verstehen', '02 · Wissen prüfen', '03 · Programmieren']);
  assert.equal(buttons.filter((button) => button.className.includes('step-code')).length, 4);
  const question = buttons.find((button) => button.className.includes('step-question'));
  question.click();
  assert.equal(ui.get('#slide-exercise').hidden, false);
  assert.ok(ui.get('#slide-exercise-options').children.length > 0);
  const code = buttons.find((button) => button.className.includes('step-code'));
  code.click();
  assert.match(ui.get('#slide-exercise-options').children[0].href, /exercise=1\.1\.1&returnChapter=chapter1&returnSlide=/);
  ui.get('#next-slide').click();
  assert.match(ui.get('#slide-exercise-options').children[0].href, /exercise=1\.1\.2/);
});

test('chapter 1.5 checks object instantiation with both correct answers', () => {
  const ui = presentation('chapter5');
  const questions = ui.get('#slide-overview-list').querySelectorAll('.slide-thumbnail').filter((button) => button.className.includes('step-question'));
  assert.equal(questions.length, 3);
  questions[0].click();
  assert.equal(ui.get('#slide-exercise-prompt').textContent, 'Was gilt bei der Instanziierung von Objekten? (Eine oder mehrere richtige Antworten sind möglich)');
  const options = ui.get('#slide-exercise-options');
  assert.equal(options.children.length, 4);
  options.children[1].click();
  options.children[2].click();
  options.children.at(-1).click();
  assert.match(ui.get('#slide-exercise-feedback').textContent, /^✓ Richtig/);
});

test('chapter 1.5 checks the dot operator as a single choice', () => {
  const ui = presentation('chapter5');
  const questions = ui.get('#slide-overview-list').querySelectorAll('.slide-thumbnail').filter((button) => button.className.includes('step-question'));
  questions[1].click();
  assert.equal(ui.get('#slide-exercise-prompt').textContent, 'Der Punkt Operator...');
  const options = ui.get('#slide-exercise-options');
  assert.equal(options.children.length, 3);
  options.children[2].click();
  assert.match(ui.get('#slide-exercise-feedback').textContent, /^✓ Richtig/);
});

test('chapter 1.5 checks three properties of attributes', () => {
  const ui = presentation('chapter5');
  const questions = ui.get('#slide-overview-list').querySelectorAll('.slide-thumbnail').filter((button) => button.className.includes('step-question'));
  questions[2].click();
  assert.equal(ui.get('#slide-exercise-prompt').textContent, 'Welche Aussagen sind wahr? (Eine oder mehrere richtige Antworten sind möglich)');
  const options = ui.get('#slide-exercise-options');
  assert.equal(options.children.length, 6);
  for (const index of [1, 2, 3]) options.children[index].click();
  options.children.at(-1).click();
  assert.match(ui.get('#slide-exercise-feedback').textContent, /^✓ Richtig/);
});

test('chapter 1.5 presents its attribute coding task after the questions', () => {
  const ui = presentation('chapter5');
  const buttons = ui.get('#slide-overview-list').querySelectorAll('.slide-thumbnail');
  const finalStep = buttons.at(-1);
  assert.match(finalStep.className, /step-code/);
  finalStep.click();
  assert.match(ui.get('#slide-exercise-options').children[0].href, /exercise=1\.5\.2&returnChapter=chapter6&returnSlide=0/);
});

test('chapter 1.6 links its methods coding task after the lesson', () => {
  const ui = presentation('chapter6');
  const buttons = ui.get('#slide-overview-list').querySelectorAll('.slide-thumbnail');
  const finalStep = buttons.at(-1);
  assert.match(finalStep.className, /step-code/);
  finalStep.click();
  assert.match(ui.get('#slide-exercise-options').children[0].href, /exercise=1\.6\.3&returnChapter=chapter7&returnSlide=0/);
});

test('chapter 1.7 presents its return-value question', () => {
  const ui = presentation('chapter7');
  const questions = ui.get('#slide-overview-list').querySelectorAll('.slide-thumbnail').filter((button) => button.className.includes('step-question'));
  assert.equal(questions.length, 1);
  questions[0].click();
  assert.equal(ui.get('#slide-exercise-options').children.length, 5);
  for (const index of [3, 4]) ui.get('#slide-exercise-options').children[index].click();
  ui.get('#slide-exercise-options').children.at(-1).click();
  assert.match(ui.get('#slide-exercise-feedback').textContent, /^✓ Richtig/);
});

test('a completed final code step returns to the next chapter', () => {
  const ui = presentation('chapter4');
  const buttons = ui.get('#slide-overview-list').querySelectorAll('.slide-thumbnail');
  buttons.at(-1).click();
  assert.match(ui.get('#slide-exercise-options').children[0].href, /exercise=1\.4\.3&returnChapter=chapter5&returnSlide=0/);
  ui.get('#next-slide').click();
  assert.match(ui.get('#slide-learning-progress').textContent, /Kapitel 1\.5/);
});
