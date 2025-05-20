// RUTA: libs/shared/shvalidationschemas/src/lib/phone-number.schema.ts
// TODO: [LIA Legacy - Corregir PhoneNumberSchema con .brand] - ¡REALIZADO!
// Propósito: Un schema Zod base para números de teléfono.
// Relacionado con Casos de Uso: Validación de leads, usuarios, datos de contacto.

import { z } from './zod.instance';

const E164_REGEX = /^\+[1-9]\d{1,3}\d{7,14}$/;

export const PhoneNumberSchema = z
  .string()
  .trim()
  .min(9, { message: 'Número de teléfono parece demasiado corto.' })
  .max(20, { message: 'Número de teléfono parece demasiado largo.' })
  .regex(E164_REGEX, {
    message:
      'Formato de número de teléfono inválido. Se espera formato E.164 (ej: +5511987654321).',
  })
  .brand<'PhoneNumberString'>(); // CORREGIDO: .BRAND a .brand

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Corrección de `.BRAND` a `.brand`.", "justificacion": "Zod v3 utiliza el método `.brand()` en minúsculas.", "impacto": "Schema sintácticamente correcto." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La validación de números de teléfono es notoriamente compleja. Considerar `google-libphonenumber` para producción." }
]
*/
// RUTA: libs/shared/shvalidationschemas/src/lib/phone-number.schema.ts
