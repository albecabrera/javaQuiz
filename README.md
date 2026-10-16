# DevQuiz — Java en una terminal local

Escribí Java, recibí diagnósticos y autocompletado semántico mientras editás, y ejecutá cada ejercicio en un contenedor aislado. No usa APIs, CDN ni servicios pagos durante el uso.

## Inicio rápido

Requiere Docker y la imagen local `eclipse-temurin:21-jdk`. En este directorio:

```sh
docker image inspect eclipse-temurin:21-jdk
npm ci --ignore-scripts --no-audit --no-fund
bash scripts/install-jdtls.sh
npm start
```

Abrí **http://127.0.0.1:3000**. Verás solo el ejercicio actual; el cursor queda en el hueco de respuesta. Si la imagen no está instalada, obtenela una vez con `docker pull eclipse-temurin:21-jdk`.

La instalación descarga herramientas libres una sola vez: Monaco 0.52 (MIT), `ws` (MIT) y Eclipse JDT LS 1.50 (EPL-2.0). El script verifica el SHA-256 oficial de JDT LS y lo extrae en `.local/jdtls-compatible/`, ignorado por Git. Al usar el quiz, las herramientas funcionan íntegramente en tu equipo.

## Controles

| Acción | Tecla o botón |
| --- | --- |
| Ver sugerencias semánticas | Ctrl + Espacio (también al escribir `.`) |
| Aceptar una sugerencia | Enter con la lista abierta |
| Ejecutar la respuesta | Enter sin sugerencias, o Ctrl/Cmd + Enter |
| Insertar una línea | Shift + Enter |
| Indentar | Tab |
| Pasar sin resolver | Saltar ejercicio → |
| Cambiar de modo | Quiz de opciones / Ejercicios de código |

Los errores de Java aparecen subrayados mientras editás. Si la salida coincide con la esperada, avanzás al siguiente ejercicio con el cursor listo; si no, podés corregir y reintentar. Si JDT LS no está disponible, el estado lo indica: la edición y la ejecución local siguen funcionando, pero no se inventan sugerencias semánticas.

## Ejecución local

`POST http://127.0.0.1:3000/api/execute` recibe:

```json
{
  "source": "public class Main { public static void main(String[] args) { System.out.println(\"Hola\"); } }",
  "stdin": ""
}
```

Cada envío compila y ejecuta Java 21 en Docker sin red, con filesystem raíz de solo lectura y límites de CPU, memoria, tiempo y salida. El editor usa un segundo contenedor local para JDT LS, con un proyecto Java generado y sin archivos de build controlados por el usuario. Ningún archivo del repositorio se envía al analizador.
