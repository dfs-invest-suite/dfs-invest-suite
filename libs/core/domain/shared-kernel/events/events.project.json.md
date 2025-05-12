{
  "name": "core-domain-shared-kernel-events",
  "$schema": "../../../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/core/domain/shared-kernel/events/src",
  "projectType": "library",
  "tags": ["scope:core-domain", "type:shared-kernel", "layer:domain"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/core/domain/shared-kernel/events/jest.config.ts",
        "passWithNoTests": true
      }
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Tests para `DomainEventBase`): Testear la lógica del constructor de `DomainEventBase`, especialmente la correcta inicialización de `id`, `eventName`, `aggregateId`, `payload` (inmutabilidad) y `metadata` (timestamps, correlationId).
  Justificación: Asegurar la correcta creación y estructura de los eventos de dominio base.
  Impacto: Creación de `domain-event.base.spec.ts`. Remover `passWithNoTests: true`.
]
[
  Mejora Propuesta 2 (Tipos de Payload Más Específicos): Actualmente `DomainEventBase` usa `Payload extends Record<string, unknown>`. Si bien las clases de evento concretas definirán su payload específico, se podría explorar si hay alguna forma de mejorar la inferencia o restricción de `Payload` a nivel de la clase base, aunque `Record<string, unknown>` es un buen punto de partida genérico.
  Justificación: Potencial mejora en la seguridad de tipos a nivel de la clase base.
  Impacto: Investigación y posible refactorización de tipos genéricos.
]

*/
