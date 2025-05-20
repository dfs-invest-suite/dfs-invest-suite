// RUTA: libs/shared/shvalidationschemas/src/lib/pagination.schemas.ts
// TODO: [LIA Legacy - Refactorizar imports] - ¡REALIZADO!
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_LIMIT,
  MAX_PAGE_LIMIT,
} from '@dfs-suite/shconstants'; // CORREGIDO

import { z } from './zod.instance';

export const PaginatedQueryParamsSchema = z
  .object({
    limit: z.coerce
      .number()
      .int()
      .min(1)
      .max(MAX_PAGE_LIMIT)
      .optional()
      .default(DEFAULT_PAGE_LIMIT),
    page: z.coerce.number().int().min(1).optional().default(DEFAULT_PAGE),
    sortBy: z.string().trim().min(1).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  })
  .passthrough();
// RUTA: libs/shared/shvalidationschemas/src/lib/pagination.schemas.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorizado el import de `@dfs-suite/shared-constants` al alias codificado `@dfs-suite/shconstants`.", "justificacion": "Alineación con la nueva nomenclatura de importPath.", "impacto": "Correcta resolución de módulos."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
