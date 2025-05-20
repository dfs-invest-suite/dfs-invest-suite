// RUTA: libs/core/domain/codoaiperassistance/src/lib/types/chat-message.type.ts
// TODO: [LIA Legacy - Finalizar definición de ChatMessage y ToolCall/ToolResult]
// Propósito: Define la estructura de un mensaje dentro de una conversación de chat,
//            compatible con el formato esperado por la mayoría de los LLMs (ej. OpenAI, Gemini).
// Relacionado con Casos de Uso: ProcessAiperChatPromptUseCase, ILLMPort.
import { Maybe } from '@dfs-suite/shtypes';

export interface ToolCallFunction {
  name: string;
  arguments: string; // JSON string de los argumentos
}

export interface ToolCall {
  id: string; // ID de la llamada a la herramienta, proporcionado por el LLM
  type: 'function'; // Por ahora solo 'function'
  function: ToolCallFunction;
}

export interface ChatMessage {
  readonly role: 'system' | 'user' | 'assistant' | 'tool';
  readonly content: string | null; // El contenido textual del mensaje. Para role 'tool', es el resultado de la herramienta. Para 'assistant' con tool_calls, puede ser null.
  readonly name?: Maybe<string>; // Nombre de la herramienta si role es 'tool' (o el nombre de la función llamada si es un mensaje 'assistant' con tool_calls)
  readonly toolCalls?: Maybe<ToolCall[]>; // Para el LLM solicitando llamadas a herramientas (role: 'assistant')
  readonly toolCallId?: Maybe<string>; // Para la respuesta de una herramienta específica (role: 'tool')
}
