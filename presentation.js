const chapters = {
  chapter1: {
    label: "Kapitel 1.1 · Java-Grundlagen",
    slides: [
      { kicker: "KAPITEL 1 · START", title: "Dein erstes Java-Programm", text: "Java-Programme bestehen aus klaren Bausteinen. In dieser Einführung baust du dein erstes Programm Schritt für Schritt auf.", code: "class HelloPaco {\n}", character: "robot", caption: "Wir bauen es gemeinsam auf." },
      { kicker: "01 · KLASSE", title: "Die Klasse ist der Rahmen.", text: "class ist ein Schlüsselwort. Eine Klasse ist die Grundeinheit der objektorientierten Programmierung und enthält deinen Code.", code: "class HelloPaco {\n  // Inhalt der Klasse\n}", character: "robot", caption: "Ein Rahmen für deinen Code." },
      { kicker: "02 · CODE-BLOCK", title: "Geschweifte Klammern strukturieren.", text: "Alles zwischen { und } gehört zum aktuellen Code-Block. Die Pfeile markieren, wo der Block beginnt und endet.", code: "class HelloPaco <span class=\"brace-arrow brace-arrow-open\" aria-label=\"Pfeil zur öffnenden Klammer\">→ öffnende Klammer</span> <span class=\"brace-highlight\">{</span>\n  // Inhalt des Code-Blocks\n<span class=\"brace-arrow brace-arrow-close\" aria-label=\"Pfeil zur schließenden Klammer\">→ schließende Klammer</span> <span class=\"brace-highlight\">}</span>\n<span class=\"brace-guide\">↳ Beginn und Ende gehören zusammen</span>", character: "detective", caption: "Ich finde jeden Code-Block." },
      { kicker: "03 · MAIN", title: "main() ist der Startpunkt.", text: "Die main()-Methode gibt es genau einmal pro Programm. Hier beginnt Java mit der Ausführung deines Codes.", code: "public static void main(String[] args) <span class=\"brace-highlight\">{</span>\n  // hier startet das Programm\n<span class=\"brace-highlight\">}</span>", character: "robot", caption: "Startklar!" },
      { kicker: "04 · KOMMENTARE", title: "Kommentare erklären deinen Code.", text: "Einzeilige und mehrzeilige Kommentare werden bei der Ausführung ignoriert. Sie helfen Entwicklerinnen und Entwicklern beim Verstehen.", code: "// einzeiliger Kommentar\n/* mehrzeiliger\n   Kommentar */", character: "detective", caption: "Notizen für dein zukünftiges Ich." },
      { kicker: "05 · AUSGABE", title: "println schreibt eine Zeile.", text: "System.out.println() ist eine Methode. Sie gibt den Text in den Klammern in der Konsole aus.", code: 'System.out.println(<span class="string">"Hallo Paco"</span>);', character: "robot", caption: "Die Konsole antwortet." },
      { kicker: "06 · STRING", title: "Text wird zum String.", text: "Anführungszeichen zeigen Java, dass es sich um Text handelt. Dieser Text ist das Argument der Methode.", code: '<span class="string">"Hallo Paco"</span>\n<span class="brace-guide">↳ Ausgabetext · Argument</span>', character: "detective", caption: "Spur gefunden: ein String." },
      { kicker: "07 · SEMIKOLON", title: "Jede Anweisung endet mit ;", text: "Das Semikolon markiert das Ende einer Anweisung. Vergisst du es, meldet Java einen Syntaxfehler.", code: 'System.out.println(<span class="string">"Hallo Paco"</span>)<span class="brace-highlight">;</span>\n<span class="brace-guide">                           ↳ Ende der Anweisung</span>', character: "detective", caption: "Der kleine Punkt macht den Unterschied." },
      { kicker: "KAPITEL 1.1 · ERGEBNIS", title: "Hallo Paco! Du bist dran.", text: "Du kennst jetzt die Bausteine eines ersten Java-Programms. In Kapitel 1.2 lernst du Klassen und Objekte kennen.", code: '<span class="muted-code">Ausgabe:</span>\n<span class="success-code">Hallo Paco</span>', character: "robot", caption: "Weiter zu Kapitel 1.2!" }
    ]
  },
  chapter2: {
    label: "Kapitel 1.2 · Klassen und Objekte",
    slides: [
      { kicker: "KAPITEL 1.2 · START", title: "Objektorientierung: Klassen und Objekte", text: "Objektorientierte Programmierung (OOP) strukturiert Programme nach menschlicher Denkweise. Gegenstände werden durch Klassen und Objekte abgebildet.", code: '<span class="concept-highlight attention-target">OOP</span> = <span class="concept-highlight attention-target">Klassen</span> + <span class="concept-highlight attention-target">Objekte</span>\n\n<span class="attention-arrow">↳ Objekte arbeiten zusammen</span>', character: "robot", caption: "Willkommen in Kapitel 1.2." },
      { kicker: "01 · OOP", title: "Was bedeutet objektorientiert?", text: "OOP beschreibt Gegenstände als Objekte. Klassen liefern den Bauplan; konkrete Objekte arbeiten als einzelne Instanzen zusammen.", code: '<span class="concept-highlight attention-target">Klasse</span>  <span class="attention-arrow">→</span>  Bauplan\n<span class="concept-highlight attention-target">Objekt</span>  <span class="attention-arrow">→</span>  konkrete Umsetzung' , character: "detective", caption: "Ich untersuche die Beziehungen." },
      { kicker: "02 · ROBOTER", title: "Wir bauen einen Roboter.", text: "Ein Roboter hat einen Zustand und ein Verhalten. Sein Name, seine Augen und sein Einschaltzustand gehören zum Zustand.", code: '<span class="concept-highlight attention-target">Zustand:</span>\n  Name: Robin\n  Anzahl Augen: 2\n  Eingeschaltet: ja', character: "robot", caption: "Zustand beschreibt, wie er ist." },
      { kicker: "03 · VERHALTEN", title: "Objekte können etwas tun.", text: "Sprechen, laufen oder Kaffee kochen sind Beispiele für Verhalten. In Java werden solche Aktionen durch Methoden beschrieben.", code: '<span class="concept-highlight attention-target">Verhalten:</span>\n  <span class="attention-target">speak()</span>\n  <span class="attention-target">walk()</span>\n  <span class="attention-target">makeCoffee()</span>', character: "robot", caption: "Methoden beschreiben Aktionen." },
      { kicker: "04 · KLASSENDIAGRAMM", title: "Ein Bauplan hat drei Bereiche.", text: "Ein Klassendiagramm zeigt den Namen der Klasse, ihre Attribute und ihre Methoden übersichtlich untereinander.", code: '<span class="diagram-focus attention-target">┌─────────────────┐</span>\n<span class="diagram-focus attention-target">│      Robot      │</span>  <span class="attention-arrow">← Name der Klasse</span>\n<span class="diagram-focus attention-target">├─────────────────┤</span>\n<span class="diagram-focus attention-target">│ name            │</span>  <span class="attention-arrow">← Attribute</span>\n<span class="diagram-focus attention-target">├─────────────────┤</span>\n<span class="diagram-focus attention-target">│ speak()         │</span>  <span class="attention-arrow">← Methoden</span>\n<span class="diagram-focus attention-target">└─────────────────┘</span>', character: "detective", caption: "Drei Spuren führen zum Bauplan." },
      { kicker: "05 · KLASSEN", title: "Eine Klasse ist eine Vorlage.", text: "Klassen sind Baupläne für Konstrukte aus der realen Welt. Sie enthalten Zustand (Attribute) und Verhalten (Methoden). Eine Klasse ist noch kein konkreter Roboter.", code: '<span class="concept-highlight attention-target">class Robot</span> {\n  <span class="attention-arrow">// Vorlage für viele Roboter</span>\n}', character: "robot", caption: "Eine Vorlage ist noch kein fertiges Objekt." },
      { kicker: "06 · OBJEKTE", title: "Objekte sind konkrete Instanzen.", text: "Ein Objekt ist die konkrete Umsetzung einer Klasse. Die Attribute erhalten eigene Werte – zum Beispiel einen individuellen Namen.", code: '<span class="concept-highlight attention-target">Robot robin</span> = <span class="concept-highlight attention-target">new Robot()</span>;\nrobin.name = <span class="string attention-target">\"Robin\"</span>;' , character: "detective", caption: "Jetzt bekommt der Bauplan Leben." },
      { kicker: "07 · IMPLEMENTIERUNG", title: "Die Klasse Robot in Java.", text: "Attribute speichern den Zustand. Methoden beschreiben das Verhalten. Zusammen bilden sie die Implementierung der Klasse.", code: '<span class="concept-highlight attention-target">class Robot</span> {\n  <span class="concept-highlight attention-target">String name;</span>\n  <span class="concept-highlight attention-target">int numberOfEyes;</span>\n\n  <span class="attention-target">void speak()</span> {\n    // ...\n  }\n\n  <span class="attention-target">void walk()</span> {\n    // ...\n  }\n}', character: "robot", caption: "Zustand und Verhalten im Code." },
      { kicker: "KAPITEL 1.2 · ERGEBNIS", title: "State und Behaviour gehören zusammen.", text: "Attribute beschreiben den Zustand (state), Methoden das Verhalten (behaviour). Der Zustand beeinflusst das Verhalten – und Verhalten kann den Zustand verändern.", code: '<span class="concept-highlight attention-target">Gewicht</span>  <span class="attention-arrow">→</span>  Geschwindigkeit\n<span class="concept-highlight attention-target">walk()</span>   <span class="attention-arrow">→</span>  Position', character: "detective", caption: "Du kannst jetzt Objekte erklären." }
    ]
  },
  chapter3: {
    label: "Kapitel 1.3 · Variablen (1)",
    slides: [
      { kicker: "KAPITEL 1.3 · START", title: "Variablen speichern Daten.", text: "Eine Variable ist ein Container für Daten. Sie braucht einen eindeutigen Namen und einen Datentyp.", code: '<span class="concept-highlight attention-target">String</span> <span class="concept-highlight attention-target">output</span><span class="attention-arrow">;</span>\n<span class="brace-guide">↳ Datentyp · Bezeichner</span>', character: "robot", caption: "Gib deinen Daten einen Namen." },
      { kicker: "01 · FORMAT", title: "Datentyp, Bezeichner und Semikolon.", text: "Die Grundform lautet: Datentyp, Bezeichner und Semikolon. Diese Reihenfolge hilft Java, die Variable zu verstehen.", code: '<span class="concept-highlight attention-target">Datentyp</span> <span class="concept-highlight attention-target">Bezeichner</span><span class="attention-arrow">;</span>\n<span class="attention-arrow">↳ String output;</span>', character: "detective", caption: "Drei Teile, ein Container." },
      { kicker: "02 · ZUWEISUNG", title: "Eine Variable kann wiederverwendet werden.", text: "Nach der Deklaration weist du der Variable einen Wert zu. Danach kannst du denselben Bezeichner mehrfach ausgeben.", code: '<span class="concept-highlight attention-target">String output;</span>\noutput <span class="attention-arrow">=</span> <span class="string attention-target">"Hallo Paco"</span>;\nSystem.out.println(<span class="concept-highlight attention-target">output</span>);\nSystem.out.println(<span class="concept-highlight attention-target">output</span>);', character: "robot", caption: "Ein Wert, viele Verwendungen." },
      { kicker: "03 · KURZSCHREIBWEISE", title: "Deklarieren und initialisieren.", text: "Du kannst eine Variable direkt beim Anlegen mit einem Wert initialisieren.", code: '<span class="concept-highlight attention-target">String output</span> <span class="attention-arrow">=</span> <span class="string attention-target">"Hallo Paco"</span><span class="brace-highlight">;</span>', character: "detective", caption: "Direkt startklar." },
      { kicker: "04 · NEUZUWEISUNG", title: "Der Wert kann sich ändern.", text: "Den Datentyp schreibst du nur bei der ersten Deklaration. Danach weist du einen neuen Wert direkt zu.", code: '<span class="concept-highlight attention-target">String output</span> = <span class="string attention-target">"Hallo Paco"</span>;\noutput <span class="attention-arrow">=</span> <span class="string attention-target">"Hallo Duke"</span>;', character: "robot", caption: "Der Container bleibt, der Wert wechselt." },
      { kicker: "05 · DATENTYPEN", title: "Jeder Wert hat eine passende Art.", text: "String steht für Text, char für ein Zeichen, int für ganze Zahlen und double für Kommazahlen.", code: '<span class="concept-highlight attention-target">String</span> name = <span class="string">"Robin"</span>;\n<span class="concept-highlight attention-target">char</span> country = <span class="string">\'d\'</span>;\n<span class="concept-highlight attention-target">int</span> age = 2;\n<span class="concept-highlight attention-target">double</span> speed = 98.7;', character: "detective", caption: "Der Datentyp ist ein Hinweis." },
      { kicker: "06 · VERKETTUNG", title: "Strings werden mit + verbunden.", text: "Der Plus-Operator kann Text an Text anhängen. So entsteht eine gemeinsame Ausgabe.", code: 'String output = <span class="string">"Hallo Paco"</span>;\nSystem.out.println(output <span class="attention-arrow">+</span> <span class="string attention-target">"!"</span>);', character: "robot", caption: "Plus verbindet Texte." },
      { kicker: "07 · FORMATIERUNG", title: "Achte auf Leerzeichen.", text: "Wenn du mehrere Strings verbindest, musst du Leerzeichen selbst in einen String schreiben. In Kapitel 1.4 geht es mit Variablen und Rechnen weiter.", code: 'String welcome = <span class="string">"Hallo"</span>;\nString name = <span class="string">"Paco"</span>;\nSystem.out.println(welcome + <span class="string attention-target">" "</span> + name);', character: "detective", caption: "Weiter zu Kapitel 1.4!" },
      { kicker: "KAPITEL 1.4 · START", title: "Variablen (2): String oder int?",  text: "Bei Strings bedeutet + Konkatenation. Bei Integers bedeutet + Addition.", code: '<span class="string attention-target">"5"</span> + <span class="string attention-target">"5"</span> <span class="attention-arrow">→ 55</span>\n<span class="concept-highlight attention-target">5</span> + <span class="concept-highlight attention-target">5</span> <span class="attention-arrow">→ 10</span>', character: "detective", caption: "Der Datentyp entscheidet." },
      { kicker: "09 · RECHNEN", title: "Grundrechenarten mit int.", text: "Mit ganzen Zahlen kannst du subtrahieren, dividieren und multiplizieren. Java gibt das Ergebnis aus.", code: 'int number1 = 42;\nint number2 = 21;\nnumber1 <span class="attention-arrow">-</span> number2 <span class="attention-arrow">→ 21</span>\nnumber1 <span class="attention-arrow">/</span> number2 <span class="attention-arrow">→ 2</span>\nnumber2 <span class="attention-arrow">*</span> 2 <span class="attention-arrow">→ 42</span>', character: "robot", caption: "Operatoren machen Berechnungen." },
      { kicker: "10 · VERSCHIEDENE TYPEN", title: "Text und Zahlen zusammen ausgeben.", text: "Java kann verschiedene Datentypen in einer Ausgabe verbinden. Ein Leerzeichen im Text sorgt für ein gutes Ergebnis.", code: 'String text = <span class="string">"Ich mag die Zahl "</span>;\nint number = <span class="concept-highlight attention-target">7</span>;\nSystem.out.println(text + number);\n<span class="attention-arrow">→ Ich mag die Zahl 7</span>', character: "robot", caption: "Java verbindet unterschiedliche Werte." },
      { kicker: "11 · OPERATOR", title: "Der Rest heißt Modulo.", text: "Der Operator % liefert den Rest einer ganzzahligen Division. Bei 5 % 2 bleibt 1 übrig.", code: '<span class="concept-highlight attention-target">5 % 2</span> <span class="attention-arrow">→ 1</span>\n\n5 = 2 · 2 + 1', character: "detective", caption: "Der Rest ist eine wichtige Spur." },
      { kicker: "12 · ZUWEISUNG", title: "Erst rechts rechnen, dann links speichern.", text: "Java wertet zuerst die rechte Seite aus und weist das Ergebnis danach der linken Variable zu.", code: 'int number1 = 0;\nnumber1 <span class="attention-arrow">=</span> number1 + <span class="concept-highlight attention-target">2</span>;\n<span class="attention-arrow">↳ Ergebnis: 2</span>', character: "robot", caption: "Rechts entsteht der neue Wert." },
      { kicker: "13 · KURZSCHREIBEN", title: "+= und ++ machen Code kompakt.", text: "Zuweisungen lassen sich verkürzen: number += 2 und number++ sind kompakte Schreibweisen.", code: 'number = number + 2\n<span class="attention-arrow">↔</span>\n<span class="concept-highlight attention-target">number += 2</span>\n\nnumber = number + 1\n<span class="attention-arrow">↔</span>\n<span class="concept-highlight attention-target">number++</span>', character: "detective", caption: "Gleiche Wirkung, weniger Code." },
      { kicker: "14 · DOUBLE", title: "Kommazahlen nutzen einen Punkt.", text: "double stellt Fließkommazahlen dar. In Java schreibst du 3.1415 mit einem Punkt, nicht mit einem Komma.", code: '<span class="concept-highlight attention-target">double</span> weight = <span class="concept-highlight attention-target">42.2</span>;\n<span class="attention-arrow">3.1415 ✓</span>\n<span class="brace-guide">3,1415 ✕</span>', character: "robot", caption: "Der Punkt gehört zur Java-Syntax." },
      { kicker: "15 · DIVISION", title: "int und double teilen unterschiedlich.", text: "Bei int bleibt nur der ganzzahlige Anteil. Bei double bleibt die Nachkommastelle erhalten.", code: '<span class="concept-highlight attention-target">5 / 2</span>   <span class="attention-arrow">→ 2</span>\n<span class="concept-highlight attention-target">5.0 / 2</span> <span class="attention-arrow">→ 2.5</span>', character: "detective", caption: "Der Datentyp verändert das Ergebnis." },
      { kicker: "16 · ACHTUNG", title: "Fließkommazahlen sind Näherungen.", text: "Bei Berechnungen mit double kann ein Ergebnis viele Nachkommastellen enthalten. Das ist eine Besonderheit von Fließkommazahlen.", code: '0.3 - 0.1\n<span class="attention-arrow">→ 0.19999999999999998</span>', character: "detective", caption: "Nicht jede Zahl ist exakt darstellbar." },
      { kicker: "KAPITEL 1.4 · ERGEBNIS", title: "Variablen machen Java flexibel.", text: "Du kannst Werte speichern, wiederverwenden, verändern, verbinden und berechnen. In Kapitel 1.5 lernst du Attribute und den Punkt-Operator kennen.", code: '<span class="concept-highlight attention-target">speichern</span> · <span class="concept-highlight attention-target">verbinden</span> · <span class="concept-highlight attention-target">rechnen</span>\n\n<span class="attention-arrow">→ Bereit zum Üben!</span>', character: "robot", caption: "Weiter zu Kapitel 1.5!" }
    ]
  },
  chapter4: {
    label: "Kapitel 1.4 · Variablen (2)",
    slides: []
  },
  chapter5: {
    label: "Kapitel 1.5 · Attribute",
    slides: [
      { kicker: "KAPITEL 1.5 · START", title: "Attribute beschreiben Eigenschaften.", text: "Attribute sind Merkmale einer Klasse. Sie speichern den Zustand, den jedes Objekt dieser Klasse haben kann.", code: '<span class="concept-highlight attention-target">Datentyp</span> <span class="concept-highlight attention-target">Bezeichner</span><span class="attention-arrow">;</span>\n<span class="brace-guide">↳ Attribute beschreiben Eigenschaften</span>', character: "robot", caption: "Was macht ein Objekt einzigartig?" },
      { kicker: "01 · ROBOTERNAME", title: "Der Name ist ein Attribut.", text: "Unser Roboter hat das Attribut name. Es ist ein String und kann den Wert Robin speichern.", code: '<span class="concept-highlight attention-target">String</span> <span class="concept-highlight attention-target">name</span> <span class="attention-arrow">=</span> <span class="string attention-target">"Robin"</span>;', character: "detective", caption: "Eine Eigenschaft wird sichtbar." },
      { kicker: "02 · IMPLEMENTIERUNG", title: "Attribute stehen in der Klasse.", text: "Attribute werden innerhalb der Klasse definiert. Alle Objekte dieser Klasse besitzen diese Attribute.", code: '<span class="concept-highlight attention-target">class Robot</span> {\n  <span class="concept-highlight attention-target">String name;</span>\n  <span class="attention-arrow">// weitere Attribute</span>\n\n  // Methoden\n}', character: "robot", caption: "Der Bauplan gibt die Struktur vor." },
      { kicker: "03 · DEFAULTWERT", title: "Ein Standardwert startet für alle gleich.", text: "Mit einem Defaultwert wird das Attribut beim Erzeugen zunächst für alle Objekte gesetzt. Später kann jedes Objekt seinen Wert ändern.", code: '<span class="concept-highlight attention-target">String name</span> <span class="attention-arrow">=</span> <span class="string attention-target">"Robin"</span>;\n<span class="brace-guide">↳ Defaultwert für neue Objekte</span>', character: "detective", caption: "Ein Startwert für jedes Objekt." },
      { kicker: "04 · INSTANZIIERUNG", title: "Mit new entsteht ein Objekt.", text: "Die Anweisung erzeugt ein Objekt der Klasse Robot. ourRobot ist die Referenz, über die wir es wiederfinden.", code: '<span class="concept-highlight attention-target">Robot ourRobot</span> <span class="attention-arrow">= new</span> <span class="concept-highlight attention-target">Robot()</span>;', character: "robot", caption: "Der Bauplan wird zum echten Objekt." },
      { kicker: "05 · REFERENZ", title: "Die Referenz zeigt auf das Objekt.", text: "Der Bezeichner ourRobot dient zur Referenzierung. So kannst du später auf genau dieses Objekt zugreifen.", code: '<span class="concept-highlight attention-target">Robot ourRobot</span> = new Robot();\n<span class="attention-arrow">ourRobot → Objekt der Klasse Robot</span>', character: "detective", caption: "Ein Name führt zum richtigen Objekt." },
      { kicker: "06 · PUNKT-OPERATOR", title: "Mit dem Punkt greifst du zu.", text: "Der Punkt-Operator verbindet die Referenz mit dem Attribut oder der Methode. Hier weisen wir dem Namen einen Wert zu und geben ihn aus.", code: 'Robot ourRobot = new Robot();\n<span class="concept-highlight attention-target">ourRobot.name</span> <span class="attention-arrow">=</span> <span class="string attention-target">"Robin"</span>;\nSystem.out.println(<span class="concept-highlight attention-target">ourRobot.name</span>);\n<span class="attention-arrow">→ Robin</span>', character: "robot", caption: "Punkt für Punkt zum Attribut." },
      { kicker: "KAPITEL 1.5 · ERGEBNIS", title: "Attribute geben Objekten ihren Zustand.", text: "Du kennst jetzt die komplette Kette: Klasse, Attribut, Objekt, Referenz und Punkt-Operator. Probiere sie im DevQuiz aus.", code: '<span class="concept-highlight attention-target">Robot</span> → <span class="concept-highlight attention-target">ourRobot</span> → <span class="concept-highlight attention-target">ourRobot.name</span>\n\n<span class="attention-arrow">→ Bereit für eigene Objekte!</span>', character: "detective", caption: "Jetzt kannst du Objekte genauer beschreiben." }
    ]
  },
  chapter6: {
    label: "Kapitel 1.6 · Methoden",
    slides: [
      { kicker: "KAPITEL 1.6 · START", title: "Methoden beschreiben Verhalten.", text: "Methoden spezifizieren Operationen für alle Objekte einer Klasse. Methodendefinitionen stehen innerhalb von Klassen.", code: '<span class="concept-highlight attention-target">Methode</span> = Verhalten\n\n<span class="attention-arrow">↳ Was kann ein Objekt tun?</span>', character: "robot", caption: "Verhalten bekommt einen Namen." },
      { kicker: "01 · SYNTAX", title: "Der Aufbau einer Methode.", text: "Eine Methodendefinition besteht aus Rückgabetyp, Namen, Klammern und einem Codeblock. Die Anweisungen stehen zwischen { und }.", code: '<span class="concept-highlight attention-target">Rückgabetyp</span> <span class="concept-highlight attention-target">methodenName</span>() <span class="brace-highlight">{</span>\n  // Anweisungen\n<span class="brace-highlight">}</span>\n<span class="attention-arrow">↳ wird beim Aufruf ausgeführt</span>', character: "detective", caption: "Jeder Teil hat eine Aufgabe." },
      { kicker: "02 · IMPLEMENTIERUNG", title: "Robot kann sprechen.", text: "Die Methode speak() schreibt beim Aufruf Hallo in die Konsole. Die Anweisung liegt innerhalb des Methodenblocks.", code: '<span class="concept-highlight attention-target">class Robot</span> {\n  <span class="concept-highlight attention-target">void speak()</span> {\n    System.out.println(<span class="string attention-target">"Hallo"</span>);\n  }\n}', character: "robot", caption: "Eine Aktion wird zu Code." },
      { kicker: "03 · VOID", title: "void bedeutet: nichts zurückgeben.", text: "Der Rückgabetyp void beschreibt eine leere Rückgabe. Die Methode führt Anweisungen aus, liefert aber keinen Wert zurück.", code: '<span class="concept-highlight attention-target">void</span> speak() {\n  System.out.println(<span class="string">"Hallo"</span>);\n}\n<span class="attention-arrow">↳ keine Rückgabe</span>', character: "detective", caption: "Die Methode tut etwas, gibt aber nichts zurück." },
      { kicker: "04 · AUFRUF VON AUSSEN", title: "Ein Objekt ruft seine Methode auf.", text: "Das Programm startet in main(), erzeugt zuerst das Objekt robin und ruft danach speak() auf diesem Objekt auf.", code: '<span class="attention-arrow">1.</span> main() startet\n<span class="attention-arrow">2.</span> Robot robin = new Robot();\n<span class="attention-arrow">3.</span> <span class="concept-highlight attention-target">robin.speak()</span>;', character: "robot", caption: "Drei Schritte bis zur Ausgabe." },
      { kicker: "05 · PUNKT-OPERATOR", title: "objectName.methodName()", text: "Die allgemeine Form eines Methodenaufrufs verbindet den Objektnamen mit dem Methodennamen durch einen Punkt.", code: '<span class="concept-highlight attention-target">objectName</span><span class="attention-arrow">.</span><span class="concept-highlight attention-target">methodName()</span>\n\nrobin<span class="attention-arrow">.</span>speak();\n<span class="attention-arrow">→ Hallo</span>', character: "detective", caption: "Der Punkt führt zur Aktion." },
      { kicker: "06 · AUSSERHALB", title: "Der Aufruf kann aus einer anderen Klasse kommen.", text: "Story ruft speak() auf dem Objekt der Klasse Robot auf. Die Methode wird außerhalb der Klasse verwendet, in der sie definiert wurde.", code: '<span class="concept-highlight attention-target">class Story</span> {\n  static void main(String[] args) {\n    Robot robin = new Robot();\n    <span class="concept-highlight attention-target">robin.speak()</span>;\n  }\n}', character: "robot", caption: "Klassen arbeiten zusammen." },
      { kicker: "07 · INNERHALB", title: "Methoden können sich gegenseitig aufrufen.", text: "Eine Methode kann eine andere Methode derselben Klasse ohne Objektnamen aufrufen. Danach läuft der restliche Code weiter.", code: 'void sayHelloWorld() {\n  <span class="concept-highlight attention-target">sayHello()</span>;\n  System.out.println(<span class="string">"Welt"</span>);\n}\nvoid sayHello() {\n  System.out.println(<span class="string">"Hallo"</span>);\n}', character: "detective", caption: "Eine Methode ruft die nächste auf." },
      { kicker: "KAPITEL 1.6 · ERGEBNIS", title: "Methoden machen Verhalten wiederverwendbar.", text: "Du kannst Methoden definieren, auf Objekten aufrufen und innerhalb derselben Klasse verketten. Im DevQuiz kannst du sie selbst ausprobieren.", code: '<span class="concept-highlight attention-target">sayHello()</span>\n<span class="attention-arrow">↓</span>\n<span class="concept-highlight attention-target">sayHelloWorld()</span>\n\n<span class="attention-arrow">→ Hallo · Welt</span>', character: "robot", caption: "Bereit für deine erste Methode?" }
    ]
  },
  chapter7: {
    label: "Kapitel 1.7 · Methoden und Rückgabewerte",
    slides: [
      { kicker: "KAPITEL 1.7 · START", title: "Methoden können Werte zurückgeben.", text: "Jede Methodendeklaration braucht einen Rückgabetyp. Das kann void oder ein Datentyp wie String sein.", code: '<span class="concept-highlight attention-target">Rückgabetyp</span> = <span class="concept-highlight attention-target">Datentyp</span> oder <span class="concept-highlight attention-target">void</span>\n<span class="attention-arrow">↳ Was kommt aus der Methode zurück?</span>', character: "robot", caption: "Eine Methode kann ein Ergebnis liefern." },
      { kicker: "01 · VOID", title: "void gibt nichts zurück.", text: "void bedeutet, dass die Methode keinen Wert zurückgibt. Sie kann trotzdem Anweisungen ausführen.", code: '<span class="concept-highlight attention-target">void speak()</span> {\n  System.out.println(<span class="string">"Hallo"</span>);\n}\n<span class="attention-arrow">↳ leere Rückgabe</span>', character: "detective", caption: "Ausführen ohne Ergebniswert." },
      { kicker: "02 · STRING", title: "String gibt Text zurück.", text: "Wenn der Rückgabetyp String lautet, muss die Methode einen String zurückgeben. return liefert den Wert.", code: '<span class="concept-highlight attention-target">String getName()</span> {\n  <span class="attention-arrow">return</span> <span class="string attention-target">"Robin"</span>;\n}', character: "robot", caption: "return bringt den Namen zurück." },
      { kicker: "03 · RETURN", title: "return beendet die Rückgabe.", text: "Der Rückgabewert muss zum angegebenen Rückgabetyp passen und wird an die aufrufende Methode zurückgegeben.", code: '<span class="concept-highlight attention-target">String</span> getName() {\n  // Quellcode\n  <span class="attention-arrow">return</span> <span class="string attention-target">"Robin"</span>;\n}\n<span class="brace-guide">↳ String muss String liefern</span>', character: "detective", caption: "Der Rückgabetyp prüft das Ergebnis." },
      { kicker: "04 · ZUWEISUNG", title: "Ein Rückgabewert wird gespeichert.", text: "Du kannst den Rückgabewert einer Variable zuweisen und die Variable danach wie gewohnt weiterverwenden.", code: '<span class="concept-highlight attention-target">String robotName</span> <span class="attention-arrow">=</span> robin.getName();\nSystem.out.println(<span class="concept-highlight attention-target">robotName</span>);\n<span class="attention-arrow">→ Robin</span>', character: "robot", caption: "Das Ergebnis bekommt einen Namen." },
      { kicker: "05 · AUSGABE", title: "Rückgabewerte werden sichtbar.", text: "Die Methode getName() liefert Robin. Story speichert den String und gibt ihn anschließend aus.", code: 'Robot robin = new Robot();\nString robotName = robin.getName();\nSystem.out.println(robotName);\n<span class="attention-arrow">→ Robin</span>', character: "detective", caption: "Vom return bis zur Konsole." },
      { kicker: "06 · METHODENKETTE", title: "Eine Methode kann eine andere nutzen.", text: "sayHi() ruft getName() auf. Der Rückgabewert wird in me gespeichert und in einen Begrüßungssatz eingesetzt.", code: 'void sayHi() {\n  String me <span class="attention-arrow">=</span> <span class="concept-highlight attention-target">getName()</span>;\n  System.out.println(<span class="string">"Hi, ich bin "</span> + me);\n}\n<span class="attention-arrow">getName() → me → Ausgabe</span>', character: "robot", caption: "Rückgabewerte wandern durch den Code." },
      { kicker: "07 · VERKETTETE RÜCKGABE", title: "sayHi() kann selbst String liefern.", text: "Statt direkt auszugeben, kann sayHi() einen zusammengesetzten String zurückgeben. Die aufrufende Stelle entscheidet, was damit passiert.", code: '<span class="concept-highlight attention-target">String sayHi()</span> {\n  <span class="attention-arrow">return</span> <span class="string">"Hi, ich bin "</span> + getName();\n}\n<span class="attention-arrow">↳ Rückgabe: ein ganzer Satz</span>', character: "detective", caption: "Methoden können Ergebnisse verketteten." },
      { kicker: "KAPITEL 1.7 · ERGEBNIS", title: "Rückgabewerte verbinden Methoden.", text: "Du kannst Rückgabetypen wählen, return verwenden, Ergebnisse speichern und Methoden miteinander verbinden. Jetzt bist du bereit für eigene Methoden.", code: '<span class="concept-highlight attention-target">getName()</span> <span class="attention-arrow">→</span> <span class="concept-highlight attention-target">sayHi()</span> <span class="attention-arrow">→</span> <span class="concept-highlight attention-target">System.out.println()</span>\n\n<span class="attention-arrow">→ Hi, ich bin Robin</span>', character: "robot", caption: "Methoden mit Rückgabewerten verstanden!" }
    ]
  },
  chapter21: {
    label: "Kapitel 2.1 · Parameter",
    slides: [
      { kicker: "MODUL 2 · KAPITEL 2.1 · START", title: "Parameter geben Methoden Informationen.", text: "Parameter sind Variablen einer Methode. Beim Methodenaufruf werden sie mit konkreten Werten befüllt.", code: '<span class="concept-highlight attention-target">void speak</span>(<span class="concept-highlight attention-target">String input</span>) {\n  System.out.println(input);\n}\n<span class="attention-arrow">↳ input kommt beim Aufruf</span>', character: "robot", caption: "Methoden können Daten entgegennehmen." },
      { kicker: "01 · METHODENDEFINITION", title: "Der Parameter steht in der Definition.", text: "Die Syntax besteht aus Typ und Parameterbezeichner innerhalb der Klammern. Innerhalb der Methode greifst du über diesen Namen zu.", code: '<span class="concept-highlight attention-target">void speak</span>(<span class="concept-highlight attention-target">String input</span>) {\n  System.out.println(<span class="concept-highlight attention-target">input</span>);\n}\n<span class="attention-arrow">↳ Typ + Parametername</span>', character: "detective", caption: "Der Name ist innerhalb der Methode gültig." },
      { kicker: "02 · ARGUMENT", title: "Beim Aufruf wird ein Argument übergeben.", text: "Das Argument ist der konkrete Übergabewert. Der Parameter in der Definition und das Argument beim Aufruf gehören zusammen.", code: 'void speak(String input) { ... }\n\n<span class="concept-highlight attention-target">speak</span>(<span class="string attention-target">"Hallo"</span>);\n<span class="attention-arrow">↳ Parameter: input · Argument: "Hallo"</span>', character: "robot", caption: "Definition und Aufruf verbinden sich." },
      { kicker: "03 · TYPEN", title: "Parameter und Argument müssen zusammenpassen.", text: "Der Datentyp des Arguments muss dem Datentyp des Parameters entsprechen. String passt zu String, aber nicht zu int.", code: 'void speak(<span class="concept-highlight attention-target">String</span> input) { ... }\n\n<span class="concept-highlight attention-target">speak</span>(<span class="string attention-target">"Hallo"</span>); ✓\n<span class="concept-highlight attention-target">speak</span>(42); <span class="brace-guide">✕ falscher Typ</span>', character: "detective", caption: "Der Typ schützt die Methode." },
      { kicker: "04 · VARIABLE ALS ARGUMENT", title: "Auch eine Variable kann übergeben werden.", text: "Das Argument muss nicht direkt ein Textwert sein. Eine andere Variable kann den Wert liefern; ihre Namen müssen nicht gleich sein.", code: 'String text = <span class="string attention-target">"Hallo Paco"</span>;\n<span class="concept-highlight attention-target">speak</span>(<span class="concept-highlight attention-target">text</span>);\n<span class="attention-arrow">text → input</span>', character: "robot", caption: "Werte können weitergereicht werden." },
      { kicker: "05 · MEHRERE PARAMETER", title: "Methoden können mehrere Werte annehmen.", text: "Mehrere Parameter werden durch Kommata getrennt. Sie dürfen unterschiedliche Datentypen haben.", code: '<span class="concept-highlight attention-target">double add</span>(<span class="concept-highlight attention-target">int a, int b, double c</span>) {\n  return a + b + c;\n}\nadd(<span class="attention-arrow">3, 4, 1.1</span>);', character: "detective", caption: "Jeder Wert hat seine Position." },
      { kicker: "06 · REIHENFOLGE", title: "Anzahl und Reihenfolge müssen stimmen.", text: "Die Anzahl der Argumente muss der Anzahl der Parameter entsprechen. Die Reihenfolge und Datentypen müssen exakt passen.", code: 'add(<span class="concept-highlight attention-target">3, 4, 1.1</span>); ✓\nadd(<span class="brace-guide">3, 1.1</span>); ✕ zu wenige\nadd(<span class="brace-guide">1.1, 3, 4</span>); ✕ falsche Reihenfolge', character: "robot", caption: "Jeder Parameter erwartet seinen Platz." },
      { kicker: "07 · SCOPE", title: "Parameter haben einen Gültigkeitsbereich.", text: "Parameter sind nur innerhalb der Methode bekannt, in der sie definiert wurden. Geschweifte Klammern begrenzen den Gültigkeitsbereich.", code: 'void speak(<span class="concept-highlight attention-target">String input</span>) {\n  System.out.println(<span class="concept-highlight attention-target">input</span>); ✓\n}\n\nvoid say() {\n  System.out.println(<span class="brace-guide">input ✕ unbekannt</span>);\n}', character: "detective", caption: "Der Scope endet mit der Methode." },
      { kicker: "MODUL 2 · KAPITEL 2.1 · ERGEBNIS", title: "Parameter machen Methoden flexibel.", text: "Du kannst Werte übergeben, mehrere Parameter kombinieren und ihre Gültigkeitsbereiche verstehen. Damit werden Methoden wiederverwendbar.", code: '<span class="concept-highlight attention-target">Methode</span>(<span class="concept-highlight attention-target">Parameter</span>)\n<span class="attention-arrow">↓ Aufruf mit Argumenten</span>\n<span class="concept-highlight attention-target">flexibles Verhalten</span>', character: "robot", caption: "Bereit für Modul 2!" }
    ]
  },
  chapter22: {
    label: "Kapitel 2.2 · Boolean",
    slides: [
      { kicker: "MODUL 2 · KAPITEL 2.2 · START", title: "Boolean: wahr oder falsch.", text: "Der Datentyp boolean kann genau zwei Werte annehmen: true oder false. Damit überprüfst du Bedingungen.", code: '<span class="concept-highlight attention-target">boolean</span> mybool <span class="attention-arrow">=</span> <span class="concept-highlight attention-target">true</span>;\n<span class="brace-guide">↳ Zahlen wie 0 oder 1 sind kein boolean</span>', character: "robot", caption: "Entscheidungen beginnen mit zwei Möglichkeiten." },
      { kicker: "01 · NEGATION", title: "! dreht den Wahrheitswert um.", text: "Die Negation macht aus true false und aus false true.", code: '<span class="concept-highlight attention-target">!A</span>\n\nA: false  <span class="attention-arrow">→ !A: true</span>\nA: true   <span class="attention-arrow">→ !A: false</span>', character: "detective", caption: "Ein Ausrufezeichen kehrt die Aussage um." },
      { kicker: "02 · UND", title: "&& braucht zwei wahre Bedingungen.", text: "Bei UND ist das Ergebnis nur dann true, wenn beide Ausdrücke true sind.", code: '<span class="concept-highlight attention-target">A && B</span>\n\nfalse && false → false\nfalse && true  → false\ntrue  && false → false\ntrue  && true  <span class="attention-arrow">→ true</span>', character: "robot", caption: "Beide Türen müssen offen sein." },
      { kicker: "03 · ODER", title: "|| braucht mindestens eine Wahrheit.", text: "Bei ODER ist das Ergebnis true, sobald mindestens einer der beiden Ausdrücke true ist.", code: '<span class="concept-highlight attention-target">A || B</span>\n\nfalse || false → false\nfalse || true  <span class="attention-arrow">→ true</span>\ntrue  || false <span class="attention-arrow">→ true</span>\ntrue  || true  → true', character: "detective", caption: "Eine von zwei Bedingungen reicht." },
      { kicker: "04 · GLEICHHEIT", title: "== vergleicht Wahrheitswerte.", text: "Der Gleichheitsoperator liefert true, wenn beide Ausdrücke denselben Wahrheitswert haben.", code: '<span class="concept-highlight attention-target">A == B</span>\n\nfalse == false <span class="attention-arrow">→ true</span>\nfalse == true  → false\ntrue  == false → false\ntrue  == true  <span class="attention-arrow">→ true</span>\n<span class="brace-guide">Strings: equals() verwenden</span>', character: "robot", caption: "Gleich bedeutet: beide sind gleich." },
      { kicker: "05 · UNGLEICHHEIT", title: "!= findet Unterschiede.", text: "Der Operator != liefert true, wenn ein Ausdruck true und der andere false ist.", code: '<span class="concept-highlight attention-target">A != B</span>\n\nfalse != false → false\nfalse != true  <span class="attention-arrow">→ true</span>\ntrue  != false <span class="attention-arrow">→ true</span>\ntrue  != true  → false', character: "detective", caption: "Ungleich zeigt einen Unterschied." },
      { kicker: "06 · REIHENFOLGE", title: "Java wertet Operatoren in einer Reihenfolge aus.", text: "Die Negation kommt vor UND, UND kommt vor ODER. Klammern machen die beabsichtigte Reihenfolge sichtbar.", code: '<span class="attention-arrow">!</span> vor <span class="concept-highlight attention-target">&&</span> vor <span class="concept-highlight attention-target">||</span>\n\n! A && B  <span class="attention-arrow">→ (!A) && B</span>\nA || B && C <span class="attention-arrow">→ A || (B && C)</span>', character: "robot", caption: "Die Reihenfolge entscheidet." },
      { kicker: "07 · VERKNÜPFEN", title: "Komplexe Ausdrücke brauchen Zwischenschritte.", text: "Bei mehreren Operatoren helfen Hilfsspalten für Teilausdrücke. So wird jeder Schritt nachvollziehbar.", code: '<span class="concept-highlight attention-target">A || B && C</span>\n\n<span class="attention-arrow">D = B && C</span>\n<span class="attention-arrow">A || D → Ergebnis</span>', character: "detective", caption: "Erst den Teil, dann das Ganze." },
      { kicker: "MODUL 2 · KAPITEL 2.2 · ERGEBNIS", title: "Boolean macht Entscheidungen klar.", text: "Mit boolean und logischen Operatoren kannst du Bedingungen prüfen und komplexe Entscheidungen Schritt für Schritt auswerten.", code: '<span class="concept-highlight attention-target">true</span> · <span class="concept-highlight attention-target">false</span>\n<span class="attention-arrow">!  &&  ||  ==  !=</span>\n\n<span class="attention-arrow">→ Bereit für Bedingungen!</span>', character: "robot", caption: "Boolean verstanden!" }
    ]
  },
  chapter23: {
    label: "Kapitel 2.3 · Verzweigungen",
    slides: [
      { kicker: "MODUL 2 · KAPITEL 2.3 · START", title: "Verzweigungen treffen Entscheidungen.", text: "Eine Verzweigung wählt zwischen Szenarien. Sie basiert auf einer Bedingung, die true oder false ist.", code: '<span class="concept-highlight attention-target">if</span> (Bedingung) {\n  <span class="attention-arrow">// wenn true</span>\n} <span class="concept-highlight attention-target">else</span> {\n  <span class="attention-arrow">// wenn false</span>\n}', character: "robot", caption: "Boolean wird zu einer Entscheidung." },
      { kicker: "01 · IF", title: "if prüft die Bedingung.", text: "Hinter if steht die Bedingung in runden Klammern. Im Codeblock steht, was passiert, wenn sie erfüllt ist.", code: '<span class="concept-highlight attention-target">if</span> (<span class="concept-highlight attention-target">robin.isBatteryLow()</span>) {\n  robin.charge();\n}\n<span class="attention-arrow">↳ nur bei true</span>', character: "detective", caption: "Erst prüfen, dann handeln." },
      { kicker: "02 · ELSE", title: "else beschreibt den anderen Fall.", text: "Nach else steht der Codeblock für den Fall, dass die if-Bedingung nicht erfüllt ist. Hinter else kommen keine runden Klammern.", code: 'if (robin.isBatteryLow()) {\n  robin.charge();\n} <span class="concept-highlight attention-target">else</span> {\n  robin.doThings();\n}', character: "robot", caption: "Jede Entscheidung braucht einen Plan B." },
      { kicker: "03 · BEDINGUNG", title: "Bedingungen sind Boolean-Ausdrücke.", text: "Eine Bedingung liefert true oder false. Methoden wie isBatteryLow() können dadurch eine Verzweigung steuern.", code: '<span class="concept-highlight attention-target">boolean</span> low = robin.isBatteryLow();\n\nif (<span class="concept-highlight attention-target">low</span>) {\n  robin.charge();\n}', character: "detective", caption: "true oder false lenkt den Weg." },
      { kicker: "04 · ELSE IF", title: "else if prüft eine weitere Bedingung.", text: "Wenn die erste Bedingung falsch ist, kann else if eine zweite Bedingung prüfen. So entstehen mehrere Szenarien.", code: 'if (ampelGrün) {\n  <span class="attention-arrow">fahren();</span>\n} <span class="concept-highlight attention-target">else if</span> (ampelGelb) {\n  <span class="attention-arrow">bremsen();</span>\n}', character: "robot", caption: "Ein weiterer Weg wird geprüft." },
      { kicker: "05 · VERKETTETE BEDINGUNGEN", title: "Mehrere Bedingungen können zusammenarbeiten.", text: "Mit && müssen beide Bedingungen wahr sein, bevor der erste Codeblock ausgeführt wird.", code: '<span class="concept-highlight attention-target">if</span> (robin.isBatteryLow() <span class="attention-arrow">&&</span> robin.isInDockingStation()) {\n  robin.chargeBattery();\n}', character: "detective", caption: "Beide Bedingungen müssen stimmen." },
      { kicker: "06 · REIHENFOLGE", title: "Das Programm arbeitet von oben nach unten.", text: "else if wird nur geprüft, wenn if falsch war. else läuft nur, wenn auch alle else-if-Bedingungen falsch waren.", code: '<span class="attention-arrow">1.</span> if prüfen\n<span class="attention-arrow">2.</span> else if prüfen\n<span class="attention-arrow">3.</span> else ausführen\n\n<span class="brace-guide">↳ Der erste passende Weg gewinnt</span>', character: "robot", caption: "Die Reihenfolge bestimmt den Weg." },
      { kicker: "MODUL 2 · KAPITEL 2.3 · ERGEBNIS", title: "Verzweigungen machen Programme intelligent.", text: "Mit if, else if, else und Boolean-Bedingungen kann dein Programm auf Situationen reagieren und passende Aktionen auswählen.", code: '<span class="concept-highlight attention-target">Bedingung</span>\n<span class="attention-arrow">↓</span>\n<span class="concept-highlight attention-target">passende Aktion</span>\n\n<span class="attention-arrow">→ Bereit für Kontrollstrukturen!</span>', character: "detective", caption: "Kontrollstrukturen verstanden!" }
    ]
  },
  chapter24: {
    label: "Kapitel 2.4 · Schleifen",
    slides: [
      { kicker: "MODUL 2 · KAPITEL 2.4 · START", title: "Schleifen wiederholen Code.", text: "Eine Schleife führt denselben Code mehrmals aus, ohne ihn mehrfach schreiben zu müssen. Sie besteht aus Kopf, Bedingung und Rumpf.", code: '<span class="concept-highlight attention-target">Schleife</span> = Kopf + Bedingung + Rumpf\n\n<span class="attention-arrow">↻ wiederholen, solange die Bedingung gilt</span>', character: "robot", caption: "Einmal schreiben, mehrfach ausführen." },
      { kicker: "01 · FOR", title: "for zählt Durchläufe.", text: "Die Zählschleife eignet sich, wenn du eine bekannte Anzahl von Wiederholungen brauchst.", code: '<span class="concept-highlight attention-target">for</span> (int i = 0; i < 3; i++) {\n  System.out.println(<span class="string">"Zeile "</span> + i);\n}', character: "detective", caption: "Drei Durchläufe, ein Schleifenkopf." },
      { kicker: "02 · SCHLEIFENKOPF", title: "Drei Teile steuern for.", text: "Initialisierung setzt den Zähler, die Abbruchbedingung wird geprüft und die Schrittweite verändert den Zähler.", code: 'for (<span class="concept-highlight attention-target">int i = 0</span>; <span class="concept-highlight attention-target">i < 3</span>; <span class="concept-highlight attention-target">i++</span>) {\n  // Schleifenrumpf\n}\n<span class="attention-arrow">↳ Start · Prüfung · Schritt</span>', character: "robot", caption: "Jeder Teil hat eine Aufgabe." },
      { kicker: "03 · AUSGABE", title: "for erzeugt Zeile 0, 1 und 2.", text: "Vor jedem Durchlauf prüft Java i < 3. Nach jedem Durchlauf wird i um eins erhöht.", code: 'for (int i = 0; i < 3; i++) {\n  System.out.println(<span class="string">"Zeile "</span> + i);\n}\n<span class="attention-arrow">→ Zeile 0 · Zeile 1 · Zeile 2</span>', character: "detective", caption: "Der Zähler zeigt den Fortschritt." },
      { kicker: "04 · WHILE", title: "while prüft vor jedem Durchlauf.", text: "Die while-Schleife führt den Rumpf solange aus, wie die Bedingung true ist. Die Bedingung wird am Anfang geprüft.", code: '<span class="concept-highlight attention-target">while</span> (<span class="concept-highlight attention-target">i < j</span>) {\n  // Schleifenrumpf\n  <span class="attention-arrow">i oder j verändern</span>\n}', character: "robot", caption: "Erst prüfen, dann ausführen." },
      { kicker: "05 · WHILE UND FOR", title: "while kann for nachbilden.", text: "Initialisiere die Variable vor der Schleife und verändere sie im Rumpf. So entsteht dieselbe Funktion wie bei for.", code: 'int i = 0;\n<span class="concept-highlight attention-target">while (i < 3)</span> {\n  // Schleifenrumpf\n  <span class="concept-highlight attention-target">i++</span>;\n}', character: "detective", caption: "Zähler und Bedingung bleiben sichtbar." },
      { kicker: "06 · ENDLOSSCHLEIFE", title: "Die Bedingung muss sich verändern.", text: "Wenn die Bedingung immer true bleibt, endet die Schleife nicht. Achte darauf, dass der Zustand im Rumpf vorankommt.", code: 'int i = 0;\nwhile (i < 3) {\n  <span class="attention-arrow">i++;</span> ✓\n}\n<span class="brace-guide">↳ ohne Veränderung: Endlosschleife</span>', character: "robot", caption: "Jeder Durchlauf braucht Fortschritt." },
      { kicker: "07 · DO WHILE", title: "do while läuft mindestens einmal.", text: "Bei do while wird die Bedingung erst nach dem ersten Durchlauf geprüft. Der Rumpf wird daher mindestens einmal ausgeführt.", code: '<span class="concept-highlight attention-target">do</span> {\n  // Schleifenrumpf\n} <span class="concept-highlight attention-target">while (i < j)</span>;\n<span class="attention-arrow">↳ erst ausführen, dann prüfen</span>', character: "detective", caption: "Ein Durchlauf ist garantiert." },
      { kicker: "MODUL 2 · KAPITEL 2.4 · ERGEBNIS", title: "Die richtige Schleife für jeden Fall.", text: "for zählt bekannte Wiederholungen, while prüft vorher und do while führt mindestens einmal aus. Jetzt kannst du Wiederholungen planen.", code: '<span class="concept-highlight attention-target">for</span> · <span class="concept-highlight attention-target">while</span> · <span class="concept-highlight attention-target">do while</span>\n\n<span class="attention-arrow">→ Bereit für Schleifen!</span>', character: "robot", caption: "Kontrollstrukturen werden wiederholbar." }
    ]
  },
  chapter25: {
    label: "Kapitel 2.5 · Primitive Arrays",
    slides: [
      { kicker: "MODUL 2 · KAPITEL 2.5 · START", title: "Arrays speichern gleichartige Werte.", text: "Ein Array ist ein Container für Werte desselben Datentyps. Die eckigen Klammern markieren das Array.", code: '<span class="concept-highlight attention-target">int[] numbers</span>\n<span class="attention-arrow">↳ Stellplätze für gleichartige Werte</span>\n\n<span class="brace-guide">Wie eine Garage: nummerierte Plätze</span>', character: "robot", caption: "Ein Container mit festen Plätzen." },
      { kicker: "01 · DEKLARATION", title: "Ein Array bekommt einen Namen.", text: "Die Deklaration sagt Java, dass es ein Array-Objekt mit diesem Namen gibt. Der Datentyp legt fest, welche Werte hineinpassen.", code: '<span class="concept-highlight attention-target">int[] numbers;</span>\n<span class="attention-arrow">↳ Deklaration: Das Objekt wird benannt</span>', character: "detective", caption: "Typ und Name bilden die Adresse." },
      { kicker: "02 · INITIALISIERUNG", title: "new reserviert die Größe.", text: "Mit new int[5] wird ein Array mit fünf Plätzen erzeugt. Deklaration und Initialisierung können auch zusammenstehen.", code: '<span class="concept-highlight attention-target">int[] numbers</span> <span class="attention-arrow">= new</span> <span class="concept-highlight attention-target">int[5]</span>;\n<span class="brace-guide">↳ fünf Plätze werden reserviert</span>', character: "robot", caption: "Jetzt existieren die Plätze." },
      { kicker: "03 · INDEX", title: "Java zählt ab 0.", text: "Der erste Platz hat den Index 0. Über den Index weist du Werte zu und liest sie wieder aus.", code: 'int[] numbers = new int[5];\n<span class="concept-highlight attention-target">numbers[0]</span> = 6;\n<span class="concept-highlight attention-target">numbers[1]</span> = 33;\n<span class="attention-arrow">↳ erster Platz ist 0</span>', character: "detective", caption: "Der Index zeigt auf einen Platz." },
      { kicker: "04 · INITIALWERTE", title: "Arrays können direkt Werte erhalten.", text: "Die Werte können direkt bei der Deklaration angegeben werden. Ein primitives Array hat eine feste Größe.", code: '<span class="concept-highlight attention-target">int[] numbers</span> = {<span class="attention-target">6, 33, 9, 0, 503</span>};\n<span class="brace-guide">↳ fünf Werte, fünf Plätze</span>', character: "robot", caption: "Alle Werte auf einen Blick." },
      { kicker: "05 · FESTE GRÖSSE", title: "Primitive Arrays wachsen nicht automatisch.", text: "Die Größe wird bei der Initialisierung festgelegt. Primitive Arrays können später keine weiteren Elemente anhängen.", code: 'int[] numbers = new int[5];\n<span class="concept-highlight attention-target">Größe: 5</span>\n<span class="attention-arrow">↳ keine dynamische Erweiterung</span>', character: "detective", caption: "Plane die Anzahl der Plätze." },
      { kicker: "06 · LENGTH", title: "length liefert die Anzahl.", text: "Mit arrayName.length fragst du ab, wie viele Elemente das Array besitzt. Das ist besonders nützlich für Schleifen.", code: 'String[] words = {<span class="string">"Hallo"</span>, <span class="string">"Huhu"</span>, <span class="string">"Na?"</span>};\n<span class="concept-highlight attention-target">words.length</span> <span class="attention-arrow">→ 3</span>', character: "robot", caption: "length kennt die Array-Grenze." },
      { kicker: "07 · ARRAYS UND SCHLEIFEN", title: "Eine Schleife besucht jeden Platz.", text: "Mit for und words.length kannst du alle Werte nacheinander ausgeben. words[i] greift auf den aktuellen Platz zu.", code: 'for (int i = 0; i < <span class="concept-highlight attention-target">words.length</span>; i++) {\n  System.out.println(<span class="concept-highlight attention-target">words[i]</span>);\n}\n<span class="attention-arrow">→ Hallo · Huhu · Na?</span>', character: "detective", caption: "Index und Schleife arbeiten zusammen." },
      { kicker: "MODUL 2 · KAPITEL 2.5 · ERGEBNIS", title: "Arrays organisieren viele Werte.", text: "Du kannst Arrays deklarieren, initialisieren, über Indizes ansprechen und mit Schleifen durchlaufen. Damit ist Modul 2.5 abgeschlossen.", code: '<span class="concept-highlight attention-target">Array</span> + <span class="concept-highlight attention-target">Index</span> + <span class="concept-highlight attention-target">length</span>\n\n<span class="attention-arrow">→ Bereit für Arrays!</span>', character: "robot", caption: "Viele Werte, klare Struktur." }
    ]
  },
  chapter26: {
    label: "Kapitel 2.6 · Konstruktoren",
    slides: [
      { kicker: "MODUL 2 · KAPITEL 2.6 · START", title: "new ruft den Konstruktor auf.", text: "Wenn du new Robot() schreibst, ruft Java den Konstruktor der Klasse auf. Konstruktoren erzeugen Objekte.", code: '<span class="attention-arrow">new</span> <span class="concept-highlight attention-target">Robot()</span>\n<span class="attention-arrow">↓</span>\n<span class="concept-highlight attention-target">Objekt der Klasse Robot</span>', character: "robot", caption: "Der Bauplan wird initialisiert." },
      { kicker: "01 · SYNTAX", title: "Ein Konstruktor heißt wie die Klasse.", text: "Ein Konstruktor hat keinen Rückgabetyp. Sein Name entspricht exakt dem Klassennamen.", code: '<span class="concept-highlight attention-target">class Robot</span> {\n  String name;\n\n  <span class="concept-highlight attention-target">Robot()</span> {\n    // Initialisierung\n  }\n}', character: "detective", caption: "Gleicher Name, besondere Aufgabe." },
      { kicker: "02 · THIS", title: "this meint dieses Objekt.", text: "Mit this greifst du auf Attribute des aktuellen Objekts zu. So wird der Startwert im Konstruktor gesetzt.", code: 'Robot() {\n  <span class="concept-highlight attention-target">this.name</span> <span class="attention-arrow">=</span> <span class="string attention-target">"Standard-Name"</span>;\n}', character: "robot", caption: "this zeigt auf das aktuelle Objekt." },
      { kicker: "03 · PARAMETER", title: "Konstruktoren können Werte erhalten.", text: "Ein Konstruktor kann Parameter verwenden, um ein Objekt direkt mit individuellen Daten zu erzeugen.", code: '<span class="concept-highlight attention-target">Robot(String userDefinedName)</span> {\n  this.name = <span class="concept-highlight attention-target">userDefinedName</span>;\n}\n\nnew Robot(<span class="string attention-target">"Robert"</span>);', character: "detective", caption: "Der Name kommt beim Erzeugen mit." },
      { kicker: "04 · GLEICHE NAMEN", title: "Parameter und Attribut dürfen gleich heißen.", text: "Mit this unterscheidest du das Attribut der Klasse vom Parameter des Konstruktors.", code: '<span class="concept-highlight attention-target">Robot(String name)</span> {\n  <span class="concept-highlight attention-target">this.name</span> <span class="attention-arrow">=</span> name;\n}\n<span class="brace-guide">↳ this.name = Attribut</span>', character: "robot", caption: "this löst die Namensverwechslung." },
      { kicker: "05 · MEHRERE PARAMETER", title: "Ein Konstruktor kann mehrere Werte setzen.", text: "Mehrere Parameter werden durch Kommata getrennt. So entstehen vollständig beschriebene Objekte.", code: '<span class="concept-highlight attention-target">Robot(String userDefinedName, int aNumber)</span> {\n  this.name = userDefinedName;\n  this.numberOfEyes = aNumber;\n}\nnew Robot(<span class="string">"Ronja"</span>, <span class="concept-highlight attention-target">2</span>);', character: "detective", caption: "Name und Augen werden gemeinsam gesetzt." },
      { kicker: "06 · DEFAULT", title: "Der Default-Konstruktor ist unsichtbar.", text: "Wenn du keinen Konstruktor selbst definierst, existiert ein parameterloser Default-Konstruktor. Attribute erhalten ihre Standardwerte.", code: '<span class="attention-arrow">implizit:</span>\n<span class="concept-highlight attention-target">Robot()</span> {\n}\n\nint <span class="attention-arrow">→ 0</span> · String <span class="attention-arrow">→ null</span>', character: "robot", caption: "Java hilft im Hintergrund." },
      { kicker: "MODUL 2 · KAPITEL 2.6 · ERGEBNIS", title: "Konstruktoren geben Objekten einen Startzustand.", text: "Mit new, Parametern, this und Defaultwerten kannst du Objekte kontrolliert erzeugen und initialisieren.", code: '<span class="concept-highlight attention-target">new</span> → <span class="concept-highlight attention-target">Konstruktor</span> → <span class="concept-highlight attention-target">Objekt</span>\n\n<span class="attention-arrow">→ Bereit für Konstruktoren!</span>', character: "detective", caption: "Objekte mit Startzustand verstanden." }
    ]
  },
  chapter31: {
    label: "Kapitel 3.1 · Vererbung",
    slides: [
      { kicker: "MODUL 3 · KAPITEL 3.1 · START", title: "Vererbung verbindet Klassen.", text: "Eine Subklasse übernimmt gemeinsame Eigenschaften und Verhalten von einer Superklasse. So vermeidest du doppelte Logik.", code: '<span class="concept-highlight attention-target">Bird</span>\n  ↑\n<span class="concept-highlight attention-target">Parrot</span> · <span class="concept-highlight attention-target">Penguin</span>', character: "robot", caption: "Ein Papagei ist ein Vogel." },
      { kicker: "01 · SUPERKLASSE", title: "Die Superklasse beschreibt Gemeinsames.", text: "Bird kann Attribute und Methoden bereitstellen, die mehrere Vogelarten benötigen.", code: '<span class="concept-highlight attention-target">class Bird</span> {\n  String name;\n\n  void sayHello() { }\n}', character: "detective", caption: "Gemeinsames kommt nach oben." },
      { kicker: "02 · EXTENDS", title: "extends legt die Vererbung fest.", text: "Mit extends wird Parrot als Subklasse von Bird angelegt.", code: 'class Bird { }\n\n<span class="concept-highlight attention-target">class Parrot extends Bird</span> {\n}', character: "robot", caption: "Die Subklasse erhält den Bauplan." },
      { kicker: "03 · ÜBERNOMMEN", title: "Geerbte Elemente sind direkt nutzbar.", text: "Parrot besitzt implizit das Attribut name und die Methode sayHello() von Bird.", code: 'Parrot paco = new Parrot();\n<span class="concept-highlight attention-target">paco.name</span> = <span class="string">"Paco"</span>;\n<span class="concept-highlight attention-target">paco.sayHello()</span>;', character: "detective", caption: "Geerbtes Verhalten bleibt verfügbar." },
      { kicker: "04 · ERWEITERN", title: "Subklassen dürfen Neues ergänzen.", text: "Eine Subklasse kann eigene Attribute und Methoden hinzufügen.", code: 'class Parrot extends Bird {\n  <span class="concept-highlight attention-target">String featherColor</span>;\n\n  void fly() { }\n}', character: "robot", caption: "Spezialisierung ergänzt das Gemeinsame." },
      { kicker: "05 · OVERRIDE", title: "Override verändert geerbtes Verhalten.", text: "Mit @Override überschreibt eine Subklasse eine geerbte Methode und passt sie an.", code: 'class Parrot extends Bird {\n  <span class="concept-highlight attention-target">@Override</span>\n  void sayHello() {\n    System.out.println(<span class="string">"Hallo!"</span>);\n  }\n}', character: "detective", caption: "Gleiche Methode, individuelles Verhalten." },
      { kicker: "06 · KETTE", title: "Vererbung kann über mehrere Ebenen laufen.", text: "Ein Parrot ist ein Bird und damit transitiv auch ein Animal. Die Beziehung zeigt eine Is-a-Kette.", code: '<span class="concept-highlight attention-target">Animal</span>\n   ↑\n<span class="concept-highlight attention-target">Bird</span>\n   ↑\n<span class="concept-highlight attention-target">Parrot</span>', character: "robot", caption: "Die Kette vererbt nach unten." },
      { kicker: "MODUL 3 · KAPITEL 3.1 · ERGEBNIS", title: "Vererbung läuft nur in eine Richtung.", text: "Ein Papagei ist ein Vogel. Aber ein Vogel ist nicht automatisch ein Papagei. Superklassen stehen über ihren Subklassen.", code: '<span class="concept-highlight attention-target">Parrot extends Bird</span> ✓\n\n<span class="attention-arrow">Bird extends Parrot</span> ✕', character: "detective", caption: "Die Richtung der Beziehung zählt." }
    ]
  },
  chapter32: {
    label: "Kapitel 3.2 · Sichtbarkeiten",
    slides: [
      { kicker: "MODUL 3 · KAPITEL 3.2 · START", title: "Sichtbarkeit steuert den Zugriff.", text: "Sichtbare Elemente können gelesen oder verändert werden. Innerhalb der eigenen Klasse sind alle Elemente sichtbar.", code: '<span class="concept-highlight attention-target">public</span> · <span class="concept-highlight attention-target">protected</span> · <span class="concept-highlight attention-target">default</span> · <span class="concept-highlight attention-target">private</span>', character: "robot", caption: "Du entscheidest, wer zugreifen darf." },
      { kicker: "01 · PUBLIC", title: "public bedeutet uneingeschränkt.", text: "Auf ein public Element kann von überall zugegriffen werden. Öffentliche Methoden sind häufig sinnvoller als öffentliche Attribute.", code: 'public class Parrot {\n  <span class="concept-highlight attention-target">public String name;</span>\n}\n\npaco.name = <span class="string">"Paco"</span>;', character: "detective", caption: "Der Zugriff ist überall möglich." },
      { kicker: "02 · PROTECTED", title: "protected schützt mit Ausnahmen.", text: "protected erlaubt Zugriff in der eigenen Klasse, im Package und in Subklassen.", code: 'class Parrot {\n  <span class="concept-highlight attention-target">protected String favoriteFood;</span>\n}', character: "robot", caption: "Subklassen dürfen das Erbe nutzen." },
      { kicker: "03 · DEFAULT", title: "Default gilt im Package.", text: "Wenn kein Sichtbarkeitswort angegeben ist, gilt Package-Sichtbarkeit: Klassen desselben Packages dürfen zugreifen.", code: 'class Parrot {\n  <span class="concept-highlight attention-target">String name;</span>\n  // default / package\n}', character: "detective", caption: "Kein Wort heißt nicht überall." },
      { kicker: "04 · PRIVATE", title: "private bleibt in der Klasse.", text: "Private Elemente sind von außen nicht zugänglich. Nur die Klasse selbst darf sie lesen oder verändern.", code: 'class Parrot {\n  <span class="concept-highlight attention-target">private String name;</span>\n}\n\n// außerhalb: nicht sichtbar', character: "robot", caption: "Die stärkste direkte Abschirmung." },
      { kicker: "05 · VERERBUNG", title: "Sichtbarkeit beeinflusst Vererbung.", text: "public und protected Elemente werden weitervererbt. Default bleibt im Package, private wird nicht weitervererbt.", code: '<span class="concept-highlight attention-target">public</span>      ✓ weitervererbt\n<span class="concept-highlight attention-target">protected</span>   ✓ weitervererbt\n<span class="concept-highlight attention-target">default</span>     ↳ Package\n<span class="concept-highlight attention-target">private</span>     ✕', character: "detective", caption: "Zugriff und Vererbung hängen zusammen." },
      { kicker: "MODUL 3 · KAPITEL 3.2 · ERGEBNIS", title: "Wähle Sichtbarkeit bewusst.", text: "public öffnet, protected teilt gezielt, default begrenzt auf das Package und private kapselt innerhalb der Klasse.", code: '<span class="attention-arrow">offen</span> public → protected → default → <span class="concept-highlight attention-target">private</span> <span class="attention-arrow">geschützt</span>', character: "robot", caption: "Sichtbarkeit ist ein Designwerkzeug." }
    ]
  },
  chapter33: {
    label: "Kapitel 3.3 · Kapselung",
    slides: [
      { kicker: "MODUL 3 · KAPITEL 3.3 · START", title: "Kapselung schützt den Zustand.", text: "Direkter Zugriff von außen kann Attribute unkontrolliert verändern. Kapselung schützt Werte und Regeln.", code: 'class Parrot {\n  <span class="concept-highlight attention-target">private</span> String name;\n  <span class="concept-highlight attention-target">private</span> int age;\n}', character: "robot", caption: "Der Zustand bleibt unter Kontrolle." },
      { kicker: "01 · GETTER", title: "Ein Getter erlaubt Lesen.", text: "Ein public Getter gibt einen kontrollierten Lesezugriff auf ein privates Attribut.", code: 'private String name;\n\n<span class="concept-highlight attention-target">public String getName()</span> {\n  return this.name;\n}', character: "detective", caption: "Lesen ja, direkt verändern nein." },
      { kicker: "02 · SETTER", title: "Ein Setter erlaubt Schreiben.", text: "Ein public Setter kann einen neuen Wert annehmen und ihn kontrolliert speichern.", code: 'public void <span class="concept-highlight attention-target">setName(String value)</span> {\n  this.name = value;\n}', character: "robot", caption: "Schreiben läuft durch eine Tür." },
      { kicker: "03 · GETTER UND SETTER", title: "Zugriff kann getrennt werden.", text: "Du kannst Lesen und Schreiben unabhängig erlauben: Getter und Setter sind optional.", code: 'getName() <span class="attention-arrow">→ lesen</span>\nsetName(value) <span class="attention-arrow">→ schreiben</span>\n\n<span class="concept-highlight attention-target">private</span> name', character: "detective", caption: "Die API bestimmt die Rechte." },
      { kicker: "04 · VALIDIERUNG", title: "Setter können Werte prüfen.", text: "Kapselung ermöglicht Regeln: Ein Alter darf zum Beispiel nicht kleiner als eins werden.", code: 'public void setAge(int newAge) {\n  if (newAge > 0) {\n    this.age = newAge;\n  } else {\n    this.age = <span class="concept-highlight attention-target">1</span>;\n  }\n}', character: "robot", caption: "Ungültige Werte werden abgefangen." },
      { kicker: "05 · MODULARISIERUNG", title: "Die Implementierung darf sich ändern.", text: "Andere Klassen arbeiten mit der öffentlichen Schnittstelle. Die interne Umsetzung kann angepasst werden, ohne sie zu stören.", code: 'public void enableStealthMode() {\n  stealthMode = true;\n  <span class="concept-highlight attention-target">this.log()</span>;\n}\n\nprivate void log() { }', character: "detective", caption: "Innen flexibel, außen stabil." },
      { kicker: "MODUL 3 · KAPITEL 3.3 · ERGEBNIS", title: "Kapselung macht Klassen verlässlich.", text: "Private Attribute, kontrollierte Methoden und Validierung schützen den Zustand und fördern Modularisierung.", code: '<span class="concept-highlight attention-target">private Zustand</span>\n        ↓\n<span class="concept-highlight attention-target">public Schnittstelle</span>\n        ↓\n<span class="attention-arrow">sicherere Zusammenarbeit</span>', character: "robot", caption: "Verstecken, kontrollieren, stabil bleiben." }
    ]
  },
  chapter34: {
    label: "Kapitel 3.4 · Überschreiben von Methoden (Override)",
    slides: [
      { kicker: "MODUL 3 · KAPITEL 3.4 · START", title: "Override passt geerbte Methoden an.", text: "Eine Subklasse kann eine Methode der Superklasse überschreiben und ihr eigenes Verhalten definieren.", code: 'class Bird {\n  public void <span class="concept-highlight attention-target">move()</span> {\n    System.out.println(<span class="string">"Ich bewege mich"</span>);\n  }\n}', character: "robot", caption: "Gemeinsames Verhalten bekommt eine Spezialisierung." },
      { kicker: "01 · OVERRIDE", title: "Parrot bewegt sich anders.", text: "Parrot überschreibt move() und ruft stattdessen seine eigene Methode fly() auf.", code: 'class Parrot extends Bird {\n  <span class="concept-highlight attention-target">@Override</span>\n  public void move() {\n    <span class="concept-highlight attention-target">this.fly()</span>;\n  }\n}', character: "detective", caption: "Die Subklasse entscheidet ihr Verhalten." },
      { kicker: "02 · SUPER", title: "super ruft die Superklasse auf.", text: "Mit super.move() kann die überschreibende Methode zuerst das Verhalten der Superklasse ausführen.", code: 'public void move() {\n  <span class="concept-highlight attention-target">super.move()</span>;\n  this.fly();\n}', character: "robot", caption: "Erweitern statt vollständig ersetzen." },
      { kicker: "03 · THIS UND SUPER", title: "this und super zeigen in verschiedene Richtungen.", text: "this greift auf die eigene Klasse zu. super greift auf die geerbte Implementierung der Superklasse zu.", code: '<span class="concept-highlight attention-target">this.fly()</span>  → eigene Klasse\n<span class="concept-highlight attention-target">super.move()</span> → Superklasse', character: "detective", caption: "Die Referenz macht die Herkunft klar." },
      { kicker: "04 · KONVENTION", title: "@Override macht die Absicht sichtbar.", text: "Die Annotation signalisiert, dass eine geerbte Methode überschrieben wird. Java kann dadurch Fehler in der Signatur erkennen.", code: '<span class="concept-highlight attention-target">@Override</span>\npublic void move() {\n  // neues Verhalten\n}', character: "robot", caption: "Eine klare Markierung für Leser und Compiler." },
      { kicker: "05 · REGELN", title: "Die Signatur muss kompatibel bleiben.", text: "Parameter müssen exakt gleich bleiben, der Rückgabetyp kompatibel sein und die Sichtbarkeit darf nicht stärker eingeschränkt werden.", code: 'move(<span class="concept-highlight attention-target">int distance</span>) { }\n↓ überschreiben mit\nmove(<span class="concept-highlight attention-target">int distance</span>) { }\n\n<span class="attention-arrow">gleiche Parameter</span>', character: "detective", caption: "Override ist kein neues beliebiges Verfahren." },
      { kicker: "06 · POLYMORPHIE", title: "Die speziellste Methode gewinnt.", text: "Wird sayHello() auf einem Parrot-Objekt aufgerufen, verwendet Java die speziellste passende Implementierung.", code: 'Parrot paco = new Parrot();\n<span class="concept-highlight attention-target">paco.sayHello()</span>;\n\n<span class="attention-arrow">→ Parrot.sayHello()</span>', character: "robot", caption: "Das Objekt bestimmt das konkrete Verhalten." },
      { kicker: "MODUL 3 · KAPITEL 3.4 · ERGEBNIS", title: "Override macht Vererbung flexibel.", text: "Mit @Override, super und this kannst du geerbtes Verhalten gezielt ersetzen oder erweitern.", code: '<span class="concept-highlight attention-target">@Override</span>\n<span class="concept-highlight attention-target">super</span> + <span class="concept-highlight attention-target">this</span>\n\n<span class="attention-arrow">→ speziellstes Verhalten</span>', character: "detective", caption: "Vererbung wird zu spezialisiertem Verhalten." }
    ]
  },
  chapter35: {
    label: "Kapitel 3.5 · Überladen von Methoden (Overload)",
    slides: [
      { kicker: "MODUL 3 · KAPITEL 3.5 · START", title: "Overload nutzt denselben Namen mehrfach.", text: "Mehrere Methoden innerhalb einer Klasse dürfen denselben Namen tragen, wenn ihre Parameterlisten unterschiedlich sind.", code: 'int <span class="concept-highlight attention-target">sum(int x, int y)</span> { return x + y; }\nint <span class="concept-highlight attention-target">sum(int x, int y, int z)</span> { return x + y + z; }', character: "robot", caption: "Der Name bleibt, die Parameter unterscheiden sich." },
      { kicker: "01 · PARAMETERLISTE", title: "Anzahl und Typen machen den Unterschied.", text: "Eine Überladung braucht eine andere Anzahl oder andere Datentypen in der Parameterliste.", code: 'int sum(<span class="concept-highlight attention-target">int, int</span>) { }\nint sum(<span class="concept-highlight attention-target">int, int, int</span>) { }\ndouble sum(<span class="concept-highlight attention-target">double, double</span>) { }', character: "detective", caption: "Die Signatur zeigt die Variante." },
      { kicker: "02 · KEINE ÜBERLADUNG", title: "Parameterbezeichner reichen nicht.", text: "Wenn sich nur die Namen der Parameter ändern, bleibt die Parameterliste gleich. Das ist keine gültige Überladung.", code: 'int sum(int <span class="attention-target">x</span>, int <span class="attention-target">y</span>) { }\nint sum(int <span class="attention-target">c</span>, int <span class="attention-target">d</span>) { }\n\n<span class="attention-arrow">✕ gleiche Parameterliste</span>', character: "robot", caption: "Namen sind für die Signatur nicht entscheidend." },
      { kicker: "03 · RÜCKGABETYP", title: "Nur der Rückgabetyp reicht nicht.", text: "Zwei Methoden mit gleicher Parameterliste können nicht allein durch int und double unterschieden werden.", code: 'int sum(int x, int y) { }\ndouble sum(int x, int y) { }\n\n<span class="attention-arrow">✕ Rückgabetyp allein genügt nicht</span>', character: "detective", caption: "Java braucht eine andere Parameterliste." },
      { kicker: "04 · AUSWAHL", title: "Java wählt die beste Übereinstimmung.", text: "Beim Aufruf vergleicht Java die Argumente mit den verfügbaren Parameterlisten und nimmt die passendste Methode.", code: 'sum(<span class="concept-highlight attention-target">2, 4</span>)       → int sum(int, int)\nsum(<span class="concept-highlight attention-target">2.0, 4.0</span>) → double sum(double, double)\nsum(<span class="concept-highlight attention-target">2, 4, 6</span>) → int sum(int, int, int)', character: "robot", caption: "Die Argumente entscheiden." },
      { kicker: "05 · JAVA API", title: "print ist ein praktisches Beispiel.", text: "Die Java-API überlädt print für int, String und char[]. Der Methodenname bleibt verständlich.", code: 'void <span class="concept-highlight attention-target">print(int arg)</span> { }\nvoid <span class="concept-highlight attention-target">print(String arg)</span> { }\nvoid <span class="concept-highlight attention-target">print(char[] arg)</span> { }', character: "detective", caption: "Eine Schnittstelle, mehrere passende Varianten." },
      { kicker: "06 · VERGLEICH", title: "Overload und Override sind verschieden.", text: "Overload findet innerhalb einer Klasse mit verschiedenen Parameterlisten statt. Override ersetzt geerbtes Verhalten mit gleicher Signatur.", code: '<span class="concept-highlight attention-target">Overload</span>\ngleicher Name + andere Parameter\n\n<span class="concept-highlight attention-target">Override</span>\nSuperklasse → Subklasse + gleiche Parameter', character: "robot", caption: "Ähnliche Wörter, unterschiedliche Konzepte." },
      { kicker: "MODUL 3 · KAPITEL 3.5 · ERGEBNIS", title: "Überladung hält APIs klar.", text: "Du kannst einen passenden Methodennamen wiederverwenden und trotzdem unterschiedliche Argumente verarbeiten.", code: '<span class="concept-highlight attention-target">sum(...)</span>\n\n<span class="attention-arrow">→ beste Übereinstimmung</span>\n<span class="attention-arrow">→ klare Methodenaufrufe</span>', character: "detective", caption: "Ein Name, mehrere präzise Varianten." }
    ]
  },
  chapter36: {
    label: "Kapitel 3.6 · Abstrakte Klassen",
    slides: [
      { kicker: "MODUL 3 · KAPITEL 3.6 · START", title: "Manche Klassen sind nur Baupläne.", text: "Nicht jede Klasse soll direkt instanziiert werden. Eine abstrakte Klasse beschreibt gemeinsame Grundlagen für konkrete Subklassen.", code: 'Parrot paco = new Parrot(); ✓\nRobot ronja = new Robot(); ✓\n<span class="concept-highlight attention-target">Animal animal = new Animal();</span> ✕', character: "robot", caption: "Der allgemeine Bauplan bleibt abstrakt." },
      { kicker: "01 · ABSTRACT", title: "Das Schlüsselwort heißt abstract.", text: "Mit abstract markierst du eine Klasse als abstrakt. Von ihr können keine direkten Objekte erzeugt werden.", code: '<span class="concept-highlight attention-target">abstract</span> public class Animal {\n  String name;\n\n  public void move() { }\n}', character: "detective", caption: "abstract verhindert direkte Instanzen." },
      { kicker: "02 · KONKRETE SUBKLASSEN", title: "Subklassen machen den Bauplan nutzbar.", text: "Eine abstrakte Klasse muss von einer Subklasse erweitert werden, bevor konkrete Objekte entstehen können.", code: '<span class="concept-highlight attention-target">abstract class Animal</span> { }\n\nclass Bird <span class="attention-arrow">extends</span> Animal { }\n\nnew Bird(); ✓', character: "robot", caption: "Die Spezialisierung wird konkret." },
      { kicker: "03 · ABSTRAKTE SUBKLASSE", title: "Auch Subklassen können abstrakt bleiben.", text: "Eine Subklasse einer abstrakten Klasse darf selbst abstrakt sein und weitere gemeinsame Grundlagen ergänzen.", code: '<span class="concept-highlight attention-target">abstract class Bird</span>\n  extends Animal {\n  public void fly() { }\n}', character: "detective", caption: "Abstraktion kann weitergegeben werden." },
      { kicker: "04 · ABSTRAKTE METHODE", title: "Eine abstrakte Methode hat keinen Rumpf.", text: "Abstrakte Methoden werden mit abstract angelegt, enden mit einem Semikolon und definieren nur die Pflicht zur Implementierung.", code: 'public <span class="concept-highlight attention-target">abstract void eat();</span>\n\n<span class="attention-arrow">kein Methodenrumpf</span>', character: "robot", caption: "Die Signatur ist eine Vereinbarung." },
      { kicker: "05 · IMPLEMENTIEREN", title: "Die erste konkrete Subklasse muss definieren.", text: "Die erste nicht-abstrakte Subklasse muss jede abstrakte Methode überschreiben und damit ein Verhalten festlegen.", code: 'public class Parrot extends Bird {\n  <span class="concept-highlight attention-target">@Override</span>\n  public void eat() {\n    System.out.println(<span class="string">"Ich esse"</span>);\n  }\n}', character: "detective", caption: "Die Pflicht wird in Verhalten übersetzt." },
      { kicker: "06 · REIHENFOLGE", title: "public abstract und abstract public sind gleich.", text: "Die Reihenfolge der Sichtbarkeit und des Schlüsselworts abstract ist nicht entscheidend. Beide Schreibweisen sind gültig.", code: '<span class="concept-highlight attention-target">public abstract</span> class Animal { }\n<span class="concept-highlight attention-target">abstract public</span> class Bird { }', character: "robot", caption: "Die Bedeutung bleibt identisch." },
      { kicker: "MODUL 3 · KAPITEL 3.6 · ERGEBNIS", title: "Abstrakte Klassen teilen Regeln.", text: "Sie verhindern unpassende Instanzen, bündeln gemeinsame Grundlagen und verpflichten konkrete Subklassen zur Implementierung abstrakter Methoden.", code: '<span class="concept-highlight attention-target">abstract class</span>\n        ↓\n<span class="concept-highlight attention-target">konkrete Subklasse</span>\n        ↓\n<span class="attention-arrow">Objekt mit definiertem Verhalten</span>', character: "detective", caption: "Gemeinsame Regeln, konkrete Umsetzung." }
    ]
  },
  chapter37: {
    label: "Kapitel 3.7 · Polymorphie",
    slides: [
      { kicker: "MODUL 3 · KAPITEL 3.7 · START", title: "Polymorphie bedeutet Vielgestaltigkeit.", text: "Ein Objekt kann als Instanz mehrerer Klassen betrachtet werden. Eine Variable eines Obertyps kann Objekte seiner Untertypen aufnehmen.", code: '<span class="concept-highlight attention-target">Animal</span> paco = new <span class="concept-highlight attention-target">Parrot</span>();\n<span class="attention-arrow">↳ ein Objekt, mehrere Blickwinkel</span>', character: "robot", caption: "Ein Papagei bleibt ein Tier und ein Vogel." },
      { kicker: "01 · LISTEN", title: "Eine Vogelliste kann verschiedene Vögel enthalten.", text: "Ein Array vom Typ Bird kann Parrot und Penguin aufnehmen. So behandelst du unterschiedliche Objekte gemeinsam.", code: 'Bird[] array = new Bird[2];\narray[0] = <span class="concept-highlight attention-target">new Parrot()</span>;\narray[1] = <span class="concept-highlight attention-target">new Penguin()</span>;\n\nfor (int i = 0; i < array.length; i++) {\n  array[i].move();\n}', character: "detective", caption: "Ein gemeinsamer Typ sammelt Spezialisten." },
      { kicker: "02 · DYNAMISCHES VERHALTEN", title: "Jedes Objekt behält sein Verhalten.", text: "Obwohl beide Variablen den Typ Bird haben, führt jedes konkrete Objekt seine überschriebenen move()-Methode aus.", code: 'Bird penguin = new Penguin();\nBird parrot = new Parrot();\n\npenguin.move(); <span class="attention-arrow">→ Ich schwimme</span>\nparrot.move();  <span class="attention-arrow">→ Ich fliege</span>', character: "robot", caption: "Der konkrete Objekttyp entscheidet." },
      { kicker: "03 · PROTOKOLL", title: "Vererbung definiert ein gemeinsames Protokoll.", text: "Alle Subklassen besitzen die geerbten Methoden und Attribute der Superklasse. Deshalb kann eine Subklasse an ihrer Stelle eingesetzt werden.", code: 'void showMovement(<span class="concept-highlight attention-target">Bird bird</span>) {\n  bird.move();\n}\n\nshowMovement(new Parrot());\nshowMovement(new Penguin());', character: "detective", caption: "Eine Methode, viele kompatible Objekte." },
      { kicker: "04 · SICHTBARER TYP", title: "Der Variablentyp begrenzt den Aufruf.", text: "Java entscheidet beim Kompilieren anhand des Datentyps, welche Methode du aufrufen darfst. Animal kennt fly() nicht.", code: '<span class="concept-highlight attention-target">Animal</span> parrot = new Parrot();\nparrot.live(); ✓\nparrot.fly(); ✕\n<span class="attention-arrow">↳ Animal hat kein fly()</span>', character: "robot", caption: "Polymorphie erlaubt nicht jeden Methodennamen." },
      { kicker: "05 · PARAMETER", title: "Parameter werden polymorph angenommen.", text: "Eine Methode, die Animal erwartet, akzeptiert auch alle Subklassen. Neue Subklassen benötigen keine Änderung in der Methode.", code: 'public void investigateAnimal(<span class="concept-highlight attention-target">Animal animal</span>) {\n  // ...\n}\n\ninvestigateAnimal(new Parrot());\ninvestigateAnimal(new Penguin());', character: "detective", caption: "Das macht Code wartbarer." },
      { kicker: "06 · MEHRERE EBENEN", title: "Ein Objekt kann mehrere Typen erfüllen.", text: "Ein Parrot ist zugleich Parrot, Bird und Animal. Je nach Referenztyp sind unterschiedliche geerbte Methoden sichtbar.", code: 'Animal paco = new Parrot();\n<span class="concept-highlight attention-target">paco.live()</span>;\n<span class="concept-highlight attention-target">paco.move()</span>;\n// paco.fly() nicht sichtbar', character: "robot", caption: "Der Blickwinkel bestimmt die sichtbare Schnittstelle." },
      { kicker: "MODUL 3 · KAPITEL 3.7 · ERGEBNIS", title: "Polymorphie macht Klassenfamilien flexibel.", text: "Gemeinsame Obertypen, überschriebenes Verhalten und polymorphe Parameter verbinden klare Protokolle mit vielen konkreten Objekten.", code: '<span class="concept-highlight attention-target">Obertyp</span> → gemeinsames Protokoll\n<span class="concept-highlight attention-target">Untertyp</span> → konkretes Verhalten\n\n<span class="attention-arrow">→ Vielgestaltigkeit</span>', character: "detective", caption: "Ein Vertrag, viele Implementierungen." }
    ]
  },
  chapter38: {
    label: "Kapitel 3.8 · this und super",
    slides: [
      { kicker: "MODUL 3 · KAPITEL 3.8 · START", title: "this zeigt auf das eigene Objekt.", text: "Mit this greifst du auf Attribute und Methoden der eigenen Klasse zu. Es macht den aktuellen Kontext sichtbar.", code: 'public abstract class Bird {\n  private String name;\n\n  public Bird(String name) {\n    <span class="concept-highlight attention-target">this.name</span> = name;\n  }\n}', character: "robot", caption: "this verbindet das Objekt mit seinem Zustand." },
      { kicker: "01 · THIS ATTRIBUTE", title: "this verhindert Namensverwechslung.", text: "Wenn ein Parameter genauso heißt wie ein Attribut, kennzeichnet this.name das Attribut des aktuellen Objekts.", code: 'public Bird(String <span class="attention-target">name</span>) {\n  <span class="concept-highlight attention-target">this.name</span> = <span class="attention-target">name</span>;\n}', character: "detective", caption: "Links das Attribut, rechts der Parameter." },
      { kicker: "02 · THIS()", title: "this() ruft einen Konstruktor derselben Klasse.", text: "Mit this() delegierst du an eine überladene Konstruktorvariante der eigenen Klasse.", code: 'public Bird() {\n  <span class="concept-highlight attention-target">this("Paco")</span>;\n}\n\npublic Bird(String name) {\n  this.name = name;\n}', character: "robot", caption: "Ein Konstruktor nutzt den anderen." },
      { kicker: "03 · KONSTRUKTORREGEL", title: "this() muss an erster Stelle stehen.", text: "this() darf nur in einem Konstruktor aufgerufen werden und muss immer die erste Anweisung sein.", code: 'public Bird() {\n  <span class="concept-highlight attention-target">this("Paco")</span>; // zuerst\n  // weitere Anweisungen\n}', character: "detective", caption: "Delegation kommt vor der Initialisierung." },
      { kicker: "04 · SUPER.", title: "super. greift auf die Superklasse zu.", text: "Mit super.move() rufst du die geerbte Methode der Superklasse auf, bevor die Subklasse eigenes Verhalten ergänzt.", code: 'public void move() {\n  <span class="concept-highlight attention-target">super.move()</span>;\n  this.fly();\n}', character: "robot", caption: "super zeigt nach oben in der Vererbung." },
      { kicker: "05 · SUPER()", title: "super() ruft den Superklassen-Konstruktor.", text: "Mit super(name) initialisiert ein Subklassen-Konstruktor den Teil des Objekts, der zur Superklasse gehört.", code: 'public Parrot(String name) {\n  <span class="concept-highlight attention-target">super(name)</span>;\n  this.featherColor = <span class="string">"colorful"</span>;\n}', character: "detective", caption: "Erst der Elternteil, dann die Spezialisierung." },
      { kicker: "06 · ENTWEDER ODER", title: "this() und super() schließen sich aus.", text: "Beide Konstruktoraufrufe müssen an erster Stelle stehen. Deshalb kannst du in einem Konstruktor nur einen von beiden verwenden.", code: 'Bird() {\n  <span class="concept-highlight attention-target">this()</span>;\n  // super() hier nicht mehr möglich\n}\n\n<span class="attention-arrow">this() oder super() — nicht beide</span>', character: "robot", caption: "Eine erste Anweisung, ein Ziel." },
      { kicker: "MODUL 3 · KAPITEL 3.8 · ERGEBNIS", title: "this und super klären Beziehungen.", text: "this verweist auf die eigene Klasse und ihr Objekt. super verweist auf geerbte Methoden und den Konstruktor der Superklasse.", code: '<span class="concept-highlight attention-target">this.</span> → eigene Attribute und Methoden\n<span class="concept-highlight attention-target">super.</span> → Methoden der Superklasse\n<span class="concept-highlight attention-target">this()</span> / <span class="concept-highlight attention-target">super()</span> → Konstruktoren', character: "detective", caption: "Eigene Ebene und Superklasse sicher unterscheiden." }
    ]
  }
};

