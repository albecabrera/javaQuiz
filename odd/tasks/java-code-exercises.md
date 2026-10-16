# Java code exercises in the terminal

Feature branch: `feature/java-code-exercises`
Status: implementation planned

## Specs

1. **S1 — Real execution**: “puedes implementar este quiz agregando ejercicios donde tenga que escribir código y que este se devuelva en la consola, en la terminal.”
2. **S2 — Real backend choice**: The user selected “Java real con backend” over simulated browser validation.
3. **S3 — Safety boundary**: Java submissions must execute in an isolated process with bounded time and resources; the browser must never execute submitted code directly.
4. **S4 — Local-only operation**: “no se agreguen APIs, cosas que sean de pago. Todo tiene que estar dentro de mi entorno sin tener costos extras ni nada de eso.”

## Tasks

- T1 (S1-S4) — Add a local HTTP execution service with isolated Java compilation/runtime — commit: `3912c30`
- T2 (S1-S4) — Add code-writing exercises and connect the terminal UI to the service — commit: `056c357`
- T3 (S1-S4) — Verify successful output, compilation errors, timeout behavior, and existing quiz flow — commit: `faac686` (backend/security verification passed; browser interaction remains manual)

## Log

L1: puedes implementar este quiz agregando ejercicios donde tenga que escribir código y que este se devuelva en la consola, en la terminal.
L2: User selected “Java real con backend (El código se compila y ejecuta realmente en un servidor aislado. Más auténtico, pero requiere infraestructura y sandbox.)”.
L3: no se agreguen APIs, cosas que sean de pago. Todo tiene que estar dentro de mi entorno sin tener costos extras ni nada de eso.
L4: The local server now serves the UI at http://127.0.0.1:3000 so the browser can call the local execution API without file:// limitations.
L5: Independent security verification found timeout container leakage; explicit named-container cleanup was added and a timeout probe returned HTTP 408 with container count unchanged.
L6: Independent post-fix verification passed S1-S4: successful execution, compilation errors, timeout cleanup, output limit, invalid requests, local routes, and no external/paid APIs or dependencies. Browser interaction remains unautomated.
