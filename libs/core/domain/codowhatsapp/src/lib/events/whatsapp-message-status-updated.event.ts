// RUTA: libs/core/domain/codowhatsapp/src/lib/events/whatsapp-message-status-updated.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  CorrelationId,
  Maybe,
  AggregateId,
  IsoDateString,
} from '@dfs-suite/shtypes';

import { EWhatsAppMessageStatus } from '../enums';
import { TWhatsAppPricing, TWhatsAppError } from '../types';

export interface WhatsAppMessageStatusUpdatedPayload {
  tenantId: TenantId;
  messageWaId: string; // ID del mensaje de WhatsApp
  messageLogId?: Maybe<AggregateId>; // Nuestro ID interno si se conoce
  status: EWhatsAppMessageStatus;
  timestamp: IsoDateString;
  recipientWaId: string;
  conversationId?: Maybe<string>;
  pricing?: Maybe<TWhatsAppPricing>;
  errors?: Maybe<TWhatsAppError[]>;
  correlationId: CorrelationId;
}

export class WhatsAppMessageStatusUpdatedEvent extends DomainEventBase<WhatsAppMessageStatusUpdatedPayload> {
  constructor(props: DomainEventProps<WhatsAppMessageStatusUpdatedPayload>) {
    super({ ...props, aggregateId: props.payload.messageWaId as AggregateId });
  }
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/events/whatsapp-message-status-updated.event.ts
