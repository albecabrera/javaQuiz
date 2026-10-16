# Local Java IDE experience

Feature branch: `feature/java-ide-editor`
Status: verified locally; delivery not published

## Specs

1. **S1 — One exercise at a time**: “Deseo que solo se muestre el ejercicio en cuestion y no parte del anterior o del venidero. Esto le da mas claridad al quiz.”
2. **S2 — Java diagnostics**: “Ademas quiero que si cometo errores en el codigo que este sea marcado como en el IDE de IntelliJIDEA.”
3. **S3 — Semantic completion and indentation**: “Tambien que de la posibilidad de autocompletado con los mismos comandos de la IDE, con identacion de forma tal que se vea mas premium y real”
4. **S4 — Local-only continuation**: “no se agreguen APIs, cosas que sean de pago. Todo tiene que estar dentro de mi entorno sin tener costos extras ni nada de eso.”
5. **S5 — Decision**: User selected “Autocompletado semántico tipo IntelliJ” with a local Java language server rather than exercise-only suggestions.

## Tasks

- T1 (S1) — Present only the active exercise and preserve answer focus and mode navigation — route: inline — commit: pending (frontend work unit)
- T2 (S2-S5) — Install local free editor/JDT LS, bridge live diagnostics and semantic completion securely — route: bounded worker + inline fixes — commits: `30e07e7` (backend), pending (frontend)
- T3 (S1-S5) — Test editor, completion, diagnostics, execution and existing quiz without network at runtime — route: inline + independent security verification — commit: pending (frontend work unit)

## Log

L1: Deseo que solo se muestre el ejercicio en cuestion y no parte del anterior o del venidero. Esto le da mas claridad al quiz. Ademas quiero que si cometo errores en el codigo que este sea marcado como en el IDE de IntelliJIDEA. Tambien que de la posibilidad de autocompletado con los mismos comandos de la IDE, con identacion de forma tal que se vea mas premium y real
L2: User selected “Autocompletado semántico tipo IntelliJ” (local Java language server, more resources) over lightweight local exercise suggestions.
L3: Existing app uses a single textarea and append-only terminal history; localhost serves a Docker-isolated Java executor. JDT LS is not installed. Research identified local JDT LS stdio plus browser editor and loopback bridge. No cloud API or runtime CDN.
L4: Downloaded JDT LS 1.62.0 (SHA256 verified) but its Eclipse bundle requires JavaSE 25; chose pinned JDT LS 1.50.0, verified SHA256 3292c5c33888f95ab0ff718e777ee94ff5496b8635a23a8844b876ee090ebdea, compatible with the existing Java 21 Docker image. Monaco 0.52.0 and ws 8.18.3 are local MIT packages. No build run.
L5: RED: previous exercise remained visible after skipping; GREEN: terminal renders only current exercise. RED: JDT LS didChange used Date.now() versions too large for Java Integer; GREEN: incrementing versions yielded syntax errors and 44 semantic completions. Generated isolated Eclipse project enabled semantic undefined-variable diagnostics.
L6: Public checks: 20 Node tests passed; real WS returned 'missingName cannot be resolved to a variable' and 44 completions; Chrome showed Monaco with JDT LS ready, inline markers, completion popup with 44 PrintStream methods, Enter accepted suggestion with zero execution requests, and Enter outside suggestions executed Hello World, advanced to exercise 2 and focused editor. Layout RED 47% editor width, GREEN 91% in Chrome. HTTP oversized body and combined output limit returned JSON 413; Docker container/workspace cleanup 0→0. Independent verifier found no remaining security blocker. No external runtime service or paid API.
