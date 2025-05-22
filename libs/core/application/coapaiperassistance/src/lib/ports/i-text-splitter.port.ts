// RUTA: libs/core/application/coapaiperassistance/src/lib/ports/i-text-splitter.port.ts
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';

export const TEXT_SPLITTER_PORT = Symbol('ITextSplitterPort');
export interface TextSplitterConfig {
  chunkSize: number;
  chunkOverlap: number;
}
export interface ITextSplitterPort {
  splitText(
    text: string,
    config: TextSplitterConfig
  ): Promise<Result<string[], ExceptionBase | Error>>;
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadidas las importaciones para `Result` y `ExceptionBase`.", "justificacion": "Resuelve los errores `no-undef`.", "impacto": "Tipado correcto del puerto." }
]

NOTAS PARA IMPLEMENTACIÓN FUTURA: [] 
[
  { "mejora": "Añadidas importaciones para `Result` y `ExceptionBase`.", "justificacion": "Resuelve los errores `no-undef` en este archivo.", "impacto": "El puerto ahora tiene tipos correctos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
