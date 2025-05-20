// RUTA: libs/core/domain/shared-kernel/cdskentities/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `cdskentities`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Provee las clases base abstractas `Entity` y `AggregateRoot` que son fundamentales para el modelado de dominio según los principios de DDD. Encapsulan la gestión de identidad, igualdad, y la emisión de eventos de dominio (para `AggregateRoot`).
- **Alias de Importación (importPath):** `@dfs-suite/cdskentities`
- **Ubicación en el Monorepo:** `libs/core/domain/shared-kernel/cdskentities`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `shared-kernel`
- **`layer`:** `domain`
- **`kernel` (sub-tipo):** `entities`
- **`domain` (si aplica):** N/A (es shared-kernel)
- **`feature` (si aplica):** N/A
- **`technology` (si aplica):** N/A
- **`app` (si aplica):** N/A

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/entity.base';` (Exporta `Entity`, `BaseEntityProps`, `CreateEntityProps`)
- `export * from './lib/aggregate-root.base';` (Exporta `AggregateRoot`)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `entity.base.ts`: Define la clase base abstracta para todas las entidades.
- `aggregate-root.base.ts`: Define la clase base abstracta para todas las raíces de agregado.

## 5. Configuración de TypeScript

- **`tsconfig.json` (Raíz de la Librería):**
  - Hereda de: `../../../../../tsconfig.base.json`
  - Referencias: `./tsconfig.lib.json`, `./tsconfig.spec.json`
- **`tsconfig.lib.json` (Código Fuente):**
  - Hereda de: `./tsconfig.json`
  - `compilerOptions.outDir`: `../../../../../dist/out-tsc`
  - `compilerOptions.declaration`: `true`
  - `compilerOptions.types`: `["node"]`
  - `include`: `["src/**/*.ts"]`
  - `exclude`: `["jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts"]`
- **`tsconfig.spec.json` (Tests):**
  - Hereda de: `./tsconfig.json`
  - `compilerOptions.outDir`: `../../../../../dist/out-tsc`
  - `compilerOptions.module`: `commonjs`
  - `compilerOptions.types`: `["jest", "node"]`
  - `include`: `["jest.config.ts", "src/**/*.test.ts", "src/**/*.spec.ts", "src/**/*.d.ts"]`

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../../../eslint.config.mjs` (raíz del monorepo).
- **`languageOptions.parserOptions.project` para Código Fuente (`src/lib`):**
  - `[ "[ruta-monorepo-root]/libs/core/domain/shared-kernel/cdskentities/tsconfig.lib.json", "[ruta-monorepo-root]/libs/core/domain/shared-kernel/cdskentities/tsconfig.spec.json", "[ruta-monorepo-root]/tsconfig.base.json" ]`

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `cdskentities`
  - `preset`: `../../../../../jest.preset.js`
  - `moduleNameMapper`: (Mapea a `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shutils`, `@dfs-suite/cdskevents`)
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/core/domain/shared-kernel/cdskentities/jest.config.ts`
  - `options.passWithNoTests`: `false`

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shutils`, `@dfs-suite/cdskevents`.
- **Externas (NPM):** Ninguna directa.

## 9. Consideraciones Específicas y Deuda Técnica

- `AggregateRoot` gestiona una lista interna de `IDomainEvent`. La propagación y manejo de estos eventos es responsabilidad de la capa de aplicación e infraestructura.
- La validación (`validateProps` y `validate`) es crucial en estas clases base.

// RUTA: libs/core/domain/shared-kernel/cdskentities/LIBRARY_CONFIG.MD
