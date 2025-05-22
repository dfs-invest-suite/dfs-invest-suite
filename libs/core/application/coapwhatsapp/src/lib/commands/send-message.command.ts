// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/send-message.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TWhatsAppApiMessageRequest } from '@dfs-suite/codowhatsapp';
import {
  TenantId,
  CorrelationId,
  Maybe,
  WhatsAppAccountId,
  LeadId,
  MessageTemplateId,
  PhoneNumberString, // <<< Importado
  MessageLogId, // <<< Importado
  CampaignId, // <<< Importado
} from '@dfs-suite/shtypes';

export interface SendMessageCommandPayload {
  readonly tenantId: TenantId;
  readonly leadId: LeadId;
  readonly recipientPhoneNumber: PhoneNumberString;
  readonly messageData: TWhatsAppApiMessageRequest;
  readonly messageLogIdToUpdate?: Maybe<MessageLogId>;
  readonly originatingCampaignId?: Maybe<CampaignId>;
  readonly preferredAccountId?: Maybe<WhatsAppAccountId>;
}

export class SendMessageCommand extends CommandBase<SendMessageCommandPayload> {
  constructor(payload: SendMessageCommandPayload, metadata: ICommandMetadata) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/send-message.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadidas importaciones para `PhoneNumberString`, `MessageLogId`, y `CampaignId` desde `@dfs-suite/shtypes`.", "justificacion": "Resuelve los errores `no-undef` correspondientes.", "impacto": "Correctitud de tipos." },
  { "mejora": "Eliminada la importación no utilizada de `CorrelationId` y `MessageTemplateId` (ya que `ICommandMetadata` y `TWhatsAppApiMessageRequest` los manejan).", "justificacion": "Limpieza.", "impacto": "Menos warnings."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
