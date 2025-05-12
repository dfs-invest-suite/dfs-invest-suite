{
  "name": "core-application-tenancy",
  "$schema": "../../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/core/application/tenancy/src",
  "projectType": "library",
  "tags": ["scope:core-application", "type:application-logic", "layer:application", "feature:tenancy"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/core/application/tenancy/jest.config.ts",
        "passWithNoTests": true // Se mantendrá hasta que implementemos tests para los casos de uso
      }
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Tests Unitarios para Casos de Uso): Cada caso de uso (ej. `CreateTenantUseCase`, `ActivateTenantUseCase`) debe tener tests unitarios exhaustivos. Estos tests mockearán las dependencias (puertos de repositorio, otros servicios) para probar la lógica de orquestación del caso de uso en aislamiento.
  Justificación: Asegurar que la lógica de la aplicación funcione correctamente y maneje los diferentes escenarios (éxito, errores de dominio, errores de infraestructura).
  Impacto: Creación de archivos `.use-case.spec.ts` para cada caso de uso. Remover `passWithNoTests: true` y establecer umbrales de cobertura.
]
[
  Mejora Propuesta 2 (DTOs de Entrada/Salida Robustos): Asegurar que todos los DTOs (ej. `TenantDetailsDto`, y los futuros DTOs para comandos/queries) tengan validación asociada (posiblemente usando schemas de `shared-validation-schemas` a nivel de los adaptadores primarios que los consumen) y estén bien documentados.
  Justificación: Contratos de datos claros y seguros entre la capa de aplicación y sus consumidores.
  Impacto: Desarrollo de DTOs y potencialmente schemas de validación asociados.
]
[
  Mejora Propuesta 3 (Manejo de Transacciones en Casos de Uso): Si un caso de uso involucra múltiples operaciones de escritura que deben ser atómicas, se debe asegurar que se ejecuten dentro de una transacción. Esto podría ser orquestado por el caso de uso utilizando el método `transaction()` expuesto por el puerto del repositorio, o manejado a un nivel superior si la transacción abarca múltiples repositorios/dominios.
  Justificación: Garantizar la consistencia de los datos.
  Impacto: Diseño cuidadoso de la gestión de transacciones en los casos de uso o en la capa que los invoca.
]

*/
