// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `cdskvalueobjects`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Provee la clase base abstracta `ValueObject<TProps>` para la creación de Value Objects inmutables, que representan conceptos descriptivos del dominio y se definen por sus atributos. También incluye implementaciones de VOs comunes y transversales (ej. `IsoDateStringVO`, `EmailVO`, `PhoneNumberVO`, `UrlVO`, `MoneyVO`).
- **Alias de Importación (importPath):** `@dfs-suite/cdskvalueobjects`
- **Ubicación en el Monorepo:** `libs/core/domain/shared-kernel/cdskvalueobjects`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `shared-kernel`
- **`layer`:** `domain`
- **`kernel` (sub-tipo):** `value-objects`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/value-object.base';`
- `export * from './lib/iso-date-string.vo';`
- `export * from './lib/email.vo';`
- `export * from './lib/phone-number.vo';`
- `export * from './lib/url.vo';`
- `export * from './lib/money.vo';`

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `value-object.base.ts`: Define la clase base abstracta.
- Archivos individuales `*.vo.ts` para cada Value Object específico.

## 5. Configuración de TypeScript (`tsconfig.lib.json` y `tsconfig.spec.json`)

- Heredan de: `../../../../../tsconfig.base.json` (relativo a `tsconfig.json` local).
- `compilerOptions.declaration`: `true` en `tsconfig.lib.json`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- Hereda de: `../../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Configurado para `tsconfig.lib.json` y `tsconfig.spec.json`.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `cdskvalueobjects`
  - `preset`: `../../../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shutils`, `@dfs-suite/shvalidationschemas`.
  - `passWithNoTests`: `false`.
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/core/domain/shared-kernel/cdskvalueobjects/jest.config.ts`

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shutils`, `@dfs-suite/shvalidationschemas`.
- **Externas (NPM):** Ninguna directa (Zod es usado vía `shvalidationschemas`).

## 9. Consideraciones Específicas y Deuda Técnica

- La inmutabilidad y la igualdad basada en valor son fundamentales.
- La validación en el constructor (vía `validate()` de la subclase y `checkIfEmpty()` de la base) es crucial.
- (Deuda) Implementar tests unitarios para todos los VOs implementados (`EmailVO`, `PhoneNumberVO`, `UrlVO`, `MoneyVO`).

## 10. Problemas Comunes y Soluciones Encontradas
- Errores "Cannot find module" en tests se resuelven con `moduleNameMapper` correcto en `jest.config.ts`.
- `iso-date-string.vo.spec.ts` tuvo problemas con la detección de `ArgumentInvalidException` debido a que la validación con Zod en el VO era más precisa que el test original.
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/LIBRARY_CONFIG.MD
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creación del `LIBRARY_CONFIG.MD` para `cdskvalueobjects`.", "justificacion": "Documentación esencial de la librería.", "impacto": "Claridad y mantenibilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
