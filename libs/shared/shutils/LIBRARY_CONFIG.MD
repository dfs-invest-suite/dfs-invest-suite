// RUTA: libs/shared/shutils/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `shutils`

## 1. Propósito y Responsabilidad Principal
- **Descripción Concisa:** Provee funciones y clases utilitarias puras, sin estado y genéricas para ser usadas en todo el monorepo. Incluye validadores (`Guard`), generadores de IDs (`UuidUtils`), factoría de metadata (`createOperationMetadata`), y utilidades para strings, objetos y fechas.
- **Alias de Importación (importPath):** `@dfs-suite/shutils`
- **Ubicación en el Monorepo:** `libs/shared/shutils`

## 2. Tags Nx y Rol Arquitectónico
- **`scope`:** `shared`
- **`type`:** `utility`
- **`layer`:** `shared`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)
- `export * from './lib/guard';`
- `export * from './lib/metadata.factory';`
- `export * from './lib/uuid.utils';`
- `export * from './lib/string.utils';`
- `export * from './lib/object.utils';`
- `export * from './lib/date.utils';`

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)
- `guard.ts`, `metadata.factory.ts`, `uuid.utils.ts`, `string.utils.ts`, `object.utils.ts`, `date.utils.ts`.

## 5. Configuración de TypeScript (`tsconfig.lib.json`)
- Hereda de: `../../../tsconfig.base.json` (relativo a `libs/shared/shutils/tsconfig.json`).
- `compilerOptions.declaration`: `true`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)
- Hereda de: `../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Apunta a `tsconfig.lib.json`, `tsconfig.spec.json` locales y `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)
- **`jest.config.ts`:**
  - `displayName`: `shutils`
  - `preset`: `../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shvalidationschemas`, `@dfs-suite/shconstants`.
- **`passWithNoTests`:** `false` (esta librería tiene tests).

## 8. Dependencias Clave
- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shvalidationschemas`, `@dfs-suite/shconstants`.
- **Externas (NPM):** `uuid`, `date-fns`.

## 9. Consideraciones Específicas y Deuda Técnica
- `UuidUtils` expandido para cubrir todos los Branded IDs.
- `DateUtils` implementado con `date-fns`.
- `simpleDeepClone` en `ObjectUtils` tiene limitaciones; usar con precaución.

## 10. Problemas Comunes y Soluciones Encontradas
1.  **Error: `Cannot find module '@dfs-suite/shconstants'` en `uuid.utils.spec.ts` (Jest)**
    *   **Causa:** Falta de mapeo o path incorrecto en `moduleNameMapper` del `jest.config.ts` de `shutils`.
    *   **Solución:** Añadir/Corregir ` '^@dfs-suite/shconstants$': '<rootDir>/../shconstants/src/index.ts' ` al `moduleNameMapper`. `<rootDir>` en este contexto es la carpeta de `shutils`.
2.  **Error: `Cannot find module './result.utils'` en `uuid.utils.spec.ts` (Jest)**
    *   **Causa:** Contenido incorrecto copiado en `uuid.utils.spec.ts`.
    *   **Solución:** Restaurar el contenido correcto del test para `UuidUtils`.

// RUTA: libs/shared/shutils/LIBRARY_CONFIG.MD
