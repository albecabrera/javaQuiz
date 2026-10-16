# DevQuiz Java executor

Servicio HTTP local, sin dependencias externas, para compilar y ejecutar ejercicios Java dentro de `eclipse-temurin:21-jdk` mediante Docker.

## Uso

Requiere Docker y la imagen local:

```sh
docker image inspect eclipse-temurin:21-jdk
npm start
```

Abrí `http://127.0.0.1:3000` en el navegador para usar el quiz y sus ejercicios de código. Todo corre dentro de tu entorno local.

Enviar código a `POST http://127.0.0.1:3000/api/execute`:

```json
{
  "source": "public class Main { public static void main(String[] args) { System.out.println(\"Hola\"); } }",
  "stdin": ""
}
```

El servicio devuelve JSON para ejecuciones exitosas, errores de compilación, errores de runtime, timeouts y solicitudes inválidas. Cada solicitud usa un directorio temporal propio; el contenedor no tiene red, filesystem raíz de solo lectura, capacidades Linux y recursos limitados.
