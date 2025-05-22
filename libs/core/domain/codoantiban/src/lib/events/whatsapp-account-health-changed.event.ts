// RUTA: libs/core/domain/codoantiban/src/lib/events/whatsapp-account-health-changed.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { EWhatsAppQualityRating } from '@dfs-suite/codowhatsapp';
import {
  TenantId,
  CorrelationId,
  Maybe,
  WhatsAppAccountId,
  WabaId,
} from '@dfs-suite/shtypes';

import { EOperationalStatus } from '../value-objects/operational-status.vo';

export interface WhatsAppAccountHealthChangedPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  phoneNumberId: WhatsAppAccountId;
  newHealthScore: number;
  oldHealthScore?: Maybe<number>;
  newQualityRatingMeta?: Maybe<EWhatsAppQualityRating>;
  oldQualityRatingMeta?: Maybe<EWhatsAppQualityRating>;
  newOperationalStatus?: Maybe<EOperationalStatus>;
  oldOperationalStatus?: Maybe<EOperationalStatus>;
  triggerEvent: string; // Causa del cambio (ej. 'META_QUALITY_UPDATE', 'MESSAGE_SEND_FAIL')
  correlationId: CorrelationId;
}

export class WhatsAppAccountHealthChangedEvent extends DomainEventBase<WhatsAppAccountHealthChangedPayload> {
  constructor(props: DomainEventProps<WhatsAppAccountHealthChangedPayload>) {
    super({ ...props, aggregateId: props.payload.phoneNumberId });
  }
}
// RUTA: libs/core/domain/codoantiban/src/lib/events/whatsapp-account-health-changed.event.ts
