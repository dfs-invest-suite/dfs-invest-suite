// RUTA: libs/shared/shconstants/src/lib/time.constants.ts
// TODO: [LIA Legacy - Implementar TimeConstants] - ¡REALIZADO!
// Propósito: Constantes relacionadas con unidades de tiempo.
// Relacionado con Casos de Uso: Cálculos de timeouts, TTLs, scheduling.

export const MILLISECONDS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;

export const SECONDS_IN_HOUR: number = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
export const SECONDS_IN_DAY: number = SECONDS_IN_HOUR * HOURS_IN_DAY;
export const MILLISECONDS_IN_MINUTE: number =
  MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE;
export const MILLISECONDS_IN_HOUR: number =
  MILLISECONDS_IN_MINUTE * MINUTES_IN_HOUR;
export const MILLISECONDS_IN_DAY: number = MILLISECONDS_IN_HOUR * HOURS_IN_DAY;

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementación de constantes de tiempo básicas y derivadas.", "justificacion": "Provee valores comunes para cálculos de tiempo.", "impacto": "Utilidades listas para usar." },
  { "mejora": "Tipado explícito para constantes derivadas.", "justificacion": "Mejora la legibilidad y previene inferencias incorrectas si los cálculos fueran más complejos.", "impacto": "Claridad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
// RUTA: libs/shared/shconstants/src/lib/time.constants.ts
