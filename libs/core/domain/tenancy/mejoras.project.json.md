mejoras propuestas futuras
{
  "name": "core-domain-tenancy",
  "$schema": "../../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/core/domain/tenancy/src",
  "projectType": "library",
  "tags": ["scope:core-domain", "type:domain-logic", "layer:domain", "domain:tenancy"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/core/domain/tenancy/jest.config.ts"
        // "passWithNoTests": true // <--- ELIMINAR O COMENTAR ESTA LÍNEA
      }
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS
// (Mantener las que ya estaban)
[
  Mejora Propuesta 1 (Tests Unitarios Exhaustivos): Esta librería contendrá lógica de negocio crítica en sus entidades (`TenantEntity`, `TenantConfigurationEntity`) y Value Objects (`TenantStatusVO`, `DbConnectionConfigVO`). Es fundamental añadir tests unitarios que cubran:
    - Creación de entidades/VOs con datos válidos e inválidos.
    - Transiciones de estado válidas e inválidas en `TenantEntity` (ej. activar un tenant ya activo).
    - Correcta emisión de eventos de dominio.
    - Validación de invariantes.
  Justificación: Garantizar la robustez y corrección de la lógica del dominio de `tenancy`.
  Impacto: Creación de múltiples archivos `.spec.ts` (ej. `tenant.entity.spec.ts`, `tenant-status.vo.spec.ts`). Una vez implementados, remover `passWithNoTests: true` y establecer umbrales de cobertura.
]
[
  Mejora Propuesta 2 (Servicios de Dominio): El directorio `libs/core/domain/tenancy/src/lib/services/` actualmente tiene un `.gitkeep`. Si surge lógica de dominio que involucra múltiples entidades `Tenant` o `TenantConfiguration` y no encaja naturalmente en una sola entidad (ej. una validación compleja que cruce datos de ambas), se crearía un servicio de dominio aquí.
  Justificación: Mantener las entidades cohesivas y adherirse a los principios DDD.
  Impacto: Creación de archivos de servicio y sus tests correspondientes.
]
*/
