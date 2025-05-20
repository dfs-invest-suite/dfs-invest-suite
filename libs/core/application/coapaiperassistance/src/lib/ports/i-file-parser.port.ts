// RUTA: libs/core/application/coapaiperassistance/src/lib/ports/i-file-parser.port.ts
// TODO: [LIA Legacy - Definir IFileParserPort]
// Propósito: Puerto para un servicio que extrae texto de diferentes tipos de archivos (PDF, DOCX, TXT).
// Relacionado con Casos de Uso: IndexTenantDocumentUseCase
// import { Result } from '@dfs-suite/shresult';
// import { ExceptionBase } from '@dfs-suite/sherrors';

export const FILE_PARSER_PORT = Symbol('IFileParserPort');
export interface IFileParserPort {
  // fileReference podría ser un path a un archivo local o un Buffer/Stream
  parseText(
    fileReference: string | Buffer,
    mimeType: string
  ): Promise<Result<string, ExceptionBase | Error>>;
}
