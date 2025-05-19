// RUTA: libs/core/application/coapwhatsapp/src/index.ts

// --- Commands & Use Cases ---
// Envío de Mensajes
export * from './lib/use-cases/send-whatsapp-message.use-case'; // Orquesta AntiBan y el IWhatsAppMessagePort
export * from './lib/commands/send-message.command'; // Comando que recibe el UseCase anterior
// export * from './lib/use-cases/send-bulk-template-messages.use-case'; // Para campañas, puede llamar a SendWhatsAppMessageUseCase en bucle o encolar

// Gestión de Plantillas
export * from './lib/use-cases/manage-whatsapp-template.use-case'; // CRUD para MessageTemplateRecord y IWhatsAppAdminPort
export * from './lib/commands/create-template.command';
export * from './lib/commands/update-template.command';
export * from './lib/commands/delete-template.command';
export * from './lib/queries/list-message-templates.query'; // Para obtener plantillas del tenant
export * from './lib/queries/get-message-template-details.query';

// Sincronización de Activos
export * from './lib/use-cases/sync-whatsapp-assets.use-case'; // Sincroniza números y plantillas desde Meta

// Procesamiento de Webhooks (la lógica que orquesta después del evento raw)
export * from './lib/use-cases/process-incoming-whatsapp-message.use-case'; // Llama a LeadsFlow, Aiper, etc.
export * from './lib/use-cases/process-whatsapp-message-status.use-case'; // Actualiza MessageLog, Costos, AntiBan
export * from './lib/use-cases/process-whatsapp-asset-update.use-case'; // Para phone_number_quality, template_status, etc.

// --- DTOs ---
export * from './lib/dtos/send-message-input.dto'; // Para SendWhatsAppMessageUseCase
export * from './lib/dtos/send-message-result.dto';
export * from './lib/dtos/template-management.dtos'; // (template-creation.dto, template-details.dto)
export * from './lib/dtos/whatsapp-webhook-processed.dtos'; // (incoming-message-payload.dto, message-status-payload.dto)
export * from './lib/dtos/whatsapp-asset.dtos'; // (phone-number-details.dto, template-record.dto)

// --- Application Service Ports (si esta capa necesita servicios externos no definidos en dominio) ---
// export * from './lib/ports/i-message-log.service.port'; // Si MessageLog es un servicio de app y no solo repo

// --- Listeners (si se usa un bus de eventos interno para desacoplar casos de uso) ---
// La lógica de los listeners del blueprint original ahora estaría dentro de los UseCases de procesamiento de webhooks.
// Si mantenemos listeners, serían para eventos de dominio más genéricos.
// export * from './lib/listeners/raw-whatsapp-event.listener'; // Escucha RawWhatsappWebhookReceivedEvent
