// RUTA: libs/core/domain/codonotificationscore/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `codonotificationscore`

## 1. Propósito y Responsabilidad Principal
- **Descripción Concisa:** Define los aspectos de dominio para el sistema de notificaciones internas de la plataforma. Esto incluye los tipos de notificaciones, los canales por los cuales se pueden enviar, y la definición de los destinatarios. No maneja la lógica de envío, solo el "qué" notificar.
- **Alias de Importación (importPath):** `@dfs-suite/codonotificationscore`
- **Ubicación en el Monorepo:** `libs/core/domain/codonotificationscore`

## 2. Tags Nx y Rol Arquitectónico
- **`scope`:** `core`
- **`type`:** `domain-logic`
- **`layer`:** `domain`
- **`domain`:** `notifications` <!-- O `notifications-core` si se prefiere para el dominio -->

## 3. API Pública Principal (Exportaciones de `src/index.ts`)
- `export * from './lib/value-objects/notification-type.vo';` (Incluye `ENotificationType`)
- `export * from './lib/value-objects/notification-channel.vo';` (Incluye `ENotificationChannel`)
- `export * from './lib/value-objects/notification-recipient.vo';` (Incluye `RecipientType`)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)
- `value-objects/`:
  - `notification-type.vo.ts`
  - `notification-channel.vo.ts`
  - `notification-recipient.vo.ts`
- (Futuro: `entities/`, `ports/`, `events/` si las plantillas o reglas de notificación se vuelven entidades de dominio complejas).

## 5. Configuración de TypeScript (`tsconfig.lib.json`, `tsconfig.spec.json`)
- Heredan de: `../../../../tsconfig.base.json`.
- `compilerOptions.declaration`: `true` en `tsconfig.lib.json`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)
- Hereda de: `../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Configurado para los `tsconfig` locales y el `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)
- **`jest.config.ts`:**
  - `displayName`: `codonotificationscore`
  - `preset`: `../../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shtypes`, `@dfs-suite/cdskvalueobjects`, `@dfs-suite/sherrors`, `@dfs-suite/codousersroles`.
  - `passWithNoTests`: `true` (temporal).
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/core/domain/codonotificationscore/jest.config.ts`
  - `options.passWithNoTests`: `true`.

## 8. Dependencias Clave
- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/cdskvalueobjects`, `@dfs-suite/sherrors`, `@dfs-suite/codousersroles` (para `EUserRole`).
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica
- Actualmente, esta librería se enfoca en VOs para tipificar las notificaciones.
- (Deuda) Podría expandirse para incluir `NotificationTemplateEntity` si las notificaciones requieren contenido dinámico complejo o plantillas gestionables.
- (Deuda) Implementar tests unitarios para los VOs.

## 10. Problemas Comunes y Soluciones Encontradas
- (Mantener actualizado).
// RUTA: libs/core/domain/codonotificationscore/LIBRARY_CONFIG.MD
