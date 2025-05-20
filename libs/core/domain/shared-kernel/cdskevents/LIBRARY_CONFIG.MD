// RUTA: libs/core/domain/shared-kernel/cdskevents/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `cdskevents`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Define las interfaces y clases base para Eventos de Dominio (`IDomainEvent`, `DomainEventBase`) y Eventos de Integración (`IIntegrationEvent`, `IntegrationEventBase`). También define los puertos para la emisión (`IDomainEventEmitter`) y manejo (`IDomainEventHandler`, `IEventBusPort`) de eventos.
- **Alias de Importación (importPath):** `@dfs-suite/cdskevents`
- **Ubicación en el Monorepo:** `libs/core/domain/shared-kernel/cdskevents`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `shared-kernel`
- **`layer`:** `domain`
- **`kernel` (sub-tipo):** `events`
- **`domain` (si aplica):** N/A
- **`feature` (si aplica):** N/A
- **`technology` (si aplica):** N/A
- **`app` (si aplica):** N/A

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `export * from './lib/domain-event.interface';`
- `export * from './lib/domain-event.base';`
- `export * from './lib/domain-event-handler.interface';`
- `export * from './lib/domain-event-emitter.interface';`
- `export * from './lib/integration-event.interface';`
- `export * from './lib/integration-event.base';` (Cuando se implemente)
- `export * from './lib/event-bus.port';` (Cuando se implemente)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `domain-event.interface.ts`: Define `IDomainEvent` y `IDomainEventMetadata`.
- `domain-event.base.ts`: Clase base abstracta para eventos de dominio.
- `domain-event-handler.interface.ts`: Interfaz para manejadores de eventos de dominio.
- `domain-event-emitter.interface.ts`: Puerto para publicar eventos de dominio.
- `integration-event.interface.ts`: Define `IIntegrationEvent` y `IIntegrationEventMetadata`.
- `integration-event.base.ts`: Esqueleto para clase base de eventos de integración.
- `event-bus.port.ts`: Esqueleto para puerto de un bus de eventos genérico.

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
  - `[ "[ruta-monorepo-root]/libs/core/domain/shared-kernel/cdskevents/tsconfig.lib.json", "[ruta-monorepo-root]/libs/core/domain/shared-kernel/cdskevents/tsconfig.spec.json", "[ruta-monorepo-root]/tsconfig.base.json" ]`

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `cdskevents`
  - `preset`: `../../../../../jest.preset.js`
  - `moduleNameMapper`: (Mapea a `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shutils`)
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/core/domain/shared-kernel/cdskevents/jest.config.ts`
  - `options.passWithNoTests`: `false` (debería tener tests para `DomainEventBase`)

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shutils`.
- **Externas (NPM):** Ninguna directa.

## 9. Consideraciones Específicas y Deuda Técnica

- `DomainEventBase` debe asegurar la correcta inicialización de la metadata.
- La diferencia y uso de `IDomainEventEmitter` vs `IEventBusPort` debe clarificarse (el primero es para eventos de dominio dentro de un agregado, el segundo podría ser para publicación más amplia incluyendo eventos de integración).

// RUTA: libs/core/domain/shared-kernel/cdskevents/LIBRARY_CONFIG.MD
