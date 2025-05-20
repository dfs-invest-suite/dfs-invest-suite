// RUTA: libs/core/application/coapportalcontent/src/lib/commands/create-property-listing.command.ts
// TODO: [LIA Legacy - Implementar CreatePropertyListingCommand]
// Propósito: Comando para crear un nuevo listado de propiedad/SPE para el portal.
// Relacionado con Casos de Uso: BP-PORTAL-PROP-001 (Crear Listado)

import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId } from '@dfs-suite/shtypes';
import { PropertyListingInputDto } from '../dtos/property-listing-input.dto';

export interface CreatePropertyListingCommandPayload {
  readonly tenantId: TenantId;
  readonly createdByUserId: UserId;
  readonly listingData: PropertyListingInputDto;
}

export class CreatePropertyListingCommand
  extends CommandBase
  implements CreatePropertyListingCommandPayload
{
  readonly tenantId: TenantId;
  readonly createdByUserId: UserId;
  readonly listingData: PropertyListingInputDto;

  constructor(
    payload: CreatePropertyListingCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    this.tenantId = payload.tenantId;
    this.createdByUserId = payload.createdByUserId;
    this.listingData = payload.listingData;
  }
}
