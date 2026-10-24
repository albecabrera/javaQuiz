const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const codeExercises = vm.runInNewContext(`${fs.readFileSync(require.resolve('../quiz.js'), 'utf8')}\ncodeExercises`);

test('Chapter 1.1 programming exercises match the presentation tasks', () => {
  assert.equal(codeExercises.length, 5);
  assert.deepEqual(Array.from(codeExercises, (exercise) => exercise.title), [
    'Mehrzeiliger Kommentar und Ausgabe', 'Eine Ausgabe mit println', 'Output Aufgabe 1', 'Syntaxfehler finden', 'Java Einstieg Variablen Aufgabe 1'
  ]);
  assert.ok(codeExercises.every((exercise) => exercise.starter.includes('/* DEIN_CODE_HIER */')));
  assert.ok(codeExercises.every((exercise) => typeof exercise.expectedOutput === 'string'));
  assert.equal(codeExercises[4].id, '1.3.1');
  assert.equal(codeExercises[4].expectedOutput, 'Willkommen Duke.');
});
