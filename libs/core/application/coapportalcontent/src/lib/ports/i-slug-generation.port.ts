// RUTA: libs/core/application/coapportalcontent/src/lib/ports/i-slug-generation.port.ts
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';

export const SLUG_GENERATION_PORT = Symbol('ISlugGenerationPort');

export interface ISlugGenerationPort {
  generateSlug(
    inputText: string
  ): Promise<Result<string, ExceptionBase | Error>>;
}
// RUTA: libs/core/application/coapportalcontent/src/lib/ports/i-slug-generation.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadidas las importaciones para `Result` y `ExceptionBase`.", "justificacion": "Resuelve los errores `no-undef`.", "impacto": "Puerto con tipos correctos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
