// Terminal interactiva: quiz de opciones y ejercicios Java reales.
const terminalBody = document.querySelector("#terminal-body");
const terminalOutput = document.querySelector("#terminal-output");
const terminalForm = document.querySelector("#terminal-form");
const terminalInput = document.querySelector("#terminal-input");
const terminalEditor = document.querySelector("#terminal-editor");
const progressBar = document.querySelector("#progress-bar");
const scoreBadge = document.querySelector("#score-badge");
const terminalProgress = document.querySelector("#terminal-progress");
const terminalMode = document.querySelector("#terminal-mode");

let currentQuestionIndex = 0;
let currentExerciseIndex = 0;
let score = 0;
let waitingForNext = false;
let waitingForCodeNext = false;
let mode = "quiz";
let typingTimer;

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
  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const options = currentQuestion.options
    .map((option, index) => `<span class="option-key">${String.fromCharCode(65 + index)}</span> ${escapeHtml(option)}`)
    .join("<br>");

  addLine(`<span class="comment">// pregunta ${questionNumber} de ${questions.length}</span>`, "terminal-line question-comment");
  addLine(`<span class="keyword">Question</span> q${questionNumber} = <span class="string">"${escapeHtml(currentQuestion.question)}"</span>;`, "terminal-line code-line");
  addLine(options, "terminal-line option-list");
  addLine(`<span class="hint">Escribí A, B, C o D. También podés escribir <strong>code</strong> para practicar Java.</span>`, "terminal-line hint-line");
  terminalInput.placeholder = "tu respuesta...";
  terminalInput.focus();
}

function printExercise() {
  const exercise = codeExercises[currentExerciseIndex];
  terminalMode.textContent = "CODE MODE";
  updateStatus();
  addLine(`<span class="comment">// ejercicio ${currentExerciseIndex + 1} de ${codeExercises.length}: ${escapeHtml(exercise.title)}</span>`, "terminal-line question-comment");
  addLine(`<span class="hint">${escapeHtml(exercise.prompt)}</span>`, "terminal-line hint-line");
  addLine("Editá el código y presioná Ctrl + Enter para ejecutar en el backend local.", "terminal-line muted-line");
  terminalEditor.value = exercise.starter;
  terminalInput.hidden = true;
  terminalEditor.hidden = false;
  terminalEditor.disabled = false;
  terminalEditor.focus();
}

async function bootTerminal() {
  terminalInput.disabled = true;
  await typeLine("$ java DevQuiz", "terminal-line command-line", 42);
  await wait(260);
  await typeLine("DevQuiz Terminal v1.0.0", "terminal-line brand-line", 28);
  addLine("Java fundamentals challenge loaded.", "terminal-line muted-line");
  addLine("Escribí code para ejercicios reales o quiz para volver al múltiple choice.", "terminal-line hint-line");
  await wait(240);
  addLine("────────────────────────────────────────────", "terminal-line divider-line");
  terminalInput.disabled = false;
  printQuestion();
}

function printCommand(value) {
  addLine(`<span class="prompt-user">student</span><span class="prompt-at">@</span><span class="prompt-host">devquiz</span><span class="prompt-path">:~$</span> ${escapeHtml(value)}`, "terminal-line command-line entered-command");
}

async function submitAnswer(value) {
  if (waitingForNext || !value.trim()) return;
  const answer = value.trim().toUpperCase();
  terminalInput.value = "";
  printCommand(value.trim());
  if (answer === "code") { switchToCode(); return; }
  if (answer === "help") { addLine("Comandos: code, quiz, help. En code mode: Ctrl + Enter ejecuta.", "terminal-line hint-line"); return; }
  if (!["A", "B", "C", "D"].includes(answer)) {
    addLine('<span class="error">error:</span> respuesta inválida. Usá A, B, C o D.', "terminal-line error-line");
    return;
  }

  terminalInput.disabled = true;
  const currentQuestion = questions[currentQuestionIndex];
  const selectedIndex = answer.charCodeAt(0) - 65;
  const isCorrect = selectedIndex === currentQuestion.correctAnswer;
  await wait(350);
  if (isCorrect) {
    score += 1;
    addLine('<span class="success">✓ BUILD SUCCESSFUL</span>', "terminal-line result-line");
    addLine(`<span class="success">Correcto.</span> ${escapeHtml(currentQuestion.explanation)}`, "terminal-line explanation-line");
  } else {
    addLine('<span class="error">✕ BUILD FAILED</span>', "terminal-line result-line");
    addLine(`<span class="error">Respuesta incorrecta.</span> La opción correcta era <strong>${String.fromCharCode(65 + currentQuestion.correctAnswer)}</strong>.`, "terminal-line explanation-line");
    addLine(escapeHtml(currentQuestion.explanation), "terminal-line explanation-line");
  }
  updateStatus();
  waitingForNext = true;
  terminalMode.textContent = currentQuestionIndex === questions.length - 1 ? "RESULTS" : "PRESS ENTER";
  await wait(450);
  addLine(`<span class="hint">${currentQuestionIndex === questions.length - 1 ? "Presioná Enter para ver tu resultado." : "Presioná Enter para continuar."}</span>`, "terminal-line hint-line");
  terminalInput.disabled = false;
  terminalInput.placeholder = "presioná Enter...";
  terminalInput.focus();
}

