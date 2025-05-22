// RUTA: libs/core/domain/codowhatsapp/src/lib/events/whatsapp-template-status-updated.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  CorrelationId,
  Maybe,
  MessageTemplateId,
  WabaId,
} from '@dfs-suite/shtypes';

import { EWhatsAppTemplateStatus, EWhatsAppTemplateCategory } from '../enums';

export interface WhatsAppTemplateStatusUpdatedPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  messageTemplateId: MessageTemplateId; // HSM ID
  messageTemplateName: string;
  messageTemplateLanguage?: Maybe<string>;
  messageTemplateCategory?: Maybe<EWhatsAppTemplateCategory>;
  previousStatus?: Maybe<EWhatsAppTemplateStatus>;
  newStatus: EWhatsAppTemplateStatus;
  reason?: Maybe<string>; // Razón del cambio (ej. rechazo)
  eventSource: 'WEBHOOK' | 'API_SYNC';
  correlationId: CorrelationId;
}

export class WhatsAppTemplateStatusUpdatedEvent extends DomainEventBase<WhatsAppTemplateStatusUpdatedPayload> {
  constructor(props: DomainEventProps<WhatsAppTemplateStatusUpdatedPayload>) {
    super({ ...props, aggregateId: props.payload.messageTemplateId as string });
  }
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/events/whatsapp-template-status-updated.event.ts
