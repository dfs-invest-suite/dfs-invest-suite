// RUTA: libs/core/application/coapaiperassistance/src/lib/dtos/aiper-chat-message.dto.ts
// TODO: [LIA Legacy - Implementar AiperChatMessageDto]
// Propósito: DTO para representar un mensaje en la conversación de chat con Aiper.
// Relacionado con Casos de Uso: ProcessAiperChatPromptUseCase
import { IsoDateString, Maybe, UserId } from '@dfs-suite/shtypes';

export interface AiperChatMessageDto {
  readonly id: string; // UUID para el mensaje
  readonly role: 'user' | 'assistant' | 'system' | 'tool';
  readonly content: string | null; // Contenido del mensaje, null si es una llamada a herramienta sin texto
  readonly name?: Maybe<string>; // Nombre de la herramienta, si role es 'tool'
  readonly toolCalls?: Maybe<
    Array<{
      id: string;
      type: 'function';
      function: { name: string; arguments: string };
    }>
  >; // Para el LLM solicitando tool_call
  readonly toolCallId?: Maybe<string>; // Para la respuesta de la herramienta
  readonly timestamp: IsoDateString;
  readonly userId?: Maybe<UserId>; // Quién envió el mensaje (si es 'user')
}
