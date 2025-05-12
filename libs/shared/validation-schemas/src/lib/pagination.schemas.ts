// libs/shared/validation-schemas/src/lib/pagination.schemas.ts
import { z } from './zod.instance';
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT, MAX_PAGE_LIMIT } from '@dfs-suite/shared-constants';

export const PaginatedQueryParamsSchema = z.object({
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(MAX_PAGE_LIMIT)
    .optional()
    .default(DEFAULT_PAGE_LIMIT),
  page: z.coerce
    .number()
    .int()
    .min(1) // Asumiendo paginación basada en 1
    .optional()
    .default(DEFAULT_PAGE),
  sortBy: z.string().trim().min(1).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
}).passthrough(); // .passthrough() permite otros campos no definidos en el schema
