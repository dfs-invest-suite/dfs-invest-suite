// libs/shared/validation-schemas/src/lib/common.schemas.ts
import { z } from './zod.instance';
import { SIMPLE_EMAIL_REGEX, UUID_V4_REGEX } from '@dfs-suite/shared-constants';

export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(5, { message: 'Email must be at least 5 characters long' })
  .max(320, { message: 'Email must be at most 320 characters long' })
  .regex(SIMPLE_EMAIL_REGEX, { message: 'Invalid email format' });

export const UuidSchema = z
  .string()
  .trim()
  .regex(UUID_V4_REGEX, { message: 'Invalid UUID format' });

// Ejemplo de un schema para TenantId (usando el UuidSchema como base)
export const TenantIdSchema = UuidSchema.brand<'TenantId'>();
export const UserIdSchema = UuidSchema.brand<'UserId'>();
export const AggregateIdSchema = UuidSchema.brand<'AggregateId'>();

export const IsoDateStringSchema = z
    .string()
    .datetime({ message: 'Invalid ISO date string format' })
    .brand<'IsoDateString'>();
