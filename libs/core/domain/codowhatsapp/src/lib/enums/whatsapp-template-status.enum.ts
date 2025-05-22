// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-template-status.enum.ts
/**
 * Estados de una plantilla de mensaje de WhatsApp según Meta.
 * @see https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates#template-status-updates
 */
export enum EWhatsAppTemplateStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAUSED = 'PAUSED', // Pausada por Meta debido a baja calidad o violaciones
  DISABLED = 'DISABLED', // Deshabilitada por Meta
  // DELETED = 'DELETED', // Si se elimina, no se recibe un status, sino que deja de existir.
  // IN_APPEAL = 'IN_APPEAL' // Cuando una plantilla rechazada es apelada
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-template-status.enum.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición del enum `EWhatsAppTemplateStatus`.", "justificacion": "Fundamental para la gestión de plantillas y su sincronización.", "impacto": "Tipado." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
