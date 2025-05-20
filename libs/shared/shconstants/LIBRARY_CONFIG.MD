// RUTA: libs/shared/shconstants/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `shconstants`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Almacena constantes globales inmutables y reutilizables en todo el sistema, como valores por defecto para paginación, expresiones regulares comunes y constantes de tiempo.
- **Alias de Importación (importPath):** `@dfs-suite/shconstants`
- **Ubicación en el Monorepo:** `libs/shared/shconstants`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `shared`
- **`type`:** `constants`
- **`layer`:** `shared`
- **`domain` (si aplica):** N/A
- **`feature` (si aplica):** N/A
- **`technology` (si aplica):** N/A
- **`app` (si aplica):** N/A

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/pagination.constants';`
- `export * from './lib/regex.constants';`
- `export * from './lib/time.constants';`

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `pagination.constants.ts`: Constantes para límites y defaults de paginación.
- `regex.constants.ts`: Expresiones regulares comunes (email, UUID).
- `time.constants.ts`: Constantes para unidades de tiempo (milisegundos, segundos).

## 5. Configuración de TypeScript

- **`tsconfig.json` (Raíz de la Librería):**
  - Hereda de: `../../../tsconfig.base.json`
  - Referencias: `./tsconfig.lib.json` (posiblemente no `./tsconfig.spec.json` si no hay tests)
- **`tsconfig.lib.json` (Código Fuente):**
  - Hereda de: `./tsconfig.json`
  - `compilerOptions.outDir`: `../../../dist/out-tsc`
  - `compilerOptions.declaration`: `true`
  - `compilerOptions.types`: `["node"]`
  - `include`: `["src/**/*.ts"]`
  - `exclude`: `["jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts"]`
- **`tsconfig.spec.json` (Tests):** (Si existiera)
  - Hereda de: `./tsconfig.json`
  - `compilerOptions.outDir`: `../../../dist/out-tsc`
  - `compilerOptions.module`: `commonjs`
  - `compilerOptions.types`: `["jest", "node"]`
  - `include`: `["jest.config.ts", "src/**/*.test.ts", "src/**/*.spec.ts", "src/**/*.d.ts"]`

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../eslint.config.mjs` (raíz del monorepo).
- **`languageOptions.parserOptions.project` para Código Fuente (`src/lib`):**
  - `[ "[ruta-monorepo-root]/libs/shared/shconstants/tsconfig.lib.json", "[ruta-monorepo-root]/tsconfig.base.json" ]` (sin `tsconfig.spec.json` si no hay tests)
- **Plugins Específicos:** Ninguno adicional al base.
- **Reglas Sobrescritas/Adicionales:** Ninguna por defecto.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `shconstants`
  - `preset`: `../../../jest.preset.js`
  - `passWithNoTests`: `true` (probable para una librería de solo constantes)
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/shared/shconstants/jest.config.ts`
  - `options.passWithNoTests`: `true`
- **`moduleNameMapper`:** Vacío.

## 8. Dependencias Clave

- **Internas:** Ninguna.
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica

- Mantener las constantes verdaderamente globales y agnósticas.
- Evitar la inclusión de valores que puedan cambiar dinámicamente o que sean específicos de un entorno (esos van en config).

// RUTA: libs/shared/shconstants/LIBRARY_CONFIG.MD
