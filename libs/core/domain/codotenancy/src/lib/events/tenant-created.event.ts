// RUTA: libs/core/domain/codotenancy/src/lib/events/tenant-created.event.ts
// Autor: L.I.A Legacy (IA Asistente)
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { TenantId, UserId, Maybe } from '@dfs-suite/shtypes'; // Añadido TenantId

import { TenantStatusEnum } from '../value-objects/tenant-status.vo';

export interface ITenantCreatedEventPayload {
  readonly tenantId: TenantId; // **NUEVO**
  readonly name: string;
  readonly slug: string; // **NUEVO**
  readonly ownerUserId: UserId;
  readonly status: TenantStatusEnum;
  readonly planId: Maybe<string>;
}

export class TenantCreatedEvent extends DomainEventBase<ITenantCreatedEventPayload> {
  constructor(props: DomainEventProps<ITenantCreatedEventPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codotenancy/src/lib/events/tenant-created.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Payload de `TenantCreatedEvent` actualizado para incluir `tenantId` y `slug`.", "justificacion": "Proporciona información más completa y útil para los consumidores del evento.", "impacto": "Consistencia con los datos de la entidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
