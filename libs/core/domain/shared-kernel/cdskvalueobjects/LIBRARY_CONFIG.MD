// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `cdskvalueobjects`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Provee la clase base abstracta `ValueObject<TProps>` para la creación de Value Objects inmutables, que representan conceptos descriptivos del dominio y se definen por sus atributos. También incluye implementaciones de VOs comunes y transversales (ej. `IsoDateStringVO`).
- **Alias de Importación (importPath):** `@dfs-suite/cdskvalueobjects`
- **Ubicación en el Monorepo:** `libs/core/domain/shared-kernel/cdskvalueobjects`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `shared-kernel`
- **`layer`:** `domain`
- **`kernel` (sub-tipo):** `value-objects`
- **`domain` (si aplica):** N/A
- **`feature` (si aplica):** N/A
- **`technology` (si aplica):** N/A
- **`app` (si aplica):** N/A

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/value-object.base';` (Exporta `ValueObject`, `IDomainPrimitive`)
- `export * from './lib/iso-date-string.vo';`
- `export * from './lib/email.vo';` (Cuando se implemente)
- `export * from './lib/phone-number.vo';` (Cuando se implemente)
- `export * from './lib/url.vo';` (Cuando se implemente)
- `export * from './lib/money.vo';` (Cuando se implemente)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `value-object.base.ts`: Define la clase base abstracta para todos los VOs.
- `iso-date-string.vo.ts`: Implementación de VO para fechas ISO 8601.
- (Otros archivos `.vo.ts` para VOs específicos).

## 5. Configuración de TypeScript

- **`tsconfig.json` (Raíz de la Librería):**
  - Hereda de: `../../../../../tsconfig.base.json`
  - Referencias: `./tsconfig.lib.json`, `./tsconfig.spec.json`
- **`tsconfig.lib.json` (Código Fuente):**
  - (Similar a `cdskentities`)
- **`tsconfig.spec.json` (Tests):**
  - (Similar a `cdskentities`)

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project` para Código Fuente (`src/lib`):**
  - `[ "[ruta-monorepo-root]/libs/core/domain/shared-kernel/cdskvalueobjects/tsconfig.lib.json", "[ruta-monorepo-root]/libs/core/domain/shared-kernel/cdskvalueobjects/tsconfig.spec.json", "[ruta-monorepo-root]/tsconfig.base.json" ]`

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `cdskvalueobjects`
  - `preset`: `../../../../../jest.preset.js`
  - `moduleNameMapper`: (Mapea a `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shutils`, `@dfs-suite/shvalidationschemas` si los VOs los usan)
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/core/domain/shared-kernel/cdskvalueobjects/jest.config.ts`
  - `options.passWithNoTests`: `false`

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shutils`, (potencialmente) `@dfs-suite/shvalidationschemas`.
- **Externas (NPM):** Ninguna directa para la base, pero VOs específicos podrían usar (ej. `dinero.js` para `MoneyVO`).

## 9. Consideraciones Específicas y Deuda Técnica

- La inmutabilidad y la igualdad basada en valor son claves para los VOs.
- La validación de `props` en el constructor es fundamental.

// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/LIBRARY_CONFIG.MD
