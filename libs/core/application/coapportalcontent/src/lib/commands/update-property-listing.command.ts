// RUTA: libs/core/application/coapportalcontent/src/lib/commands/update-property-listing.command.ts
// TODO: [LIA Legacy - Implementar UpdatePropertyListingCommand]
// Propósito: Comando para actualizar un listado de propiedad/SPE existente.
// Relacionado con Casos de Uso: BP-PORTAL-PROP-002 (Actualizar Listado)

import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, AggregateId } from '@dfs-suite/shtypes';
import { PropertyListingInputDto } from '../dtos/property-listing-input.dto';

export interface UpdatePropertyListingCommandPayload {
  readonly tenantId: TenantId;
  readonly propertyListingId: AggregateId; // ID del PortalPropertyListingEntity
  readonly updatedByUserId: UserId;
  readonly listingData: Partial<PropertyListingInputDto>; // Permitir actualizaciones parciales
}

export class UpdatePropertyListingCommand
  extends CommandBase
  implements UpdatePropertyListingCommandPayload
{
  readonly tenantId: TenantId;
  readonly propertyListingId: AggregateId;
  readonly updatedByUserId: UserId;
  readonly listingData: Partial<PropertyListingInputDto>;

  constructor(
    payload: UpdatePropertyListingCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    this.tenantId = payload.tenantId;
    this.propertyListingId = payload.propertyListingId;
    this.updatedByUserId = payload.updatedByUserId;
    this.listingData = payload.listingData;
  }
}
