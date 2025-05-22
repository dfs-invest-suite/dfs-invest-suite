// RUTA: libs/core/domain/codotenancy/src/lib/events/tenant-activated.event.ts
// Autor: L.I.A Legacy (IA Asistente)
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { TenantId } from '@dfs-suite/shtypes';

export interface TenantActivatedEventPayload {
  readonly tenantId: TenantId;
}

export class TenantActivatedEvent extends DomainEventBase<TenantActivatedEventPayload> {
  constructor(props: DomainEventProps<TenantActivatedEventPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codotenancy/src/lib/events/tenant-activated.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Payload de `TenantActivatedEvent` ahora incluye `tenantId`.", "justificacion": "Identifica claramente qué tenant fue activado.", "impacto": "Evento más informativo." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
