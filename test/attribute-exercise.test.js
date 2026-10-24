const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const exercises = vm.runInNewContext(`${fs.readFileSync(require.resolve('../quiz.js'), 'utf8')}\ncodeExercises`);

test('chapter 1.5.1 prints the default name before changing the robot name to Robin', () => {
  const exercise = exercises.find(({ id }) => id === '1.5.1');
  assert.ok(exercise);
  assert.equal(exercise.chapter, 'chapter5');
  assert.equal(exercise.title, 'Java Einstieg Attribute Aufgabe 1');
  assert.equal(exercise.expectedOutput, 'Unbenannt\nRobin');
  assert.match(exercise.starter, /Robot robin = new Robot\(\);[\s\S]*\/\* DEIN_CODE_HIER \*\//);
  assert.match(exercise.starter, /class Robot \{\s*String name = "Unbenannt";/);
  assert.match(exercise.solution, /Robot robin = new Robot\(\);\s*System\.out\.println\(robin\.name\);\s*robin\.name = "Robin";\s*System\.out\.println\(robin\.name\);/);
  assert.match(exercise.solution, /class Robot \{\s*String name = "Unbenannt";/);
});

test('chapter 1.5.2 assigns and prints a Robot task attribute', () => {
  const exercise = exercises.find(({ id }) => id === '1.5.2');
  assert.ok(exercise);
  assert.equal(exercise.expectedOutput, 'Paco finden.');
  assert.match(exercise.starter, /String task;/);
  assert.match(exercise.solution, /String task;[\s\S]*Robot robin = new Robot\(\);[\s\S]*robin\.task = "Paco finden\.";[\s\S]*System\.out\.println\(robin\.task\);/);
});
