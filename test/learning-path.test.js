const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(require.resolve('../presentation.js'), 'utf8');
const data = source.slice(0, source.indexOf('let currentChapterId'));
const curriculum = vm.runInNewContext(`${data}\n({ chapters, chapterSteps, chapterTaskMap, chapterExercises })`);
curriculum.chapters.chapter4.slides = curriculum.chapters.chapter3.slides.splice(9);
const codeExercises = vm.runInNewContext(`${fs.readFileSync(require.resolve('../quiz.js'), 'utf8')}\ncodeExercises`);

test('each chapter puts its lessons before one copy of each question and coding task', () => {
  for (const chapterId of ['chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5']) {
    const steps = curriculum.chapterSteps(chapterId);
    const kinds = Array.from(steps, (step) => step.kind);
    const lessonCount = kinds.filter((kind) => kind === 'lesson').length;
    const questionCount = (curriculum.chapterExercises[chapterId] || []).filter((exercise) => exercise.type !== 'task').length;
    const tasks = curriculum.chapterTaskMap[chapterId] || [];
    assert.deepEqual(kinds, [
      ...Array(lessonCount).fill('lesson'),
      ...Array(questionCount).fill('question'),
      ...Array(tasks.length).fill('code')
    ]);
    assert.deepEqual(Array.from(steps.filter((step) => step.kind === 'code'), (step) => step.exerciseId),
      Array.from(tasks, (task) => task.id));
    for (const task of tasks) {
      assert.ok(codeExercises.some((exercise) => exercise.id === task.id && exercise.chapter === chapterId));
    }
  }
});

test('the landing page and presentation use viewport width at phone, tablet and laptop breakpoints', () => {
  const css = fs.readFileSync(require.resolve('../styles.css'), 'utf8');
  assert.match(css, /\.app-shell\s*\{[^}]*width:\s*calc\(100% - 2 \* clamp\(/);
  assert.match(css, /\.presentation-shell\s*\{[^}]*width:\s*100%;[^}]*max-width:\s*none/);
  assert.match(css, /@media \(min-width: 561px\) and \(max-width: 1024px\)/);
  assert.match(css, /@media \(max-width: 560px\)[^\n]*\.presentation-layout \{ grid-template-columns: 1fr; \}/);
  assert.match(css, /\.slide-overview \{ order: -1; max-height: 35svh; overflow-y: auto; \}/);
});

test('the final step of a chapter comes before the next chapter', () => {
  const chapter = curriculum.chapterSteps('chapter3');
  assert.equal(chapter.at(-1).kind, 'code');
  assert.equal(chapter.at(-1).exerciseId, '1.3.1');
  assert.equal(curriculum.chapterSteps('chapter4')[0].kind, 'lesson');
});
