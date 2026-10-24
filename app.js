// Interaktives Terminal: Multiple-Choice-Quiz und echte Java-Übungen.
const terminalBody = document.querySelector("#terminal-body");
const terminalWindow = document.querySelector("#devquiz-terminal");
const terminalOutput = document.querySelector("#terminal-output");
const terminalForm = document.querySelector("#terminal-form");
const terminalInput = document.querySelector("#terminal-input");
const terminalEditor = document.querySelector("#terminal-editor");
const monacoContainer = document.querySelector("#monaco-editor");
const editorStatus = document.querySelector("#editor-status");
const skipExerciseButton = document.querySelector("#skip-exercise");
const nextExerciseButton = document.querySelector("#next-exercise");
const modeToggle = document.querySelector("#mode-toggle");
const editorPresentationToggle = document.querySelector("#editor-presentation-toggle");
const exerciseHintButton = document.querySelector("#exercise-hint");
const progressBar = document.querySelector("#progress-bar");
const scoreBadge = document.querySelector("#score-badge");
const terminalProgress = document.querySelector("#terminal-progress");
const terminalMode = document.querySelector("#terminal-mode");
const appShell = document.querySelector(".app-shell");
const entryPanel = document.querySelector(".entry-panel");
const startDevquizButton = document.querySelector("#start-devquiz");
const backToEntryButton = document.querySelector("#back-to-entry");
const devquizThemeToggle = document.querySelector("#devquiz-theme-toggle");
const presentationReturnLink = document.querySelector(".presentation-return-link");

function openDevquiz() {
  appShell?.classList?.add("devquiz-started");
  entryPanel?.setAttribute?.("aria-hidden", "true");
  terminalInput.focus();
}

function setDevquizTheme(light) {
  document.body?.classList?.toggle("devquiz-light", light);
  devquizThemeToggle.textContent = light ? "Dunkles Design" : "Helles Design";
  devquizThemeToggle.setAttribute?.("aria-pressed", String(light));
}

function toggleDevquizTheme() {
  setDevquizTheme(!document.body?.classList?.contains("devquiz-light"));
}

function returnToEntry() {
  appShell?.classList?.remove("devquiz-started");
  entryPanel?.setAttribute?.("aria-hidden", "false");
  startDevquizButton?.focus?.();
}

startDevquizButton.addEventListener("click", openDevquiz);
backToEntryButton.addEventListener("click", returnToEntry);

let currentQuestionIndex = 0;
let currentExerciseIndex = 0;
let score = 0;
let waitingForNext = false;
let codeRunning = false;
let hintIndex = 0;
let mode = "quiz";
let typingTimer;

if (typeof window.addEventListener === "function") {
  window.addEventListener("devquiz-editor-status", (event) => {
    if (editorStatus && event.detail) editorStatus.textContent = event.detail.text;
    if (editorStatus && event.detail && event.detail.state === "ready") editorStatus.className = "editor-status ready";
    if (editorStatus && event.detail && event.detail.state === "unavailable") editorStatus.className = "editor-status unavailable";
  });
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));

function addLine(content = "", className = "terminal-line") {
  const line = document.createElement("div");
  line.className = className;
  line.innerHTML = content;
  terminalOutput.appendChild(line);
  terminalBody.scrollTop = terminalBody.scrollHeight;
  return line;
}

async function typeLine(content, className = "terminal-line", speed = 18) {
  const line = addLine("", className);
  for (const character of content) {
    line.textContent += character;
    await wait(speed);
  }
  return line;
}

