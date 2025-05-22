// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-phone-number-quality-update-event.enum.ts
/**
 * Eventos de actualización de calidad del número de teléfono (diferente de EWhatsAppQualityRating que es el estado).
 * Esto se usa más para el webhook `phone_number_quality_update`.
 */
export enum EWhatsAppPhoneNumberQualityUpdateEvent {
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  RED = 'RED',
  // BANNED no es un evento de calidad directa, sino un cambio de status.
  // El webhook `account_update` con `ban_state: "BANNED"` lo indicaría.
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-phone-number-quality-update-event.enum.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición del enum `EWhatsAppPhoneNumberQualityUpdateEvent`.", "justificacion": "Tipado para los eventos de webhook de calidad.", "impacto": "Precisión." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
