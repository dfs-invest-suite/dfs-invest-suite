// RUTA: libs/core/domain/codomessagelog/src/lib/events/message-log-created.event.ts
// TODO: [LIA Legacy - Implementar MessageLogCreatedEvent]
// Propósito: Evento cuando se crea un nuevo log de mensaje.
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  AggregateId,
  CorrelationId,
  LeadId,
  TenantId,
} from '@dfs-suite/shtypes';
import { EMessageDirection } from '../value-objects/message-direction.vo';
import { EMessageInternalStatus } from '../value-objects/message-internal-status.vo';

export interface MessageLogCreatedEventPayload {
  readonly messageLogId: AggregateId;
  readonly tenantId: TenantId; // Necesario para que los listeners puedan actuar en el contexto correcto
  readonly correlationId: CorrelationId;
  readonly leadId: LeadId;
  readonly direction: EMessageDirection;
  readonly initialStatusInternal: EMessageInternalStatus;
}

export class MessageLogCreatedEvent extends DomainEventBase<MessageLogCreatedEventPayload> {
  constructor(props: DomainEventProps<MessageLogCreatedEventPayload>) {
    super(props);
  }
}
/* SECCIÓN DE MEJORAS FUTURAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