function updateStatus() {
  const total = mode === "code" ? codeExercises.length : questions.length;
  const current = mode === "code" ? currentExerciseIndex : currentQuestionIndex;
  terminalProgress.textContent = `${String(current + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  progressBar.style.width = `${((current + 1) / total) * 100}%`;
  scoreBadge.textContent = score;
}

function printQuestion() {
  terminalOutput.innerHTML = "";
  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const options = currentQuestion.options
    .map((option, index) => `<span class="option-key">${String.fromCharCode(65 + index)}</span> ${escapeHtml(option)}`)
    .join("<br>");

  addLine(`<span class="comment">// Frage ${questionNumber} von ${questions.length}</span>`, "terminal-line question-comment");
  addLine(`<span class="keyword">Frage</span> = <span class="string">"${escapeHtml(currentQuestion.question)}"</span>;`, "terminal-line code-line");
  addLine(`<span class="concept-line">Konzept: <strong>${escapeHtml(currentQuestion.concept)}</strong> · <a href="presentation.html?chapter=${encodeURIComponent(currentQuestion.presentationChapter)}">In der Präsentation wiederholen →</a></span>`, "terminal-line");
  addLine(options, "terminal-line option-list");
  addLine(`<span class="hint">Gib A, B, C oder D ein. Du kannst auch <strong>code</strong> für Java-Übungen eingeben.</span>`, "terminal-line hint-line");
  terminalInput.placeholder = "deine Antwort...";
  terminalInput.focus();
}

function adaptFallbackEditor(value) {
  const source = String(value ?? "");
  const longestLine = Math.max(1, ...source.split("\n").map((line) => line.length));
  const lineCount = Math.max(1, source.split("\n").length);
  const availableWidth = Math.max(320, terminalEditor.clientWidth || 900);
  const fontSize = Math.round(Math.max(18, Math.min(42, availableWidth / Math.max(1, longestLine * 0.62))));
  terminalEditor.style.fontSize = `${fontSize}px`;
  terminalEditor.style.lineHeight = "1.55";
  terminalEditor.style.minHeight = `${Math.min(680, Math.max(230, lineCount * fontSize * 1.55 + 36))}px`;
}

function printExercise() {
  terminalOutput.innerHTML = "";
  hintIndex = 0;
  exerciseHintButton.hidden = true;
  const exercise = codeExercises[currentExerciseIndex];
  terminalMode.textContent = "CODE-MODUS";
  editorPresentationToggle.hidden = false;
  updateStatus();
  addLine(`<span class="comment">// Übung ${currentExerciseIndex + 1} von ${codeExercises.length}: ${escapeHtml(exercise.title)}</span>`, "terminal-line question-comment");
  addLine(`<span class="hint">${escapeHtml(exercise.prompt)}</span>`, "terminal-line hint-line");
  addLine(`<span class="muted-line">Erwartete Ausgabe: ${escapeHtml(exercise.expectedOutput)}</span>`, "terminal-line expected-output-line");
  addLine("Enter führt aus · Umschalt + Enter fügt eine Zeile ein · nach Fehlern gibt es schrittweise Hinweise · Cmd + P führt den Editor vor.", "terminal-line muted-line");
  terminalEditor.value = exercise.starter;
  adaptFallbackEditor(terminalEditor.value);
  const answerMarker = "/* DEIN_CODE_HIER */";
  const answerPosition = exercise.starter.indexOf(answerMarker);
  if (typeof window.devquizEditor?.mount === "function") {
    const exerciseIndex = currentExerciseIndex;
    window.devquizEditor.mount(monacoContainer, exercise.starter, (value) => { terminalEditor.value = value; }, submitCode).then((editor) => {
      if (!editor || mode !== "code" || currentExerciseIndex !== exerciseIndex) return;
      terminalEditor.hidden = true;
      monacoContainer.hidden = false;
      window.devquizEditor.adaptTypography?.(editor.getValue?.() || exercise.starter);
      if (answerPosition >= 0) window.devquizEditor.selectRange(answerPosition, answerPosition + answerMarker.length);
      else window.devquizEditor.focus();
    });
  }
  if (answerPosition >= 0) {
    terminalEditor.selectionStart = answerPosition;
    terminalEditor.selectionEnd = answerPosition + answerMarker.length;
  } else {
    terminalEditor.selectionStart = terminalEditor.value.length;
    terminalEditor.selectionEnd = terminalEditor.value.length;
  }
  terminalInput.hidden = true;
  nextExerciseButton.hidden = true;
  nextExerciseButton.disabled = true;
  terminalEditor.hidden = Boolean(window.devquizEditor?.isMounted?.());
  monacoContainer.hidden = !window.devquizEditor?.isMounted?.();
  terminalEditor.disabled = false;
  skipExerciseButton.hidden = false;
  skipExerciseButton.disabled = false;
  if (window.devquizEditor?.isMounted?.()) window.devquizEditor.focus();
  else terminalEditor.focus();
}

