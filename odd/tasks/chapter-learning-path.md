# Chapter learning path
Status: in progress · Branch: feature/java-ide-editor
Scope: chapter navigation, exercise ordering, responsive layout, tests and guidance; preserve unrelated working-tree edits.

## Specs
S1. "Ich möchte nun, dass die Präsentation und die Übungen und die DevQuiz Programmieraufgaben, eine logische Reihenfolge verfolgen."
S2. "unterhalb der jeweiligen Kapitel, die Übungen, DevQuiz Programmieraufgaben usw zuordnen könntest. s. Screenshot: '/Users/acabrera/Desktop/CleanShot 2026-10-25 at 00.08.37@2x.png'"
S3. "Die App sollte die ganze Breite der Seite für alle drei devices iphone, ipad und macbook betragen."
S4. "Implementiere dies und mach aus der App eine nachvollziehbare und übersichtlich Lernplattform, welches selbsterklärend sein wird. Mach dann ein commit + push der Änderungen"

## Tasks
T1 [S1-S2] Route: inline. Done: grouped concept/question/code steps, one instance per task, return routing checked by focused tests. Commit: pending.
T2 [S3-S4] Route: inline. Done: viewport-width landing/presentation, chapter sidebar at mobile/tablet breakpoints and short guidance. Commit: pending.
T3 [S1-S4] Route: inline + independent verification (Risk: item 6, visual regressions lack browser-based tests). Validate navigation, mobile/tablet/desktop layout and existing behavior; isolate and commit work units. Commit: pending.

## Log
L1. Ich möchte nun, dass die Präsentation und die Übungen und die DevQuiz Programmieraufgaben, eine logische Reihenfolge verfolgen. Daher wäre es  super, wenn du unterhalb der jeweiligen Kapitel, die Übungen, DevQuiz Programmieraufgaben usw zuordnen könntest. s. Screenshot: '/Users/acabrera/Desktop/CleanShot 2026-10-25 at 00.08.37@2x.png' Die App sollte die ganze Breite der Seite für alle drei devices iphone, ipad und macbook betragen. Implementiere dies und mach aus der App eine nachvollziehbare und übersichtlich Lernplattform, welches selbsterklärend sein wird. Mach dann ein commit + push der Änderungen
L2. Baseline: clean presentation.js/presentation.html; existing unstaged edits in README.md, app.js, index.html, lsp-bridge.js, quiz.js, styles.css and tests belong to other work. Only task-specific hunks will be staged.
