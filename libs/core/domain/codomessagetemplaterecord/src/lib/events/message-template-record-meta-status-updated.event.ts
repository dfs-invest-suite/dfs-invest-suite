// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/events/message-template-record-meta-status-updated.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  EWhatsAppTemplateStatus as EWhatsAppTemplateStatusMeta,
  EWhatsAppQualityRating as EWhatsAppQualityRatingMeta,
} from '@dfs-suite/codowhatsapp';
import {
  AggregateId,
  MessageTemplateId as HsmId,
  TenantId,
  CorrelationId,
  Maybe,
} from '@dfs-suite/shtypes';

export interface MessageTemplateRecordMetaStatusUpdatedPayload {
  tenantId: TenantId;
  messageTemplateRecordId: AggregateId;
  hsmId: HsmId;
  name: string;
  language: string;
  previousMetaStatus: EWhatsAppTemplateStatusMeta;
  newMetaStatus: EWhatsAppTemplateStatusMeta;
  newQualityRating?: Maybe<EWhatsAppQualityRatingMeta>;
  reason?: Maybe<string>;
  correlationId: CorrelationId;
}

export class MessageTemplateRecordMetaStatusUpdatedEvent extends DomainEventBase<MessageTemplateRecordMetaStatusUpdatedPayload> {
  constructor(
    props: DomainEventProps<MessageTemplateRecordMetaStatusUpdatedPayload>
  ) {
    super(props);
  }
}
// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/events/message-template-record-meta-status-updated.event.ts
