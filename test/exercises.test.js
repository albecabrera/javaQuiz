const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const codeExercises = vm.runInNewContext(`${fs.readFileSync(require.resolve('../quiz.js'), 'utf8')}\ncodeExercises`);

test('ten additional exercises progress from output to variables, conditions and loops', () => {
  assert.equal(codeExercises.length, 14);
  assert.deepEqual(Array.from(codeExercises.slice(0, 4), (exercise) => exercise.title), [
    'Hello World', 'Declarar una variable', 'Concatenar texto', 'Suma simple'
  ]);
  assert.ok(codeExercises.every((exercise) => exercise.starter.includes('/* YOUR_CODE_HERE */')));
  assert.ok(codeExercises.every((exercise) => typeof exercise.expectedOutput === 'string'));
});
