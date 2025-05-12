mejoras futuras
{
  "name": "core-domain-shared-kernel-ports",
  "$schema": "../../../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/core/domain/shared-kernel/ports/src",
  "projectType": "library",
  "tags": ["scope:core-domain", "type:shared-kernel", "layer:domain"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/core/domain/shared-kernel/ports/jest.config.ts",
        "passWithNoTests": true
      }
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Puertos Adicionales del Shared Kernel): A medida que el sistema evolucione, podrían identificarse otros puertos genéricos que apliquen a múltiples dominios, como `IConfigurationPort` (para acceder a configuraciones de forma agnóstica), `IDateTimeProviderPort` (para abstraer la obtención de la fecha/hora actual, útil para testing), o `IIdGeneratorPort` (aunque ya tenemos `UuidUtils`, un puerto podría formalizarlo para DI).
  Justificación: Aumentar el desacoplamiento y la testabilidad de componentes que dependen de estos servicios transversales.
  Impacto: Definición de nuevas interfaces de puerto en esta librería.
]
[
  Mejora Propuesta 2 (Tipos de Error en Puertos): Actualmente `IRepositoryPort` devuelve `Result<..., ExceptionBase | Error>`. Se podría refinar para que los puertos declaren tipos de error más específicos que sus implementaciones podrían devolver (ej. `DatabaseError`, `NetworkError` si se trata de un puerto para una API externa). Esto requeriría definir esos tipos de error (posiblemente en `shared-errors` o una librería de errores de infraestructura).
  Justificación: Contratos de error más precisos para los consumidores de los puertos.
  Impacto: Modificación de las firmas de los puertos y creación de nuevos tipos de error.
]

*/