async function bootTerminal() {
  terminalInput.disabled = true;
  await typeLine("$ java DevQuiz", "terminal-line command-line", 42);
  await wait(260);
  await typeLine("DevQuiz Terminal v1.0.0", "terminal-line brand-line", 28);
  addLine("Java-Grundlagen-Challenge geladen.", "terminal-line muted-line");
  addLine("<span class=\"keyword\">code</span> → echte Java-Übungen verfügbar:", "terminal-line hint-line");
  addLine(`${codeExercises.length} Übungen zu Kommentaren, Ausgabe und Syntax aus Kapitel 1.1.`, "terminal-line muted-line");
  addLine("Die Übungen öffnen sich automatisch. Mit dem Quiz-Button kannst du den Modus wechseln.", "terminal-line hint-line");
  await wait(240);
  addLine("────────────────────────────────────────────", "terminal-line divider-line");
  switchToCode();
}

function printCommand(value) {
  addLine(`<span class="prompt-user">lernende</span><span class="prompt-at">@</span><span class="prompt-host">devquiz</span><span class="prompt-path">:~$</span> ${escapeHtml(value)}`, "terminal-line command-line entered-command");
}

async function submitAnswer(value) {
  if (waitingForNext || !value.trim()) return;
  const answer = value.trim().toUpperCase();
  terminalInput.value = "";
  printCommand(value.trim());
  if (answer === "code") { switchToCode(); return; }
  if (answer === "help") { addLine("Befehle: code, help. Im Code-Modus führt Enter aus, Umschalt + Enter fügt eine Zeile ein, Cmd + P zeigt den Editor bildschirmfüllend, Esc schließt die Ansicht. Nach einem Fehler ist ein Hinweis verfügbar; Überspringen bleibt möglich.", "terminal-line hint-line"); return; }
  if (!["A", "B", "C", "D"].includes(answer)) {
    addLine('<span class="error">Fehler:</span> ungültige Antwort. Verwende A, B, C oder D.', "terminal-line error-line");
    return;
  }

  terminalInput.disabled = true;
  const currentQuestion = questions[currentQuestionIndex];
  const selectedIndex = answer.charCodeAt(0) - 65;
  const isCorrect = selectedIndex === currentQuestion.correctAnswer;
  await wait(350);
  if (isCorrect) {
    score += 1;
    addLine('<span class="success">✓ RICHTIG</span>', "terminal-line result-line");
    addLine(`<span class="success">Richtig.</span> ${escapeHtml(currentQuestion.explanation)}`, "terminal-line explanation-line");
    addLine(`<span class="concept-line">Merke: ${escapeHtml(currentQuestion.concept)}</span>`, "terminal-line");
  } else {
    addLine('<span class="error">✕ FALSCH</span>', "terminal-line result-line");
    addLine(`<span class="error">Falsche Antwort.</span> Richtig wäre <strong>${String.fromCharCode(65 + currentQuestion.correctAnswer)}</strong>.`, "terminal-line explanation-line");
    addLine(escapeHtml(currentQuestion.explanation), "terminal-line explanation-line");
    addLine(`<span class="concept-line">Merke: ${escapeHtml(currentQuestion.concept)}</span>`, "terminal-line");
  }
  updateStatus();
  waitingForNext = true;
  terminalMode.textContent = currentQuestionIndex === questions.length - 1 ? "ERGEBNIS" : "WEITER";
  await wait(450);
  addLine(`<span class="hint">${currentQuestionIndex === questions.length - 1 ? "Drücke Enter, um dein Ergebnis zu sehen." : "Drücke Enter, um fortzufahren."}</span>`, "terminal-line hint-line");
  terminalInput.disabled = false;
  terminalInput.placeholder = "Enter drücken...";
  terminalInput.focus();
}

