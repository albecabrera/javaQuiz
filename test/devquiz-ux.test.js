const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const css = fs.readFileSync(require.resolve('../styles.css'), 'utf8');

test('DevQuiz uses the viewport width with readable code and feedback', () => {
  assert.match(css, /\.app-shell\.devquiz-started\s*\{[^}]*width:\s*calc\(100% - 2 \* var\(--quiz-gutter\)\)/);
  assert.match(css, /\.app-shell\.devquiz-started \.terminal-body\s*\{[^}]*max-height:\s*none/);
  assert.match(css, /\.app-shell\.devquiz-started \.terminal-line\s*\{[^}]*font-size:\s*clamp\(1rem,/);
  assert.match(css, /\.app-shell\.devquiz-started \.terminal-prompt\s*\{[^}]*width:\s*100%/);
  assert.match(css, /\.app-shell\.devquiz-started \.terminal-output \.terminal-line\s*\{[^}]*animation:/);
});

test('DevQuiz animated feedback preserves keyboard and reduced-motion access', () => {
  assert.match(css, /\.app-shell\.devquiz-started :focus-visible\s*\{[^}]*outline:/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[^}]*animation-duration:/);
  assert.match(css, /@media\s*\(max-width:\s*560px\)\s*\{[^}]*--quiz-gutter:/);
});
