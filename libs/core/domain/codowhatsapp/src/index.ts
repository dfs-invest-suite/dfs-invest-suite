// RUTA: libs/core/domain/codowhatsapp/src/index.ts
// // RUTA: libs/core/domain/codowhatsapp/src/index.ts
// // Enums (Específicos de WhatsApp)
// export * from './lib/enums/whatsapp-conversation-category.enum'; // Para CBP/PMP
// export * from './lib/enums/whatsapp-message-status.enum';
// export * from './lib/enums/whatsapp-message-type.enum';
// export * from './lib/enums/whatsapp-messaging-limit-tier.enum'; // Para límites
// export * from './lib/enums/whatsapp-phone-number-name-status.enum'; // NAME_NOT_SUBMITTED, PENDING_REVIEW, APPROVED, REJECTED
// export * from './lib/enums/whatsapp-phone-number-quality-update-event.enum'; // GREEN, YELLOW, RED, BANNED
// export * from './lib/enums/whatsapp-quality-rating.enum';
// export * from './lib/enums/whatsapp-template-category.enum';
// export * from './lib/enums/whatsapp-template-status.enum'; // PENDING, APPROVED, REJECTED, PAUSED, DISABLED
// export * from './lib/enums/whatsapp-webhook-field.enum'; // messages, message_template_status_update, etc.

// // Types (Representación de Payloads de Meta API y estructuras de datos del dominio)
// export * from './lib/types/whatsapp-api-message-request.types'; // Todos los tipos de mensajes salientes
// export * from './lib/types/whatsapp-api-message-response.types'; // Para la respuesta de /messages
// export * from './lib/types/whatsapp-asset.types'; // Tipos para plantillas, números desde API Admin
// export * from './lib/types/whatsapp-error.types'; // Tipos para el objeto error de Meta
// export * from './lib/types/whatsapp-pricing.types'; // Tipos para el objeto pricing de Meta
// export * from './lib/types/whatsapp-webhook.types'; // Todos los tipos de webhooks entrantes

// // Ports (Abstracciones de las APIs de Meta)
// export * from './lib/ports/whatsapp-admin.port'; // Para gestionar activos (Admin API)
// export * from './lib/ports/whatsapp-message.port'; // Para enviar mensajes (Cloud API)

// // Domain Events (Eventos de bajo nivel directamente derivados de interacciones WA)
// export * from './lib/events/raw-whatsapp-message-sent.event';
// export * from './lib/events/raw-whatsapp-webhook-received.event';
// export * from './lib/events/whatsapp-account-quality-updated.event';
// export * from './lib/events/whatsapp-message-status-updated.event'; // Evento más específico que el raw
// export * from './lib/events/whatsapp-template-status-updated.event';

// // (Eliminar la exportación de la función placeholder `codowhatsapp` si no se usa)
// // export * from './lib/codowhatsapp'; // Comentado si se elimina codowhatsapp.ts
// // RUTA: libs/core/domain/codowhatsapp/src/index.ts
export {};
// FIN DEL ARCHIVO: libs/core/domain/codowhatsapp/src/index.ts
