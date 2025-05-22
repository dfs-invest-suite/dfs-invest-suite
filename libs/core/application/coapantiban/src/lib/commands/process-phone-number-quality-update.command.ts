// RUTA: libs/core/application/coapantiban/src/lib/commands/process-phone-number-quality-update.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TWebhookPhoneNumberQualityUpdate } from '@dfs-suite/codowhatsapp';
import { PhoneNumberString, TenantId, WabaId } from '@dfs-suite/shtypes';

export interface ProcessPhoneNumberQualityUpdateCommandPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  displayPhoneNumber: PhoneNumberString; // Usado para buscar la cuenta local
  qualityUpdatePayload: TWebhookPhoneNumberQualityUpdate; // Payload del webhook
}

export class ProcessPhoneNumberQualityUpdateCommand extends CommandBase<ProcessPhoneNumberQualityUpdateCommandPayload> {
  constructor(
    payload: ProcessPhoneNumberQualityUpdateCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapantiban/src/lib/commands/process-phone-number-quality-update.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS: [ { "mejora": "Definición de ProcessPhoneNumberQualityUpdateCommand.", "justificacion": "Comando interno para procesar webhooks de calidad.", "impacto": "Permite que AccountHealthManagerService maneje estos eventos." } ] /
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
