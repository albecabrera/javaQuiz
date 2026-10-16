// Controla el estado, la interacción y la presentación del quiz.
const questionCounter = document.querySelector("#question-counter");
const scoreBadge = document.querySelector("#score-badge");
const progressBar = document.querySelector("#progress-bar");
const questionText = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const feedbackTitle = document.querySelector("#feedback-title");
const feedbackText = document.querySelector("#feedback-text");
const nextButton = document.querySelector("#next-button");
const quizView = document.querySelector("#quiz-view");
const resultsView = document.querySelector("#results-view");
const finalScore = document.querySelector("#final-score");
const resultsMessage = document.querySelector("#results-message");
const restartButton = document.querySelector("#restart-button");

let currentQuestionIndex = 0;
let score = 0;

// Muestra la pregunta actual y reinicia los elementos de feedback.
function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const progress = (questionNumber / questions.length) * 100;

  questionCounter.textContent = `Pregunta ${questionNumber} de ${questions.length}`;
  progressBar.style.width = `${progress}%`;
  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";
  feedback.hidden = true;
  nextButton.hidden = true;

  currentQuestion.options.forEach((option, optionIndex) => {
    const answerButton = document.createElement("button");
    answerButton.className = "answer-button";
    answerButton.type = "button";
    answerButton.textContent = `${String.fromCharCode(65 + optionIndex)}. ${option}`;
    answerButton.addEventListener("click", () => selectAnswer(optionIndex));
    answersContainer.appendChild(answerButton);
  });
}

// Comprueba la respuesta, muestra los colores y explica la solución.
function selectAnswer(selectedAnswerIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const answerButtons = answersContainer.querySelectorAll(".answer-button");
  const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswer;

  answerButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === currentQuestion.correctAnswer) {
      button.classList.add("correct");
    }

    if (!isCorrect && index === selectedAnswerIndex) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score += 1;
    feedbackTitle.textContent = "¡Correcto!";
  } else {
    feedbackTitle.textContent = "No es correcto";
  }

  scoreBadge.textContent = `${score} ${score === 1 ? "punto" : "puntos"}`;
  feedbackText.textContent = currentQuestion.explanation;
  feedback.hidden = false;
  nextButton.textContent = currentQuestionIndex === questions.length - 1
    ? "Ver resultado"
    : "Siguiente pregunta";
  nextButton.hidden = false;
}

// Avanza o muestra la pantalla final cuando se responde la última pregunta.
function goToNextQuestion() {
  if (currentQuestionIndex === questions.length - 1) {
    showResults();
    return;
  }

  currentQuestionIndex += 1;
  renderQuestion();
}

// Presenta la puntuación final y un mensaje acorde al resultado.
function showResults() {
  quizView.hidden = true;
  resultsView.hidden = false;
  progressBar.style.width = "100%";
  questionCounter.textContent = "Quiz completado";
  finalScore.textContent = `${score} de ${questions.length} respuestas correctas`;

  if (score === questions.length) {
    resultsMessage.textContent = "¡Excelente! Dominás los fundamentos de Java.";
  } else if (score >= questions.length / 2) {
    resultsMessage.textContent = "¡Muy bien! Seguí practicando para afianzar tus conocimientos.";
  } else {
    resultsMessage.textContent = "Cada intento suma. Repasá los conceptos y volvé a probar.";
  }
}

// Reinicia el estado completo para jugar nuevamente.
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreBadge.textContent = "0 puntos";
  quizView.hidden = false;
  resultsView.hidden = true;
  renderQuestion();
}

nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Inicia el quiz al cargar la página.
renderQuestion();
