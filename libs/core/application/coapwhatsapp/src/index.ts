// libs/core/application/coapwhatsapp/src/index.ts
// --- Commands (Intenciones de cambio de estado) ---
export * from './lib/commands/create-template.command';
export * from './lib/commands/delete-template-by-name.command';
export * from './lib/commands/mark-message-as-read.command';
export * from './lib/commands/send-message.command';
export * from './lib/commands/submit-template-for-approval.command';
export * from './lib/commands/sync-all-tenant-assets.command';
export * from './lib/commands/sync-single-template-from-meta.command';
export * from './lib/commands/update-business-profile.command';

// --- Use Cases (Implementaciones de ICommandHandler/IQueryHandler) ---
export * from './lib/use-cases/manage-whatsapp-template.use-case';
export {
  MANAGE_WHATSAPP_TEMPLATE_USE_CASE,
  type IManageWhatsAppTemplateUseCase,
} from './lib/use-cases/manage-whatsapp-template.use-case';
export * from './lib/use-cases/mark-whatsapp-message-as-read.use-case';
export {
  MARK_WHATSAPP_MESSAGE_AS_READ_USE_CASE,
  type IMarkWhatsAppMessageAsReadUseCase,
} from './lib/use-cases/mark-whatsapp-message-as-read.use-case';
export * from './lib/use-cases/process-incoming-whatsapp-message.use-case';
export {
  PROCESS_INCOMING_WHATSAPP_MESSAGE_USE_CASE,
  type IProcessIncomingWhatsAppMessageUseCase,
} from './lib/use-cases/process-incoming-whatsapp-message.use-case';
export * from './lib/use-cases/process-whatsapp-asset-update.use-case';
export {
  PROCESS_WHATSAPP_ASSET_UPDATE_USE_CASE,
  type IProcessWhatsAppAssetUpdateUseCase,
} from './lib/use-cases/process-whatsapp-asset-update.use-case';
export * from './lib/use-cases/process-whatsapp-message-status.use-case';
export {
  PROCESS_WHATSAPP_MESSAGE_STATUS_USE_CASE,
  type IProcessWhatsAppMessageStatusUseCase,
} from './lib/use-cases/process-whatsapp-message-status.use-case';
export * from './lib/use-cases/send-whatsapp-message.use-case';
export {
  SEND_WHATSAPP_MESSAGE_USE_CASE,
  type ISendWhatsAppMessageUseCase,
} from './lib/use-cases/send-whatsapp-message.use-case';
export * from './lib/use-cases/sync-whatsapp-assets.use-case';
export {
  SYNC_WHATSAPP_ASSETS_USE_CASE,
  type ISyncWhatsAppAssetsUseCase,
} from './lib/use-cases/sync-whatsapp-assets.use-case';
export * from './lib/use-cases/update-tenant-business-profile.use-case';
export {
  UPDATE_TENANT_BUSINESS_PROFILE_USE_CASE,
  type IUpdateTenantBusinessProfileUseCase,
} from './lib/use-cases/update-tenant-business-profile.use-case';

// --- Queries (Intenciones de lectura de datos) ---
export * from './lib/queries/get-message-template-details.query';
export * from './lib/queries/get-tenant-business-profile.query';
export * from './lib/queries/get-tenant-phone-number-details.query';
export * from './lib/queries/list-message-templates.query';
export * from './lib/queries/list-tenant-phone-numbers.query';

// --- Query Handlers (Tokens y/o Implementaciones) ---
export {
  GET_MESSAGE_TEMPLATE_DETAILS_QUERY_HANDLER,
  type IGetMessageTemplateDetailsQueryHandler,
} from './lib/queries/get-message-template-details.query';
export {
  GET_TENANT_BUSINESS_PROFILE_QUERY_HANDLER,
  type IGetTenantBusinessProfileQueryHandler,
} from './lib/queries/get-tenant-business-profile.query';
export {
  GET_TENANT_PHONE_NUMBER_DETAILS_QUERY_HANDLER,
  type IGetTenantPhoneNumberDetailsQueryHandler,
} from './lib/queries/get-tenant-phone-number-details.query';
export {
  LIST_MESSAGE_TEMPLATES_QUERY_HANDLER,
  type IListMessageTemplatesQueryHandler,
} from './lib/queries/list-message-templates.query';
export {
  LIST_TENANT_PHONE_NUMBERS_QUERY_HANDLER,
  type IListTenantPhoneNumbersQueryHandler,
} from './lib/queries/list-tenant-phone-numbers.query';

// --- DTOs (Data Transfer Objects para Casos de Uso y Queries) ---
export * from './lib/dtos/asset-update-app.dto';
export * from './lib/dtos/business-profile-app.dto';
export * from './lib/dtos/incoming-message-app.dto';
export * from './lib/dtos/message-status-update-app.dto';
export * from './lib/dtos/phone-number-details-app.dto';
export * from './lib/dtos/send-message-input.dto';
export * from './lib/dtos/send-message-result.dto';
export * from './lib/dtos/template-management.dtos';
export * from './lib/dtos/whatsapp-webhook-processed.dtos'; // Este archivo parece redundante si los DTOs individuales están en asset-update-app.dto

// --- Application Service Ports (Puertos para servicios que esta capa de aplicación necesita) ---
export * from './lib/ports/queue.port'; // <<< ASEGURAR QUE ESTA LÍNEA ESTÉ DESCOMENTADA Y EL PATH SEA CORRECTO
// FIN DEL ARCHIVO: libs/core/application/coapwhatsapp/src/index.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Descomentada la exportación de `./lib/ports/queue.port`.", "justificacion": "Permite que `infraqueue` (u otros módulos) importen `IQueuePort` y `QUEUE_PORT` desde `@dfs-suite/coapwhatsapp`.", "impacto": "Debería resolver los errores TS2305 para `IQueuePort` y `QUEUE_PORT` en `infraqueue`." },
  { "mejora": "Comentario sobre `whatsapp-webhook-processed.dtos.ts`.", "justificacion": "Si los DTOs individuales ya están en `asset-update-app.dto.ts`, este archivo podría ser redundante o necesitar una revisión de su propósito.", "impacto": "Potencial simplificación." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
