// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-conversation-category.enum.ts
/**
 * Categorías de conversación para el modelo de precios basado en conversaciones (CBP) y PMP de WhatsApp.
 * @see https://developers.facebook.com/docs/whatsapp/pricing/conversation-categories
 */
export enum EWhatsAppConversationCategory {
  AUTHENTICATION = 'authentication', // Iniciada por la empresa con una plantilla de autenticación
  MARKETING = 'marketing', // Iniciada por la empresa con una plantilla de marketing
  UTILITY = 'utility', // Iniciada por la empresa con una plantilla de utilidad
  SERVICE = 'service', // Cualquier conversación iniciada por el usuario
  // REFERRAL_CONVERSION = 'referral_conversion', // Caso especial, a menudo se mapea a una de las anteriores
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-conversation-category.enum.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición del enum `EWhatsAppConversationCategory`.", "justificacion": "Necesario para el BC de Billing y la lógica de Anti-Ban/costos.", "impacto": "Tipado para categorías de conversación." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
