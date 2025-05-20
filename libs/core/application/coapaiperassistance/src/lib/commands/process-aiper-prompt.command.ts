// RUTA: libs/core/application/coapaiperassistance/src/lib/commands/process-aiper-prompt.command.ts
// TODO: [LIA Legacy - Finalizar estructura de ProcessAiperPromptCommand]
// Propósito: Comando para iniciar el procesamiento de un nuevo prompt/mensaje del usuario en la interfaz de Aiper.
// Relacionado con Casos de Uso: BP-AIPER-CHAT-001 (Procesar Prompt de Chat)

import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, Maybe } from '@dfs-suite/shtypes';
import { AiperChatMessageDto } from '../dtos/aiper-chat-message.dto'; // Se creará después

export interface ProcessAiperPromptCommandPayload {
  readonly tenantId: TenantId;
  readonly userId: UserId; // Usuario que envía el prompt
  readonly conversationHistory: AiperChatMessageDto[]; // Historial de chat previo para contexto
  readonly currentPrompt: AiperChatMessageDto; // El mensaje actual del usuario
  readonly currentUiContext?: Maybe<Record<string, any>>; // Futuro: Contexto de la UI que está viendo el usuario (ej. ID del lead)
  readonly streamResponse?: boolean; // Futuro: Si la respuesta debe ser en streaming
}

export class ProcessAiperPromptCommand
  extends CommandBase
  implements ProcessAiperPromptCommandPayload
{
  readonly tenantId: TenantId;
  readonly userId: UserId;
  readonly conversationHistory: AiperChatMessageDto[];
  readonly currentPrompt: AiperChatMessageDto;
  readonly currentUiContext?: Maybe<Record<string, any>>;
  readonly streamResponse?: boolean;

  constructor(
    payload: ProcessAiperPromptCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    this.tenantId = payload.tenantId;
    this.userId = payload.userId;
    this.conversationHistory = payload.conversationHistory;
    this.currentPrompt = payload.currentPrompt;
    this.currentUiContext = payload.currentUiContext;
    this.streamResponse = payload.streamResponse ?? false;
  }
}
