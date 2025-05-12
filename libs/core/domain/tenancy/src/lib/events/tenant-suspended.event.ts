// libs/core/domain/tenancy/src/lib/events/tenant-suspended.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/core-domain-shared-kernel-events';
// Eliminada la importación de TenantId si aggregateId ya es del tipo correcto

// Usamos Record<string, never> para un payload que es explícitamente un objeto vacío.
export type TenantSuspendedEventPayload = Record<string, never>;

export class TenantSuspendedEvent extends DomainEventBase<TenantSuspendedEventPayload> {
  constructor(props: Omit<DomainEventProps<TenantSuspendedEventPayload>, 'payload'> & { payload?: TenantSuspendedEventPayload }) {
    // Aseguramos que el payload sea un objeto vacío si no se proporciona explícitamente
    super({ ...props, payload: props.payload || {} });
  }
}
