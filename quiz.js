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
    prompt: "Ändere die einzeiligen Kommentare in den Zeilen 3–5 zu einem mehrzeiligen Kommentar. Gib anschließend in zwei Zeilen “Hallo, ich bin Duke.“ und “Wie heißt Du?“ aus.",
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
    prompt: "Schreibe ein Java-Programm, das in einer Zeile “Willkommen Detektiv Duke!“ ausgibt und anschließend in eine neue Zeile springt.",
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
    prompt: "Benutze System.out.println(), um genau “Der Anfang einer Reise!“ auszugeben.",
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
    prompt: "Finde und behebe die zwei Syntaxfehler im Programm. Gib danach “Hallo Welt.“ aus.",
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
  },
  {
    id: "1.3.1",
    chapter: "chapter3",
    title: "Java Einstieg Variablen Aufgabe 1",
    prompt: "Lege eine Variable vom Datentyp String an, mit dem Bezeichner greeting und dem Wert \"Willkommen Duke.\" Gib anschließend den Inhalt der Variable greeting aus.",
    expectedOutput: "Willkommen Duke.",
    solution: `public class Main {
  public static void main(String[] args) {
    String greeting = "Willkommen Duke.";
    System.out.println(greeting);
  }
}`,
    hints: [
      "Deklariere eine Variable mit dem Datentyp String und dem Bezeichner greeting.",
      "Weise greeting den Text \"Willkommen Duke.\" zu.",
      "Gib die Variable greeting mit System.out.println(...) aus."
    ],
    starter: `public class Main {
  public static void main(String[] args) {
    // Erstelle eine String-Variable greeting mit dem Wert "Willkommen Duke."
    // Gib anschließend den Inhalt der Variable greeting aus.
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    id: "1.4.1",
    chapter: "chapter4",
    title: "Java Einstieg Variablen Aufgabe 2",
    prompt: "Ergänze für die Variablen name, age und runtime den jeweils am besten passenden Datentyp.",
    expectedOutput: "",
    solution: `public class Main {
  public static void main(String[] args) {
    String name = "Duke";
    int age = 42;
    double runtime = 3.5;
    System.out.println();
  }
}`,
    hints: [
      "name speichert Text und braucht deshalb den Datentyp String.",
      "age speichert eine ganze Zahl und runtime eine Kommazahl.",
      "Verwende int für ganze Zahlen und double für Fließkommazahlen."
    ],
    starter: `public class Main {
  public static void main(String[] args) {
    // Ergänze den richtigen Datentyp für name, age und runtime.
    /* DEIN_CODE_HIER */
    System.out.println();
  }
}`
  },
  {
    id: "1.4.2",
    chapter: "chapter4",
    title: "Java Einstieg Variablen Aufgabe 3",
    prompt: "Lege int-Variablen a mit dem Wert 4 und b mit dem Wert 7 an. Berechne anschließend (a+b)², speichere das Ergebnis in int c und gib c aus.",
    expectedOutput: "121",
    solution: `public class Main {
  public static void main(String[] args) {
    int a = 4;
    int b = 7;
    int c = (a + b) * (a + b);
    System.out.println(c);
  }
}`,
    hints: [
      "Lege a und b als int-Variablen mit den Werten 4 und 7 an.",
      "Speichere (a + b) * (a + b) in der int-Variable c.",
      "Gib c mit System.out.println(c) aus."
    ],
    starter: `public class Main {
  public static void main(String[] args) {
    // Lege a = 4 und b = 7 an.
    // Berechne (a + b)², speichere das Ergebnis in c und gib c aus.
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    id: "1.4.3",
    chapter: "chapter4",
    title: "Java Einstieg Variablen Aufgabe 4",
    prompt: "Lege int-Variablen mainBattery mit dem Wert 7 und replacementBattery mit dem Wert 5 an. Berechne runtime als Summe beider Variablen und gib runtime aus. Erzeuge anschließend den String result mit \"Robin hat insgesamt eine Laufzeit von: \" + runtime + \" Stunden\" und gib result aus.",
    expectedOutput: "12\nRobin hat insgesamt eine Laufzeit von: 12 Stunden",
    solution: `public class Main {
  public static void main(String[] args) {
    int mainBattery = 7;
    int replacementBattery = 5;
    int runtime = mainBattery + replacementBattery;
    System.out.println(runtime);
    String result = "Robin hat insgesamt eine Laufzeit von: " + runtime + " Stunden";
    System.out.println(result);
  }
}`,
    hints: [
      "Lege mainBattery und replacementBattery als int-Variablen an.",
      "Addiere beide Batteriewerte in der neuen int-Variable runtime.",
      "Verkette den Text mit runtime und \" Stunden\" in der String-Variable result."
    ],
    starter: `public class Main {
  public static void main(String[] args) {
    // Berechne die Laufzeit aus mainBattery = 7 und replacementBattery = 5.
    // Gib runtime und anschließend den vollständigen result-Text aus.
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    id: "1.5.1",
    chapter: "chapter5",
    title: "Java Einstieg Attribute Aufgabe 1",
    prompt: "Erstelle die Klasse Robot mit dem String-Attribut name und dem Standardwert \"Unbenannt\". Erzeuge in main ein Robot-Objekt namens robin, gib zunächst robin.name aus, setze das Attribut anschließend auf \"Robin\" und gib robin.name erneut aus.",
    expectedOutput: "Unbenannt\nRobin",
    solution: `public class Main {
  static class Robot {
    String name = "Unbenannt";
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    System.out.println(robin.name);
    robin.name = "Robin";
    System.out.println(robin.name);
  }
}`,
    hints: [
      "Definiere in Robot das String-Attribut name mit dem Startwert \"Unbenannt\".",
      "Greife über die Referenz robin mit dem Punkt-Operator auf name zu.",
      "Gib robin.name vor und nach der Zuweisung \"Robin\" mit println aus."
    ],
    starter: `public class Main {
  static class Robot {
    String name = "Unbenannt";
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    // Gib den Standardwert aus, setze name auf "Robin" und gib ihn erneut aus.
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    id: "1.5.2",
    chapter: "chapter5",
    title: "Java Einstieg Attribute Aufgabe 2",
    prompt: "Lege in Robot ein String-Attribut task an. Erzeuge in main ein Robot-Objekt namens robin, weise robin.task den Wert \"Paco finden.\" zu und gib das Attribut aus.",
    expectedOutput: "Paco finden.",
    solution: `public class Main {
  static class Robot {
    String task;
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    robin.task = "Paco finden.";
    System.out.println(robin.task);
  }
}`,
    hints: [
      "Definiere in Robot das Attribut String task.",
      "Erzeuge mit new Robot() die Referenz robin.",
      "Setze robin.task auf \"Paco finden.\" und gib robin.task aus."
    ],
    starter: `public class Main {
  static class Robot {
    String task;
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    // Weise robin.task "Paco finden." zu und gib das Attribut aus.
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    id: "1.6.1",
    chapter: "chapter6",
    title: "Java Einstieg Methoden Aufgabe 1",
    prompt: "Erstelle in main zusätzlich zum vorhandenen Objekt robin ein weiteres Robot-Objekt alex und rufe auf alex die Methode sayWelcome() auf.",
    expectedOutput: "Hallo!\nWillkommen!",
    solution: `public class Main {
  static class Robot {
    void sayHello() {
      System.out.println("Hallo!");
    }

    void sayWelcome() {
      System.out.println("Willkommen!");
    }
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    robin.sayHello();
    Robot alex = new Robot();
    alex.sayWelcome();
  }
}`,
    hints: [
      "Erzeuge mit Robot alex = new Robot() ein zweites Objekt.",
      "Rufe die Methode über die Referenz alex auf.",
      "Die vollständige Anweisung lautet alex.sayWelcome();."
    ],
    starter: `public class Main {
  static class Robot {
    void sayHello() {
      System.out.println("Hallo!");
    }

    void sayWelcome() {
      System.out.println("Willkommen!");
    }
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    robin.sayHello();
    // Erzeuge alex und rufe alex.sayWelcome() auf.
    /* DEIN_CODE_HIER */
  }
}`
  },
  {
    id: "1.6.2",
    chapter: "chapter6",
    title: "Java Einstieg Methoden Aufgabe 2",
    prompt: "Erstelle die Klasse ReadingRobot mit der Methode giveTask(), die \"Ich kann lesen.\" ausgibt. Erzeuge in main ein ReadingRobot-Objekt namens bookworm. Rufe zuerst robin.giveTask() und danach bookworm.giveTask() auf.",
    expectedOutput: "Hallo!\nIch kann helfen.\nIch kann lesen.",
    solution: `public class Main {
  static class Robot {
    void giveTask() {
      System.out.println("Ich kann helfen.");
    }
  }

  static class ReadingRobot {
    void giveTask() {
      System.out.println("Ich kann lesen.");
    }
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    robin.giveTask();
    ReadingRobot bookworm = new ReadingRobot();
    bookworm.giveTask();
  }
}`,
    hints: [
      "Definiere ReadingRobot mit einer void-Methode giveTask().",
      "Gib in ReadingRobot.giveTask() den Text \"Ich kann lesen.\" aus.",
      "Achte auf die Reihenfolge: robin.giveTask() vor bookworm.giveTask()."
    ],
    starter: `public class Main {
  static class Robot {
    void giveTask() {
      System.out.println("Ich kann helfen.");
    }
  }

  // Erstelle hier die Klasse ReadingRobot mit giveTask().
  /* DEIN_CODE_HIER */

  public static void main(String[] args) {
    Robot robin = new Robot();
    // Erzeuge bookworm und rufe zuerst robin.giveTask(), dann bookworm.giveTask() auf.
  }
}`
  },
  {
    id: "1.6.3",
    chapter: "chapter6",
    title: "Java Einstieg Methoden Aufgabe 3",
    prompt: "Lege in Robot das int-Attribut age mit dem Wert 1 an. Implementiere die Methode sayAge(), die \"Ich bin \" + age + \" Jahr alt.\" ausgibt. Erzeuge in main das Objekt robin und rufe robin.sayAge() auf.",
    expectedOutput: "Ich bin 1 Jahr alt.",
    solution: `public class Main {
  static class Robot {
    int age = 1;

    void sayAge() {
      System.out.println("Ich bin " + age + " Jahr alt.");
    }
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    robin.sayAge();
  }
}`,
    hints: [
      "Definiere int age = 1 als Attribut in Robot.",
      "Verkette den Text mit age in der Methode sayAge().",
      "Erzeuge robin und rufe robin.sayAge() auf."
    ],
    starter: `public class Main {
  static class Robot {
    int age = 1;
    // Implementiere sayAge() mit der Ausgabe des Alters.
    /* DEIN_CODE_HIER */
  }

  public static void main(String[] args) {
    // Erzeuge Robot robin und rufe robin.sayAge() auf.
  }
}`
  },
  {
    id: "1.7.1",
    chapter: "chapter7",
    title: "Java Einstieg Rückgabewerte Aufgabe 1",
    prompt: "Implementiere getTask() mit dem Rückgabetyp String für Robot und ReadingRobot. Beide Methoden sollen ihr task-Attribut zurückgeben. Erzeuge in main robin und alex und gib beide Rückgabewerte aus.",
    expectedOutput: "Ich infiltriere die Geheimbasis und suche Paco.\nIch lese codierte Nachrichten.",
    solution: `public class Main {
  static class Robot {
    String task = "Ich infiltriere die Geheimbasis und suche Paco.";

    String getTask() {
      return task;
    }
  }

  static class ReadingRobot {
    String task = "Ich lese codierte Nachrichten.";

    String getTask() {
      return task;
    }
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    ReadingRobot alex = new ReadingRobot();
    System.out.println(robin.getTask());
    System.out.println(alex.getTask());
  }
}`,
    hints: [
      "Eine Methode mit String-Rückgabe beginnt mit String getTask().",
      "Gib das Attribut mit return task; zurück.",
      "In Story werden beide Methoden mit System.out.println(...) aufgerufen."
    ],
    starter: `public class Main {
  static class Robot {
    String task = "Ich infiltriere die Geheimbasis und suche Paco.";
    // Ergänze String getTask() und gib task zurück.
    /* DEIN_CODE_HIER */
  }

  static class ReadingRobot {
    String task = "Ich lese codierte Nachrichten.";
    // Ergänze auch hier String getTask().
  }

  public static void main(String[] args) {
    // Erzeuge robin und alex und gib beide Rückgabewerte aus.
  }
}`,
    guidedSteps: [
      {
        label: "1 · ReadingRobot anlegen",
        instruction: "Klicke, um ReadingRobot mit task und getTask() einzufügen.",
        code: `public class Main {
  static class Robot {
    String task = "Ich infiltriere die Geheimbasis und suche Paco.";

    String getTask() {
      return task;
    }
  }

  static class ReadingRobot {
    String task = "Ich lese codierte Nachrichten.";

    String getTask() {
      return task;
    }
  }

  public static void main(String[] args) {
    // Klicke den nächsten Schritt, um Story zu ergänzen.
  }
}`
      },
      {
        label: "2 · Robot getTask() prüfen",
        instruction: "Klicke, um den Rückgabewert von Robot sichtbar zu machen.",
        code: `public class Main {
  static class Robot {
    String task = "Ich infiltriere die Geheimbasis und suche Paco.";

    String getTask() {
      return task;
    }
  }

  static class ReadingRobot {
    String task = "Ich lese codierte Nachrichten.";

    String getTask() {
      return task;
    }
  }

  public static void main(String[] args) {
    // Die beiden Objekte werden im nächsten Schritt erzeugt.
  }
}`
      },
      {
        label: "3 · Objekte erzeugen",
        instruction: "Klicke, um robin und alex in main zu erzeugen.",
        code: `public class Main {
  static class Robot {
    String task = "Ich infiltriere die Geheimbasis und suche Paco.";

    String getTask() {
      return task;
    }
  }

  static class ReadingRobot {
    String task = "Ich lese codierte Nachrichten.";

    String getTask() {
      return task;
    }
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    ReadingRobot alex = new ReadingRobot();
  }
}`
      },
      {
        label: "4 · Rückgaben ausgeben",
        instruction: "Klicke, um beide Rückgabewerte auszugeben. Danach kannst du den Code ausführen.",
        code: `public class Main {
  static class Robot {
    String task = "Ich infiltriere die Geheimbasis und suche Paco.";

    String getTask() {
      return task;
    }
  }

  static class ReadingRobot {
    String task = "Ich lese codierte Nachrichten.";

    String getTask() {
      return task;
    }
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    ReadingRobot alex = new ReadingRobot();
    System.out.println(robin.getTask());
    System.out.println(alex.getTask());
  }
}`
      }
    ]
  },
  {
    id: "1.7.2",
    chapter: "chapter7",
    title: "Java Einstieg Rückgabewerte Aufgabe 2",
    prompt: "Ergänze in der Klasse Robot die Methode getAge(). Sie soll den ganzzahligen Wert 5 zurückgeben. Erstelle dafür ein int-Attribut age.",
    expectedOutput: "Robin ist 5 Jahre alt.",
    solution: `public class Main {
  static class Robot {
    int age = 5;

    int getAge() {
      return age;
    }
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    System.out.println("Robin ist " + robin.getAge() + " Jahre alt.");
  }
}`,
    hints: [
      "Definiere int age = 5 in Robot.",
      "Der Rückgabetyp von getAge() ist int; gib age mit return zurück.",
      "Verkette robin.getAge() mit dem Ausgabetext."
    ],
    starter: `public class Main {
  static class Robot {
    // Lege int age = 5 an und implementiere int getAge().
    /* DEIN_CODE_HIER */
  }

  public static void main(String[] args) {
    // Erzeuge robin und gib sein Alter im vorgegebenen Format aus.
  }
}`,
    guidedSteps: [
      {
        label: "1 · Alter speichern",
        instruction: "Klicke, um age = 5 und getAge() einzufügen.",
        code: `public class Main {
  static class Robot {
    int age = 5;

    int getAge() {
      return age;
    }
  }

  public static void main(String[] args) {
    // Erzeuge robin und ergänze danach die Ausgabe.
  }
}`
      },
      {
        label: "2 · robin erzeugen",
        instruction: "Klicke, um das Robot-Objekt robin zu erzeugen.",
        code: `public class Main {
  static class Robot {
    int age = 5;

    int getAge() {
      return age;
    }
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
  }
}`
      },
      {
        label: "3 · Alter ausgeben",
        instruction: "Klicke, um robin.getAge() im geforderten Satz auszugeben. Danach kannst du ausführen.",
        code: `public class Main {
  static class Robot {
    int age = 5;

    int getAge() {
      return age;
    }
  }

  public static void main(String[] args) {
    Robot robin = new Robot();
    System.out.println("Robin ist " + robin.getAge() + " Jahre alt.");
  }
}`
      }
    ]
  }

];
