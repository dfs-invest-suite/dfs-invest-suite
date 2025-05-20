// RUTA: libs/core/application/coapaiperassistance/src/lib/use-cases/process-aiper-chat-prompt.use-case.ts
// TODO: [LIA Legacy - Implementar ProcessAiperChatPromptUseCase]
// Propósito: Orquesta la respuesta a un prompt de chat de Aiper.
// 1. Obtiene AiperTenantConfig (systemPrompt, modelos, RAG habilitado).
// 2. (Si RAG) Genera embedding del prompt, busca en IVectorDatabasePort chunks relevantes.
// 3. Construye el prompt final (con contexto RAG, historial de chat) usando IPromptManagerPort (dominio).
// 4. Llama a ILLMPort.chatCompletion().
// 5. (Si hay tool_calls) Orquesta la ejecución de herramientas (otros Casos de Uso o adaptadores).
// 6. Devuelve la respuesta final (potencialmente en streaming).
// import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
// import { ProcessAiperPromptCommand } from '../commands/process-aiper-prompt.command';
// import { AiperChatMessageDto } from '../dtos/aiper-chat-message.dto';
// import { ILLMPort, IVectorDatabasePort, IEmbeddingGeneratorPort, IPromptManagerPort /*...*/ } from '@dfs-suite/codoaiperassistance';

// export class ProcessAiperChatPromptUseCase implements ICommandHandler<ProcessAiperPromptCommand, AiperChatMessageDto | AsyncIterable<AiperChatMessageDto>> { /* ... */ }
