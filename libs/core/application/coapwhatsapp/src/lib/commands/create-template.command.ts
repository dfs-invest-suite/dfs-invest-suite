// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/create-template.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TWhatsAppTemplateCreationRequest } from '@dfs-suite/codowhatsapp'; // Desde el dominio WA
import { TenantId, UserId, WabaId } from '@dfs-suite/shtypes';

export interface CreateTemplateCommandPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  templateData: TWhatsAppTemplateCreationRequest; // El payload exacto para la API de Meta
  createdByUserId: UserId;
}

export class CreateTemplateCommand extends CommandBase<CreateTemplateCommandPayload> {
  constructor(
    payload: CreateTemplateCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/create-template.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS: N/A (Archivo nuevo) */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
