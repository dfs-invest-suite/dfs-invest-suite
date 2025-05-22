// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-messaging-limit-tier.enum.ts
/**
 * Niveles de límite de mensajería para un número de teléfono de WhatsApp.
 * @see https://developers.facebook.com/docs/whatsapp/business-management-api/manage-phone-numbers#messaging-limits
 */
export enum EWhatsAppMessagingLimitTier {
  TIER_0 = 'TIER_0', // Límite de prueba (ej. 250 conversaciones/24h)
  TIER_1 = 'TIER_1K', // 1,000 conversaciones/24h
  TIER_2 = 'TIER_10K', // 10,000 conversaciones/24h
  TIER_3 = 'TIER_100K', // 100,000 conversaciones/24h
  TIER_4 = 'UNLIMITED', // Sin límite (muy raro)
  // Otros estados podrían ser NONE o NOT_APPLICABLE
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-messaging-limit-tier.enum.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición del enum `EWhatsAppMessagingLimitTier`.", "justificacion": "Crucial para el sistema Anti-Ban y el monitoreo de cuentas.", "impacto": "Tipado para límites de mensajería." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
