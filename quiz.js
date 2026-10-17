// Java-Grundlagen-Fragen und Übungen für DevQuiz.
const questions = [
  {
    question: "Was ist der Einstiegspunkt einer Java-Anwendung?",
    options: ["start()", "main()", "run()", "init()"],
    correctAnswer: 1,
    explanation: "Die Methode public static void main(String[] args) ist der Einstiegspunkt einer Java-Anwendung."
  },
  {
    question: "Welcher Datentyp speichert ganze Zahlen?",
    options: ["String", "boolean", "int", "double"],
    correctAnswer: 2,
    explanation: "int steht für ganze Zahlen wie 10, 0 oder -25."
  },
  {
    question: "Wie wird eine Konstante in Java deklariert?",
    options: ["const", "static", "final", "constant"],
    correctAnswer: 2,
    explanation: "Das Schlüsselwort final verhindert, dass eine Variable nach der Initialisierung ihren Wert ändert."
  },
  {
    question: "Welches Symbol beendet eine Anweisung in Java?",
    options: [".", ":", ";", "!"],
    correctAnswer: 2,
    explanation: "Die meisten Java-Anweisungen enden mit einem Semikolon (;)."
  },
  {
    question: "Welches Schlüsselwort wird verwendet, um ein Objekt zu erzeugen?",
    options: ["object", "new", "create", "this"],
    correctAnswer: 1,
    explanation: "new reserviert Speicher und erzeugt eine neue Instanz einer Klasse."
  },
  {
    question: "Welcher dieser Typen speichert Text?",
    options: ["char", "String", "text", "Wort"],
    correctAnswer: 1,
    explanation: "String ist die Java-Klasse für eine Folge von Zeichen."
  },
  {
    question: "Welcher Operator vergleicht, ob zwei Werte gleich sind?",
    options: ["=", "==", "===", "equals"],
    correctAnswer: 1,
    explanation: "Der Operator == vergleicht primitive Werte. Für den Inhalt von Objekten wird meist equals() verwendet."
  },
  {
    question: "Welche Struktur wiederholt Code, solange eine Bedingung wahr ist?",
    options: ["if", "switch", "while", "try"],
    correctAnswer: 2,
    explanation: "while wiederholt einen Codeblock, solange seine Bedingung true ist."
  },
  {
    question: "Was bedeutet es, dass Java objektorientiert ist?",
    options: ["Verwendet nur Funktionen", "Organisiert Code mit Klassen und Objekten", "Verwendet keine Variablen", "Funktioniert nur im Internet"],
    correctAnswer: 1,
    explanation: "Objektorientierte Programmierung organisiert Code mit Klassen, Objekten, Attributen und Methoden."
  },
  {
    question: "Welches Schlüsselwort lässt eine Klasse von einer anderen erben?",
    options: ["inherits", "extends", "implements", "super"],
    correctAnswer: 1,
    explanation: "extends bedeutet, dass eine Klasse Attribute und Methoden von einer anderen Klasse erbt."
  }
];

// Lokale Übungen: Das Backend kompiliert und startet sie als Main.java.
// Der Marker wird beim Laden der Übung automatisch ausgewählt.
const codeExercises = [
  {
    title: "Hallo Welt",
    prompt: "Gib exakt Hallo Welt in der Konsole aus.",
    expectedOutput: "Hallo Welt",
    starter: `public class Main {
  public static void main(String[] args) {
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "Eine Variable deklarieren",
    prompt: "Deklariere eine String-Variable namens name mit dem Wert Ada und gib sie in der Konsole aus.",
    expectedOutput: "Ada",
    starter: `public class Main {
  public static void main(String[] args) {
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "Text verketten",
    prompt: "Verwende die Variablen name und alter und gib aus: Ich bin Ada und 20 Jahre alt.",
    expectedOutput: "Ich bin Ada und 20 Jahre alt.",
    starter: `public class Main {
  public static void main(String[] args) {
    String name = "Ada";
    int alter = 20;
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "Einfache Addition",
    prompt: "Berechne und gib das Ergebnis von 7 + 5 aus.",
    expectedOutput: "12",
    starter: `public class Main {
  public static void main(String[] args) {
    int ergebnis = 7 + 5;
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "Eine weitere Zeile ausgeben",
    prompt: "Gib exakt Ich lerne Java mit System.out.println aus.",
    expectedOutput: "Ich lerne Java",
    starter: `public class Main {
  public static void main(String[] args) {
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "Ganzzahlige Variable",
    prompt: "Deklariere einen int namens alter mit dem Wert 18 und gib ihn aus.",
    expectedOutput: "18",
    starter: `public class Main {
  public static void main(String[] args) {
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "Dezimalzahl",
    prompt: "Deklariere einen double namens preis mit dem Wert 2.5 und gib ihn aus.",
    expectedOutput: "2.5",
    starter: `public class Main {
  public static void main(String[] args) {
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "Boolescher Wert",
    prompt: "Deklariere einen boolean namens aktiv mit dem Wert true und gib ihn aus.",
    expectedOutput: "true",
    starter: `public class Main {
  public static void main(String[] args) {
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "Ein Zeichen",
    prompt: "Deklariere ein char namens anfangsbuchstabe mit dem Wert 'J' und gib es aus.",
    expectedOutput: "J",
    starter: `public class Main {
  public static void main(String[] args) {
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "Multiplikation",
    prompt: "Multipliziere 6 mit 4 und gib das Ergebnis aus.",
    expectedOutput: "24",
    starter: `public class Main {
  public static void main(String[] args) {
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "Eine Variable aktualisieren",
    prompt: "Starte mit punkte = 3, addiere 2 und gib den neuen Wert aus.",
    expectedOutput: "5",
    starter: `public class Main {
  public static void main(String[] args) {
    int punkte = 3;
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "Zahlen vergleichen",
    prompt: "Vergleiche, ob 8 größer als 5 ist, und gib den booleschen Wert aus.",
    expectedOutput: "true",
    starter: `public class Main {
  public static void main(String[] args) {
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "If-Bedingung",
    prompt: "Gib Bestanden aus, wenn note größer oder gleich 6 ist, sonst Nicht bestanden.",
    expectedOutput: "Bestanden",
    starter: `public class Main {
  public static void main(String[] args) {
    int note = 8;
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    title: "For-Schleife",
    prompt: "Verwende eine for-Schleife, um die Zahlen von 1 bis 3 jeweils in einer Zeile auszugeben.",
    expectedOutput: "1\n2\n3",
    starter: `public class Main {
  public static void main(String[] args) {
    /* DEIN_CODE_HIER */
  }
}`
  }
];
