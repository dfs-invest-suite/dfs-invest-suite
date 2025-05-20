// RUTA: libs/core/application/coapportalcontent/src/lib/commands/publish-property-listing.command.ts
// TODO: [LIA Legacy - Implementar PublishPropertyListingCommand]
// Propósito: Comando para cambiar el estado de un listado de propiedad a "publicado".
// Relacionado con Casos de Uso: BP-PORTAL-PROP-004 (Publicar Listado)

import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, AggregateId } from '@dfs-suite/shtypes';

export interface PublishPropertyListingCommandPayload {
  readonly tenantId: TenantId;
  readonly propertyListingId: AggregateId;
  readonly publishedByUserId: UserId;
}

export class PublishPropertyListingCommand
  extends CommandBase
  implements PublishPropertyListingCommandPayload
{
  readonly tenantId: TenantId;
  readonly propertyListingId: AggregateId;
  readonly publishedByUserId: UserId;

  constructor(
    payload: PublishPropertyListingCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    this.tenantId = payload.tenantId;
    this.propertyListingId = payload.propertyListingId;
    this.publishedByUserId = payload.publishedByUserId;
  }
}
