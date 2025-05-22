// RUTA: libs/core/application/coapantiban/src/lib/commands/trigger-phone-number-warmup.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, WhatsAppAccountId, UserId, Maybe } from '@dfs-suite/shtypes';

export interface TriggerPhoneNumberWarmupCommandPayload {
  tenantId: TenantId;
  whatsAppAccountId: WhatsAppAccountId;
  triggeredByUserId: UserId;
  // strategy?: Maybe<string>; // Futuro: Para seleccionar una estrategia de warmup específica
}

export class TriggerPhoneNumberWarmupCommand extends CommandBase<TriggerPhoneNumberWarmupCommandPayload> {
  constructor(
    payload: TriggerPhoneNumberWarmupCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapantiban/src/lib/commands/trigger-phone-number-warmup.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS: [ { "mejora": "Definición de TriggerPhoneNumberWarmupCommand.", "justificacion": "Comando para iniciar el calentamiento de un número.", "impacto": "Gestión proactiva de cuentas." } ] /
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
