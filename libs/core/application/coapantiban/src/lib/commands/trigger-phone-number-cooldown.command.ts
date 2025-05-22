// RUTA: libs/core/application/coapantiban/src/lib/commands/trigger-phone-number-cooldown.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, WhatsAppAccountId, UserId, Maybe } from '@dfs-suite/shtypes';

export interface TriggerPhoneNumberCooldownCommandPayload {
  tenantId: TenantId;
  whatsAppAccountId: WhatsAppAccountId;
  reason: string; // Motivo del cooldown
  triggeredByUserId?: Maybe<UserId>; // Si es manual, o 'SYSTEM' si es automático
}

export class TriggerPhoneNumberCooldownCommand extends CommandBase<TriggerPhoneNumberCooldownCommandPayload> {
  constructor(
    payload: TriggerPhoneNumberCooldownCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapantiban/src/lib/commands/trigger-phone-number-cooldown.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS: [ { "mejora": "Definición de TriggerPhoneNumberCooldownCommand.", "justificacion": "Comando para poner un número en enfriamiento.", "impacto": "Gestión reactiva y proactiva de cuentas." } ] /
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
