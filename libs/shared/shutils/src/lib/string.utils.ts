// RUTA: libs/shared/shutils/src/lib/string.utils.ts
// TODO: [LIA Legacy - Implementar StringUtils]
// Propósito: Funciones utilitarias puras para manipulación de strings (capitalizar, slugify, etc.).
// Relacionado con Casos de Uso: Formateo de datos para presentación, generación de identificadores.

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toSlug(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word, non-space, non-hyphen chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}
/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora 1: Añadir más utilidades comunes de strings (truncate, pad, etc.).
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