const chapterTaskMap = {
  chapter1: [
    { id: "1.1.1", label: "1.1.1 · Mehrzeiliger Kommentar und Ausgabe" },
    { id: "1.1.2", label: "1.1.2 · Eine Ausgabe mit println" },
    { id: "1.1.3", label: "1.1.3 · Output Aufgabe 1" },
    { id: "1.1.4", label: "1.1.4 · Syntaxfehler finden" }
  ]
};

const chapterExercises = {
  chapter1: [
    {
      type: "single",
      title: "Code-Blöcke erkennen",
      prompt: "Wofür benutzt man geschweifte Klammern in Java?",
      options: ["Zum Starten eines Programms", "Zur Abgrenzung eines Codeblocks", "Zum Kennzeichnen von Zeichenketten"],
      correct: 1,
      explanation: "Geschweifte Klammern markieren den Anfang und das Ende eines Codeblocks."
    },
    {
      type: "single",
      title: "Ausgabe verstehen",
      prompt: "Vervollständige den Satz: Mit System.out.println(...) ...",
      options: ["... wird der Inhalt des Systems ausgegeben.", "... kann man Text auf dem Bildschirm ausgeben.", "... wird der angegebene Text von der Soundkarte vertont.", "... wird der angegebene Text ins openHPI Forum gepostet."],
      correct: 1,
      explanation: "System.out.println(...) schreibt eine Ausgabe in die Konsole."
    },
    {
      type: "task",
      title: "Mehrzeiliger Kommentar und Ausgabe",
      prompt: "Ändere die einzeiligen Kommentare in den Zeilen 3–5 zu einem mehrzeiligen Kommentar. Gib anschließend in zwei Zeilen “Hallo, ich bin Duke.“ und “Wie heißt Du?“ aus.",
      linkLabel: "Im DevQuiz programmieren →",
      exerciseId: "1.1.1"
    },
    {
      type: "task",
      title: "Eine Ausgabe mit println",
      prompt: "Schreibe ein Java-Programm, das in einer Zeile “Willkommen Detektiv Duke!“ ausgibt und anschließend in eine neue Zeile springt.",
      linkLabel: "Im DevQuiz programmieren →",
      exerciseId: "1.1.2"
    },
    {
      type: "task",
      title: "Output Aufgabe 1",
      prompt: "Benutze System.out.println(), um genau “Der Anfang einer Reise!“ auszugeben.",
      linkLabel: "Im DevQuiz programmieren →",
      exerciseId: "1.1.3"
    },
    {
      type: "task",
      title: "Syntaxfehler finden",
      prompt: "Finde und behebe die zwei Syntaxfehler im Programm. Gib danach “Hallo Welt.“ aus.",
      linkLabel: "Im DevQuiz programmieren →",
      exerciseId: "1.1.4"
    }
  ],
  chapter3: [
    {
      type: "multi",
      title: "Bestandteile einer Variablendefinition",
      prompt: "Welche Bestandteile hat jede Variablendefinition? Mehrere Antworten sind möglich.",
      options: ["Kürzel des Autors", "Datentyp", "Eindeutiger Bezeichner", "Verweildauer im Programm"],
      correct: [1, 2],
      explanation: "Eine Variablendefinition braucht mindestens Datentyp und eindeutigen Bezeichner."
    },
    {
      type: "single",
      title: "Datentyp bei Variablen",
      prompt: "Welche Aussage ist wahr?",
      options: ["Variablen ohne Datentypen sind universell einsetzbar", "Der Datentyp wird nur bei der Deklaration einer Variablen angegeben", "Der Datentyp einer Variablen kann beliebig gewechselt werden"],
      correct: 1,
      explanation: "Der Datentyp gehört zur Deklaration. Bei einer späteren Zuweisung wird er nicht erneut angegeben."
    },
    {
      type: "multi",
      title: "Gültige Datentypen",
      prompt: "Welche Datentypen kennst du bereits? Mehrere Antworten sind möglich.",
      options: ["String", "int", "text", "variable", "double", "break-number"],
      correct: [0, 1, 4],
      explanation: "String, int und double sind gültige Java-Datentypen aus diesem Kapitel."
    }
  ]
};

