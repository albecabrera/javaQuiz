const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = (file) => fs.readFileSync(require.resolve(`../${file}`), 'utf8');

test('the learner-facing quiz is German while Java syntax remains intact', () => {
  const html = read('index.html');
  const quiz = read('quiz.js');
  const app = read('app.js');
  const readme = read('README.md');

  assert.match(html, /<html lang="de">/);
  assert.match(html, />Weiter →</);
  assert.match(html, />Übung überspringen →</);
  assert.match(html, /Gib deine Antwort ein/);
  assert.match(quiz, /Hallo Welt/);
  assert.match(quiz, /System\.out\.println/);
  assert.doesNotMatch(quiz, /Declarar|Imprimí|¿Cuál|YOUR_CODE_HERE/);
  assert.match(app, /Erwartete Ausgabe/);
  assert.match(app, /Ergebnis richtig/);
  assert.match(readme, /Die Ausgabe oder Fehlermeldung bleibt im Terminal sichtbar/);
});
