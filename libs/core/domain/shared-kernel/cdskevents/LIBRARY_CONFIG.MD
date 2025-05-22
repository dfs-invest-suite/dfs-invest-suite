// RUTA: libs/core/domain/shared-kernel/cdskevents/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `cdskevents`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Define las interfaces y clases base para Eventos de Dominio (`IDomainEvent`, `DomainEventBase`) y Eventos de Integración (`IIntegrationEvent`, `IntegrationEventBase`). También define los puertos para la emisión (`IDomainEventEmitterPort`) y manejo (`IDomainEventHandler`), así como un puerto para un bus de eventos más genérico (`IEventBusPort`).
- **Alias de Importación (importPath):** `@dfs-suite/cdskevents`
- **Ubicación en el Monorepo:** `libs/core/domain/shared-kernel/cdskevents`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `shared-kernel`
- **`layer`:** `domain`
- **`kernel` (sub-tipo):** `events`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/domain-event.interface';`
- `export * from './lib/domain-event.base';`
- `export * from './lib/domain-event-handler.interface';`
- `export * from './lib/domain-event-emitter.interface';`
- `export * from './lib/integration-event.interface';`
- `export * from './lib/integration-event.base';`
- `export * from './lib/event-bus.port';`

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- Archivos individuales para cada interfaz y clase base mencionada.

## 5. Configuración de TypeScript (`tsconfig.lib.json`, `tsconfig.spec.json`)

- Heredan de: `../../../../../tsconfig.base.json`.
- `compilerOptions.declaration`: `true` en `tsconfig.lib.json`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- Hereda de: `../../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Configurado para los `tsconfig` locales y el `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `cdskevents`
  - `preset`: `../../../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shutils`.
  - `passWithNoTests`: `true`.
- **`project.json` (Target `test`):**
  - `options.passWithNoTests`: `true`.

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shutils`.
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica
- La implementación de `IDomainEventEmitterPort` y `IEventBusPort` residirá en la capa de infraestructura.
- (Deuda) Implementar tests para `DomainEventBase` y `IntegrationEventBase`.

## 10. Problemas Comunes y Soluciones Encontradas
- Error `no-undef` para `IDomainEventMetadata` en `integration-event.base.ts` resuelto añadiendo la importación.
- Warning `no-unused-vars` para `createOperationMetadata` en `integration-event.base.ts` resuelto eliminando la importación.
- Warning `no-unused-vars` para `Maybe` en `integration-event.base.ts` resuelto eliminando la importación.
// RUTA: libs/core/domain/shared-kernel/cdskevents/LIBRARY_CONFIG.MD
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Actualización del `LIBRARY_CONFIG.MD` para `cdskevents`.", "justificacion": "Documentación precisa y actualizada.", "impacto": "Claridad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
