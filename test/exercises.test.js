const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const codeExercises = vm.runInNewContext(`${fs.readFileSync(require.resolve('../quiz.js'), 'utf8')}\ncodeExercises`);

test('Chapter 1.1 programming exercises match the presentation tasks', () => {
  assert.equal(codeExercises.length, 12)
  assert.deepEqual(Array.from(codeExercises, (exercise) => exercise.title), [
    'Mehrzeiliger Kommentar und Ausgabe', 'Eine Ausgabe mit println', 'Output Aufgabe 1', 'Syntaxfehler finden', 'Java Einstieg Variablen Aufgabe 1', 'Java Einstieg Variablen Aufgabe 2', 'Java Einstieg Variablen Aufgabe 3', 'Java Einstieg Variablen Aufgabe 4', 'Java Einstieg Attribute Aufgabe 1', 'Java Einstieg Attribute Aufgabe 2', 'Java Einstieg Methoden Aufgabe 1', 'Java Einstieg Methoden Aufgabe 2', 'Java Einstieg Methoden Aufgabe 3'
  ]);
  assert.ok(codeExercises.every((exercise) => exercise.starter.includes('/* DEIN_CODE_HIER */')));
  assert.ok(codeExercises.every((exercise) => typeof exercise.expectedOutput === 'string'));
  assert.equal(codeExercises[4].id, '1.3.1');
  assert.equal(codeExercises[4].expectedOutput, 'Willkommen Duke.');
  assert.equal(codeExercises[5].id, '1.4.1');
  assert.equal(codeExercises[5].expectedOutput, '');
  assert.equal(codeExercises[6].id, '1.4.2');
  assert.equal(codeExercises[6].expectedOutput, '121');
  assert.equal(codeExercises[7].id, '1.4.3');
  assert.equal(codeExercises[7].expectedOutput, '12\nRobin hat insgesamt eine Laufzeit von: 12 Stunden');
  assert.equal(codeExercises[8].id, '1.5.1');
  assert.equal(codeExercises[8].expectedOutput, 'Unbenannt\nRobin');
  assert.equal(codeExercises[9].id, '1.5.2');
  assert.equal(codeExercises[9].expectedOutput, 'Paco finden.');
  assert.equal(codeExercises[10].id, '1.6.1');
  assert.equal(codeExercises[10].expectedOutput, 'Hallo!\nWillkommen!');
  assert.equal(codeExercises[11].id, '1.6.2');
  assert.equal(codeExercises[11].expectedOutput, 'Hallo!\nIch kann helfen.\nIch kann lesen.');
});