let currentChapterId = "chapter1";
let currentSlide = 0;
const $ = (selector) => document.querySelector(selector);
const presentationShell = $(".presentation-shell");
const slideCard = $(".slide-card");
const counter = $("#presentation-counter");
const kicker = $("#slide-kicker");
const slideObjective = $("#slide-objective");
const slideLearningProgress = $("#slide-learning-progress");
const slideExercise = $("#slide-exercise");
const slideExerciseTitle = $("#slide-exercise-title");
const slideExercisePrompt = $("#slide-exercise-prompt");
const slideExerciseOptions = $("#slide-exercise-options");
const slideExerciseFeedback = $("#slide-exercise-feedback");
const teacherNotes = $("#teacher-notes");
const teacherNote = $("#teacher-note");
const teacherAnswer = $("#teacher-answer");
const teacherToggle = $("#teacher-toggle");
const text = $("#slide-text");
const code = $("#slide-code");
const progress = $("#slide-progress-bar");
const character = $("#slide-character");
const characterStage = $("#character-stage");
const characterCaption = $("#character-caption");
const overviewLabel = $("#overview-label");
const overviewList = $("#slide-overview-list");
const moduleTitle = $("#module-title");
const moduleDescription = $("#module-description");
const moduleButtons = [...document.querySelectorAll(".module-button")];
const previous = $("#previous-slide");
const next = $("#next-slide");
const fullscreen = $("#fullscreen-slide");
const themeToggle = $("#theme-toggle");
const themeIcon = $("#theme-icon");
const chapterButtons = [...document.querySelectorAll(".chapter-button")];
chapters.chapter4.slides = chapters.chapter3.slides.splice(9);
const moduleGroups = [
  { id: "module1", label: "Modul 1 · Java-Grundlagen", description: "Kapitel 1.1 bis 1.7 · Vom ersten Programm bis zu Methoden mit Rückgabewerten", chapterIds: ["chapter1", "chapter2", "chapter3", "chapter4", "chapter5", "chapter6", "chapter7"] },
  { id: "module2", label: "Modul 2 · Methoden erweitern", description: "Kapitel 2.1 bis 2.6 · Parameter, Boolean, Verzweigungen, Schleifen, Arrays und Konstruktoren", chapterIds: ["chapter21", "chapter22", "chapter23", "chapter24", "chapter25", "chapter26"] },
  { id: "module3", label: "Modul 3 · Vererbung und Sichtbarkeit", description: "Kapitel 3.1 bis 3.8 · Vererbung, Sichtbarkeiten, Kapselung, Override, Overload, abstrakte Klassen, Polymorphie sowie this und super", chapterIds: ["chapter31", "chapter32", "chapter33", "chapter34", "chapter35", "chapter36", "chapter37", "chapter38"] }
];
const chapterOrder = moduleGroups.flatMap((module) => module.chapterIds);

