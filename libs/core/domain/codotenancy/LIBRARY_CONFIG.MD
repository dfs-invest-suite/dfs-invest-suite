// RUTA: libs/core/domain/codotenancy/LIBRARY_CONFIG.MD

# Configuración y Estándares de la Librería: `codotenancy`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Contiene la lógica de dominio pura para el Bounded Context de "Tenancy". Define las entidades (`TenantEntity`, `TenantConfigurationEntity`), Value Objects (`TenantStatusVO`, `DbConnectionConfigVO`, `WabaCredentialsVO`), puertos de repositorio (`ITenantRepositoryPort`, `ITenantConfigurationRepositoryPort`), eventos de dominio y errores específicos de la gestión de tenants.
- **Alias de Importación (importPath):** `@dfs-suite/codotenancy`
- **Ubicación en el Monorepo:** `libs/core/domain/codotenancy`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `domain-logic`
- **`layer`:** `domain`
- **`domain`:** `tenancy`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- Entidades: `TenantEntity`, `TenantConfigurationEntity`.
- Value Objects: `DbConnectionConfigVO`, `TenantStatusVO`, `TenantStatusEnum`, `WabaCredentialsVO`.
- Puertos: `ITenantRepositoryPort`, `TENANT_REPOSITORY_PORT`, `ITenantConfigurationRepositoryPort`, `TENANT_CONFIGURATION_REPOSITORY_PORT`.
- Eventos de Dominio: `TenantCreatedEvent` (y su payload), `TenantActivatedEvent`, `TenantSuspendedEvent`, `TenantWabaConfigUpdatedEvent`.
- Errores de Dominio: `InvalidTenantStatusTransitionError`, `TenantAlreadyExistsError`, `TenantConfigurationNotFoundError`.

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `entities/`: Contiene `tenant.entity.ts`, `tenant-configuration.entity.ts`.
- `value-objects/`: Contiene los VOs mencionados.
- `ports/`: Contiene las interfaces de repositorio.
- `events/`: Contiene las definiciones de eventos de dominio.
- `errors/`: Contiene las clases de error específicas del dominio.
- `services/` (Opcional): Para lógica de dominio que no encaja en una entidad.

## 5. Configuración de TypeScript (`tsconfig.lib.json`, `tsconfig.spec.json`)

- Heredan de: `../../../../tsconfig.base.json`.
- `compilerOptions.declaration`: `true` en `tsconfig.lib.json`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- Hereda de: `../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Configurado para los `tsconfig` locales y el `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `codotenancy`
  - `preset`: `../../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shtypes`, `@dfs-suite/shutils`, `@dfs-suite/sherrors`, `@dfs-suite/shresult`, `@dfs-suite/cdskentities`, `@dfs-suite/cdskvalueobjects`, `@dfs-suite/cdskevents`.
  - `passWithNoTests`: `false`.
- **`project.json` (Target `test`):**
  - `options.passWithNoTests`: `false`.

## 8. Dependencias Clave

- **Internas (Shared Kernel):** `@dfs-suite/cdskentities`, `@dfs-suite/cdskvalueobjects`, `@dfs-suite/cdskevents`.
- **Internas (Shared Global):** `@dfs-suite/shtypes`, `@dfs-suite/shutils`, `@dfs-suite/sherrors`, `@dfs-suite/shresult`.
- **Externas (NPM):** `uuid` (indirectamente vía `shutils`).

## 9. Consideraciones Específicas y Deuda Técnica

- La entidad `TenantEntity` es la raíz del agregado y maneja las transiciones de estado y la configuración.
- (Deuda) Implementar tests unitarios exhaustivos para `TenantEntity` (cubriendo todos los métodos de cambio de estado y validaciones) y `TenantConfigurationEntity`.

## 10. Problemas Comunes y Soluciones Encontradas

- Asegurar que los `moduleNameMapper` en `jest.config.ts` sean correctos y completos.
  // RUTA: libs/core/domain/codotenancy/LIBRARY_CONFIG.MD
  /_ SECCIÓN DE MEJORAS REALIZADAS
  [
  { "mejora": "Creación del `LIBRARY_CONFIG.MD` para `codotenancy`.", "justificacion": "Documentación esencial.", "impacto": "Claridad." }
  ]
  _/
  /_ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] _/
