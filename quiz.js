// Banco de preguntas de Java básico para DevQuiz.
const questions = [
  {
    question: "¿Cuál es el punto de entrada de una aplicación Java?",
    options: ["start()", "main()", "run()", "init()"],
    correctAnswer: 1,
    explanation: "El método public static void main(String[] args) es el punto de entrada de una aplicación Java."
  },
  {
    question: "¿Qué tipo de dato se usa para almacenar números enteros?",
    options: ["String", "boolean", "int", "double"],
    correctAnswer: 2,
    explanation: "int representa números enteros, como 10, 0 o -25."
  },
  {
    question: "¿Cómo se declara una constante en Java?",
    options: ["const", "static", "final", "constant"],
    correctAnswer: 2,
    explanation: "La palabra clave final impide que una variable cambie su valor después de ser inicializada."
  },
  {
    question: "¿Qué símbolo se utiliza para terminar una instrucción en Java?",
    options: [".", ":", ";", "!"],
    correctAnswer: 2,
    explanation: "La mayoría de las instrucciones Java terminan con un punto y coma (;)."
  },
  {
    question: "¿Qué palabra clave se usa para crear un objeto?",
    options: ["object", "new", "create", "this"],
    correctAnswer: 1,
    explanation: "new reserva memoria y crea una nueva instancia de una clase."
  },
  {
    question: "¿Cuál de estos tipos almacena texto?",
    options: ["char", "String", "text", "word"],
    correctAnswer: 1,
    explanation: "String es la clase de Java utilizada para representar una secuencia de caracteres."
  },
  {
    question: "¿Qué operador se usa para comparar si dos valores son iguales?",
    options: ["=", "==", "===", "equals"],
    correctAnswer: 1,
    explanation: "El operador == compara valores primitivos. Para comparar el contenido de objetos suele usarse equals()."
  },
  {
    question: "¿Qué estructura se utiliza para repetir código mientras una condición sea verdadera?",
    options: ["if", "switch", "while", "try"],
    correctAnswer: 2,
    explanation: "while repite un bloque de código mientras su condición sea true."
  },
  {
    question: "¿Qué significa que Java es un lenguaje orientado a objetos?",
    options: ["Solo usa funciones", "Organiza el código con clases y objetos", "No usa variables", "Solo funciona en internet"],
    correctAnswer: 1,
    explanation: "La programación orientada a objetos organiza el código alrededor de clases, objetos, atributos y métodos."
  },
  {
    question: "¿Qué palabra clave permite que una clase herede de otra?",
    options: ["inherits", "extends", "implements", "super"],
    correctAnswer: 1,
    explanation: "extends indica que una clase hereda atributos y métodos de otra clase."
  }
];

// Ejercicios locales: el backend los compila y ejecuta como Main.java.
const codeExercises = [
  {
    title: "Hola, Java",
    prompt: "Escribí un programa que imprima exactamente Hola, Java.",
    starter: `public class Main {
  public static void main(String[] args) {
    // Escribí tu solución acá.
  }
}`
  },
  {
    title: "Suma simple",
    prompt: "Completá el programa para imprimir la suma de 7 + 5.",
    starter: `public class Main {
  public static void main(String[] args) {
    int resultado = 7 + 5;
    System.out.println(resultado);
  }
}`
  }
];
