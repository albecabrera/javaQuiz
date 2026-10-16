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
// El marcador se selecciona automáticamente al cargar el ejercicio.
const codeExercises = [
  {
    title: "Hello World",
    prompt: "Imprimí exactamente Hello World en la consola.",
    expectedOutput: "Hello World",
    starter: `public class Main {
  public static void main(String[] args) {
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Declarar una variable",
    prompt: "Declará una variable String llamada nombre con valor Ada e imprimila en la consola.",
    expectedOutput: "Ada",
    starter: `public class Main {
  public static void main(String[] args) {
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Concatenar texto",
    prompt: "Usá las variables nombre y edad para imprimir: Soy Ada y tengo 20 años.",
    expectedOutput: "Soy Ada y tengo 20 años.",
    starter: `public class Main {
  public static void main(String[] args) {
    String nombre = "Ada";
    int edad = 20;
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Suma simple",
    prompt: "Calculá e imprimí el resultado de sumar 7 + 5.",
    expectedOutput: "12",
    starter: `public class Main {
  public static void main(String[] args) {
    int resultado = 7 + 5;
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Imprimir otra línea",
    prompt: "Imprimí exactamente Aprendo Java usando System.out.println.",
    expectedOutput: "Aprendo Java",
    starter: `public class Main {
  public static void main(String[] args) {
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Variable entera",
    prompt: "Declará un int llamado edad con valor 18 e imprimilo.",
    expectedOutput: "18",
    starter: `public class Main {
  public static void main(String[] args) {
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Número decimal",
    prompt: "Declará un double llamado precio con valor 2.5 e imprimilo.",
    expectedOutput: "2.5",
    starter: `public class Main {
  public static void main(String[] args) {
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Valor booleano",
    prompt: "Declará un boolean llamado activo con valor true e imprimilo.",
    expectedOutput: "true",
    starter: `public class Main {
  public static void main(String[] args) {
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Un carácter",
    prompt: "Declará un char llamado inicial con valor 'J' e imprimilo.",
    expectedOutput: "J",
    starter: `public class Main {
  public static void main(String[] args) {
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Multiplicación",
    prompt: "Multiplicá 6 por 4 e imprimí el resultado.",
    expectedOutput: "24",
    starter: `public class Main {
  public static void main(String[] args) {
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Actualizar una variable",
    prompt: "Comenzá con puntos = 3, sumale 2 e imprimí el nuevo valor.",
    expectedOutput: "5",
    starter: `public class Main {
  public static void main(String[] args) {
    int puntos = 3;
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Comparar números",
    prompt: "Compará si 8 es mayor que 5 e imprimí el resultado booleano.",
    expectedOutput: "true",
    starter: `public class Main {
  public static void main(String[] args) {
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Condición if",
    prompt: "Si nota es mayor o igual a 6, imprimí Aprobado; si no, imprimí Reprobado.",
    expectedOutput: "Aprobado",
    starter: `public class Main {
  public static void main(String[] args) {
    int nota = 8;
    /* YOUR_CODE_HERE */
  }
}`
  },
  {
    title: "Bucle for",
    prompt: "Usá un for para imprimir los números del 1 al 3, uno por línea.",
    expectedOutput: "1\n2\n3",
    starter: `public class Main {
  public static void main(String[] args) {
    /* YOUR_CODE_HERE */
  }
}`
  }
];
