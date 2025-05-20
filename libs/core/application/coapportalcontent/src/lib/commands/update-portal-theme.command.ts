// RUTA: libs/core/application/coapportalcontent/src/lib/commands/update-portal-theme.command.ts
// TODO: [LIA Legacy - Implementar UpdatePortalThemeCommand]
// Propósito: Comando para actualizar la configuración de apariencia del portal del tenant.
// Relacionado con Casos de Uso: BP-PORTAL-THEME-001 (Actualizar Tema)
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId } from '@dfs-suite/shtypes';
import { PortalThemeConfigDto } from '../dtos/portal-theme-config.dto';

export interface UpdatePortalThemeCommandPayload {
  readonly tenantId: TenantId;
  readonly updatedByUserId: UserId;
  readonly themeConfigData: Partial<PortalThemeConfigDto>;
}
export class UpdatePortalThemeCommand
  extends CommandBase
  implements UpdatePortalThemeCommandPayload {
  // ... propiedades y constructor
}
