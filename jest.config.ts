// jest.config.ts
import type { Config } from 'jest';
import { getJestProjectsAsync } from '@nx/jest';
// No se necesitan imports de tipos de proyecto como CommandBase o shared-types aquí.

export default async (): Promise<Config> => ({
  projects: await getJestProjectsAsync(),
});

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Configuraciones de Cobertura Global): Se podrían definir umbrales de cobertura de código globales o configuraciones de reporte de cobertura comunes para todos los proyectos Jest desde este archivo raíz, si se desea una política uniforme.
  Justificación: Estandarizar los requisitos de calidad de las pruebas en todo el monorepo.
  Impacto: Añadir propiedades de configuración de Jest relacionadas con la cobertura (`coverageThreshold`, `collectCoverageFrom`, etc.).
]
[
  Mejora Propuesta 2 (Watch Plugins para Mejorar DX): Para mejorar la experiencia de desarrollo al ejecutar tests en modo watch, se podrían añadir plugins de Jest como `jest-watch-typeahead` (para filtrar por nombre de archivo o test) o `jest-watch-select-projects`.
  Justificación: Facilita la filtración y re-ejecución de tests de manera más eficiente durante el desarrollo.
  Impacto: Añadir dependencias de desarrollo (`jest-watch-typeahead`) y configuración a la sección `watchPlugins` de Jest.
]
[
  Mejora Propuesta 3 (Reporteros Personalizados): Para CI o para análisis más detallados, se podrían configurar reporteros de Jest personalizados (ej. `jest-html-reporters`, `jest-stare`).
  Justificación: Generar informes de pruebas más visuales o con formatos específicos para integración con otras herramientas.
  Impacto: Añadir dependencias y configurar la propiedad `reporters` en la configuración de Jest.
]
*/
// jest.config.ts
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Validación de Payload del Comando):
    Se podrían añadir validaciones básicas al constructor del comando (ej. que `name` y `ownerEmail` no estén vacíos) usando `Guard` de `shared-utils`. Sin embargo, la validación más robusta de DTOs de entrada suele hacerse en la capa de API (controladores/resolvers) antes de crear el comando.
    Justificación: "Fail fast" si el comando se crea con datos obviamente inválidos.
    Impacto: Lógica de validación adicional en el constructor.
]
[
  Mejora Propuesta 2 (User ID vs Email):
    Actualmente el comando lleva `ownerEmail`. El `TenantEntity` espera un `ownerUserId`. El `CreateTenantUseCase` tendrá que manejar esta transformación. En un sistema completo, el `ownerEmail` se usaría para buscar/crear un usuario en un módulo de `Users` y obtener su `UserId` real.
    Justificación: Separación de concerns y alineación con un modelo de dominio de usuarios más robusto.
    Impacto: El `CreateTenantUseCase` necesitaría interactuar con un `IUserRepositoryPort` o un `UserProvisioningServicePort`. Para el MVP inicial, se puede hacer un cast directo del email a `UserId` asumiendo que el email es el identificador único del usuario. Esto se marcará como deuda técnica en el caso de uso.
]

*/
// libs/core/application/tenancy/src/lib/commands/create-tenant/create-tenant.command.ts
