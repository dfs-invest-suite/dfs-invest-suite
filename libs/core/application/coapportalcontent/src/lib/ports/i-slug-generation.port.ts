// RUTA: libs/core/application/coapportalcontent/src/lib/ports/i-slug-generation.port.ts
// TODO: [LIA Legacy - Definir ISlugGenerationPort]
// Propósito: Puerto para un servicio que genera slugs URL-amigables a partir de un string (ej. título).
// Relacionado con Casos de Uso: CreatePropertyListingUseCase, UpdatePropertyListingUseCase
// import { Result } from '@dfs-suite/shresult';
// import { ExceptionBase } from '@dfs-suite/sherrors';

export const SLUG_GENERATION_PORT = Symbol('ISlugGenerationPort');
export interface ISlugGenerationPort {
  generateSlug(
    inputText: string
  ): Promise<Result<string, ExceptionBase | Error>>;
}