function activeSlides() { return chapters[currentChapterId].slides; }

function activeModule() { return moduleGroups.find((module) => module.chapterIds.includes(currentChapterId)); }

function renderModuleButtons() {
  const module = activeModule();
  moduleButtons.forEach((button) => {
    const active = button.dataset.module === module.id;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  moduleTitle.textContent = module.label.split(" · ").slice(1).join(" · ");
  moduleDescription.textContent = module.description;
}

function renderChapterButtons() {
  const module = activeModule();
  chapterButtons.forEach((button) => {
    const active = button.dataset.chapter === currentChapterId;
    button.hidden = button.dataset.module !== module.id;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderOverview() {
  const slides = activeSlides();
  overviewLabel.textContent = `FOLIEN · ${chapters[currentChapterId].label.toUpperCase()}`;
  overviewList.innerHTML = "";
  slides.forEach((slide, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "slide-thumbnail";
    button.innerHTML = `<span class="thumbnail-number">${String(index + 1).padStart(2, "0")}</span><span>${slide.title}</span>`;
    button.addEventListener("click", () => { currentSlide = index; renderSlide(); });
    overviewList.appendChild(button);
  });
}

function nextPresentationPosition() {
  if (currentSlide < activeSlides().length - 1) return { chapter: currentChapterId, slide: currentSlide + 1 };
  const chapterIndex = chapterOrder.indexOf(currentChapterId);
  if (chapterIndex >= 0 && chapterIndex < chapterOrder.length - 1) return { chapter: chapterOrder[chapterIndex + 1], slide: 0 };
  return { chapter: currentChapterId, slide: currentSlide };
}

function devquizExerciseHref(exerciseId) {
  const next = nextPresentationPosition();
  return `index.html?exercise=${encodeURIComponent(exerciseId)}&returnChapter=${encodeURIComponent(next.chapter)}&returnSlide=${next.slide}#devquiz-terminal`;
}

function appendChapterTaskLinks(tasks, isFinalSlide) {
  if (!isFinalSlide || !tasks.length) return;
  const heading = document.createElement("p");
  heading.className = "slide-exercise-task-heading";
  heading.textContent = "Danach programmieren:";
  slideExerciseOptions.appendChild(heading);
  tasks.forEach((task) => {
    const link = document.createElement("a");
    link.className = "slide-exercise-link";
    link.href = devquizExerciseHref(task.id);
    link.textContent = task.label;
    slideExerciseOptions.appendChild(link);
  });
}

function renderSlideExercise() {
  const exercises = chapterExercises[currentChapterId] || [];
  const tasks = chapterTaskMap[currentChapterId] || [];
  const isFinalSlide = currentSlide === activeSlides().length - 1;
  if (!exercises.length && (!tasks.length || !isFinalSlide)) {
    slideExercise.hidden = true;
    slideExerciseOptions.innerHTML = "";
    return;
  }
  const exercise = exercises.length ? exercises[currentSlide % exercises.length] : null;
  slideExercise.hidden = false;
  slideExerciseTitle.textContent = exercise ? `${exercise.title} · Übung ${(currentSlide % exercises.length) + 1} von ${exercises.length}` : "Jetzt programmieren";
  slideExercisePrompt.textContent = exercise ? exercise.prompt : "Du hast die Grundlagen gelernt. Wähle jetzt die passende Programmieraufgabe für dieses Kapitel.";
  slideExerciseFeedback.textContent = "";
  slideExerciseOptions.innerHTML = "";
  if (!exercise) {
    tasks.forEach((task) => {
      const link = document.createElement("a");
      link.className = "slide-exercise-link";
      link.href = devquizExerciseHref(task.id);
      link.textContent = task.label;
      slideExerciseOptions.appendChild(link);
    });
    return;
  }
  if (exercise.type === "task") {
    const link = document.createElement("a");
    link.className = "slide-exercise-link";
    link.href = devquizExerciseHref(exercise.exerciseId);
    link.textContent = exercise.linkLabel;
    slideExerciseOptions.appendChild(link);
    appendChapterTaskLinks(tasks, isFinalSlide);
    return;
  }
  const selected = new Set();
  exercise.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "slide-exercise-option";
    button.textContent = option;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      if (exercise.type === "multi") {
        if (selected.has(index)) selected.delete(index); else selected.add(index);
        button.classList.toggle("is-selected", selected.has(index));
        button.setAttribute("aria-pressed", String(selected.has(index)));
        slideExerciseFeedback.textContent = "Wähle alle passenden Antworten und prüfe deine Auswahl.";
        if (!slideExerciseOptions.querySelector(".slide-exercise-check")) {
          const check = document.createElement("button");
          check.type = "button";
          check.className = "slide-exercise-check";
          check.textContent = "Auswahl prüfen";
          check.addEventListener("click", () => {
            const correct = selected.size === exercise.correct.length && exercise.correct.every((answer) => selected.has(answer));
            slideExerciseFeedback.textContent = correct ? `✓ Richtig. ${exercise.explanation}` : `Noch nicht. ${exercise.explanation}`;
            slideExerciseFeedback.classList.toggle("is-correct", correct);
          });
          slideExerciseOptions.appendChild(check);
        }
        return;
      }
      slideExerciseOptions.querySelectorAll("button").forEach((item) => { item.disabled = true; });
      const correct = index === exercise.correct;
      button.classList.add(correct ? "is-correct" : "is-wrong");
      slideExerciseFeedback.textContent = correct ? `✓ Richtig. ${exercise.explanation}` : `Noch nicht. ${exercise.explanation}`;
      slideExerciseFeedback.classList.toggle("is-correct", correct);
    });
    slideExerciseOptions.appendChild(button);
  });
  appendChapterTaskLinks(tasks, isFinalSlide);
}

function renderSlide() {
  const slides = activeSlides();
  const slide = slides[currentSlide];
  counter.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  kicker.textContent = slide.kicker;
  slideObjective.textContent = slide.title;
  slideCard.classList.toggle("is-title-long", slide.title.length > 38);
  slideCard.classList.toggle("is-code-dense", slide.code.replace(/<[^>]+>/g, "").length > 190 || slide.code.split("\n").length > 8);
  slideLearningProgress.textContent = `Konzept ${currentSlide + 1} von ${slides.length} · ${chapters[currentChapterId].label}`;
  teacherNote.textContent = slide.text;
  teacherAnswer.textContent = slide.title;
  text.textContent = slide.text;
  const codeLines = slide.code.split("\n").map((line, index) => `<span class="code-line-reveal" style="--line-index: ${index}">${line || "&nbsp;"}</span>`).join("");
  code.innerHTML = `<code>${codeLines}</code>`;
  renderSlideExercise();
  const isDetective = slide.character === "detective";
  character.src = `assets/presentation/${isDetective ? "detective-transparent.png" : "robot-transparent.png"}`;
  character.alt = isDetective ? "Java-Detektiv" : "Java-Roboter";
  characterStage.classList.toggle("detective-stage", isDetective);
  characterCaption.textContent = slide.caption;
  progress.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
  const chapterIndex = chapterOrder.indexOf(currentChapterId);
  previous.disabled = currentSlide === 0 && chapterIndex === 0;
  next.textContent = currentSlide === slides.length - 1 ? (chapterIndex < chapterOrder.length - 1 ? `${chapters[chapterOrder[chapterIndex + 1]].label} →` : "Zum DevQuiz →") : "Weiter →";
  [...overviewList.children].forEach((button, index) => {
    button.classList.toggle("is-active", index === currentSlide);
    button.setAttribute("aria-current", index === currentSlide ? "step" : "false");
  });
  renderModuleButtons();
  renderChapterButtons();
}

function switchChapter(chapterId, slideIndex = 0) {
  if (!chapters[chapterId]) return;
  currentChapterId = chapterId;
  currentSlide = slideIndex;
  renderOverview();
  renderSlide();
}

function showOverview() {
  presentationShell.classList.remove("is-fullscreen");
  fullscreen.textContent = "⛶ Vollbild";
}

function setTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle("presentation-light", isLight);
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", isLight ? "Dunkles Design aktivieren" : "Helles Design aktivieren");
  themeIcon.textContent = isLight ? "☾" : "☼";
  try { window.localStorage.setItem("devquiz-presentation-theme", isLight ? "light" : "dark"); } catch {}
}

