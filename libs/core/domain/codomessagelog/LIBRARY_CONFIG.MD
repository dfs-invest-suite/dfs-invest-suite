// RUTA: libs/core/domain/codomessagelog/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `codomessagelog`

## 1. Propósito y Responsabilidad Principal
- **Descripción Concisa:** Contiene la lógica de dominio para el registro y gestión de logs de mensajes, principalmente de WhatsApp. Define `MessageLogEntity`, sus VOs (`MessageDirectionVO`, `MessageInternalStatusVO`), puertos de repositorio, y eventos de dominio.
- **Alias de Importación (importPath):** `@dfs-suite/codomessagelog`
- **Ubicación en el Monorepo:** `libs/core/domain/codomessagelog`

## 2. Tags Nx y Rol Arquitectónico
- **`scope`:** `core`
- **`type`:** `domain-logic`
- **`layer`:** `domain`
- **`domain`:** `message-log`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)
- Entidades: `MessageLogEntity`
- Value Objects: `MessageDirectionVO`, `EMessageDirection`, `MessageInternalStatusVO`, `EMessageInternalStatus`
- Puertos: `IMessageLogRepository`, `MESSAGE_LOG_REPOSITORY_PORT`
- Eventos: `MessageLogCreatedEvent`, `MessageLogStatusUpdatedEvent`, `MessageLogCostRecordedEvent`

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)
- `entities/`: `message-log.entity.ts`
- `value-objects/`: `message-direction.vo.ts`, `message-internal-status.vo.ts`
- `ports/`: `message-log.repository.port.ts`
- `events/`: `message-log-created.event.ts`, `message-log-status-updated.event.ts`, `message-log-cost-recorded.event.ts`

## 5. Configuración de TypeScript (`tsconfig.lib.json`, `tsconfig.spec.json`)
- Heredan de: `../../../../tsconfig.base.json`.
- `compilerOptions.declaration`: `true` en `tsconfig.lib.json`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)
- Hereda de: `../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Configurado para los `tsconfig` locales y el `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)
- **`jest.config.ts`:**
  - `displayName`: `codomessagelog`
  - `preset`: `../../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a dependencias shared y shared-kernel, y a `codowhatsapp`.
  - `passWithNoTests`: `true` (temporal).
- **`project.json` (Target `test`):**
  - `options.passWithNoTests`: `true`.

## 8. Dependencias Clave
- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/shutils`, `@dfs-suite/sherrors`, `@dfs-suite/cdskentities`, `@dfs-suite/cdskevents`, `@dfs-suite/codowhatsapp`.
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica
- (Deuda) Implementar tests unitarios para `MessageLogEntity`.

## 10. Problemas Comunes y Soluciones Encontradas
- (Mantener actualizado).
// RUTA: libs/core/domain/codomessagelog/LIBRARY_CONFIG.MD
