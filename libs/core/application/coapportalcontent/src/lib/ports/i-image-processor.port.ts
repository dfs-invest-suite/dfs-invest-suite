// RUTA: libs/core/application/coapportalcontent/src/lib/ports/i-image-processor.port.ts
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { MimeTypeString } from '@dfs-suite/shtypes'; // <<< AÑADIDO PARA CONSISTENCIA

export const IMAGE_PROCESSOR_PORT = Symbol('IImageProcessorPort');

export interface ImageOutput {
  buffer: Buffer;
  mimeType: MimeTypeString; // <<< USAR MimeTypeString
  width: number;
  height: number;
}

export interface IImageProcessorPort {
  resizeAndOptimize(
    imageBuffer: Buffer,
    options: {
      maxWidth?: number;
      maxHeight?: number;
      quality?: number;
      format?: 'jpeg' | 'png' | 'webp' | 'avif';
    }
  ): Promise<Result<ImageOutput, ExceptionBase | Error>>;
}
// RUTA: libs/core/application/coapportalcontent/src/lib/ports/i-image-processor.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadidas las importaciones para `Result` y `ExceptionBase`.", "justificacion": "Resuelve los errores `no-undef`.", "impacto": "Puerto con tipos correctos." },
  { "mejora": "Tipado `ImageOutput.mimeType` con `MimeTypeString` de `@dfs-suite/shtypes`.", "justificacion": "Consistencia de tipos en todo el sistema.", "impacto": "Claridad y robustez."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
