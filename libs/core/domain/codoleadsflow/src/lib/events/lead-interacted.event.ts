// RUTA: libs/core/domain/codoleadsflow/src/lib/events/lead-interacted.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  LeadId,
  CorrelationId,
  InteractionId,
} from '@dfs-suite/shtypes';

import { EInteractionChannel } from '../value-objects/interaction-channel.vo';

export interface LeadInteractedEventPayload {
  tenantId: TenantId;
  leadId: LeadId;
  interactionId: InteractionId;
  channel: EInteractionChannel;
  direction: 'INBOUND' | 'OUTBOUND' | 'INTERNAL_NOTE';
  correlationId: CorrelationId;
  // Podría incluir un resumen del contenido o tipo de interacción
}

export class LeadInteractedEvent extends DomainEventBase<LeadInteractedEventPayload> {
  constructor(props: DomainEventProps<LeadInteractedEventPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codoleadsflow/src/lib/events/lead-interacted.event.ts
