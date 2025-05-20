// RUTA: libs/core/application/coapaiperassistance/src/lib/ports/i-text-splitter.port.ts
// TODO: [LIA Legacy - Definir ITextSplitterPort]
// Propósito: Puerto para un servicio que divide texto largo en chunks semánticos o de tamaño fijo para RAG.
// Relacionado con Casos de Uso: IndexTenantDocumentUseCase
// import { Result } from '@dfs-suite/shresult';
// import { ExceptionBase } from '@dfs-suite/sherrors';

export const TEXT_SPLITTER_PORT = Symbol('ITextSplitterPort');
export interface TextSplitterConfig {
  chunkSize: number;
  chunkOverlap: number;
  // strategy: 'recursive' | 'semantic' | 'fixed';
}
export interface ITextSplitterPort {
  splitText(
    text: string,
    config: TextSplitterConfig
  ): Promise<Result<string[], ExceptionBase | Error>>;
}
