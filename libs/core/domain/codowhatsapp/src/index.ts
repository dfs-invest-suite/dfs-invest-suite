// RUTA: libs/core/domain/codowhatsapp/src/index.ts

// Types (Representación de Payloads de Meta API)
export * from './lib/types/whatsapp-api-message-request.types'; // Todos los tipos de mensajes salientes
export * from './lib/types/whatsapp-asset.types'; // Tipos para plantillas, números desde API Admin
export * from './lib/types/whatsapp-error.types'; // Tipos para el objeto error de Meta
export * from './lib/types/whatsapp-pricing.types'; // Tipos para el objeto pricing de Meta
export * from './lib/types/whatsapp-webhook.types'; // Todos los tipos de webhooks entrantes

// Enums (Específicos de WhatsApp)
export * from './lib/enums/whatsapp-message-status.enum';
export * from './lib/enums/whatsapp-message-type.enum';
export * from './lib/enums/whatsapp-quality-rating.enum';
export * from './lib/enums/whatsapp-template-category.enum';
// ... otros enums relevantes de la API de Meta

// Ports (Abstracciones de las APIs de Meta)
export * from './lib/ports/whatsapp-admin.port'; // Para gestionar activos (Admin API)
export * from './lib/ports/whatsapp-message.port'; // Para enviar mensajes (Cloud API)

// Domain Events (Eventos de bajo nivel directamente derivados de interacciones WA)
export * from './lib/events/raw-whatsapp-message-sent.event'; // Después de un POST exitoso a /messages
export * from './lib/events/raw-whatsapp-webhook-received.event'; // Al recibir cualquier webhook
// Estos eventos "raw" pueden ser luego procesados por la capa de aplicación para generar eventos más ricos.
