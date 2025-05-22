// RUTA: libs/core/domain/shared-kernel/cdskports/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `cdskports`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Define interfaces (puertos) genéricos y fundamentales para abstracciones de infraestructura que las capas de dominio y aplicación necesitan. Incluye `IRepositoryPort` para persistencia, `ILoggerPort` para logging, `IUnitOfWorkPort` para gestión de transacciones, y `IConfigPort` para acceso a configuraciones globales de la plataforma.
- **Alias de Importación (importPath):** `@dfs-suite/cdskports`
- **Ubicación en el Monorepo:** `libs/core/domain/shared-kernel/cdskports`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `shared-kernel`
- **`layer`:** `domain`
- **`kernel` (sub-tipo):** `ports`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/repository.port';` (Exporta `IRepositoryPort` y `REPOSITORY_PORT` Symbol)
- `export * from './lib/logger.port';` (Exporta `ILoggerPort` y `LOGGER_PORT` Symbol)
- `export * from './lib/unit-of-work.port';` (Exporta `IUnitOfWorkPort` y `UNIT_OF_WORK_PORT` Symbol)
- `export * from './lib/config.port';` (Exporta `IConfigPort` y `CONFIG_PORT` Symbol)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `repository.port.ts`: Define `IRepositoryPort`.
- `logger.port.ts`: Define `ILoggerPort`.
- `unit-of-work.port.ts`: Define `IUnitOfWorkPort`.
- `config.port.ts`: Define `IConfigPort`.

## 5. Configuración de TypeScript (`tsconfig.lib.json`, `tsconfig.spec.json`)

- Heredan de: `../../../../../tsconfig.base.json`.
- `compilerOptions.declaration`: `true` en `tsconfig.lib.json`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- Hereda de: `../../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Configurado para los `tsconfig` locales y el `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `cdskports`
  - `preset`: `../../../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shtypes`, `@dfs-suite/shresult`, `@dfs-suite/sherrors`, `@dfs-suite/cdskentities`.
  - `passWithNoTests`: `true`.
- **`project.json` (Target `test`):**
  - `options.passWithNoTests`: `true`.

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/shresult`, `@dfs-suite/sherrors`, `@dfs-suite/cdskentities`.
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica
- Estos puertos son la base para la inversión de dependencias.
- (Deuda) Aunque son interfaces, se podrían añadir tests conceptuales para validar su estructura o ejemplos de uso si fuera beneficioso para la documentación o el DX.

## 10. Problemas Comunes y Soluciones Encontradas
- (Mantener actualizado).
// RUTA: libs/core/domain/shared-kernel/cdskports/LIBRARY_CONFIG.MD
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creación del `LIBRARY_CONFIG.MD` para `cdskports`.", "justificacion": "Documentación esencial de la librería.", "impacto": "Claridad y mantenibilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
