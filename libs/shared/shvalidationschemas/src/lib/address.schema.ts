// RUTA: libs/shared/shvalidationschemas/src/lib/address.schema.ts
// Autor: L.I.A Legacy (IA Asistente)
import { z } from './zod.instance';

export const AddressSchema = z
  .object({
    street: z
      .string()
      .trim()
      .min(1, { message: 'La calle es requerida.' })
      .max(255, { message: 'La calle no debe exceder los 255 caracteres.' }),
    number: z
      .string()
      .trim()
      .max(50, { message: 'El número no debe exceder los 50 caracteres.' })
      .optional()
      .nullable(),
    complement: z
      .string()
      .trim()
      .max(100, {
        message: 'El complemento no debe exceder los 100 caracteres.',
      })
      .optional()
      .nullable(),
    neighborhood: z
      .string()
      .trim()
      .min(1, { message: 'El barrio es requerido.' })
      .max(100, { message: 'El barrio no debe exceder los 100 caracteres.' }),
    city: z
      .string()
      .trim()
      .min(1, { message: 'La ciudad es requerida.' })
      .max(100, { message: 'La ciudad no debe exceder los 100 caracteres.' }),
    state: z // Sigla del estado, ej: SC, SP, RJ
      .string()
      .trim()
      .length(2, { message: 'El estado debe tener 2 caracteres (sigla).' })
      .toUpperCase(), // Normalizar a mayúsculas
    zipCode: z // CEP para Brasil
      .string()
      .trim()
      .regex(
        /^\d{5}-?\d{3}$/,
        'Formato de CEP inválido (ej: 12345-678 o 12345678).'
      )
      .transform((val) => val.replace(/\D/g, '')) // Normalizar a solo números (8 dígitos)
      .refine((val) => val.length === 8, {
        message: 'CEP debe tener 8 dígitos después de normalizar.',
      }),
    country: z // Código ISO 3166-1 alpha-2
      .string()
      .trim()
      .length(2, { message: 'El país debe ser un código ISO de 2 letras.' })
      .toUpperCase() // Normalizar a mayúsculas
      .default('BR'),
    latitude: z.coerce // Permitir string de input, pero convertir a número
      .number({ invalid_type_error: 'Latitud debe ser un número.' })
      .min(-90, { message: 'Latitud debe estar entre -90 y 90.' })
      .max(90, { message: 'Latitud debe estar entre -90 y 90.' })
      .optional()
      .nullable(),
    longitude: z.coerce
      .number({ invalid_type_error: 'Longitud debe ser un número.' })
      .min(-180, { message: 'Longitud debe estar entre -180 y 180.' })
      .max(180, { message: 'Longitud debe estar entre -180 y 180.' })
      .optional()
      .nullable(),
  })
  .strict();
// RUTA: libs/shared/shvalidationschemas/src/lib/address.schema.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Normalización y validación más estrictas para `state`, `zipCode`, y `country`.", "justificacion": "Asegura que `state` y `country` sean códigos de 2 letras en mayúsculas. `zipCode` se normaliza a 8 dígitos y se valida su longitud después de la normalización.", "impacto": "Datos más consistentes y mejor validados." },
  { "mejora": "Uso de `z.coerce.number()` para `latitude` y `longitude`.", "justificacion": "Permite que estos campos sean ingresados como strings (ej. desde un formulario) y se conviertan a números antes de la validación de rango.", "impacto": "Mayor flexibilidad de entrada." },
  { "mejora": "Mensajes de error más específicos y en español.", "justificacion": "Mejora la UX para el desarrollador que consume estos schemas.", "impacto": "Claridad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Si se requiere soporte internacional avanzado para direcciones, la validación de `state` y `zipCode` debería ser condicional basada en `country` y usar formatos específicos por país." }
]
*/
