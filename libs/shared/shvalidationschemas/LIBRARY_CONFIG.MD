// RUTA: libs/shared/shvalidationschemas/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `shvalidationschemas`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Define esquemas de validación reutilizables con Zod para la validación de datos estructurados, como DTOs de entrada, Branded Types, y formatos comunes (email, UUID, paginación, teléfono, dirección).
- **Alias de Importación (importPath):** `@dfs-suite/shvalidationschemas`
- **Ubicación en el Monorepo:** `libs/shared/shvalidationschemas`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `shared`
- **`type`:** `validation`
- **`layer`:** `shared`
- **`technology`:** `zod`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/zod.instance';` (Re-exporta `z` de Zod)
- `export * from './lib/common.schemas';` (Schemas para Email, UUID, todos los Branded IDs, IsoDateString, etc.)
- `export * from './lib/pagination.schemas';` (Schema para `IPaginatedQueryParams`)
- `export * from './lib/phone-number.schema';` (Schema para números de teléfono E.164 normalizados)
- `export * from './lib/address.schema';` (Schema para direcciones)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `zod.instance.ts`: Asegura una única instancia de Zod.
- `common.schemas.ts`: Contiene la mayoría de los schemas, incluyendo los para Branded IDs.
- `pagination.schemas.ts`: Schema para parámetros de paginación.
- `phone-number.schema.ts`: Schema para validación de números de teléfono.
- `address.schema.ts`: Schema para validación de direcciones.

## 5. Configuración de TypeScript (`tsconfig.lib.json`)

- Hereda de: `../../../tsconfig.base.json` (relativo a `libs/shared/shvalidationschemas/tsconfig.json`).
- `compilerOptions.declaration`: `true`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- Hereda de: `../../../eslint.config.mjs` (raíz del monorepo).
- **`languageOptions.parserOptions.project`:** Apunta a `tsconfig.lib.json` local y `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `shvalidationschemas`
  - `preset`: `../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shconstants` y `@dfs-suite/shtypes`.
  - `passWithNoTests`: `true` (hasta que se implementen tests para los schemas).
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/shared/shvalidationschemas/jest.config.ts`

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shconstants`, `@dfs-suite/shtypes`.
- **Externas (NPM):** `zod`.

## 9. Consideraciones Específicas y Deuda Técnica

- Asegurar que los schemas Zod se alineen con los Branded Types de `@dfs-suite/shtypes` usando `.brand<'TypeName'>()`.
- Mantener los schemas lo más genéricos posible para fomentar la reutilización.
- (Deuda) Implementar tests unitarios para los schemas Zod más complejos o con lógica de transformación/refinamiento.

## 10. Problemas Comunes y Soluciones Encontradas
- (Mantener actualizado).
// RUTA: libs/shared/shvalidationschemas/LIBRARY_CONFIG.MD
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creación del `LIBRARY_CONFIG.MD` para `shvalidationschemas`.", "justificacion": "Documentación esencial de la librería.", "impacto": "Claridad y mantenibilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
