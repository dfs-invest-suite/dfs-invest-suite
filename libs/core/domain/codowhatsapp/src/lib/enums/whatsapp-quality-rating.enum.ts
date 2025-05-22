// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-quality-rating.enum.ts
/**
 * Representa la calificación de calidad de un número de teléfono de WhatsApp.
 * @see https://developers.facebook.com/docs/whatsapp/message-quality/quality-rating/
 */
export enum EWhatsAppQualityRating {
  GREEN = 'GREEN', // Alta calidad
  YELLOW = 'YELLOW', // Calidad media
  RED = 'RED', // Baja calidad
  // BANNED or FLAGGED are often represented by a status change, not just quality.
  // UNKNOWN = 'UNKNOWN' // Para casos no mapeados o iniciales.
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-quality-rating.enum.ts
