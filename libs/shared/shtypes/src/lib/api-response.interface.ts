// RUTA: libs/shared/shtypes/src/lib/api-response.interface.ts
// TODO: [LIA Legacy - Corregir import de Maybe] - ¡REALIZADO!
// Propósito: Interfaz base para respuestas de API estandarizadas.
// Relacionado con Casos de Uso: Todas las respuestas de api-main.

import { Maybe } from './maybe.type'; // CORREGIDO: Importar Maybe desde su propio archivo
import { CorrelationId, IsoDateString } from './primitives/primitive-types'; // Importa los que SÍ están en primitive-types

/**
 * Interfaz base para respuestas de API estandarizadas.
 * @template TData - El tipo de datos de la respuesta exitosa.
 * @template TErrorDetails - El tipo de los detalles del error.
 */
export interface IApiResponse<TData = unknown, TErrorDetails = unknown> {
  readonly success: boolean;
  readonly data?: TData;
  readonly error?: {
    readonly code: string;
    readonly message: string;
    readonly path?: string;
    readonly details?: TErrorDetails;
  };
  readonly timestamp: IsoDateString;
  readonly correlationId: CorrelationId;
  readonly metadata?: Maybe<Record<string, unknown>>;
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Corrección del path de importación para `Maybe`.", "justificacion": "`Maybe` se define en `maybe.type.ts`, no en `primitive-types.ts`. Se corrigió el import a `./maybe.type`.", "impacto": "Resuelve el error de TypeScript `El módulo '\"./primitive-types\"' no tiene ningún miembro 'Maybe' exportado.`." },
  { "mejora": "Añadido campo opcional `path` al objeto `error`.", "justificacion": "Proporciona información adicional para el debugging.", "impacto": "Mejora la trazabilidad." },
  { "mejora": "Tipos genéricos `TData` y `TErrorDetails`.", "justificacion": "Mayor flexibilidad y seguridad de tipos.", "impacto": "Interfaces de API más descriptivas." },
  { "mejora": "Añadido campo opcional `metadata`.", "justificacion": "Flexibilidad para respuestas API más complejas.", "impacto": "Consistencia." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Considerar un enum para los `error.code`." }
]
*/
// RUTA: libs/shared/shtypes/src/lib/api-response.interface.ts
