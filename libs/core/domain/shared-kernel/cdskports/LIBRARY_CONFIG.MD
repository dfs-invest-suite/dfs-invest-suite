// RUTA: libs/core/domain/shared-kernel/cdskports/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `cdskports`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Define interfaces (puertos) genéricos para abstracciones de infraestructura que la capa de dominio o aplicación necesita, como `IRepositoryPort` para la persistencia y `ILoggerPort` para el logging. También incluye esqueletos para `IUnitOfWorkPort` y `IConfigPort`.
- **Alias de Importación (importPath):** `@dfs-suite/cdskports`
- **Ubicación en el Monorepo:** `libs/core/domain/shared-kernel/cdskports`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `shared-kernel`
- **`layer`:** `domain`
- **`kernel` (sub-tipo):** `ports`
- **`domain` (si aplica):** N/A
- **`feature` (si aplica):** N/A
- **`technology` (si aplica):** N/A
- **`app` (si aplica):** N/A

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/repository.port';` (Exporta `IRepositoryPort`)
- `export * from './lib/logger.port';` (Exporta `ILoggerPort` y `LOGGER_PORT` symbol)
- `export * from './lib/unit-of-work.port';` (Cuando se implemente)
- `export * from './lib/config.port';` (Cuando se implemente)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `repository.port.ts`: Define `IRepositoryPort`.
- `logger.port.ts`: Define `ILoggerPort`.
- `unit-of-work.port.ts`: Esqueleto para `IUnitOfWorkPort`.
- `config.port.ts`: Esqueleto para `IConfigPort`.

## 5. Configuración de TypeScript

- **`tsconfig.json` (Raíz de la Librería):**
  - Hereda de: `../../../../../tsconfig.base.json`
  - Referencias: `./tsconfig.lib.json`, `./tsconfig.spec.json`
- **`tsconfig.lib.json` (Código Fuente):**
  - (Similar a `cdskentities`)
- **`tsconfig.spec.json` (Tests):**
  - (Similar a `cdskentities`, si hay tests)

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project` para Código Fuente (`src/lib`):**
  - `[ "[ruta-monorepo-root]/libs/core/domain/shared-kernel/cdskports/tsconfig.lib.json", "[ruta-monorepo-root]/libs/core/domain/shared-kernel/cdskports/tsconfig.spec.json", "[ruta-monorepo-root]/tsconfig.base.json" ]`

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `cdskports`
  - `preset`: `../../../../../jest.preset.js`
  - `moduleNameMapper`: (Mapea a `@dfs-suite/shtypes`, `@dfs-suite/shresult`, `@dfs-suite/sherrors`, `@dfs-suite/cdskentities`)
  - `passWithNoTests`: `true` (ya que son mayormente interfaces, podrían no tener tests directos)
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/core/domain/shared-kernel/cdskports/jest.config.ts`
  - `options.passWithNoTests`: `true`

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/shresult`, `@dfs-suite/sherrors`, `@dfs-suite/cdskentities`.
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica

- Estos puertos son cruciales para la inversión de dependencias y la testabilidad de las capas de dominio y aplicación.
- La definición de `IUnitOfWorkPort` y `IConfigPort` debe hacerse cuidadosamente para que sean genéricos y útiles.

// RUTA: libs/core/domain/shared-kernel/cdskports/LIBRARY_CONFIG.MD