async function submitCode() {
  if (waitingForCodeNext || terminalEditor.disabled || !terminalEditor.value.trim()) return;
  const source = terminalEditor.value;
  printCommand("[código Java enviado]");
  addLine(`<pre class="source-line">${escapeHtml(source)}</pre>`, "terminal-line");
  terminalEditor.disabled = true;
  addLine("<span class=\"muted-line\">Compilando y ejecutando en el backend local...</span>", "terminal-line");

  try {
    const response = await fetch("/api/execute", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ source })
    });
    const payload = await response.json();
    if (payload.ok) {
      addLine("<span class=\"success\">✓ EXECUTION SUCCESSFUL</span>", "terminal-line result-line");
      addLine(`<span class="muted-line">stdout:</span>\n<pre class="output-line">${escapeHtml(payload.stdout || payload.output || "(sin salida)")}</pre>`, "terminal-line");
      if (payload.stderr) addLine(`<span class="muted-line">stderr:</span>\n<pre class="error-output">${escapeHtml(payload.stderr)}</pre>`, "terminal-line");
    } else {
      const error = payload.error || {};
      addLine(`<span class="error">✕ ${escapeHtml(error.type || "execution_error")}</span>`, "terminal-line result-line");
      addLine(escapeHtml(error.message || "No se pudo ejecutar el código."), "terminal-line error-line");
      if (error.stdout) addLine(`<span class="muted-line">stdout:</span>\n<pre class="output-line">${escapeHtml(error.stdout)}</pre>`, "terminal-line");
      if (error.stderr) addLine(`<span class="muted-line">stderr:</span>\n<pre class="error-output">${escapeHtml(error.stderr)}</pre>`, "terminal-line");
    }
  } catch (error) {
    addLine("<span class=\"error\">✕ backend_unavailable</span>", "terminal-line result-line");
    addLine("No se pudo conectar con el backend local. Verificá que npm start esté ejecutándose.", "terminal-line error-line");
  }

  waitingForCodeNext = true;
  terminalMode.textContent = currentExerciseIndex === codeExercises.length - 1 ? "CODE COMPLETE" : "PRESS ENTER";
  addLine(`<span class="hint">${currentExerciseIndex === codeExercises.length - 1 ? "Presioná Enter para volver al quiz." : "Presioná Enter para continuar al siguiente ejercicio."}</span>`, "terminal-line hint-line");
  terminalEditor.disabled = false;
  terminalEditor.focus();
}

function continueCode() {
  if (!waitingForCodeNext) return;
  waitingForCodeNext = false;
  if (currentExerciseIndex === codeExercises.length - 1) { switchToQuiz(); return; }
  currentExerciseIndex += 1;
  terminalOutput.appendChild(document.createElement("br"));
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
  terminalMode.textContent = "QUIZ MODE";
  updateStatus();
  await wait(180);
  printQuestion();
  terminalInput.disabled = false;
}

function switchToCode() {
  mode = "code";
  waitingForNext = false;
  terminalInput.disabled = true;
  terminalInput.hidden = true;
  terminalMode.textContent = "CODE MODE";
  addLine("<span class=\"keyword\">$ mode code</span>", "terminal-line command-line");
  printExercise();
}

function switchToQuiz() {
  mode = "quiz";
  waitingForCodeNext = false;
  terminalEditor.hidden = true;
  terminalEditor.disabled = true;
  terminalInput.hidden = false;
  terminalInput.disabled = false;
  terminalMode.textContent = "QUIZ MODE";
  addLine("<span class=\"keyword\">$ mode quiz</span>", "terminal-line command-line");
  updateStatus();
  printQuestion();
}

function showResults() {
  const percentage = Math.round((score / questions.length) * 100);
  terminalMode.textContent = "COMPLETE";
  terminalProgress.textContent = "DONE";
  addLine("<span class=\"success\">────────────────────────────────────────────</span>", "terminal-line divider-line");
  addLine("<span class=\"keyword\">$ echo $RESULT</span>", "terminal-line command-line");
  addLine("<span class=\"result-title\">QUIZ COMPLETADO</span>", "terminal-line result-title-line");
  addLine(`Score: <strong class="score-value">${score}/${questions.length}</strong> (${percentage}%)`, "terminal-line final-score-line");
  addLine(percentage >= 70 ? "<span class=\"success\">Nivel desbloqueado: Java Apprentice.</span>" : "<span class=\"hint\">Seguí practicando. Cada error es una nueva pista.</span>", "terminal-line");
  addLine("Escribí <strong>restart</strong> para volver a empezar.", "terminal-line hint-line");
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
  waitingForCodeNext = false;
  mode = "quiz";
  terminalOutput.innerHTML = "";
  terminalEditor.hidden = true;
  terminalEditor.disabled = true;
  terminalInput.hidden = false;
  terminalMode.textContent = "QUIZ MODE";
  terminalInput.value = "";
  updateStatus();
  bootTerminal();
}

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (mode === "code") {
    if (waitingForCodeNext) { continueCode(); return; }
    submitCode();
    return;
  }
  const value = terminalInput.value.trim();
  if (terminalMode.textContent === "COMPLETE" && value.toLowerCase() === "restart") { restartQuiz(); return; }
  if (waitingForNext && !value) { continueQuiz(); return; }
  submitAnswer(value);
});

terminalEditor.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.ctrlKey) {
    event.preventDefault();
    if (waitingForCodeNext) continueCode(); else submitCode();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === "r") { event.preventDefault(); restartQuiz(); }
});

terminalBody.addEventListener("click", () => (mode === "code" ? terminalEditor : terminalInput).focus());
updateStatus();
bootTerminal();
