// RUTA: libs/shared/shvalidationschemas/src/lib/phone-number.schema.ts
// Autor: L.I.A Legacy (IA Asistente)
import { z } from './zod.instance';

// const E164_LIKE_REGEX = /^\+?[1-9]\d{1,3}[\s-]?\d{1,14}$/; // COMENTADO o ELIMINADO
const E164_CLEAN_REGEX = /^\+[1-9]\d{7,14}$/; // Para el valor transformado

export const PhoneNumberSchema = z
  .string({
    required_error: 'Número de teléfono es requerido.',
    invalid_type_error: 'Número de teléfono debe ser un string.',
  })
  .trim()
  .min(9, { message: 'Número de teléfono parece demasiado corto.' })
  .max(25, { message: 'Número de teléfono parece demasiado largo.' })
  .transform((val) => '+' + val.replace(/\D/g, ''))
  .refine((val) => E164_CLEAN_REGEX.test(val), {
    message:
      'Formato de número de teléfono inválido después de normalizar. Se espera formato E.164 (ej: +5511987654321).',
  })
  .brand<'PhoneNumberString'>();
// RUTA: libs/shared/shvalidationschemas/src/lib/phone-number.schema.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Eliminada la constante no utilizada `E164_LIKE_REGEX`.", "justificacion": "Resuelve el warning `@typescript-eslint/no-unused-vars`.", "impacto": "Código más limpio." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
