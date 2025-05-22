// RUTA: libs/shared/sherrors/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `sherrors`

## 1. Propósito y Responsabilidad Principal
- **Descripción Concisa:** Provee una jerarquía base para excepciones personalizadas (`ExceptionBase`), códigos de error genéricos (`exception.codes.ts`), y un conjunto de clases de excepción comunes (`generic.exceptions.ts`) para ser usadas en todo el sistema.
- **Alias de Importación (importPath):** `@dfs-suite/sherrors`
- **Ubicación en el Monorepo:** `libs/shared/sherrors`

## 2. Tags Nx y Rol Arquitectónico
- **`scope`:** `shared`
- **`type`:** `errors`
- **`layer`:** `shared`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)
- `export * from './lib/exception.base';`
- `export * from './lib/exception.codes';`
- `export * from './lib/generic.exceptions';`

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)
- `exception.base.ts`: Define `ExceptionBase` y `SerializedException`.
- `exception.codes.ts`: Define constantes para códigos de error genéricos.
- `generic.exceptions.ts`: Define clases de excepción comunes como `NotFoundException`, `ArgumentInvalidException`, etc.

## 5. Configuración de TypeScript (`tsconfig.lib.json`)
- Hereda de: `../../../tsconfig.base.json` (relativo a `libs/shared/sherrors/tsconfig.json`).
- `compilerOptions.declaration`: `true`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)
- Hereda de: `../../../eslint.config.mjs` (raíz del monorepo).
- **`languageOptions.parserOptions.project`:** Apunta a los `tsconfig.lib.json` (y `tsconfig.spec.json` si tuviera tests) locales y al `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)
- **`jest.config.ts`:**
  - `displayName`: `sherrors`
  - `preset`: `../../../jest.preset.js`
  - `moduleNameMapper`: Mapea `@dfs-suite/shtypes`.
  - `passWithNoTests`: `true` (ya que el código actual es funcional y no tiene tests propios complejos más allá de la estructura).
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/shared/sherrors/jest.config.ts`

## 8. Dependencias Clave
- **Internas:** `@dfs-suite/shtypes`.
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica
- Asegurar que todas las excepciones personalizadas hereden de `ExceptionBase`.
- (Deuda) Implementar tests unitarios para la lógica de `ExceptionBase.toJSON()` y para verificar que las excepciones genéricas se construyan correctamente con sus códigos y mensajes.

## 10. Problemas Comunes y Soluciones Encontradas
- (Mantener actualizado con cualquier problema y solución específica de esta librería).
// RUTA: libs/shared/sherrors/LIBRARY_CONFIG.MD
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creación del `LIBRARY_CONFIG.MD` para `sherrors`.", "justificacion": "Documentación esencial de la librería.", "impacto": "Claridad y mantenibilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
