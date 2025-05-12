mejoras futuras
{
  "name": "core-domain-shared-kernel-mappers",
  "$schema": "../../../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/core/domain/shared-kernel/mappers/src",
  "projectType": "library",
  "tags": ["scope:core-domain", "type:shared-kernel", "layer:domain"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/core/domain/shared-kernel/mappers/jest.config.ts",
        "passWithNoTests": true
      }
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Mapeadores Base Abstractos): Si se identifican patrones comunes en la lógica de mapeo (ej. manejo de fechas, mapeo de IDs, conversión de VOs a primitivos y viceversa), se podría considerar crear clases base abstractas para mapeadores que implementen `IMapper` y proporcionen esta funcionalidad común.
  Justificación: Reduciría el boilerplate en los mapeadores concretos de cada dominio/adaptador.
  Impacto: Creación de nuevas clases base en esta librería. Los mapeadores concretos heredarían de ellas.
]
[
  Mejora Propuesta 2 (Utilidades de Mapeo): Incluir funciones utilitarias de ayuda para tareas de mapeo comunes, como mapear colecciones de entidades o manejar valores opcionales durante el mapeo.
  Justificación: Simplificar la implementación de los mapeadores concretos.
  Impacto: Añadir nuevas funciones a esta librería, las cuales serían consumidas por los mapeadores concretos.
]

*/
