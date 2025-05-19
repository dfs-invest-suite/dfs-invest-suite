// RUTA: libs/core/domain/codoaiperassistance/src/index.ts

// Ports (Abstracciones de las capacidades de IA)
export * from './lib/ports/conversation-analyzer.port'; // Para sentimiento, intención, entidades
export * from './lib/ports/content-generator.port'; // Futuro: Para generar borradores de plantillas, emails
export * from './lib/ports/prompt-manager.port'; // Para construir prompts complejos y contextuales
export * from './lib/ports/vector-db.port'; // Futuro: Para RAG - búsqueda semántica en base de conocimiento del tenant
export * from './lib/ports/embedding-generator.port'; // Futuro: Para generar embeddings para RAG

// Value Objects / Types (Estructuras de datos para la interacción con IA)
export * from './lib/types/ai-analysis-result.type'; // Resultado de IConversationAnalyzerPort
export * from './lib/types/generated-content.type'; // Futuro: Resultado de IContentGeneratorPort
export * from './lib/types/prompt-context.type'; // Para construir prompts
export * from './lib/types/knowledge-chunk.type'; // Futuro: Para RAG

// Entities (Si Aiper tiene configuraciones o historial persistente a nivel de dominio)
// export * from './lib/entities/aiper-tenant-config.entity'; // Futuro: Preferencias de Aiper por tenant
// export * from './lib/entities/aiper-conversation-log.entity'; // Futuro: Para análisis de rendimiento de Aiper
