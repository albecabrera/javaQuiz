# Java code exercises in the terminal

Feature branch: `feature/java-code-exercises`
Status: implementation planned

## Specs

1. **S1 — Real execution**: “puedes implementar este quiz agregando ejercicios donde tenga que escribir código y que este se devuelva en la consola, en la terminal. para ver si todo funciona bien, tienes que agregar mas ejercicios, por ejemplos el clásico de imprimir "Hello World" en la consola. Declarar una variable e imprimirla en consola, concatenar. Implementa esto para poder verificar los resultados. Además quiero que el cursos este automaticamente donde va la respuesta”
2. **S2 — Real backend choice**: The user selected “Java real con backend” over simulated browser validation.
3. **S3 — Safety boundary**: Java submissions must execute in an isolated process with bounded time and resources; the browser must never execute submitted code directly.
4. **S4 — Local-only operation**: “no se agreguen APIs, cosas que sean de pago. Todo tiene que estar dentro de mi entorno sin tener costos extras ni nada de eso.”
5. **S5 — Progressive exercises and navigation**: “implementa ahora 10 ejercicios más de Java en los cuales se tenga que escribir codigo. Por ejemplo imprimir algo en consola System.out.println(....), declarar variables etc. Hazlo todo con un orden lógico, tambien teniendo la oportunidad de saltar ejercicios en caso de que no se entiendan. Cuando se escriba una respuesta y se ejecute ENTER entonces el cursor ira al lugar donde se va escribir el nuevo codigo para no tener que volver a hacer clic. Implementa esto”

## Tasks

- T1 (S1-S4) — Add a local HTTP execution service with isolated Java compilation/runtime — commit: `3912c30`
- T2 (S1-S4) — Add code-writing exercises and connect the terminal UI to the service — commits: `8568bbe`, `eb0bc86`
- T3 (S1-S4) — Verify successful output, compilation errors, timeout behavior, and existing quiz flow — commit: `faac686` (backend/security verification passed; browser interaction remains manual)
- T4 (S5) — Add ten progressive Java exercises and visible skip control — commit: `09e6fff`
- T5 (S5) — Run with Enter, advance or skip with focused answer marker, verify via local service — commit: `09e6fff`

## Log

L1: puedes implementar este quiz agregando ejercicios donde tenga que escribir código y que este se devuelva en la consola, en la terminal.
L2: User selected “Java real con backend (El código se compila y ejecuta realmente en un servidor aislado. Más auténtico, pero requiere infraestructura y sandbox.)”.
L3: no se agreguen APIs, cosas que sean de pago. Todo tiene que estar dentro de mi entorno sin tener costos extras ni nada de eso.
L4: The local server now serves the UI at http://127.0.0.1:3000 so the browser can call the local execution API without file:// limitations.
L5: Independent security verification found timeout container leakage; explicit named-container cleanup was added and a timeout probe returned HTTP 408 with container count unchanged.
L6: Independent post-fix verification passed S1-S4: successful execution, compilation errors, timeout cleanup, output limit, invalid requests, local routes, and no external/paid APIs or dependencies. Browser interaction remains unautomated.
L7: para ver si todo funciona bien, tienes que agregar mas ejercicios, por ejemplos el clásico de imprimir "Hello World" en la consola. Declarar una variable e imprimirla en consola, concatenar. Implementa esto para poder verificar los resultados. Además quiero que el cursos este automaticamente donde va la respuesta
L8: Added four runnable output exercises and selection of the YOUR_CODE_HERE marker so the browser caret starts at the answer location.
L9: no veo que se hayan implementado mas ejercicios. comprueba eso
L10: el cursor intemitente debe de estar donde dice "tu respuesta" listo para introducir la letra o el codigo. para esto no es necesario volver a hacer clic ahi, ya tiene que estar el cursor por defecto en ese lugar
L11: implementa ahora 10 ejercicios más de Java en los cuales se tenga que escribir codigo. Por ejemplo imprimir algo en consola System.out.println(....), declarar variables etc. Hazlo todo con un orden lógico, tambien teniendo la oportunidad de saltar ejercicios en caso de que no se entiendan. Cuando se escriba una respuesta y se ejecute ENTER entonces el cursor ira al lugar donde se va escribir el nuevo codigo para no tener que volver a hacer clic. Implementa esto
L12: RED 4 != 14, GREEN 14 exercises. All 14 example solutions produced their exact expected stdout through the local Docker API (exit 0); 7 Node interface tests passed, including existing quiz regression, skip/focus/retry; independent verifier found S5 MET. No build run per repository instructions.
L13: vuelve a levantar el quiz con los ejercicios nuevos pues aun no los veo
L14: Diagnosis: localhost serves 14 exercises, but startup still enters multiple-choice mode; make Java code exercises visible on load and retain access to multiple-choice mode.
L15: RED startup was not CODE MODE; GREEN startup shows exercise 1 with selected answer marker, mode toggle retains quiz access, 9/9 local tests passed and independent S5 verification found no blocker.
