// Browser-local learning evidence shared by the presentation and DevQuiz.
(function () {
  const key = "devquiz-learning-progress-v1";

  function read() {
    try {
      const value = JSON.parse(window.localStorage.getItem(key) || "{}");
      if (!value || typeof value !== "object" || Array.isArray(value)) return {};
      const entries = (items) => Array.isArray(items) ? items.filter((item) => typeof item === "string") : [];
      return {
        started: entries(value.started),
        finished: entries(value.finished),
        questions: entries(value.questions),
        exercises: entries(value.exercises)
      };
    } catch { return {}; }
  }

  function record(field, value) {
    const data = read();
    data[field] ||= [];
    if (!data[field].includes(value)) data[field].push(value);
    try { window.localStorage.setItem(key, JSON.stringify(data)); } catch {}
  }

  function status(chapter, questionCount, exerciseIds) {
    const data = read();
    const has = (field, value) => (data[field] || []).includes(value);
    if (has("finished", chapter)
      && Array.from({ length: questionCount }, (_, index) => index).every((index) => has("questions", `${chapter}:${index}`))
      && exerciseIds.every((id) => has("exercises", id))) return "complete";
    if (has("started", chapter) || has("finished", chapter)
      || (data.questions || []).some((item) => item.startsWith(`${chapter}:`))
      || exerciseIds.some((id) => has("exercises", id))) return "started";
    return "new";
  }

  window.devquizProgress = {
    markStep(chapter, last) { record("started", chapter); if (last) record("finished", chapter); },
    markQuestion(chapter, index) { record("questions", `${chapter}:${index}`); },
    markExercise(id) { record("exercises", id); },
    status
  };
}());
