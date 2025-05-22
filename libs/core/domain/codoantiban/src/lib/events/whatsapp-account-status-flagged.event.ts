// RUTA: libs/core/domain/codoantiban/src/lib/events/whatsapp-account-status-flagged.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  CorrelationId,
  Maybe,
  WhatsAppAccountId,
  WabaId,
} from '@dfs-suite/shtypes';

import { EOperationalStatus } from '../value-objects/operational-status.vo';

export interface WhatsAppAccountStatusFlaggedPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  phoneNumberId: WhatsAppAccountId;
  flaggedStatus: EOperationalStatus; // El estado que causó la alerta (ej. SUSPENDED_BY_META)
  reason?: Maybe<string>;
  details?: Maybe<object>; // Detalles adicionales del evento de Meta
  correlationId: CorrelationId;
}

export class WhatsAppAccountStatusFlaggedEvent extends DomainEventBase<WhatsAppAccountStatusFlaggedPayload> {
  constructor(props: DomainEventProps<WhatsAppAccountStatusFlaggedPayload>) {
    super({ ...props, aggregateId: props.payload.phoneNumberId });
  }
}
// RUTA: libs/core/domain/codoantiban/src/lib/events/whatsapp-account-status-flagged.event.ts
