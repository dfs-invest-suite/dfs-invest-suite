// RUTA: libs/shared/shresult/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `shresult`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Implementa el patrón funcional Result<T, E> para el manejo explícito de operaciones que pueden tener éxito (con un valor T) o fallar (con un error E), evitando el uso de excepciones para errores de negocio esperados.
- **Alias de Importación (importPath):** `@dfs-suite/shresult`
- **Ubicación en el Monorepo:** `libs/shared/shresult`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `shared`
- **`type`:** `functional`
- **`layer`:** `shared`
- **`domain` (si aplica):** N/A
- **`feature` (si aplica):** N/A
- **`technology` (si aplica):** N/A
- **`app` (si aplica):** N/A

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/result.type';` (Exporta `Ok<T,E>`, `Err<E,T>`, `Result<T,E>`)
- `export * from './lib/result.utils';` (Exporta `ok()`, `err()`, `isOk()`, `isErr()`)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `result.type.ts`: Define las interfaces y el tipo unión para el patrón Result.
- `result.utils.ts`: Contiene funciones helper para crear y discriminar instancias de `Ok` y `Err`, así como métodos funcionales (map, andThen, etc.).

## 5. Configuración de TypeScript

- **`tsconfig.json` (Raíz de la Librería):**
  - Hereda de: `../../../tsconfig.base.json`
  - Referencias: `./tsconfig.lib.json`, `./tsconfig.spec.json`
- **`tsconfig.lib.json` (Código Fuente):**
  - Hereda de: `./tsconfig.json`
  - `compilerOptions.outDir`: `../../../dist/out-tsc`
  - `compilerOptions.declaration`: `true`
  - `compilerOptions.types`: `["node"]`
  - `include`: `["src/**/*.ts"]`
  - `exclude`: `["jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts"]`
- **`tsconfig.spec.json` (Tests):**
  - Hereda de: `./tsconfig.json`
  - `compilerOptions.outDir`: `../../../dist/out-tsc`
  - `compilerOptions.module`: `commonjs`
  - `compilerOptions.types`: `["jest", "node"]`
  - `include`: `["jest.config.ts", "src/**/*.test.ts", "src/**/*.spec.ts", "src/**/*.d.ts"]`

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../eslint.config.mjs` (raíz del monorepo).
- **`languageOptions.parserOptions.project` para Código Fuente (`src/lib`):**
  - `[ "[ruta-monorepo-root]/libs/shared/shresult/tsconfig.lib.json", "[ruta-monorepo-root]/libs/shared/shresult/tsconfig.spec.json", "[ruta-monorepo-root]/tsconfig.base.json" ]`
- **Plugins Específicos:** Ninguno adicional al base.
- **Reglas Sobrescritas/Adicionales:** Ninguna por defecto.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `shresult`
  - `preset`: `../../../jest.preset.js`
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/shared/shresult/jest.config.ts`
  - `options.passWithNoTests`: `false` (debería tener tests)
- **`moduleNameMapper`:** Vacío (no depende de otras librerías del workspace).

## 8. Dependencias Clave

- **Internas:** Ninguna.
- **Externas (NPM):** Ninguna directa (sus tipos se usan con otras librerías, pero la implementación es autónoma).

## 9. Consideraciones Específicas y Deuda Técnica

- Asegurar que los métodos `unwrap()` y `unwrapErr()` tengan un manejo de errores robusto si se llaman en el tipo incorrecto.
- La implementación actual de los métodos funcionales (map, andThen, etc.) está en los objetos devueltos por `ok()` y `err()`, lo cual es eficiente.

// RUTA: libs/shared/shresult/LIBRARY_CONFIG.MD
