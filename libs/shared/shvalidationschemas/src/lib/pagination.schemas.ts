// RUTA: libs/shared/shvalidationschemas/src/lib/pagination.schemas.ts
// Autor: L.I.A Legacy (IA Asistente)
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_LIMIT,
  MAX_PAGE_LIMIT,
} from '@dfs-suite/shconstants';

import { z } from './zod.instance';

export const PaginatedQueryParamsSchema = z
  .object({
    limit: z.coerce // Usar coerce para convertir string a number si viene de query params
      .number({
        invalid_type_error: 'Límite debe ser un número.',
      })
      .int({ message: 'Límite debe ser un entero.' })
      .min(1, { message: 'Límite debe ser al menos 1.' })
      .max(MAX_PAGE_LIMIT, {
        message: `Límite no puede exceder ${MAX_PAGE_LIMIT}.`,
      })
      .optional()
      .default(DEFAULT_PAGE_LIMIT),
    page: z.coerce // Usar coerce
      .number({
        invalid_type_error: 'Página debe ser un número.',
      })
      .int({ message: 'Página debe ser un entero.' })
      .min(1, { message: 'Página debe ser al menos 1.' })
      .optional()
      .default(DEFAULT_PAGE),
    sortBy: z
      .string()
      .trim()
      .min(1, { message: 'sortBy no puede estar vacío si se provee.' })
      .optional(), // Puede ser un campo específico de la entidad, ej. 'createdAt'
    sortOrder: z.enum(['asc', 'desc']).optional(),
  })
  .passthrough(); // Permite otros campos de filtro no definidos aquí explícitamente
// RUTA: libs/shared/shvalidationschemas/src/lib/pagination.schemas.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Uso de `z.coerce.number()` para `limit` y `page`.", "justificacion": "Los parámetros de consulta URL suelen llegar como strings. `z.coerce.number()` intenta convertirlos a números antes de la validación, lo cual es más robusto.", "impacto": "Manejo más flexible de inputs de query params." },
  { "mejora": "Mensajes de error más específicos en español.", "justificacion": "Mejora la experiencia del desarrollador al consumir la API.", "impacto": "Claridad en los errores de validación." },
  { "mejora": "Import de `@dfs-suite/shconstants` verificado.", "justificacion": "Asegura el uso del alias codificado.", "impacto": "Correctitud." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
