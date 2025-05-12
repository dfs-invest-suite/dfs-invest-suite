// libs/core/domain/tenancy/src/lib/events/tenant-suspended.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/core-domain-shared-kernel-events';
import { AggregateId, CorrelationId } from '@dfs-suite/shared-types'; // Removidos UserId, Maybe si no se usan aquí
import { IDomainEventMetadata } from '@dfs-suite/core-domain-shared-kernel-events'; // <--- IMPORT AÑADIDO

export type TenantSuspendedEventPayload = Record<string, never>;

export class TenantSuspendedEvent extends DomainEventBase<TenantSuspendedEventPayload> {
  constructor(props: {
    aggregateId: AggregateId;
    payload?: TenantSuspendedEventPayload;
    metadata?: Partial<Omit<IDomainEventMetadata, 'timestamp' | 'correlationId'>> & { correlationId?: CorrelationId };
  }) {
    super({
      aggregateId: props.aggregateId,
      payload: props.payload || ({} as TenantSuspendedEventPayload),
      metadata: props.metadata,
    });
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Consistencia del Constructor con DomainEventProps):
    Similar a `TenantActivatedEvent`, considerar simplificar el constructor a:
    `constructor(props: DomainEventProps<TenantSuspendedEventPayload>) { super(props); }`
    La entidad `TenantEntity` es responsable de pasar el payload correcto (incluso si es `{}`).
  Justificación: Simplificación y consistencia.
  Impacto: Menor, similar a `TenantActivatedEvent`.
]
// (Otras mejoras propuestas anteriormente se mantienen)
*/
// libs/core/domain/tenancy/src/lib/events/tenant-suspended.event.ts

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Razón de Suspensión en Payload): El payload podría incluir una `reason: string` o `suspensionReasonCode: SuspensionReasonCodeEnum` para indicar por qué el tenant fue suspendido (ej. falta de pago, violación de términos, solicitud del admin).
  Justificación: Proporciona contexto crucial a los manejadores de eventos y para auditoría.
  Impacto: Modificación de `TenantSuspendedEventPayload` y del constructor. La lógica de negocio que dispara la suspensión necesitaría proveer esta razón.
]
[
  Mejora Propuesta 2 (Duración de Suspensión Opcional): Si las suspensiones pueden tener una duración (ej. "suspendido hasta fecha X"), esta información podría incluirse en el payload.
  Justificación: Útil para sistemas de notificación o para procesos automáticos de reactivación.
  Impacto: Adición de `suspendedUntil?: IsoDateString` al payload.
]

*/
