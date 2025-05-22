// RUTA: libs/core/application/coapantiban/src/lib/commands/set-manual-operational-status.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { EOperationalStatus } from '@dfs-suite/codoantiban'; // Desde el dominio AntiBan
import { TenantId, WhatsAppAccountId, UserId, Maybe } from '@dfs-suite/shtypes';

export interface SetManualOperationalStatusCommandPayload {
  tenantId: TenantId;
  whatsAppAccountId: WhatsAppAccountId; // ID de Meta del número a actualizar
  newOperationalStatus: EOperationalStatus;
  reason: string;
  updatedByUserId: UserId;
}

export class SetManualOperationalStatusCommand extends CommandBase<SetManualOperationalStatusCommandPayload> {
  constructor(
    payload: SetManualOperationalStatusCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapantiban/src/lib/commands/set-manual-operational-status.command.ts

/* SECCIÓN DE MEJORAS REALIZADAS: [ { "mejora": "Definición de SetManualOperationalStatusCommand.", "justificacion": "Comando para acciones administrativas en pwa-supervisor.", "impacto": "Permite la gestión manual de estados." } ] /
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
