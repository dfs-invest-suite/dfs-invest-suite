// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-interaction.dto.ts
import { EInteractionChannel } from '@dfs-suite/codoleadsflow';
import {
  InteractionId,
  LeadId,
  IsoDateString,
  Maybe,
  UserId,
  MessageLogId,
  CampaignId,
} from '@dfs-suite/shtypes';

export interface LeadInteractionDto {
  id: InteractionId;
  leadId: LeadId;
  channel: EInteractionChannel;
  direction: 'INBOUND' | 'OUTBOUND' | 'INTERNAL_NOTE';
  timestamp: IsoDateString;
  contentSummary: string;
  waMessageId?: Maybe<string>; // ID del mensaje de WhatsApp asociado
  messageLogId?: Maybe<MessageLogId>; // ID de nuestro MessageLogEntity
  campaignId?: Maybe<CampaignId>;
  consultantUserId?: Maybe<UserId>;
  consultantName?: Maybe<string>; // Para mostrar en UI
  sentiment?: Maybe<'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'>;
  durationSeconds?: Maybe<number>;
  createdAt: IsoDateString;
}
// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-interaction.dto.ts
