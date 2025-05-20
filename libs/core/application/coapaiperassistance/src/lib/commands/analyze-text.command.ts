// RUTA: libs/core/application/coapaiperassistance/src/lib/commands/analyze-text.command.ts
// TODO: [LIA Legacy - Implementar AnalyzeTextCommand]
// Propósito: Comando para solicitar un análisis de texto específico (sentimiento, intención, entidades).
// Relacionado con Casos de Uso: BP-AIPER-ANLZ-001 (Analizar Texto de Conversación)

import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, Maybe } from '@dfs-suite/shtypes';

export interface AnalyzeTextCommandPayload {
  readonly tenantId?: Maybe<TenantId>; // Opcional si la config de IA es global
  readonly textToAnalyze: string;
  readonly contextHint?: Maybe<string>; // Ej: 'lead_conversation_whatsapp', 'property_description'
}

export class AnalyzeTextCommand
  extends CommandBase
  implements AnalyzeTextCommandPayload
{
  readonly tenantId?: Maybe<TenantId>;
  readonly textToAnalyze: string;
  readonly contextHint?: Maybe<string>;

  constructor(
    payload: AnalyzeTextCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    this.tenantId = payload.tenantId;
    this.textToAnalyze = payload.textToAnalyze;
    this.contextHint = payload.contextHint;
  }
}
