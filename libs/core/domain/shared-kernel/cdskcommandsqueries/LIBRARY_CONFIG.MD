// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `cdskcommandsqueries`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Provee las interfaces y clases base para implementar el patrón Command Query Responsibility Segregation (CQRS) a un nivel ligero. Define `ICommand`, `CommandBase`, `IQuery`, `QueryBase`, `PaginatedQueryBase`, y las interfaces para sus manejadores (`ICommandHandler`, `IQueryHandler`). También incluye interfaces para comandos/queries autenticados.
- **Alias de Importación (importPath):** `@dfs-suite/cdskcommandsqueries`
- **Ubicación en el Monorepo:** `libs/core/domain/shared-kernel/cdskcommandsqueries`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `shared-kernel`
- **`layer`:** `domain`
- **`kernel` (sub-tipo):** `commands-queries`
- **`domain` (si aplica):** N/A
- **`feature` (si aplica):** N/A
- **`technology` (si aplica):** N/A
- **`app` (si aplica):** N/A

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/authenticated-command.interface';`
- `export * from './lib/authenticated-query.interface';`
- `export * from './lib/command-handler.interface';`
- `export * from './lib/command.base';`
- `export * from './lib/command.interface';` (Incluye `ICommandMetadata`)
- `export * from './lib/paginated-query.base';` (Incluye `OrderBy` type)
- `export * from './lib/query-handler.interface';`
- `export * from './lib/query.base';`
- `export * from './lib/query.interface';` (Incluye `IQueryMetadata`)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- Archivos individuales para cada interfaz y clase base mencionada arriba.

## 5. Configuración de TypeScript

- **`tsconfig.json` (Raíz de la Librería):**
  - Hereda de: `../../../../../tsconfig.base.json`
  - Referencias: `./tsconfig.lib.json`, `./tsconfig.spec.json`
- **`tsconfig.lib.json` (Código Fuente):**
  - (Similar a `cdskentities`)
- **`tsconfig.spec.json` (Tests):**
  - (Similar a `cdskentities`)

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project` para Código Fuente (`src/lib`):**
  - `[ "[ruta-monorepo-root]/libs/core/domain/shared-kernel/cdskcommandsqueries/tsconfig.lib.json", "[ruta-monorepo-root]/libs/core/domain/shared-kernel/cdskcommandsqueries/tsconfig.spec.json", "[ruta-monorepo-root]/tsconfig.base.json" ]`

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `cdskcommandsqueries`
  - `preset`: `../../../../../jest.preset.js`
  - `moduleNameMapper`: (Mapea a `@dfs-suite/shtypes`, `@dfs-suite/shutils`, `@dfs-suite/shresult`, `@dfs-suite/sherrors`, `@dfs-suite/shconstants`)
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/core/domain/shared-kernel/cdskcommandsqueries/jest.config.ts`
  - `options.passWithNoTests`: `false` (debería tener tests para las clases base)

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/shutils`, `@dfs-suite/shresult`, `@dfs-suite/sherrors`, `@dfs-suite/shconstants`.
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica

- Las clases base `CommandBase` y `QueryBase` deben inicializar correctamente la metadata usando `createOperationMetadata`.
- Las interfaces para comandos/queries autenticados añaden `userId` a la metadata.

// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/LIBRARY_CONFIG.MD
