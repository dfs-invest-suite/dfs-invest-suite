// RUTA: libs/core/application/coapportalcontent/src/lib/ports/i-image-processor.port.ts
// TODO: [LIA Legacy - Definir IImageProcessorPort]
// Propósito: Puerto para un servicio que procesa imágenes (redimensionar, optimizar, generar thumbnails).
// Relacionado con Casos de Uso: UploadPortalAssetUseCase
// import { Result } from '@dfs-suite/shresult';
// import { ExceptionBase } from '@dfs-suite/sherrors';

export const IMAGE_PROCESSOR_PORT = Symbol('IImageProcessorPort');
export interface ImageOutput {
  buffer: Buffer;
  mimeType: string;
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
      format?: 'jpeg' | 'png' | 'webp';
    }
  ): Promise<Result<ImageOutput, ExceptionBase | Error>>;
}
