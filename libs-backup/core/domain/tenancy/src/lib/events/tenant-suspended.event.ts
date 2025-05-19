// libs/core/domain/tenancy/src/lib/events/tenant-suspended.event.ts
import {
  DomainEventBase,
  DomainEventProps,
} from '@dfs-suite/core-domain-shared-kernel-events';
// AggregateId, CorrelationId, etc., se infieren a través de DomainEventProps

/**
 * Payload para el evento TenantSuspendedEvent.
 * Actualmente, este evento no requiere un payload específico.
 */
export type TenantSuspendedEventPayload = Record<string, never>;

/**
 * Evento de dominio que se dispara cuando un tenant es suspendido.
 */
export class TenantSuspendedEvent extends DomainEventBase<TenantSuspendedEventPayload> {
  /**
   * Crea una instancia de TenantSuspendedEvent.
   * @param props - Propiedades del evento, incluyendo el `aggregateId` del tenant suspendido
   *                y el `payload` (que debe ser un objeto vacío para este evento).
   */
  constructor(props: DomainEventProps<TenantSuspendedEventPayload>) {
    super(props);
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Razón de Suspensión en Payload):
    Es altamente recomendable que este evento incluya una razón para la suspensión.
    Ejemplo: `payload: { reason: string; suspendedBy?: UserId; details?: ObjectLiteral }`.
    Justificación: Proporciona contexto vital para auditoría, notificaciones al usuario y posibles acciones correctivas. Sin una razón, el evento es poco informativo.
    Impacto: Modificación de `TenantSuspendedEventPayload`, el constructor, y la lógica en `TenantEntity.suspend()` para aceptar y emitir esta razón.
]
[
  Mejora Propuesta 2 (Duración de Suspensión Opcional en Payload):
    Si una suspensión puede ser temporal con una fecha de finalización prevista, añadir `suspendedUntil?: IsoDateString` al payload.
    Justificación: Útil para sistemas de notificación o para procesos automáticos de reactivación programada.
    Impacto: Adición al payload y lógica asociada en el dominio.
]
*/
// libs/core/domain/tenancy/src/lib/events/tenant-suspended.event.ts

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
