// libs/core/domain/tenancy/src/lib/events/tenant-activated.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/core-domain-shared-kernel-events';
// Eliminada la importación de TenantId si aggregateId ya es del tipo correcto

// Usamos Record<string, never> para un payload que es explícitamente un objeto vacío.
export type TenantActivatedEventPayload = Record<string, never>;

export class TenantActivatedEvent extends DomainEventBase<TenantActivatedEventPayload> {
  constructor(props: Omit<DomainEventProps<TenantActivatedEventPayload>, 'payload'> & { payload?: TenantActivatedEventPayload }) {
    // Aseguramos que el payload sea un objeto vacío si no se proporciona explícitamente
    super({ ...props, payload: props.payload || {} });
  }
}
