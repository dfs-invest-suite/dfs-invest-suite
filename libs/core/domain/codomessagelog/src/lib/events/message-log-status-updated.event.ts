// RUTA: libs/core/domain/codomessagelog/src/lib/events/message-log-status-updated.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  EWhatsAppMessageStatus,
  TWhatsAppPricing,
  TWhatsAppError,
} from '@dfs-suite/codowhatsapp';
import {
  AggregateId,
  CorrelationId,
  IsoDateString,
  Maybe,
  TenantId,
  WhatsAppAccountId,
} from '@dfs-suite/shtypes';

import { EMessageInternalStatus } from '../value-objects/message-internal-status.vo';

export interface MessageLogStatusUpdatedPayload {
  readonly tenantId: TenantId;
  readonly messageLogId: AggregateId;
  readonly waMessageId?: Maybe<string>; // ID de Meta, si existe
  readonly correlationId: CorrelationId;
  readonly newStatusInternal: EMessageInternalStatus;
  readonly newStatusWhatsapp?: Maybe<EWhatsAppMessageStatus>;
  readonly timestamp: IsoDateString; // Timestamp de esta actualización de estado
  readonly pricing?: Maybe<TWhatsAppPricing>;
  readonly errors?: Maybe<TWhatsAppError[]>;
  readonly conversationId?: Maybe<string>;
  // Podríamos añadir el phoneNumberId (WhatsAppAccountId) que originó el mensaje
}

export class MessageLogStatusUpdatedEvent extends DomainEventBase<MessageLogStatusUpdatedPayload> {
  constructor(props: DomainEventProps<MessageLogStatusUpdatedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codomessagelog/src/lib/events/message-log-status-updated.event.ts
