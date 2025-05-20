// RUTA: libs/shared/shvalidationschemas/src/lib/address.schema.ts
// TODO: [LIA Legacy - Implementar AddressSchema]
// Propósito: Un schema Zod base para direcciones, reutilizable en leads, tenants, etc.
// import { z } from './zod.instance';
// export const AddressSchema = z.object({
//   street: z.string().trim().min(1),
//   city: z.string().trim().min(1),
//   state: z.string().trim().min(2).max(2), // Ejemplo: 'SC'
//   zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'Invalid ZIP code'), // Ejemplo para Brasil
//   country: z.string().trim().min(2).default('BR'),
//   complement: z.string().optional(),
// });
