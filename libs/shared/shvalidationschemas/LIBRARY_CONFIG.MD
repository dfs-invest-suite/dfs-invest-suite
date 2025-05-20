// RUTA: libs/shared/shvalidationschemas/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `shvalidationschemas`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Define esquemas de validación reutilizables con Zod para la validación de datos estructurados, como DTOs de entrada, Branded Types, y formatos comunes (email, UUID, paginación).
- **Alias de Importación (importPath):** `@dfs-suite/shvalidationschemas`
- **Ubicación en el Monorepo:** `libs/shared/shvalidationschemas`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `shared`
- **`type`:** `validation`
- **`layer`:** `shared`
- **`domain` (si aplica):** N/A
- **`feature` (si aplica):** N/A
- **`technology` (si aplica):** `zod`
- **`app` (si aplica):** N/A

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/zod.instance';` (Re-exporta `z` de Zod)
- `export * from './lib/common.schemas';` (Schemas para Email, UUID, Branded IDs, IsoDateString)
- `export * from './lib/pagination.schemas';` (Schema para `IPaginatedQueryParams`)
- `export * from './lib/phone-number.schema';` (Schema para números de teléfono)
- `export * from './lib/address.schema';` (Schema para direcciones)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `zod.instance.ts`: Asegura una única instancia de Zod.
- `common.schemas.ts`: Schemas para tipos primitivos y Branded Types.
- `pagination.schemas.ts`: Schema para parámetros de paginación.
- `phone-number.schema.ts`: Schema para validación de números de teléfono.
- `address.schema.ts`: Schema para validación de direcciones.

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
  - `[ "[ruta-monorepo-root]/libs/shared/shvalidationschemas/tsconfig.lib.json", "[ruta-monorepo-root]/libs/shared/shvalidationschemas/tsconfig.spec.json", "[ruta-monorepo-root]/tsconfig.base.json" ]`
- **Plugins Específicos:** Ninguno adicional al base.
- **Reglas Sobrescritas/Adicionales:** Ninguna por defecto.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `shvalidationschemas`
  - `preset`: `../../../jest.preset.js`
  - `moduleNameMapper`: `{ "^@dfs-suite/shconstants$": "<rootDir>/../../../shared/shconstants/src/index.ts" }`
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/shared/shvalidationschemas/jest.config.ts`
  - `options.passWithNoTests`: `false` (debería tener tests para los schemas)

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shconstants` (para regex y valores de paginación).
- **Externas (NPM):** `zod`.

## 9. Consideraciones Específicas y Deuda Técnica

- Asegurar que los schemas Zod se alineen con los Branded Types de `@dfs-suite/shtypes` usando `.brand<'TypeName'>()`.
- Mantener los schemas lo más genéricos posible para fomentar la reutilización.

// RUTA: libs/shared/shvalidationschemas/LIBRARY_CONFIG.MD
