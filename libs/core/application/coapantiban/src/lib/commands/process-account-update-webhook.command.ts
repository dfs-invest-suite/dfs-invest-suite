// RUTA: libs/core/application/coapantiban/src/lib/commands/process-account-update-webhook.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TWebhookAccountUpdate } from '@dfs-suite/codowhatsapp';
import { TenantId, WabaId, CorrelationId } from '@dfs-suite/shtypes';

export interface ProcessAccountUpdateWebhookCommandPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  accountUpdatePayload: TWebhookAccountUpdate; // Payload del webhook
}

export class ProcessAccountUpdateWebhookCommand extends CommandBase<ProcessAccountUpdateWebhookCommandPayload> {
  constructor(
    payload: ProcessAccountUpdateWebhookCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapantiban/src/lib/commands/process-account-update-webhook.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS: [ { "mejora": "Definición de ProcessAccountUpdateWebhookCommand.", "justificacion": "Comando interno para procesar webhooks de actualización de cuenta.", "impacto": "Manejo de eventos de cuenta." } ] /
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
