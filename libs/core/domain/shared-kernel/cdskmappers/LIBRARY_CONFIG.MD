// RUTA: libs/core/domain/shared-kernel/cdskmappers/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `cdskmappers`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Define la interfaz genérica `IMapper` utilizada para transformar datos entre diferentes capas y modelos del sistema (ej. de Modelo de Persistencia a Entidad de Dominio, de Entidad de Dominio a DTO de Respuesta).
- **Alias de Importación (importPath):** `@dfs-suite/cdskmappers`
- **Ubicación en el Monorepo:** `libs/core/domain/shared-kernel/cdskmappers`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `shared-kernel`
- **`layer`:** `domain`
- **`kernel` (sub-tipo):** `mappers`
- **`domain` (si aplica):** N/A
- **`feature` (si aplica):** N/A
- **`technology` (si aplica):** N/A
- **`app` (si aplica):** N/A

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/mapper.interface';` (Exporta `IMapper`)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `mapper.interface.ts`: Contiene la definición de la interfaz `IMapper`.

## 5. Configuración de TypeScript

- **`tsconfig.json` (Raíz de la Librería):**
  - Hereda de: `../../../../../tsconfig.base.json`
  - Referencias: `./tsconfig.lib.json`, `./tsconfig.spec.json`
- **`tsconfig.lib.json` (Código Fuente):**
  - (Similar a `cdskentities`)
- **`tsconfig.spec.json` (Tests):**
  - (Similar a `cdskentities`, si hay tests)

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project` para Código Fuente (`src/lib`):**
  - `[ "[ruta-monorepo-root]/libs/core/domain/shared-kernel/cdskmappers/tsconfig.lib.json", "[ruta-monorepo-root]/libs/core/domain/shared-kernel/cdskmappers/tsconfig.spec.json", "[ruta-monorepo-root]/tsconfig.base.json" ]`

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `cdskmappers`
  - `preset`: `../../../../../jest.preset.js`
  - `moduleNameMapper`: (Mapea a `@dfs-suite/cdskentities`)
  - `passWithNoTests`: `true` (ya que es solo una interfaz)
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/core/domain/shared-kernel/cdskmappers/jest.config.ts`
  - `options.passWithNoTests`: `true`

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/cdskentities` (para el tipo `Entity` en la interfaz `IMapper`).
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica

- La interfaz `IMapper` es un contrato clave para los adaptadores de persistencia y los resolvers/controladores de API que necesitan transformar datos.
- El método opcional `toResponseFromPersistence?` puede ser útil para optimizaciones de lectura.

// RUTA: libs/core/domain/shared-kernel/cdskmappers/LIBRARY_CONFIG.MD
