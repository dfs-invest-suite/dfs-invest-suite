// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `cdskcommandsqueries`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Provee las interfaces y clases base para implementar el patrón Command Query Responsibility Segregation (CQRS) a un nivel ligero. Define `ICommand`, `CommandBase`, `IQuery`, `QueryBase`, `PaginatedQueryBase`, y las interfaces para sus manejadores (`ICommandHandler`, `IQueryHandler`). También incluye interfaces para comandos/queries autenticados (`IAuthenticatedCommand`, `IAuthenticatedQuery`).
- **Alias de Importación (importPath):** `@dfs-suite/cdskcommandsqueries`
- **Ubicación en el Monorepo:** `libs/core/domain/shared-kernel/cdskcommandsqueries`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `shared-kernel`
- **`layer`:** `domain`
- **`kernel` (sub-tipo):** `commands-queries`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/authenticated-command.interface';`
- `export * from './lib/authenticated-query.interface';`
- `export * from './lib/command-handler.interface';`
- `export * from './lib/command.base';`
- `export * from './lib/command.interface';`
- `export * from './lib/paginated-query.base';`
- `export * from './lib/query-handler.interface';`
- `export * from './lib/query.base';`
- `export * from './lib/query.interface';`

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- Archivos individuales para cada interfaz y clase base.
- `command.base.spec.ts` para tests de `CommandBase`.

## 5. Configuración de TypeScript (`tsconfig.lib.json`, `tsconfig.spec.json`)

- Heredan de: `../../../../../tsconfig.base.json`.
- `compilerOptions.declaration`: `true` en `tsconfig.lib.json`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- Hereda de: `../../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Configurado para los `tsconfig` locales y el `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `cdskcommandsqueries`
  - `preset`: `../../../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shtypes`, `@dfs-suite/shutils`, `@dfs-suite/shresult`, `@dfs-suite/sherrors`, `@dfs-suite/shconstants`.
  - `passWithNoTests`: `false`.
- **`project.json` (Target `test`):**
  - `options.passWithNoTests`: `false`.

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/shutils`, `@dfs-suite/shresult`, `@dfs-suite/sherrors`, `@dfs-suite/shconstants`.
- **Externas (NPM):** `uuid` (indirectamente vía `shutils`).

## 9. Consideraciones Específicas y Deuda Técnica
- (Deuda) Implementar tests para `QueryBase` y `PaginatedQueryBase`.

## 10. Problemas Comunes y Soluciones Encontradas
- Errores "Cannot find module" en tests resueltos ajustando `moduleNameMapper` en `jest.config.ts` a paths absolutos desde la raíz del monorepo.
- Warning `import/order` en `command.base.spec.ts` resuelto reordenando imports.
- Warning `no-unused-vars` para `_TResult` en `query.interface.ts` resuelto.
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/LIBRARY_CONFIG.MD
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creación del `LIBRARY_CONFIG.MD` para `cdskcommandsqueries`.", "justificacion": "Documentación esencial.", "impacto": "Claridad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
