// RUTA: libs/core/domain/codocampaigns/src/lib/enums/campaign-status.enum.ts
export enum ECampaignStatus {
  DRAFT = 'DRAFT', // Campaña en creación, no lista para enviar
  PENDING_SCHEDULE = 'PENDING_SCHEDULE', // Configurada, esperando ser programada
  SCHEDULED = 'SCHEDULED', // Programada para una fecha/hora futura
  RUNNING = 'RUNNING', // Actualmente en proceso de envío
  PAUSED_USER = 'PAUSED_USER', // Pausada manualmente por el usuario
  PAUSED_SYSTEM = 'PAUSED_SYSTEM', // Pausada por el sistema (ej. problemas Anti-Ban, falta de créditos)
  COMPLETED = 'COMPLETED', // Todos los mensajes han sido enviados (o intentos de envío)
  ARCHIVED = 'ARCHIVED', // Campaña finalizada y archivada, no editable
  ERROR = 'ERROR', // Ocurrió un error crítico que impidió su ejecución
}
// RUTA: libs/core/domain/codocampaigns/src/lib/enums/campaign-status.enum.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creación del enum `ECampaignStatus`.", "justificacion": "Define los estados posibles para una campaña de marketing.", "impacto": "Tipado fuerte para la entidad `CampaignEntity` y su `CampaignStatusVO`." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
