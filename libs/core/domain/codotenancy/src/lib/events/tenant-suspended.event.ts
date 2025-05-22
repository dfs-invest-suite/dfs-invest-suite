// RUTA: libs/core/domain/codotenancy/src/lib/events/tenant-suspended.event.ts
// Autor: L.I.A Legacy (IA Asistente)
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { TenantId, Maybe } from '@dfs-suite/shtypes';

export interface TenantSuspendedEventPayload {
  readonly tenantId: TenantId;
  readonly reason?: Maybe<string>; // Razón de la suspensión
}

export class TenantSuspendedEvent extends DomainEventBase<TenantSuspendedEventPayload> {
  constructor(props: DomainEventProps<TenantSuspendedEventPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codotenancy/src/lib/events/tenant-suspended.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Payload de `TenantSuspendedEvent` ahora incluye `tenantId` y `reason` opcional.", "justificacion": "Proporciona identificador y contexto para la suspensión.", "impacto": "Evento más informativo y útil para auditoría o notificaciones." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
