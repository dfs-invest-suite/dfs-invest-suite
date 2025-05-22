// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-message-type.enum.ts
/**
 * Tipos de mensajes que se pueden enviar o recibir a través de la API de WhatsApp.
 * @see https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#message-types
 */
export enum EWhatsAppMessageType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
  DOCUMENT = 'document',
  STICKER = 'sticker',
  LOCATION = 'location',
  CONTACTS = 'contacts',
  INTERACTIVE = 'interactive', // List Messages, Reply Buttons, Single/Multi Product Messages
  TEMPLATE = 'template',
  REACTION = 'reaction',
  SYSTEM = 'system', // Mensajes del sistema (ej. usuario cambió número)
  ORDER = 'order', // Para mensajes de comercio
  UNKNOWN = 'unknown', // Para tipos no reconocidos o errores
  // BUTTON = 'button', // Obsoleto, ahora parte de 'interactive'
  // LIST = 'list', // Obsoleto, ahora parte de 'interactive'
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-message-type.enum.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Enum EWhatsAppMessageType actualizado con los tipos de mensajes actuales de la API.", "justificacion": "Alineación con la documentación de Meta.", "impacto": "Tipado preciso para el manejo de mensajes." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
