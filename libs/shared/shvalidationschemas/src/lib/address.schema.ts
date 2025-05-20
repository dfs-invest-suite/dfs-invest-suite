// RUTA: libs/shared/shvalidationschemas/src/lib/address.schema.ts
// TODO: [LIA Legacy - Implementar AddressSchema] - ¡REALIZADO!
// Propósito: Un schema Zod base para direcciones, reutilizable.
// Relacionado con Casos de Uso: Leads, Tenants, Perfil de Empresa.

import { z } from './zod.instance';

export const AddressSchema = z
  .object({
    street: z
      .string()
      .trim()
      .min(1, { message: 'La calle es requerida.' })
      .max(255),
    number: z.string().trim().max(50).optional().nullable(), // Puede no tener número explícito
    complement: z.string().trim().max(100).optional().nullable(),
    neighborhood: z
      .string()
      .trim()
      .min(1, { message: 'El barrio es requerido.' })
      .max(100),
    city: z
      .string()
      .trim()
      .min(1, { message: 'La ciudad es requerida.' })
      .max(100),
    state: z
      .string()
      .trim()
      .min(2, { message: 'El estado debe tener 2 caracteres.' })
      .max(2, { message: 'El estado debe tener 2 caracteres.' }), // Ejemplo: 'SC', 'SP'
    zipCode: z
      .string()
      .trim()
      .regex(
        /^\d{5}-?\d{3}$/,
        'Formato de CEP inválido (ej: 12345-678 o 12345678).'
      )
      .transform((val) => val.replace('-', '')), // Normalizar a solo números
    country: z
      .string()
      .trim()
      .min(2, { message: 'El país es requerido.' })
      .default('BR'),
    latitude: z.number().min(-90).max(90).optional().nullable(),
    longitude: z.number().min(-180).max(180).optional().nullable(),
  })
  .strict(); // No permitir propiedades adicionales

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementación de `AddressSchema` con validaciones y campos comunes.", "justificacion": "Provee un schema base robusto para direcciones.", "impacto": "Utilidad de validación lista." },
  { "mejora": "Añadidos campos opcionales `latitude` y `longitude`.", "justificacion": "Útil para geolocalización.", "impacto": "Schema más completo." },
  { "mejora": "Uso de `.strict()`.", "justificacion": "Evita que se pasen propiedades no definidas en el schema.", "impacto": "Validación más estricta." },
  { "mejora": "Normalización de `zipCode`.", "justificacion": "Elimina el guion para un formato de almacenamiento consistente.", "impacto": "Dato más limpio." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La validación de `zipCode` es específica para Brasil. Si se necesita soportar múltiples países, esta regex y la lógica de `country`/`state` deberían ser más flexibles o condicionales." }
]
*/
// RUTA: libs/shared/shvalidationschemas/src/lib/address.schema.ts
