// RUTA: libs/core/application/coapaiperassistance/src/lib/ports/i-file-parser.port.ts
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
// import { Readable } from 'node:stream'; // Si fileReference puede ser un stream

export const FILE_PARSER_PORT = Symbol('IFileParserPort');
export interface IFileParserPort {
  parseText(
    fileReference: string | Buffer, // Podría ser también NodeJS.ReadableStream si es necesario
    mimeType: string
  ): Promise<Result<string, ExceptionBase | Error>>;
}
// RUTA: libs/core/application/coapaiperassistance/src/lib/ports/i-file-parser.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadidas las importaciones para `Result` y `ExceptionBase`.", "justificacion": "Resuelve los errores `no-undef`.", "impacto": "Tipado correcto del puerto." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadidas importaciones para `Result` y `ExceptionBase`.", "justificacion": "Resuelve los errores `no-undef` en este archivo.", "impacto": "El puerto ahora tiene tipos correctos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
