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
- `exception.base.ts`, `exception.codes.ts`, `generic.exceptions.ts`.

## 5. Configuración de TypeScript (`tsconfig.lib.json`)
- Hereda de: `../../../tsconfig.base.json` (relativo a `libs/shared/sherrors/tsconfig.json`).
- `compilerOptions.declaration`: `true`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)
- Hereda de: `../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Apunta a los `tsconfig` locales y al `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)
- **`jest.config.ts`:**
  - `displayName`: `sherrors`
  - `preset`: `../../../jest.preset.js`
  - `moduleNameMapper`: Mapea `@dfs-suite/shtypes`.
  - `passWithNoTests`: `true` (Temporalmente, hasta que se añadan tests para `ExceptionBase`).
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/shared/sherrors/jest.config.ts`

## 8. Dependencias Clave
- **Internas:** `@dfs-suite/shtypes`.
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica
- Integrar `correlationId` en `ExceptionBase` con un servicio de contexto.
- Añadir tests unitarios para la serialización de `ExceptionBase` y para cada excepción genérica.

## 10. Problemas Comunes y Soluciones Encontradas
- Asegurar que los `import` a `@dfs-suite/shtypes` usen el alias correcto.
- Verificar paths en `moduleNameMapper` del `jest.config.ts`.

// RUTA: libs/shared/sherrors/LIBRARY_CONFIG.MD
