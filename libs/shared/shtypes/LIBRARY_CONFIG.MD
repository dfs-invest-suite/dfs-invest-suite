// RUTA: libs/shared/shtypes/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `shtypes`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Define tipos TypeScript fundamentales, Branded Types para IDs y tipos primitivos semánticos, interfaces comunes (IApiResponse, IPaginated) y enums globales reutilizables en todo el monorepo `dfs-invest-suite`. Es la base del sistema de tipos del proyecto.
- **Alias de Importación (importPath):** `@dfs-suite/shtypes`
- **Ubicación en el Monorepo:** `libs/shared/shtypes`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `shared`
- **`type`:** `types`
- **`layer`:** `shared`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/brand.type';` (Exporta `Brand<K,T>`)
- `export * from './lib/primitive-types';` (Exporta todos los Branded IDs y tipos semánticos como `TenantId`, `IsoDateString`, etc.)
- `export * from './lib/maybe.type';` (Exporta `Maybe<T>`)
- `export * from './lib/object-literal.type';` (Exporta `ObjectLiteral<V>`)
- `export * from './lib/api-response.interface';` (Exporta `IApiResponse<TData, TErrorDetails>`)
- `export * from './lib/paginated.interface';` (Exporta `IPaginatedQueryParams`, `IPaginated<T>`)
- `export * from './lib/common-enums';` (Exporta `SortDirection`, `BasicEntityStatus`, `CommunicationChannel`)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `brand.type.ts`: Define el tipo helper `Brand<K, T>`.
- `primitive-types.ts`: Contiene la definición de todos los Branded Types para IDs y otros tipos semánticos.
- `maybe.type.ts`: Define el tipo `Maybe<T>`.
- `object-literal.type.ts`: Define la interfaz `ObjectLiteral<V>`.
- `api-response.interface.ts`: Define la interfaz `IApiResponse<TData, TErrorDetails>`.
- `paginated.interface.ts`: Define las interfaces `IPaginatedQueryParams` e `IPaginated<T>`.
- `common-enums.ts`: Define enums globales como `SortDirection`, `BasicEntityStatus`, y `CommunicationChannel`.

## 5. Configuración de TypeScript (`tsconfig.lib.json`)

- Hereda de: `../../../tsconfig.base.json` (relativo a `libs/shared/shtypes/tsconfig.json`) y luego a `tsconfig.json`.
- `compilerOptions`:
  - `outDir`: `../../../dist/out-tsc`
  - `declaration`: `true`
  - `types`: `["node"]`
- `include`: `["src/**/*.ts"]`
- `exclude`: `["jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts"]`

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- Hereda de: `../../../eslint.config.mjs` (raíz del monorepo).
- **`languageOptions.parserOptions.project`:**
  - `[ "[ruta-monorepo-root]/libs/shared/shtypes/tsconfig.lib.json", "[ruta-monorepo-root]/tsconfig.base.json" ]`
  (No incluye `tsconfig.spec.json` en `project` si no hay archivos `*.spec.ts` con lógica que necesite type-checking específico de test, lo cual es el caso para `shtypes`).

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `shtypes`
  - `preset`: `../../../jest.preset.js`
  - `passWithNoTests`: `true` (ya que esta librería solo contiene definiciones de tipo y no lógica ejecutable para testear unitariamente de forma tradicional).
- **`moduleNameMapper`:** Vacío (no tiene dependencias internas del workspace).

## 8. Dependencias Clave

- **Internas:** Ninguna.
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica

- **Completitud de `primitive-types.ts`:** Es crucial mantener este archivo actualizado con todos los Branded IDs necesarios a medida que el sistema evoluciona.
- **Uso de `Maybe<T>`:** Fomenta la claridad sobre la opcionalidad y nulabilidad de los datos.
- **`IApiResponse`:** Sirve como contrato estándar para todas las respuestas de `api-main`, mejorando la consistencia y la predictibilidad para los clientes.
- **`common-enums.ts`:** Debe usarse con discernimiento; solo para enums verdaderamente globales. Los enums específicos de un dominio deben residir en la librería de ese dominio.

