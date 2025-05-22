// RUTA: libs/core/domain/codowhatsapp/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `codowhatsapp`

## 1. Propósito y Responsabilidad Principal
- **Descripción Concisa:** Contiene las definiciones de tipos, enums, puertos de dominio y eventos de dominio puros relacionados con la interacción con la plataforma WhatsApp Business (Cloud API de Meta). Esta librería es agnóstica a la implementación específica de la API.
- **Alias de Importación (importPath):** `@dfs-suite/codowhatsapp`
- **Ubicación en el Monorepo:** `libs/core/domain/codowhatsapp`

## 2. Tags Nx y Rol Arquitectónico
- **`scope`:** `core`
- **`type`:** `domain-logic`
- **`layer`:** `domain`
- **`domain`:** `whatsapp`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)
- Enums: `EWhatsAppMessageStatus`, `EWhatsAppMessageType`, `EWhatsAppQualityRating`, `EWhatsAppTemplateCategory`, `EWhatsAppConversationCategory`, `EWhatsAppMessagingLimitTier`, `EWhatsAppPhoneNumberNameStatus`, `EWhatsAppPhoneNumberQualityUpdateEvent`, `EWhatsAppTemplateStatus`, `EWhatsAppWebhookField`.
- Types: `TWhatsAppApiMessageRequestBase` (y todos los tipos de mensajes), `TWhatsAppApiMessageResponse`, `TWhatsAppAssetUploadResponse`, `TWhatsAppBusinessProfile`, `TWhatsAppPhoneNumber`, `TWhatsAppPricing`, `TWhatsAppTemplateCreationRequest`, `TWhatsAppTemplateResponse`, `TWhatsAppWebhookPayload` (y todos sus subtipos), `TWhatsAppError`.
- Puertos: `IWhatsAppAdminPort`, `WHATSAPP_ADMIN_PORT`, `IWhatsAppMessagePort`, `WHATSAPP_MESSAGE_PORT`.
- Eventos de Dominio: `RawWhatsAppMessageSentEvent`, `RawWhatsAppWebhookReceivedEvent`, `WhatsAppMessageStatusUpdatedEvent`, `WhatsAppTemplateStatusUpdatedEvent`, `WhatsAppAccountQualityUpdatedEvent`.

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)
- `enums/`: Contiene todas las definiciones de enums.
- `types/`: Contiene todas las interfaces y tipos para payloads de API y webhooks de Meta.
- `ports/`: Define las interfaces `IWhatsAppAdminPort` y `IWhatsAppMessagePort`.
- `events/`: Define los eventos de dominio relacionados con WhatsApp.

## 5. Configuración de TypeScript (`tsconfig.lib.json`, `tsconfig.spec.json`)
- Heredan de: `../../../../tsconfig.base.json`.
- `compilerOptions.declaration`: `true` en `tsconfig.lib.json`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)
- Hereda de: `../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Configurado para los `tsconfig` locales y el `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)
- **`jest.config.ts`:**
  - `displayName`: `codowhatsapp`
  - `preset`: `../../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shresult`, `@dfs-suite/cdskevents`.
  - `passWithNoTests`: `true` (temporal).
- **`project.json` (Target `test`):**
  - `options.passWithNoTests`: `true`.

## 8. Dependencias Clave
- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shresult`, `@dfs-suite/cdskevents`.
- **Externas (NPM):** Ninguna.

## 9. Consideraciones Específicas y Deuda Técnica
- Los tipos en `src/lib/types/` deben mantenerse sincronizados con la documentación oficial de la API de WhatsApp de Meta.
- (Deuda) Implementar tests unitarios para cualquier lógica de validación o transformación que pueda añadirse a VOs futuros dentro de esta librería (si los hubiera).

## 10. Problemas Comunes y Soluciones Encontradas
- (Mantener actualizado).
// RUTA: libs/core/domain/codowhatsapp/LIBRARY_CONFIG.MD
