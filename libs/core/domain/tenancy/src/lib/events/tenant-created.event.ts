// RUTA: libs/core/domain/tenancy/src/lib/events/tenant-created.event.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import {
  DomainEventBase,
  DomainEventProps,
} from '@dfs-suite/core-domain-shared-kernel-events';
import { UserId } from '@dfs-suite/shared-types';
import { TenantStatusEnum } from '../value-objects/tenant-status.vo';

export interface ITenantCreatedEventPayload {
  readonly name: string;
  readonly ownerUserId: UserId;
  readonly status: TenantStatusEnum;
}

export class TenantCreatedEvent extends DomainEventBase<ITenantCreatedEventPayload> {
  constructor(props: DomainEventProps<ITenantCreatedEventPayload>) {
    super(props);
  }
}
