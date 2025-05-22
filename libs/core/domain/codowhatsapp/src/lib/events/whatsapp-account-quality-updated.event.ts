// RUTA: libs/core/domain/codowhatsapp/src/lib/events/whatsapp-account-quality-updated.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  CorrelationId,
  Maybe,
  WhatsAppAccountId,
  WabaId,
} from '@dfs-suite/shtypes';

import { EWhatsAppQualityRating } from '../enums';

export interface WhatsAppAccountQualityUpdatedPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  phoneNumberId: WhatsAppAccountId; // El Phone Number ID de Meta
  currentQualityRating: EWhatsAppQualityRating;
  previousQualityRating?: Maybe<EWhatsAppQualityRating>;
  eventSource: 'WEBHOOK' | 'API_SYNC';
  canSendMessage: boolean;
  correlationId: CorrelationId;
}

export class WhatsAppAccountQualityUpdatedEvent extends DomainEventBase<WhatsAppAccountQualityUpdatedPayload> {
  constructor(props: DomainEventProps<WhatsAppAccountQualityUpdatedPayload>) {
    super({ ...props, aggregateId: props.payload.phoneNumberId as string });
  }
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/events/whatsapp-account-quality-updated.event.ts
