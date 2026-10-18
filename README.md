# DevQuiz — Java im lokalen Terminal

Schreibe Java-Code, erhalte Live-Diagnosen und führe jede Übung in einem isolierten Container aus. Der Editor macht keine automatischen Codevorschläge. Während der Nutzung werden keine APIs, CDNs oder kostenpflichtigen Dienste verwendet.

## Schnellstart

Voraussetzungen sind Docker und das lokale Image `eclipse-temurin:21-jdk`. In diesem Verzeichnis:

```sh
docker image inspect eclipse-temurin:21-jdk
npm ci --ignore-scripts --no-audit --no-fund
bash scripts/install-jdtls.sh
npm start
```

Öffne **http://127.0.0.1:3000**. Zuerst wählst du zwischen der interaktiven Java-Präsentation und dem DevQuiz. Die Präsentation ist auch direkt unter **http://127.0.0.1:3000/presentation.html** erreichbar. Im DevQuiz wird nur die aktuelle Übung angezeigt; der Cursor steht direkt an der Antwortstelle. Falls das Image fehlt, lade es einmal mit `docker pull eclipse-temurin:21-jdk`.

Die freien Werkzeuge werden nur einmal lokal installiert: Monaco 0.52 (MIT), `ws` (MIT) und Eclipse JDT LS 1.50 (EPL-2.0). Das Installationsskript prüft die offizielle SHA-256-Prüfsumme von JDT LS und entpackt es nach `.local/jdtls-compatible/`, das von Git ignoriert wird. Während des Quiz läuft alles auf deinem Rechner.

## Steuerung

| Aktion | Taste oder Schaltfläche |
| --- | --- |
| Antwort ausführen | Enter, Strg/Cmd + Enter oder Umschalt + F10 |
| Zeilenkommentar umschalten | Strg/Cmd + `/` |
| Zeile duplizieren | Strg/Cmd + D |
| Zeile löschen | Strg + Y (Windows/Linux), Cmd + Rücktaste (macOS) |
| Intentionen/Schnellkorrekturen | Alt + Enter (Windows/Linux), Option + Enter (macOS) |
| Code formatieren | Strg/Cmd + Alt/Option + L |
| Zeile einfügen | Umschalt + Enter |
| Einrückung | Tab |
| Zur nächsten gelösten Übung | Weiter → |
| Überspringen | Übung überspringen → |
| Modus wechseln | Multiple-Choice-Quiz / Code-Übungen |
| DevQuiz-Thema wechseln | Cmd + Umschalt + L oder die Schaltfläche „Helles Design“ / „Dunkles Design“ |
| Code-Editor bildschirmfüllend vorführen | Cmd + P im Code-Modus oder „Editor vorführen ⛶“; mit Esc oder „Ansicht schließen“ beenden |
| Gestuften Hinweis anzeigen | Nach einem fehlerhaften Versuch „Hinweis anzeigen“; ein weiterer Versuch schaltet den nächsten Hinweis frei |

Der Code-Editor verwendet das Atom-One-Dark-Farbschema, Fira Code und farbige Klammerpaare. Fira Code 6.2 liegt lokal unter `assets/fonts/` und steht unter der SIL Open Font License 1.1 (siehe `assets/fonts/OFL.txt`). Java-Fehler werden während der Eingabe unterstrichen. Der Editor zeigt keine automatischen Codevorschläge; JDT LS liefert nur Live-Diagnosen. Die Ausgabe oder Fehlermeldung bleibt im Terminal sichtbar. Wenn das Ergebnis richtig ist, musst du **Weiter** drücken, um zur nächsten Übung zu gelangen; bei einer falschen Ausgabe kannst du den Code korrigieren und erneut ausführen. Wenn JDT LS nicht verfügbar ist, zeigt der Status dies an: Bearbeitung und lokale Ausführung funktionieren weiterhin.

## Lokale Ausführung

`POST http://127.0.0.1:3000/api/execute` empfängt:

```json
{
  "source": "public class Main { public static void main(String[] args) { System.out.println(\"Hallo\"); } }",
  "stdin": ""
}
```

Jede Einsendung kompiliert und startet Java 21 in Docker ohne Netzwerk, mit schreibgeschütztem Root-Dateisystem sowie CPU-, Speicher-, Zeit- und Ausgabelimits. Der Editor verwendet für JDT LS einen zweiten lokalen Container mit einem erzeugten Java-Projekt. Es werden keine vom Nutzer kontrollierten Build-Dateien verwendet und keine Repository-Dateien an den Analysator gesendet.
