// RUTA: libs/infrastructure/infraobservability/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `infraobservability`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Provee los adaptadores y configuraciones para la observabilidad de la plataforma `dfs-invest-suite`. Incluye la implementación del `ILoggerPort` (usando Pino), la configuración de OpenTelemetry para tracing distribuido, y componentes NestJS como un filtro global de excepciones (`AllExceptionsFilter`) e interceptores para logging de solicitudes (`LoggingInterceptor`) y transformación de respuestas (`TransformResponseInterceptor`).
- **Alias de Importación (importPath):** `@dfs-suite/infraobservability`
- **Ubicación en el Monorepo:** `libs/infrastructure/infraobservability`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `infrastructure`
- **`type`:** `adapter`
- **`layer`:** `infrastructure`
- **`technology`:** `observability`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/logger/pino-logger.adapter';` (Exporta `PinoLoggerAdapter` y `INFRA_OBSERVABILITY_PINO_LOGGER` Symbol)
- `export * from './lib/telemetry/opentelemetry.config';` (Exporta `setupOpenTelemetry` función)
- `export * from './lib/filters/all-exceptions.filter';` (Exporta `AllExceptionsFilter`)
- `export * from './lib/interceptors/logging.interceptor';` (Exporta `LoggingInterceptor`)
- `export * from './lib/interceptors/transform-response.interceptor';` (Exporta `TransformResponseInterceptor`)
- (Futuro) `export * from './lib/infraobservability.module';`

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `logger/pino-logger.adapter.ts`: Implementación del logger.
- `telemetry/opentelemetry.config.ts`: Configuración de OpenTelemetry.
- `filters/all-exceptions.filter.ts`: Filtro global de excepciones.
- `interceptors/logging.interceptor.ts`: Interceptor para logging de requests/responses.
- `interceptors/transform-response.interceptor.ts`: Interceptor para estandarizar respuestas.
- (Futuro) `infraobservability.module.ts`: Módulo NestJS.

## 5. Configuración de TypeScript (`tsconfig.lib.json`, `tsconfig.spec.json`)

- Heredan de: `../../../tsconfig.base.json`.
- `compilerOptions.declaration`: `true` en `tsconfig.lib.json`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- Hereda de: `../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Configurado para los `tsconfig` locales y el `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `infraobservability`
  - `preset`: `../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shtypes`, `@dfs-suite/cdskports`, `@dfs-suite/sherrors`, `@dfs-suite/shutils`.
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.passWithNoTests` debe ser `false` cuando se añadan tests.

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/cdskports` (para `ILoggerPort`), `@dfs-suite/sherrors`, `@dfs-suite/shutils`.
- **Externas (NPM):** `@nestjs/common`, `@nestjs/core`, `@nestjs/config`, `@nestjs/graphql`, `pino`, `pino-pretty`, `rxjs`, `opentelemetry/*` (cuando se implemente).

## 9. Consideraciones Específicas y Deuda Técnica

- La inyección del `LoggerService` de NestJS en `AllExceptionsFilter` y `LoggingInterceptor` es un placeholder. Idealmente, se inyectaría `ILoggerPort` con la implementación `PinoLoggerAdapter`.
- La configuración de OpenTelemetry es solo un placeholder.
- (Deuda) Implementar tests unitarios y de integración para todos los componentes.

## 10. Problemas Comunes y Soluciones Encontradas
- (Mantener actualizado).
// FIN DEL ARCHIVO: libs/infrastructure/infraobservability/LIBRARY_CONFIG.MD
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Creación y/o actualización del `LIBRARY_CONFIG.MD` para `infraobservability`.",
    "justificacion": "Documentación esencial actualizada para reflejar los nuevos componentes (filtros, interceptors) y la implementación del logger.",
    "impacto": "Claridad y mantenibilidad."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Detallar las dependencias exactas de OpenTelemetry cuando se implemente.",
    "justificacion": "Precisión en la documentación.",
    "impacto": "Facilita la comprensión del stack de observabilidad."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */