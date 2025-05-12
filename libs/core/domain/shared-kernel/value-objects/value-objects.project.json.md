mejoras futuras
{
  "name": "core-domain-shared-kernel-value-objects",
  "$schema": "../../../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/core/domain/shared-kernel/value-objects/src",
  "projectType": "library",
  "tags": ["scope:core-domain", "type:shared-kernel", "layer:domain"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/core/domain/shared-kernel/value-objects/jest.config.ts",
        "passWithNoTests": true
      }
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Tests para `ValueObjectBase`): Similar a `EntityBase`, la lógica de `ValueObjectBase` (especialmente `equals()`, `unpack()`, y la validación en el constructor) debería ser testeada.
  Justificación: Asegurar la robustez de la clase base para todos los VOs.
  Impacto: Creación de `value-object.base.spec.ts`. Remover `passWithNoTests: true`.
]
[
  Mejora Propuesta 2 (Factorías Estáticas Comunes): Para VOs comunes que representan primitivos (como un `StringVO` o `NumberVO` genérico si fuera necesario, aunque usualmente los VOs son más específicos semánticamente), se podrían añadir métodos factoría estáticos comunes o VOs predefinidos en esta librería.
  Justificación: Reutilización para VOs muy simples y comunes.
  Impacto: Definición de nuevas clases VO o métodos en esta librería.
]
[
  Mejora Propuesta 3 (Revisar Deuda Técnica de `unpack()`): Abordar la nota sobre `@typescript-eslint/no-unsafe-return` en `value-object.base.ts` para encontrar una solución de tipado más elegante si es posible.
  Justificación: Mantener la calidad del código y la conformidad con las reglas de linting.
  Impacto: Investigación y posible refactorización del método `unpack()`.
]

*/
