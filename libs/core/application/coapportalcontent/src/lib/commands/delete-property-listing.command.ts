// RUTA: libs/core/application/coapportalcontent/src/lib/commands/delete-property-listing.command.ts
// TODO: [LIA Legacy - Implementar DeletePropertyListingCommand]
// Propósito: Comando para eliminar (soft o hard delete) un listado de propiedad.
// Relacionado con Casos de Uso: BP-PORTAL-PROP-003 (Eliminar Listado)

import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, AggregateId } from '@dfs-suite/shtypes';

export interface DeletePropertyListingCommandPayload {
  readonly tenantId: TenantId;
  readonly propertyListingId: AggregateId;
  readonly deletedByUserId: UserId;
}

export class DeletePropertyListingCommand
  extends CommandBase
  implements DeletePropertyListingCommandPayload
{
  readonly tenantId: TenantId;
  readonly propertyListingId: AggregateId;
  readonly deletedByUserId: UserId;

  constructor(
    payload: DeletePropertyListingCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    this.tenantId = payload.tenantId;
    this.propertyListingId = payload.propertyListingId;
    this.deletedByUserId = payload.deletedByUserId;
  }
}
