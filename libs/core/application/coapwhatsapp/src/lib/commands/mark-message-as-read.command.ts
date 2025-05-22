// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/mark-message-as-read.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, WhatsAppAccountId } from '@dfs-suite/shtypes';

export interface MarkMessageAsReadCommandPayload {
  tenantId: TenantId;
  phoneNumberId: WhatsAppAccountId; // El número del tenant que recibió el mensaje
  messageWaId: string; // El ID del mensaje de WhatsApp
  markedByUserId: UserId;
}

export class MarkMessageAsReadCommand extends CommandBase<MarkMessageAsReadCommandPayload> {
  constructor(
    payload: MarkMessageAsReadCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/mark-message-as-read.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS: N/A (Archivo nuevo) */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
