mejoras futuras
{
  "name": "core-domain-shared-kernel-entities",
  "$schema": "../../../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/core/domain/shared-kernel/entities/src",
  "projectType": "library",
  "tags": ["scope:core-domain", "type:shared-kernel", "layer:domain"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/core/domain/shared-kernel/entities/jest.config.ts",
        "passWithNoTests": true
      }
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Tests para Lógica de `EntityBase` y `AggregateRootBase`): Testear la lógica de igualdad (`equals`), la gestión de timestamps (`createdAt`, `updatedAt`, `setUpdatedAt`), la validación de props (`validateProps`), y especialmente la gestión de eventos de dominio en `AggregateRootBase` (`addEvent`, `getAndClearDomainEvents`).
  Justificación: Estas clases son fundamentales para todo el modelo de dominio. Asegurar su corrección es vital.
  Impacto: Creación de `entity.base.spec.ts` y `aggregate-root.base.spec.ts` con tests detallados. Remover `passWithNoTests: true`.
]
[
  Mejora Propuesta 2 (Factoría de IDs en `EntityBase`): En lugar de que el ID se pase siempre en el constructor, `EntityBase` podría tener un método estático `create(props, id?)` que genere el ID si no se proporciona, utilizando `UuidUtils` de `shared-utils`. Esto simplificaría la creación de entidades en las clases hijas.
  Justificación: Reduce boilerplate en las factorías estáticas de las entidades concretas.
  Impacto: Modificación de `EntityBase` y sus consumidores.
]

*/
