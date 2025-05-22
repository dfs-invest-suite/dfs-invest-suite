// RUTA: libs/core/domain/codoanalyticscore/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `codoanalyticscore`

## 1. Propósito y Responsabilidad Principal
- **Descripción Concisa:** Contiene la lógica de dominio para la definición de métricas, KPIs y estructuras de datos relacionadas con analíticas dentro de `dfs-invest-suite`. Define Value Objects como `KpiDefinitionVO` y `TimePeriodVO`.
- **Alias de Importación (importPath):** `@dfs-suite/codoanalyticscore`
- **Ubicación en el Monorepo:** `libs/core/domain/codoanalyticscore`

## 2. Tags Nx y Rol Arquitectónico
- **`scope`:** `core`
- **`type`:** `domain-logic`
- **`layer`:** `domain`
- **`domain`:** `analytics` <!-- O `analytics-core` si se prefiere -->

## 3. API Pública Principal (Exportaciones de `src/index.ts`)
- `export * from './lib/value-objects/kpi-definition.vo';` (Incluye `KpiDataType`, `KpiTrendIndicator`)
- `export * from './lib/value-objects/time-period.vo';` (Incluye `ETimePeriodPreset`)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)
- `value-objects/`:
  - `kpi-definition.vo.ts`
  - `time-period.vo.ts`
- (Futuro: `entities/` si las definiciones de KPI se vuelven persistibles, `ports/`, `events/`, `errors/`)

## 5. Configuración de TypeScript (`tsconfig.lib.json`, `tsconfig.spec.json`)
- Heredan de: `../../../../tsconfig.base.json`.
- `compilerOptions.declaration`: `true` en `tsconfig.lib.json`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)
- Hereda de: `../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Configurado para los `tsconfig` locales y el `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)
- **`jest.config.ts`:**
  - `displayName`: `codoanalyticscore`
  - `preset`: `../../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a dependencias shared y shared-kernel.
  - `passWithNoTests`: `true` (temporal).
- **`project.json` (Target `test`):**
  - `options.passWithNoTests`: `true`.

## 8. Dependencias Clave
- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/shutils`, `@dfs-suite/sherrors`, `@dfs-suite/cdskvalueobjects`.
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica
- (Deuda) Implementar tests unitarios para los VOs.
- Esta librería podría expandirse significativamente si se introduce lógica de cálculo de KPIs o entidades para almacenar datos agregados.

## 10. Problemas Comunes y Soluciones Encontradas
- (Mantener actualizado).
// RUTA: libs/core/domain/codoanalyticscore/LIBRARY_CONFIG.MD
