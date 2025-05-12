mejoras futuras
{
  "name": "shared-errors",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/shared/errors/src",
  "projectType": "library",
  "tags": ["scope:shared", "type:errors", "layer:shared"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/shared/errors/jest.config.ts",
        "passWithNoTests": true // <--- AÑADIR O ASEGURAR ESTA LÍNEA
      }
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS (para este project.json)

[
  Mejora Propuesta 1 (Cobertura de Tests): Aunque ahora permitimos `passWithNoTests`, si esta librería `shared-errors` evoluciona para tener lógica dentro de `ExceptionBase` o las excepciones genéricas que sea testeable (ej. métodos helper), se deberían añadir tests unitarios y remover `passWithNoTests` o establecer un umbral de cobertura.
]

*/
