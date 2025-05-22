// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/events/message-template-record-created.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  EWhatsAppTemplateCategory,
  EWhatsAppTemplateStatus as EWhatsAppTemplateStatusMeta,
} from '@dfs-suite/codowhatsapp';
import {
  AggregateId,
  MessageTemplateId as HsmId,
  TenantId,
  CorrelationId,
} from '@dfs-suite/shtypes';

import { ETemplateStatusInternal } from '../value-objects/template-status-internal.vo';

export interface MessageTemplateRecordCreatedPayload {
  tenantId: TenantId;
  messageTemplateRecordId: AggregateId;
  hsmId: HsmId;
  name: string;
  language: string;
  category: EWhatsAppTemplateCategory;
  statusInternal: ETemplateStatusInternal;
  statusMeta: EWhatsAppTemplateStatusMeta;
  correlationId: CorrelationId;
}

export class MessageTemplateRecordCreatedEvent extends DomainEventBase<MessageTemplateRecordCreatedPayload> {
  constructor(props: DomainEventProps<MessageTemplateRecordCreatedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/events/message-template-record-created.event.ts
