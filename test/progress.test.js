const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(require.resolve('../progress.js'), 'utf8');

function page(saved) {
  const window = { localStorage: {
    getItem(key) { return saved.get(key) ?? null; },
    setItem(key, value) { saved.set(key, value); }
  } };
  vm.runInNewContext(source, { window });
  return window.devquizProgress;
}

test('chapter is complete only after reaching its final step and passing every assessment', () => {
  const saved = new Map();
  const learning = page(saved);
  const status = () => page(saved).status('chapter7', 1, ['1.7.1', '1.7.2', '1.7.3', 'bonus1.1']);
  assert.equal(status(), 'new');
  learning.markStep('chapter7', true);
  assert.equal(status(), 'started');
  learning.markQuestion('chapter7', 0);
  assert.equal(status(), 'started');
  for (const id of ['1.7.1', '1.7.2', '1.7.3']) learning.markExercise(id);
  assert.equal(status(), 'started');
  learning.markExercise('bonus1.1');
  assert.equal(status(), 'complete');
});

test('unavailable or malformed browser storage never claims completion', () => {
  const saved = new Map([['devquiz-learning-progress-v1', '{invalid']]);
  assert.equal(page(saved).status('chapter8', 0, ['1.8.1']), 'new');
  page(saved).markStep('chapter8', true);
  assert.equal(page(saved).status('chapter8', 0, ['1.8.1']), 'started');
});
