mejoras futuras
{
  "name": "core-domain-shared-kernel-commands-queries",
  "$schema": "../../../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/core/domain/shared-kernel/commands-queries/src",
  "projectType": "library",
  "tags": ["scope:core-domain", "type:shared-kernel", "layer:domain"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/core/domain/shared-kernel/commands-queries/jest.config.ts",
        "passWithNoTests": true
      }
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Tests para Clases Base): Aunque son clases base abstractas e interfaces, se podrían crear tests unitarios para cualquier lógica concreta que contengan (ej. la inicialización de `metadata` en `CommandBase` y `QueryBase`, o la lógica de cálculo de `offset` en `PaginatedQueryBase`).
  Justificación: Asegurar que la lógica fundamental de estas clases base funciona como se espera, ya que muchas otras clases dependerán de ellas.
  Impacto: Creación de archivos `.spec.ts` para `command.base.spec.ts`, `query.base.spec.ts`, `paginated-query.base.spec.ts`. Remover `passWithNoTests: true` después.
]
[
  Mejora Propuesta 2 (Separación de Comandos y Queries): Si la cantidad de artefactos relacionados con comandos y queries crece mucho, o si sus bases divergen significativamente, se podría considerar dividirlos en dos librerías separadas dentro del shared-kernel: `core-domain-shared-kernel-commands` y `core-domain-shared-kernel-queries`.
  Justificación: Mayor granularidad y separación de conceptos si es necesario.
  Impacto: Creación de una nueva librería y refactorización de archivos y dependencias. Por ahora, mantenerlos juntos es razonable.
]

*/
