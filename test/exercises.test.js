const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const codeExercises = vm.runInNewContext(`${fs.readFileSync(require.resolve('../quiz.js'), 'utf8')}\ncodeExercises`);

test('ten additional exercises progress from output to variables, conditions and loops', () => {
  assert.equal(codeExercises.length, 14);
  assert.deepEqual(Array.from(codeExercises.slice(0, 4), (exercise) => exercise.title), [
    'Hallo Welt', 'Eine Variable deklarieren', 'Text verketten', 'Einfache Addition'
  ]);
  assert.ok(codeExercises.every((exercise) => exercise.starter.includes('/* DEIN_CODE_HIER */')));
  assert.ok(codeExercises.every((exercise) => typeof exercise.expectedOutput === 'string'));
});
