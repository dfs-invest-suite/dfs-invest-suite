// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/update-business-profile.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TWhatsAppBusinessProfile } from '@dfs-suite/codowhatsapp';
import {
  TenantId,
  UserId,
  WabaId,
  WhatsAppAccountId,
} from '@dfs-suite/shtypes';

export interface UpdateBusinessProfileCommandPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  phoneNumberId: WhatsAppAccountId; // El número de teléfono cuyo perfil se actualiza
  profileData: Partial<TWhatsAppBusinessProfile>; // Permitir actualizaciones parciales
  updatedByUserId: UserId;
}

export class UpdateBusinessProfileCommand extends CommandBase<UpdateBusinessProfileCommandPayload> {
  constructor(
    payload: UpdateBusinessProfileCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/update-business-profile.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS: N/A (Archivo nuevo) */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
