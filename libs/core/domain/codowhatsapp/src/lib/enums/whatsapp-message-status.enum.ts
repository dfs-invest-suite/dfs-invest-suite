// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-message-status.enum.ts
/**
 * Representa los estados de los mensajes según la API de WhatsApp.
 * @see https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components#statuses-object
 */
export enum EWhatsAppMessageStatus {
  SENT = 'sent', // El mensaje ha sido enviado desde la API de WhatsApp Cloud a los servidores de WhatsApp.
  DELIVERED = 'delivered', // El mensaje ha sido entregado al dispositivo del destinatario.
  READ = 'read', // El mensaje ha sido leído por el destinatario.
  FAILED = 'failed', // El mensaje no pudo ser enviado (puede incluir un objeto `errors`).
  DELETED = 'deleted', // El mensaje fue eliminado por el usuario.
  WARNING = 'warning', // El mensaje fue enviado pero podría haber un problema (ej. usuario no en WhatsApp).
  // Otros estados posibles o internos de Meta no siempre expuestos:
  // PENDING = 'pending', // Mensaje en espera de ser enviado (no es un estado oficial de webhook de status)
  // UNKNOWN = 'unknown', // Estado desconocido o no mapeado
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-message-status.enum.ts
