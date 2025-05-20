// RUTA: libs/core/application/coapportalcontent/src/lib/commands/update-company-profile.command.ts
// TODO: [LIA Legacy - Implementar UpdateCompanyProfileCommand]
// Propósito: Comando para actualizar el perfil público de la empresa del tenant.
// Relacionado con Casos de Uso: BP-PORTAL-PROFILE-001 (Actualizar Perfil Empresa)

import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, Maybe } from '@dfs-suite/shtypes';
import { PortalCompanyProfileDto } from '../dtos/portal-company-profile.dto'; // Asume que DTO tiene los campos actualizables

export interface UpdateCompanyProfileCommandPayload {
  readonly tenantId: TenantId;
  readonly updatedByUserId: UserId;
  readonly profileData: Partial<PortalCompanyProfileDto>; // Permitir actualizaciones parciales
}

export class UpdateCompanyProfileCommand
  extends CommandBase
  implements UpdateCompanyProfileCommandPayload
{
  readonly tenantId: TenantId;
  readonly updatedByUserId: UserId;
  readonly profileData: Partial<PortalCompanyProfileDto>;

  constructor(
    payload: UpdateCompanyProfileCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    this.tenantId = payload.tenantId;
    this.updatedByUserId = payload.updatedByUserId;
    this.profileData = payload.profileData;
  }
}
