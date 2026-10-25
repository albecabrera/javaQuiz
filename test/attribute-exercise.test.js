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

test('chapter 1.6.1 creates alex and calls sayWelcome', () => {
  const exercise = exercises.find(({ id }) => id === '1.6.1');
  assert.ok(exercise);
  assert.equal(exercise.expectedOutput, 'Hallo!\nWillkommen!');
  assert.match(exercise.starter, /Robot robin = new Robot\(\);[\s\S]*robin\.sayHello\(\);/);
  assert.match(exercise.solution, /Robot alex = new Robot\(\);[\s\S]*alex\.sayWelcome\(\);/);
});

test('chapter 1.6.2 creates ReadingRobot and calls giveTask in order', () => {
  const exercise = exercises.find(({ id }) => id === '1.6.2');
  assert.ok(exercise);
  assert.equal(exercise.expectedOutput, 'Hallo!\nIch kann helfen.\nIch kann lesen.');
  assert.match(exercise.solution, /class ReadingRobot[\s\S]*void giveTask\(\)[\s\S]*Robot robin = new Robot\(\);[\s\S]*robin\.giveTask\(\);[\s\S]*ReadingRobot bookworm = new ReadingRobot\(\);[\s\S]*bookworm\.giveTask\(\);/);
});

test('chapter 1.6.3 stores age and prints it through sayAge', () => {
  const exercise = exercises.find(({ id }) => id === '1.6.3');
  assert.ok(exercise);
  assert.equal(exercise.expectedOutput, 'Ich bin 1 Jahr alt.');
  assert.match(exercise.solution, /int age = 1;[\s\S]*void sayAge\(\)[\s\S]*Ich bin .* age .* Jahr alt\.[\s\S]*Robot robin = new Robot\(\);[\s\S]*robin\.sayAge\(\);/);
});
