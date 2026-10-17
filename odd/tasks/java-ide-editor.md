# Local Java IDE experience

Feature branch: `feature/java-ide-editor`
Status: verified locally; delivery not published

## Specs

1. **S1 — One exercise at a time**: “Deseo que solo se muestre el ejercicio en cuestion y no parte del anterior o del venidero. Esto le da mas claridad al quiz.”
2. **S2 — Java diagnostics**: “Ademas quiero que si cometo errores en el codigo que este sea marcado como en el IDE de IntelliJIDEA.”
3. **S3 — Semantic completion and indentation**: “Tambien que de la posibilidad de autocompletado con los mismos comandos de la IDE, con identacion de forma tal que se vea mas premium y real”
4. **S4 — Local-only continuation**: “no se agreguen APIs, cosas que sean de pago. Todo tiene que estar dentro de mi entorno sin tener costos extras ni nada de eso.”
5. **S5 — Decision**: User selected “Autocompletado semántico tipo IntelliJ” with a local Java language server rather than exercise-only suggestions.
6. **S6 — Result gate**: “yo quiero ahora que cuando resuelva un ejercicio que se muestre el resultado en consola o el error y que parar pasar para el proximo ejercicio entonces que tengan que tocar un boton que se llame siguiente.”
7. **S7 — German localization**: “Ademas como mis alumnos son alemanes y yo doy clases en Alemania el Quiz completo tiene que estar en aleman. Solo se queda en inglés lo que viene por defecto de Java.”
8. **S8 — `sout` completion**: “außerdem möchte ich, dass wenn man sout antippt, "System.out.println" vorgeschlagen wird. Es muss autocomplete unterstüzen.”

## Tasks

- T1 (S1) — Present only the active exercise and preserve answer focus and mode navigation — route: inline — commit: `41ae4c3`
- T2 (S2-S5) — Install local free editor/JDT LS, bridge live diagnostics and semantic completion securely — route: bounded worker + inline fixes — commits: `30e07e7` (backend), `41ae4c3` (frontend)
- T3 (S1-S5) — Test editor, completion, diagnostics, execution and existing quiz without network at runtime — route: inline + independent security verification — commits: `30e07e7` (backend tests), `41ae4c3` (frontend tests)
- T4 (S6) — Keep execution output/error visible and require the “Weiter” button before advancing a solved code exercise — route: inline — commit: `4a9c522`
- T5 (S7) — Translate quiz UI, questions, exercises, controls and documentation to German while preserving Java-native syntax and terms — route: inline — commit: `4a9c522`
- T6 (S6-S7) — Verify result gating, German copy, multiple choice, code execution and local editor regression — route: inline — commit: `4a9c522`
- T7 (S8) — Add a local `sout` Java output template to Monaco completion while retaining JDT LS semantic suggestions — route: inline — commit: `4a9c522`

## Log

L1: Deseo que solo se muestre el ejercicio en cuestion y no parte del anterior o del venidero. Esto le da mas claridad al quiz. Ademas quiero que si cometo errores en el codigo que este sea marcado como en el IDE de IntelliJIDEA. Tambien que de la posibilidad de autocompletado con los mismos comandos de la IDE, con identacion de forma tal que se vea mas premium y real
L2: User selected “Autocompletado semántico tipo IntelliJ” (local Java language server, more resources) over lightweight local exercise suggestions.
L3: Existing app uses a single textarea and append-only terminal history; localhost serves a Docker-isolated Java executor. JDT LS is not installed. Research identified local JDT LS stdio plus browser editor and loopback bridge. No cloud API or runtime CDN.
L4: Downloaded JDT LS 1.62.0 (SHA256 verified) but its Eclipse bundle requires JavaSE 25; chose pinned JDT LS 1.50.0, verified SHA256 3292c5c33888f95ab0ff718e777ee94ff5496b8635a23a8844b876ee090ebdea, compatible with the existing Java 21 Docker image. Monaco 0.52.0 and ws 8.18.3 are local MIT packages. No build run.
L5: RED: previous exercise remained visible after skipping; GREEN: terminal renders only current exercise. RED: JDT LS didChange used Date.now() versions too large for Java Integer; GREEN: incrementing versions yielded syntax errors and 44 semantic completions. Generated isolated Eclipse project enabled semantic undefined-variable diagnostics.
L6: Public checks: 20 Node tests passed; real WS returned 'missingName cannot be resolved to a variable' and 44 completions; Chrome showed Monaco with JDT LS ready, inline markers, completion popup with 44 PrintStream methods, Enter accepted suggestion with zero execution requests, and Enter outside suggestions executed Hello World, advanced to exercise 2 and focused editor. Layout RED 47% editor width, GREEN 91% in Chrome. HTTP oversized body and combined output limit returned JSON 413; Docker container/workspace cleanup 0→0. Independent verifier found no remaining security blocker. No external runtime service or paid API.
L7: Requirement update: the exercise result or error must remain visible, and a solved exercise may advance only through a button named “Siguiente”; the entire quiz UI/content must be German except Java-native syntax and terminology.
L8: Requirement update: when the learner types `sout`, autocomplete must suggest `System.out.println`.
L9: RED: successful code execution advanced immediately and had no next-step control; GREEN: output remains visible at 01 / 14 until Weiter is clicked, then advances to 02 / 14. German UI test and stale-string check pass. Monaco browser verification showed `System.out.println` popup, German labels, and Weiter gate. Final Node suite: 21 passed, syntax checks and git diff check passed. No build run.
L10: User reported that typing `sout` did not visibly suggest `System.out.println`. RED: local provider waited for the LSP response and did not trigger Monaco after typing. GREEN: local suggestion returns immediately and model changes ending in `sout` call `editor.trigger("keyboard", "editor.action.triggerSuggest", {})`; 4 adapter tests and the 22-test suite pass. Fresh Chrome showed the popup while typing and Enter inserted `System.out.println();`.
L11: User reported `JDT LS nicht verfügbar · Ausführung mit Docker möglich` during compilation. RED: a completion request timeout emitted unavailable even though Docker execution remained independent. GREEN: transient LSP errors close the failed socket, show `JDT LS wird neu verbunden…`, retry with bounded exponential backoff, and do not mark Docker execution unavailable. Fresh Chrome showed no unavailable state, progress 01 / 14, and the Docker execution started. Focused adapter tests 5/5 and diff check pass.
L12: Final Chrome verification passed with states `JDT LS wird neu verbunden…` and `JDT LS verbindet…`, no `nicht verfügbar`, and progress 01 / 14. The serial full suite could not complete because the local Docker daemon stopped responding: direct aggregate execution and `docker info` hung; this is an environment proof blocker, not a reproduced application assertion failure. No build run.