function loadRequestedChapter() {
  const params = new URLSearchParams(window.location.search);
  const requestedChapter = params.get("chapter");
  const requestedSlide = Number.parseInt(params.get("slide"), 10);
  if (requestedChapter && chapters[requestedChapter]) currentChapterId = requestedChapter;
  if (Number.isInteger(requestedSlide) && requestedSlide >= 0 && requestedSlide < activeSlides().length) currentSlide = requestedSlide;
}

function loadTheme() {
  let savedTheme = "dark";
  try { savedTheme = window.localStorage.getItem("devquiz-presentation-theme") || "dark"; } catch {}
  setTheme(savedTheme === "light" ? "light" : "dark");
}

async function enterFullscreen() {
  presentationShell.classList.add("is-fullscreen");
  fullscreen.textContent = "⛶ Vollbild aktiv";
  if (document.fullscreenElement) return;
  try { await presentationShell.requestFullscreen?.(); } catch { showOverview(); }
}

moduleButtons.forEach((button) => button.addEventListener("click", () => {
  const module = moduleGroups.find((group) => group.id === button.dataset.module);
  if (module) switchChapter(module.chapterIds[0]);
}));
chapterButtons.forEach((button) => button.addEventListener("click", () => switchChapter(button.dataset.chapter)));
previous.addEventListener("click", () => {
  if (currentSlide > 0) { currentSlide -= 1; renderSlide(); return; }
  const chapterIndex = chapterOrder.indexOf(currentChapterId);
  if (chapterIndex > 0) {
    const previousChapter = chapterOrder[chapterIndex - 1];
    switchChapter(previousChapter, chapters[previousChapter].slides.length - 1);
  }
});
next.addEventListener("click", () => {
  if (currentSlide < activeSlides().length - 1) { currentSlide += 1; renderSlide(); return; }
  const chapterIndex = chapterOrder.indexOf(currentChapterId);
  if (chapterIndex < chapterOrder.length - 1) { switchChapter(chapterOrder[chapterIndex + 1]); return; }
  window.location.href = "index.html#devquiz-terminal";
});
themeToggle.addEventListener("click", () => {
  setTheme(document.body.classList.contains("presentation-light") ? "dark" : "light");
});
teacherToggle.addEventListener("click", () => {
  const enabled = presentationShell.classList.toggle("teacher-mode");
  teacherNotes.hidden = !enabled;
  teacherToggle.setAttribute("aria-pressed", String(enabled));
});
fullscreen.addEventListener("click", () => {
  if (presentationShell.classList.contains("is-fullscreen")) {
    document.exitFullscreen?.();
    showOverview();
  } else enterFullscreen();
});
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) showOverview();
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "l") {
    event.preventDefault();
    setTheme(document.body.classList.contains("presentation-light") ? "dark" : "light");
    return;
  }
  if (event.key === "Escape") {
    if (document.fullscreenElement) document.exitFullscreen?.();
    showOverview();
    return;
  }
  if (event.key === "ArrowLeft") previous.click();
  if (event.key === "ArrowRight") next.click();
});
loadRequestedChapter();
loadTheme();
renderOverview();
renderSlide();