async function submitCode() {
  if (codeRunning || terminalEditor.disabled || !terminalEditor.value.trim()) return;
  const source = window.devquizEditor?.getValue?.() || terminalEditor.value;
  const exercise = codeExercises[currentExerciseIndex];
  codeRunning = true;
  exerciseHintButton.hidden = true;
  printCommand("[Java-Code gesendet]");
  addLine(`<pre class="source-line">${escapeHtml(source)}</pre>`, "terminal-line");
  terminalEditor.disabled = true;
  window.devquizEditor?.setReadOnly?.(true);
  skipExerciseButton.disabled = true;
  addLine("<span class=\"muted-line\">Kompilierung und Ausführung im lokalen Backend…</span>", "terminal-line");

  let passed = false;
  let attempted = false;
  try {
    const response = await fetch("/api/execute", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ source })
    });
    const payload = await response.json();
    attempted = true;
    if (payload.ok) {
      const output = (payload.stdout ?? payload.output ?? "").replace(/\r\n/g, "\n").trimEnd();
      addLine(`<span class="muted-line">Ausgabe:</span>\n<pre class="output-line">${escapeHtml(output || "(keine Ausgabe)")}</pre>`, "terminal-line");
      if (payload.stderr) addLine(`<span class="muted-line">Fehlerausgabe:</span>\n<pre class="error-output">${escapeHtml(payload.stderr)}</pre>`, "terminal-line");
      passed = output === exercise.expectedOutput;
      addLine(passed ? '<span class="success">✓ Ergebnis richtig</span>' : '<span class="error">✕ Die Ausgabe stimmt nicht überein. Korrigiere deinen Code und versuche es erneut.</span>', "terminal-line result-line");
    } else {
      const error = payload.error || {};
      addLine(`<span class="error">✕ ${escapeHtml(error.type || "Ausführungsfehler")}</span>`, "terminal-line result-line");
      addLine(escapeHtml(error.message || "Der Code konnte nicht ausgeführt werden."), "terminal-line error-line");
      if (error.stdout) addLine(`<span class="muted-line">Ausgabe:</span>\n<pre class="output-line">${escapeHtml(error.stdout)}</pre>`, "terminal-line");
      if (error.stderr) addLine(`<span class="muted-line">Fehlerausgabe:</span>\n<pre class="error-output">${escapeHtml(error.stderr)}</pre>`, "terminal-line");
    }
  } catch {
    addLine("<span class=\"error\">✕ Backend nicht verfügbar</span>", "terminal-line result-line");
    addLine("Das lokale Backend ist nicht erreichbar. Prüfe, ob npm start ausgeführt wird.", "terminal-line error-line");
  } finally {
    codeRunning = false;
    if (!passed) {
      terminalEditor.disabled = false;
      window.devquizEditor?.setReadOnly?.(false);
      skipExerciseButton.disabled = false;
    }
  }

  if (passed) {
    exerciseHintButton.hidden = true;
    waitingForNext = true;
    nextExerciseButton.hidden = false;
    nextExerciseButton.disabled = false;
    const presentationReturnUrl = getPresentationReturnUrl();
    terminalMode.textContent = presentationReturnUrl ? "PRÄSENTATION" : (currentExerciseIndex === codeExercises.length - 1 ? "FERTIG" : "WEITER");
    nextExerciseButton.textContent = presentationReturnUrl ? "Zur Präsentation →" : "Weiter →";
    nextExerciseButton.focus();
  } else {
    exerciseHintButton.hidden = !attempted || hintIndex >= (exercise.hints?.length || 0);
    const presentationReturnUrl = getPresentationReturnUrl();
    if (presentationReturnUrl) {
      nextExerciseButton.hidden = false;
      nextExerciseButton.disabled = false;
      nextExerciseButton.textContent = "Zur Präsentation →";
    }
    if (window.devquizEditor?.isMounted?.()) window.devquizEditor.focus();
    else terminalEditor.focus();
  }
}

function advanceExercise(skipped = false) {
  if (codeRunning || mode !== "code") return;
  waitingForNext = false;
  nextExerciseButton.hidden = true;
  nextExerciseButton.disabled = true;
  if (skipped) addLine(`<span class="hint">Übung ${currentExerciseIndex + 1} übersprungen.</span>`, "terminal-line");
  const presentationReturnUrl = getPresentationReturnUrl();
  if (presentationReturnUrl) {
    window.location.href = presentationReturnUrl;
    return;
  }
  if (currentExerciseIndex === codeExercises.length - 1) {
    addLine('<span class="success">Alle Übungen abgeschlossen. Zurück zum Quiz.</span>', "terminal-line");
    switchToQuiz();
    return;
  }
  currentExerciseIndex += 1;
  addLine("", "terminal-line");
  printExercise();
}

