// Java-Grundlagen-Fragen und Übungen für DevQuiz.
const questions = [
  {
    question: "Was ist der Einstiegspunkt einer Java-Anwendung?",
    options: ["start()", "main()", "run()", "init()"],
    correctAnswer: 1,
    explanation: "Die Methode public static void main(String[] args) ist der Einstiegspunkt einer Java-Anwendung.",
    concept: "main() als Startpunkt",
    presentationChapter: "chapter1"
  },
  {
    question: "Welcher Datentyp speichert ganze Zahlen?",
    options: ["String", "boolean", "int", "double"],
    correctAnswer: 2,
    explanation: "int steht für ganze Zahlen wie 10, 0 oder -25.",
    concept: "Datentypen und Variablen",
    presentationChapter: "chapter3"
  },
  {
    question: "Wie wird eine Konstante in Java deklariert?",
    options: ["const", "static", "final", "constant"],
    correctAnswer: 2,
    explanation: "Das Schlüsselwort final verhindert, dass eine Variable nach der Initialisierung ihren Wert ändert.",
    concept: "Variablen und Zuweisung",
    presentationChapter: "chapter3"
  },
  {
    question: "Welches Symbol beendet eine Anweisung in Java?",
    options: [".", ":", ";", "!"],
    correctAnswer: 2,
    explanation: "Die meisten Java-Anweisungen enden mit einem Semikolon (;).",
    concept: "Java-Syntax",
    presentationChapter: "chapter1"
  },
  {
    question: "Welches Schlüsselwort wird verwendet, um ein Objekt zu erzeugen?",
    options: ["object", "new", "create", "this"],
    correctAnswer: 1,
    explanation: "new reserviert Speicher und erzeugt eine neue Instanz einer Klasse.",
    concept: "Klassen und Objekte",
    presentationChapter: "chapter2"
  },
  {
    question: "Welcher dieser Typen speichert Text?",
    options: ["char", "String", "text", "Wort"],
    correctAnswer: 1,
    explanation: "String ist die Java-Klasse für eine Folge von Zeichen.",
    concept: "String und Text",
    presentationChapter: "chapter3"
  },
  {
    question: "Welcher Operator vergleicht, ob zwei Werte gleich sind?",
    options: ["=", "==", "===", "equals"],
    correctAnswer: 1,
    explanation: "Der Operator == vergleicht primitive Werte. Für den Inhalt von Objekten wird meist equals() verwendet.",
    concept: "Vergleiche und Operatoren",
    presentationChapter: "chapter22"
  },
  {
    question: "Welche Struktur wiederholt Code, solange eine Bedingung wahr ist?",
    options: ["if", "switch", "while", "try"],
    correctAnswer: 2,
    explanation: "while wiederholt einen Codeblock, solange seine Bedingung true ist.",
    concept: "Schleifen und Bedingungen",
    presentationChapter: "chapter24"
  },
  {
    question: "Was bedeutet es, dass Java objektorientiert ist?",
    options: ["Verwendet nur Funktionen", "Organisiert Code mit Klassen und Objekten", "Verwendet keine Variablen", "Funktioniert nur im Internet"],
    correctAnswer: 1,
    explanation: "Objektorientierte Programmierung organisiert Code mit Klassen, Objekten, Attributen und Methoden.",
    concept: "Objektorientierung",
    presentationChapter: "chapter2"
  },
  {
    question: "Welches Schlüsselwort lässt eine Klasse von einer anderen erben?",
    options: ["inherits", "extends", "implements", "super"],
    correctAnswer: 1,
    explanation: "extends bedeutet, dass eine Klasse Attribute und Methoden von einer anderen Klasse erbt.",
    concept: "Vererbung mit extends",
    presentationChapter: "chapter31"
  }
];

// Lokale Übungen aus Kapitel 1.1. Das Backend kompiliert und startet sie als Main.java.
// Der Marker wird beim Laden der Übung automatisch ausgewählt.
const codeExercises = [
  {
    id: "1.1.1",
    chapter: "chapter1",
    title: "Mehrzeiliger Kommentar und Ausgabe",
    prompt: "Ändere die einzeiligen Kommentare in den Zeilen 3–5 zu einem mehrzeiligen Kommentar. Gib anschließend in zwei Zeilen „Hallo, ich bin Duke.“ und „Wie heißt Du?“ aus.",
    expectedOutput: "Hallo, ich bin Duke.\nWie heißt Du?",
    hints: [
      "Ein Blockkommentar beginnt mit /* und endet mit */.",
      "Ersetze die drei //-Zeilen durch einen gemeinsamen Kommentarblock; die Ausgabe kommt danach.",
      "Verwende zwei getrennte System.out.println()-Aufrufe und achte auf Großschreibung und Satzzeichen."
    ],
    starter: `public class Main {
  public static void main(String[] args) {
    // Kommentar 1
    // Kommentar 2
    // Kommentar 3
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    id: "1.1.2",
    chapter: "chapter1",
    title: "Eine Ausgabe mit println",
    prompt: "Schreibe ein Java-Programm, das in einer Zeile „Willkommen Detektiv Duke!“ ausgibt und anschließend in eine neue Zeile springt.",
    expectedOutput: "Willkommen Detektiv Duke!",
    hints: [
      "Die Ausgabe erfolgt mit System.out.println(...).",
      "Der gesamte Satz gehört in doppelte Anführungszeichen innerhalb der Klammern.",
      "Prüfe das Ausrufezeichen, das Semikolon und die Schreibweise von Detektiv Duke."
    ],
    starter: `public class Main {
  public static void main(String[] args) {
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    id: "1.1.3",
    chapter: "chapter1",
    title: "Output Aufgabe 1",
    prompt: "Benutze System.out.println(), um genau „Der Anfang einer Reise!“ auszugeben.",
    expectedOutput: "Der Anfang einer Reise!",
    hints: [
      "Gib einen String mit System.out.println(...) aus.",
      "Setze den vorgegebenen Satz genau zwischen doppelte Anführungszeichen.",
      "Achte auf Leerzeichen, Großschreibung, das Ausrufezeichen und das Semikolon."
    ],
    starter: `public class Main {
  public static void main(String[] args) {
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    id: "1.1.4",
    chapter: "chapter1",
    title: "Syntaxfehler finden",
    prompt: "Finde und behebe die zwei Syntaxfehler im Programm. Gib danach „Hallo Welt.“ aus.",
    expectedOutput: "Hallo Welt.",
    hints: [
      "Prüfe zuerst die Klammern des println-Aufrufs.",
      "Auf den String folgt eine schließende runde Klammer.",
      "Jede Java-Anweisung braucht am Ende ein Semikolon; überprüfe beide Zeichen."
    ],
    starter: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hallo Welt."
    /* DEIN_CODE_HIER */
  }
}`
  }
];
