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

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/pagination.constants';`
- `export * from './lib/regex.constants';`
- `export * from './lib/time.constants';`

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `pagination.constants.ts`: Constantes para límites y defaults de paginación.
- `regex.constants.ts`: Expresiones regulares comunes (email, UUID).
- `time.constants.ts`: Constantes para unidades de tiempo (milisegundos, segundos).

## 5. Configuración de TypeScript (`tsconfig.lib.json`)

- Hereda de: `../../../tsconfig.base.json` (relativo a `libs/shared/shconstants/tsconfig.json`).
- `compilerOptions.declaration`: `true`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- Hereda de: `../../../eslint.config.mjs` (raíz del monorepo).
- **`languageOptions.parserOptions.project`:** Apunta a `tsconfig.lib.json` local y `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `shconstants`
  - `preset`: `../../../jest.preset.js`
  - `passWithNoTests`: `true`.
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/shared/shconstants/jest.config.ts`
  - `options.passWithNoTests`: `true`.

## 8. Dependencias Clave

- **Internas:** Ninguna.
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica

- Mantener las constantes verdaderamente globales y agnósticas.
- Evitar la inclusión de valores que puedan cambiar dinámicamente o que sean específicos de un entorno (esos van en config).

## 10. Problemas Comunes y Soluciones Encontradas
- (Mantener actualizado).
// RUTA: libs/shared/shconstants/LIBRARY_CONFIG.MD
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creación del `LIBRARY_CONFIG.MD` para `shconstants`.", "justificacion": "Documentación esencial de la librería.", "impacto": "Claridad y mantenibilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
