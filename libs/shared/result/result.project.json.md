MEJORAS FUTURAS
{
  "name": "shared-result",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/shared/result/src",
  "projectType": "library",
  "tags": ["scope:shared", "type:functional", "layer:shared"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/shared/result/jest.config.ts",
        "passWithNoTests": true
      }
    }
    // Los targets 'lint' y otros comunes son inferidos por los plugins configurados en nx.json,
    // a menos que necesitemos una configuración específica para este proyecto.
  }
}
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Tests para `result.utils.ts`): Aunque la librería `shared-result` es principalmente declarativa (`result.type.ts`), el archivo `result.utils.ts` contiene funciones constructoras (`ok()`, `err()`) y type guards (`isOk()`, `isErr()`) que SÍ tienen lógica. Sería beneficioso añadir tests unitarios específicos para estas utilidades para asegurar su correcto funcionamiento y cubrir casos borde (ej. qué pasa si se llama `unwrapErr()` en un `Ok`). Esto mejoraría la robustez de este componente crítico.
  Justificación: Aumenta la confianza en las funciones helper del tipo `Result`, que serán usadas extensivamente.
  Impacto: Creación de un archivo `result.utils.spec.ts` con los tests correspondientes. Una vez añadidos, se podría remover `passWithNoTests: true`.
]
[
  Mejora Propuesta 2 (Build Target Opcional): Si en algún futuro esta librería necesitara ser distribuida o utilizada en un contexto que no entienda TypeScript directamente, se podría añadir un target `build` (ej. usando `@nx/js:tsc`) para transpilarla a JavaScript. Para el uso interno actual, no es estrictamente necesario.
  Justificación: Flexibilidad para diferentes escenarios de consumo.
  Impacto: Añadir configuración de build al `project.json`.
]

*/
