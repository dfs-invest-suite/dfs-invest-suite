// RUTA: libs/core/application/coapportalcontent/src/lib/commands/unpublish-property-listing.command.ts
// TODO: [LIA Legacy - Implementar UnpublishPropertyListingCommand]
// Propósito: Comando para cambiar el estado de un listado de propiedad a "no publicado" o "borrador".
// Relacionado con Casos de Uso: BP-PORTAL-PROP-005 (Despublicar Listado)

import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, AggregateId } from '@dfs-suite/shtypes';

export interface UnpublishPropertyListingCommandPayload {
  readonly tenantId: TenantId;
  readonly propertyListingId: AggregateId;
  readonly unpublishedByUserId: UserId;
}

export class UnpublishPropertyListingCommand
  extends CommandBase
  implements UnpublishPropertyListingCommandPayload
{
  readonly tenantId: TenantId;
  readonly propertyListingId: AggregateId;
  readonly unpublishedByUserId: UserId;

  constructor(
    payload: UnpublishPropertyListingCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    this.tenantId = payload.tenantId;
    this.propertyListingId = payload.propertyListingId;
    this.unpublishedByUserId = payload.unpublishedByUserId;
  }
}
