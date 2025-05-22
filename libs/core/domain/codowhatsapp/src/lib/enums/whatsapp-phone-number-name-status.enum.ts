// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-phone-number-name-status.enum.ts
/**
 * Estados del nombre para mostrar de un número de teléfono de WhatsApp.
 * @see https://developers.facebook.com/docs/whatsapp/cloud-api/reference/phone-numbers#name-status
 */
export enum EWhatsAppPhoneNumberNameStatus {
  APPROVED = 'APPROVED',
  AVAILABLE_WITHOUT_REVIEW = 'AVAILABLE_WITHOUT_REVIEW',
  PENDING_REVIEW = 'PENDING_REVIEW',
  REJECTED = 'REJECTED',
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-phone-number-name-status.enum.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición del enum `EWhatsAppPhoneNumberNameStatus`.", "justificacion": "Relevante para la gestión de cuentas WA.", "impacto": "Tipado." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
