// RUTA: libs/core/domain/codoaiperassistance/src/lib/types/llm-completion.type.ts
// TODO: [LIA Legacy - Finalizar definiciones de LLMCompletionResponse y LLMChatResponse]
// Propósito: Define las estructuras de respuesta esperadas de las interacciones con LLMs.
// Relacionado con Casos de Uso: ILLMPort.
import { Maybe } from '@dfs-suite/shtypes';

import { ChatMessage } from './chat-message.type'; // Asumiendo que ToolCall se define allí

// Para respuestas de generación de texto simple
export interface LLMCompletionResponse {
  readonly text: string;
  readonly finishReason?: Maybe<string>; // 'stop', 'length', 'content_filter', etc.
  // readonly usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}

// Para respuestas de chat completion
export interface LLMChatResponse {
  readonly message: ChatMessage; // El mensaje generado por el asistente (puede tener content y/o tool_calls)
  readonly finishReason?: Maybe<string>;
  // readonly usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}
