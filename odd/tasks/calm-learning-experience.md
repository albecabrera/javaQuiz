# Calm learning experience
Improve the learning journey in reviewable, accessible slices. Keep existing exercises and unrelated work intact.

## Specs
S1. "Ich möchte nun, dass du die ganze App noch einmal überprüfst und das beste UX/UI für die Users anbietest. Es sollte alles logisch aufgebaut sein, die Schriftgrößen müssen groß genug sein, damit es angenehm für die Augen ist. Überlege dir ganz genau, wie die Module, Kapitel usw zu sehen / zeigen sind. Es muss wie eine profesionelle Lernumgebung sein."
S2. "Ich möchte gerne, dass es so wenig visuelle Unruhe gibt, daher überlege dir ganz genau, welches Branding, Fonts usw besser passen."
S3. "Schlage mir vor, ob es sinnvoll ist Videos zu den Kapitel oder Themen einzubetten, falls die Users diese zum Lernen oder Wiederholen benötigen."
S4. "fange mal mit deinen Plan und wenn du Fragen hast, melde dich"

## Tasks
T1 [S1,S2,S4] inline — Clarify module/chapter navigation and reading typography; commits 079c642 + dfc6175; focused 5/5, suite 61/61.
T2 [S1,S2,S4] inline — Remove continuous decorative motion, keep code visible, enlarge chapter-step targets; focused 17/17 and suite 62/62; commit pending.
T3 [S1,S3,S4] inline — Check completion semantics, make a decision on optional resume/video presentation, verify end-to-end; commit pending.

## Log
L1: "fange mal mit deinen Plan und wenn du Fragen hast, melde dich"
L2: Previous user request (S1-S3) included above verbatim; original worktree has unrelated edits to README.md, lsp-bridge.js, quiz.js, test/exercises.test.js, test/lsp-bridge.test.js, test/terminal.test.js and untracked artifacts. Preserve them. No push authorized for this turn.
L3: Independent verification found the global sans-serif body could change terminal text. Added explicit terminal monospace and regression assertion. Local suite 61/61; verifier's scratch baseline reported 17 failures and no browser was available.