## 10. Problemas Comunes y Soluciones Encontradas (Ejemplo para Futuras Librerías)

1.  **Error: `El módulo 'X' no tiene ningún miembro 'Y' exportado.` (TypeScript)**
    *   **Causa:** El archivo `X` no exporta `Y`, o hay un error en la ruta de importación en el archivo que intenta importar `Y`.
    *   **Solución:** Verificar la sentencia `export` en `X/index.ts` o `X/lib/archivo_que_define_Y.ts`. Corregir la ruta de importación en el archivo consumidor para que sea relativa correcta o use el alias `@dfs-suite/` correcto.
    *   **Ejemplo en `shtypes`:** `api-response.interface.ts` intentaba importar `Maybe` de `./primitive-types` cuando `Maybe` está en `./maybe.type`. Se corrigió el import.

2.  **Error: `Cannot find module '@dfs-suite/nombre-lib-antiguo'` (Jest o TypeScript/ESLint)**
    *   **Causa:** El código (fuente o test) está usando un alias de importación antiguo (ej. `@dfs-suite/shared-types`) en lugar del nuevo alias codificado (ej. `@dfs-suite/shtypes`) definido en `tsconfig.base.json`.
    *   **Solución:** Refactorizar todas las sentencias `import` para usar los alias correctos.

3.  **Error: `Cannot find module '@dfs-suite/nombre-lib-codificado'` (Jest)**
    *   **Causa:** El archivo `jest.config.ts` de la librería que se está testeando no tiene un `moduleNameMapper` configurado para el alias `@dfs-suite/nombre-lib-codificado`, o el path en el mapeo es incorrecto.
    *   **Solución:** Añadir/corregir la entrada en `moduleNameMapper` para que apunte al `index.ts` de la librería dependiente. Ejemplo para una librería en `libs/shared/shutils/jest.config.ts` que depende de `@dfs-suite/shtypes`:
        ```json
        "moduleNameMapper": {
          "^@dfs-suite/shtypes$": "<rootDir>/../shtypes/src/index.ts"
        }
        ```
        Ejemplo para una librería en `libs/core/domain/shared-kernel/cdskentities/jest.config.ts` que depende de `@dfs-suite/shtypes`:
        ```json
        "moduleNameMapper": {
          "^@dfs-suite/shtypes$": "<rootDir>/../../../../../libs/shared/shtypes/src/index.ts"
        }
        ```
    *   **Importante:** `<rootDir>` en el valor del `moduleNameMapper` (cuando se usa con un `preset` que establece un `rootDir` global) se refiere a la raíz del monorepo.

4.  **Error: `Preset ... not found.` (Jest)**
    *   **Causa:** El path relativo en la propiedad `preset` del `jest.config.ts` local es incorrecto para alcanzar el `jest.preset.js` en la raíz del monorepo.
    *   **Solución:** Contar cuidadosamente los niveles `../` necesarios. Desde `libs/shared/nombre-lib/jest.config.ts` son 3 `../`. Desde `libs/core/domain/nombre-lib/jest.config.ts` son 4 `../`. Desde `libs/core/domain/shared-kernel/nombre-lib/jest.config.ts` son 5 `../`.

5.  **Error: `SyntaxError: ...tsconfig.base.json: Unexpected token '/', "// RUTA: t"... is not valid JSON` (Jest)**
    *   **Causa:** Se intentó importar `tsconfig.base.json` directamente en un `jest.config.ts` para usar `pathsToModuleNameMapper`, pero el `tsconfig.base.json` contenía comentarios (`//`), lo cual no es JSON válido.
    *   **Solución:**
        1.  Eliminar todos los comentarios del `tsconfig.base.json`.
        2.  Y/O (más robusto) evitar `pathsToModuleNameMapper` en los `jest.config.ts` locales y usar mapeos explícitos con paths relativos correctos (ver punto 3).

// RUTA: libs/shared/shtypes/LIBRARY_CONFIG.MD
