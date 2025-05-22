// RUTA: libs/core/domain/codoaiperassistance/src/lib/ports/embedding-generator.port.ts
// TODO: [LIA Legacy - Finalizar definición de IEmbeddingGeneratorPort]
// Propósito: Puerto para un servicio que genera embeddings (vectores numéricos) a partir de texto.
// Relacionado con Casos de Uso: IndexTenantDocumentUseCase, ProcessAiperChatPromptUseCase (para RAG).

import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';

import { AiModelIdentifierVO } from '../value-objects/ai-model-identifier.vo';

export const EMBEDDING_GENERATOR_PORT = Symbol('IEmbeddingGeneratorPort');

export interface EmbeddingGeneratorConfig {
  model: AiModelIdentifierVO;
  // Opciones específicas del modelo de embedding si son necesarias
}

export interface IEmbeddingGeneratorPort {
  generateEmbeddings(
    texts: string[],
    config: EmbeddingGeneratorConfig
  ): Promise<Result<number[][], ExceptionBase | Error>>; // Array de vectores, uno por cada texto de entrada

  // generateEmbedding( // Para un solo texto
  //   text: string,
  //   config: EmbeddingGeneratorConfig
  // ): Promise<Result<number[], ExceptionBase | Error>>;
}