async function continueQuiz() {
  if (!waitingForNext) return;
  waitingForNext = false;
  terminalInput.value = "";
  terminalInput.disabled = true;
  addLine("", "terminal-line");
  if (currentQuestionIndex === questions.length - 1) { showResults(); return; }
  currentQuestionIndex += 1;
  terminalMode.textContent = "QUIZ-MODUS";
  updateStatus();
  await wait(180);
  printQuestion();
  terminalInput.disabled = false;
  terminalInput.focus();
}

function getQueryParameter(name) {
  const search = window.location?.search || "";
  if (typeof URLSearchParams === "function") return new URLSearchParams(search).get(name);
  const match = search.match(new RegExp(`[?&]${name}=([^&]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function getPresentationReturnUrl() {
  const chapter = getQueryParameter("returnChapter");
  const slide = Number.parseInt(getQueryParameter("returnSlide"), 10);
  if (!chapter || !Number.isInteger(slide) || slide < 0) return null;
  return `presentation.html?chapter=${encodeURIComponent(chapter)}&slide=${slide}`;
}

function selectRequestedExercise() {
  const requestedId = getQueryParameter("exercise");
  const requestedIndex = codeExercises.findIndex((exercise) => exercise.id === requestedId);
  if (requestedIndex < 0) return false;
  currentExerciseIndex = requestedIndex;
  return true;
}

function switchToCode() {
  mode = "code";
  modeToggle.textContent = "Multiple-Choice-Quiz";
  waitingForNext = false;
  terminalInput.disabled = true;
  terminalInput.hidden = true;
  terminalMode.textContent = "CODE-MODUS";
  addLine("<span class=\"keyword\">$ modus code</span>", "terminal-line command-line");
  printExercise();
}

function setEditorPresentation(enabled) {
  if (mode !== "code" && enabled) return;
  appShell?.classList?.toggle("is-editor-presenting", enabled);
  editorPresentationToggle.textContent = enabled ? "Ansicht schließen" : "Editor vorführen ⛶";
  editorPresentationToggle.setAttribute?.("aria-pressed", String(enabled));
  if (enabled) terminalWindow.requestFullscreen?.()?.catch?.(() => {});
  else if (document.fullscreenElement === terminalWindow) document.exitFullscreen?.();
  window.devquizEditor?.adaptTypography?.();
  if (!window.devquizEditor?.isMounted?.()) adaptFallbackEditor(terminalEditor.value);
  if (enabled && window.devquizEditor?.isMounted?.()) window.devquizEditor.focus();
  else if (enabled) terminalEditor.focus();
}

function switchToQuiz() {
  setEditorPresentation(false);
  editorPresentationToggle.hidden = true;
  exerciseHintButton.hidden = true;
  mode = "quiz";
  modeToggle.textContent = "Code-Übungen";
  skipExerciseButton.hidden = true;
  nextExerciseButton.hidden = true;
  nextExerciseButton.disabled = true;
  terminalEditor.hidden = true;
  terminalEditor.disabled = true;
  monacoContainer.hidden = true;
  terminalInput.hidden = false;
  terminalInput.disabled = false;
  terminalMode.textContent = "QUIZ-MODUS";
  addLine("<span class=\"keyword\">$ modus quiz</span>", "terminal-line command-line");
  updateStatus();
  printQuestion();
}

function showResults() {
  const percentage = Math.round((score / questions.length) * 100);
  terminalMode.textContent = "FERTIG";
  terminalProgress.textContent = "FERTIG";
  addLine("<span class=\"success\">────────────────────────────────────────────</span>", "terminal-line divider-line");
  addLine("<span class=\"keyword\">$ echo $RESULT</span>", "terminal-line command-line");
  addLine("<span class=\"result-title\">QUIZ ABGESCHLOSSEN</span>", "terminal-line result-title-line");
  addLine(`Punktzahl: <strong class="score-value">${score}/${questions.length}</strong> (${percentage}%)`, "terminal-line final-score-line");
  addLine(percentage >= 70 ? "<span class=\"success\">Level freigeschaltet: Java Apprentice.</span>" : "<span class=\"hint\">Übe weiter. Jeder Fehler ist ein neuer Hinweis.</span>", "terminal-line");
  addLine("Gib <strong>restart</strong> ein, um neu zu starten.", "terminal-line hint-line");
  terminalInput.disabled = false;
  terminalInput.placeholder = "restart...";
  terminalInput.focus();
}

function restartQuiz() {
  window.clearTimeout(typingTimer);
  currentQuestionIndex = 0;
  currentExerciseIndex = 0;
  score = 0;
  waitingForNext = false;
  codeRunning = false;
  mode = "quiz";
  appShell?.classList?.remove("is-editor-presenting");
  editorPresentationToggle.hidden = true;
  exerciseHintButton.hidden = true;
  terminalOutput.innerHTML = "";
  terminalEditor.hidden = true;
  terminalEditor.disabled = true;
  monacoContainer.hidden = true;
  skipExerciseButton.hidden = true;
  nextExerciseButton.hidden = true;
  nextExerciseButton.disabled = true;
  terminalInput.hidden = false;
  terminalMode.textContent = "QUIZ-MODUS";
  terminalInput.value = "";
  updateStatus();
  bootTerminal();
}

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (mode === "code") { submitCode(); return; }
  const value = terminalInput.value.trim();
  if (terminalMode.textContent === "FERTIG" && value.toLowerCase() === "restart") { restartQuiz(); return; }
  if (waitingForNext && !value) { continueQuiz(); return; }
  submitAnswer(value);
});

terminalEditor.addEventListener("input", () => adaptFallbackEditor(terminalEditor.value));
terminalEditor.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    submitCode();
  }
});
skipExerciseButton.addEventListener("click", () => advanceExercise(true));
nextExerciseButton.addEventListener("click", () => advanceExercise());
modeToggle.addEventListener("click", () => {
  if (codeRunning) return;
  if (mode === "code") switchToQuiz(); else switchToCode();
});

exerciseHintButton.addEventListener("click", () => {
  if (mode !== "code" || codeRunning || exerciseHintButton.hidden) return;
  const hints = codeExercises[currentExerciseIndex].hints || [];
  if (hintIndex >= hints.length) return;
  addLine(`<span class="hint">Hinweis ${hintIndex + 1} von ${hints.length}: ${escapeHtml(hints[hintIndex])}</span>`, "terminal-line exercise-hint-line");
  hintIndex += 1;
  exerciseHintButton.hidden = true;
  if (window.devquizEditor?.isMounted?.()) window.devquizEditor.focus();
  else terminalEditor.focus();
});
devquizThemeToggle.addEventListener("click", toggleDevquizTheme);
editorPresentationToggle.addEventListener("click", () => setEditorPresentation(!appShell?.classList?.contains("is-editor-presenting")));
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && appShell?.classList?.contains("is-editor-presenting")) setEditorPresentation(false);
});
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === "r") { event.preventDefault(); restartQuiz(); }
  if (event.metaKey && event.shiftKey && !event.ctrlKey && !event.altKey && event.key.toLowerCase() === "l") {
    event.preventDefault();
    event.stopPropagation?.();
    toggleDevquizTheme();
  }
  if (mode === "code" && event.metaKey && !event.ctrlKey && !event.altKey && event.key.toLowerCase() === "p") {
    event.preventDefault();
    event.stopPropagation?.();
    setEditorPresentation(!appShell?.classList?.contains("is-editor-presenting"));
  } else if (event.key === "Escape" && appShell?.classList?.contains("is-editor-presenting")) {
    event.preventDefault();
    setEditorPresentation(false);
  }
}, true);

terminalBody.addEventListener("click", (event) => {
  if (event.target !== terminalBody) return;
  if (mode === "code" && window.devquizEditor?.isMounted?.()) window.devquizEditor.focus();
  else (mode === "code" ? terminalEditor : terminalInput).focus();
});
selectRequestedExercise();
if (presentationReturnLink) presentationReturnLink.href = getPresentationReturnUrl() || "presentation.html";
updateStatus();
bootTerminal();
if (window.location?.hash === "#devquiz-terminal" || getQueryParameter("exercise")) openDevquiz();
