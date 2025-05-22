// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/message-status-update-app.dto.ts
import {
  EWhatsAppMessageStatus,
  TWhatsAppPricing, // Tipo del dominio
  TWhatsAppError, // Tipo del dominio
} from '@dfs-suite/codowhatsapp';
import {
  TenantId,
  CorrelationId,
  Maybe,
  IsoDateString,
  WabaId,
  PhoneNumberString,
  MessageLogId, // ID de nuestro log
} from '@dfs-suite/shtypes';

// DTO para el payload del ProcessWhatsAppMessageStatusUseCase
export interface MessageStatusUpdateAppDto {
  tenantId: TenantId;
  wabaId: WabaId;
  correlationId: CorrelationId;

  messageWaId: string; // ID del mensaje de WhatsApp cuyo estado cambió
  messageLogId?: Maybe<MessageLogId>; // Nuestro ID interno del log, si se puede encontrar antes de llamar al UC
  recipientWaId: PhoneNumberString; // A quién se envió el mensaje originalmente
  status: EWhatsAppMessageStatus; // Nuevo estado (sent, delivered, read, failed)
  timestamp: IsoDateString; // Timestamp del cambio de estado (de Meta)

  // Información opcional del webhook de status
  conversationId?: Maybe<string>;
  pricing?: Maybe<TWhatsAppPricing>; // Objeto pricing completo de Meta
  errors?: Maybe<TWhatsAppError[]>; // Si status es 'failed'
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/message-status-update-app.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de MessageStatusUpdateAppDto.", "justificacion": "DTO para pasar la información de un webhook de estado de mensaje al ProcessWhatsAppMessageStatusUseCase. Incluye datos cruciales para actualizar el MessageLogEntity, registrar facturación y notificar al sistema Anti-Ban.", "impacto": "Contrato de datos claro para el procesamiento de estados de mensajes." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
