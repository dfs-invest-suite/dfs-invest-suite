// libs/shared/types/src/lib/api-response.interface.ts
import { CorrelationId } from './correlation-id.type';
import { IsoDateString } from './primitive-types';

/**
 * Interfaz base para respuestas de API estandarizadas.
 * @template T - El tipo de datos de la respuesta exitosa.
 */
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string; // Código de error específico de la aplicación
    message: string; // Mensaje de error legible por humanos
    details?: unknown; // Detalles adicionales, específicos del error
  };
  timestamp: IsoDateString;
  correlationId: CorrelationId;
}
/* SECCIÓN DE MEJORAS
// Considerar añadir un campo `path: string` al objeto `error` para indicar el endpoint que originó el error.
// Considerar un enum para `error.code` para estandarizar códigos de error comunes a nivel de plataforma.
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota estratégica 1: A medida que la API evolucione, se podrían necesitar variaciones de esta interfaz para diferentes tipos de respuestas (ej. respuestas de stream, respuestas con metadatos adicionales de paginación si no se usa IPaginated directamente).
]
*/
