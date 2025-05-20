// RUTA: libs/core/domain/codoaiperassistance/src/index.ts

// --- Entities ---
export * from './lib/entities/aiper-tenant-config.entity'; // Configuración de Aiper específica del tenant
export * from './lib/entities/knowledge-document.entity'; // Representa un documento indexado para RAG
// export * from './lib/entities/aiper-tool.entity';        // Futuro: Si las herramientas son configurables dinámicamente

// --- Value Objects ---
export * from './lib/value-objects/ai-model-identifier.vo'; // Para especificar qué LLM/Embedding model usar
export * from './lib/value-objects/document-status.vo'; // (PENDING_PROCESSING, PROCESSING, INDEXED, ERROR_INDEXING, DELETED) // Actualizado desde SNAPSHOT
export * from './lib/value-objects/prompt-segment.vo'; // Para construir prompts modulares
// export * from './lib/value-objects/tool-call-request.vo';  // Futuro
// export * from './lib/value-objects/tool-call-result.vo';   // Futuro

// --- Ports (Interfaces para servicios externos que el dominio necesita) ---
export * from './lib/ports/aiper-tenant-config.repository.port'; // Para persistir AiperTenantConfigEntity
export * from './lib/ports/conversation-analyzer.port'; // Puerto específico para análisis de texto (sentimiento, intención) - Usado por otros dominios, implementado por IA
export * from './lib/ports/embedding-generator.port'; // Puerto para generar embeddings de texto - Usado por RAG, implementado por IA infra
export * from './lib/ports/knowledge-document.repository.port'; // Para persistir KnowledgeDocumentEntity y sus Chunks
export * from './lib/ports/llm.port'; // Puerto genérico para interactuar con un LLM (chat, completion) - Usado por chat, implementado por IA infra
export * from './lib/ports/vector-database.port'; // Puerto para interactuar con una DB Vectorial (store, search) - Usado por RAG, implementado por IA infra
// export * from './lib/ports/aiper-tool.repository.port';     // Futuro
// export * from './lib/ports/aiper-cache.port'; // Puerto para caché de respuestas LLM (si se considera parte del dominio)

// --- Domain Services (Lógica de dominio compleja) ---
// export * from './lib/services/prompt-construction.service'; // Lógica para ensamblar prompts complejos
export * from './lib/services/rag-orchestration.service'; // Lógica de dominio para el flujo RAG (si es suficientemente compleja para ser un servicio de dominio)
// export * from './lib/services/tool-executor-domain.service'; // Futuro: Lógica de dominio para validación/preparación de tools

// --- Types (Estructuras de datos específicas del dominio, no VOs) ---
export * from './lib/types/ai-analysis-result.type'; // Para el resultado del ConversationAnalyzerPort
export * from './lib/types/chat-message.type'; // Para mensajes de usuario y Aiper (puede ser entidad si tiene lógica)
export * from './lib/types/knowledge-chunk.type'; // Para fragmentos de documentos en RAG (podría ser entidad si tiene lógica)
export * from './lib/types/llm-completion.type'; // Para respuestas de LLMs
export * from './lib/types/llm-stream-chunk.type'; // Para trozos de respuesta en streaming
// export * from './lib/types/tool-definition.type';        // Futuro

// --- Enums (Específicos del Dominio Aiper) ---
export * from './lib/enums/ai-model-provider.enum'; // (OPENAI, GOOGLE_GEMINI, ANTHROPIC, AZURE_OPENAI)
export * from './lib/enums/document-processing-status.enum'; // PENDING_PROCESSING, PROCESSING, INDEXED, ERROR_INDEXING (similar a document-status.vo, decidir si es enum o VO)
// export * from './lib/enums/aiper-tool-name.enum';   // Futuro

// --- Domain Errors ---
export * from './lib/errors/ai-service-unavailable.error';
export * from './lib/errors/prompt-too-long.error';
export * from './lib/errors/document-indexing.error';
export * from './lib/errors/rag-retrieval.error';
export * from './lib/errors/vector-db-operation.error';
