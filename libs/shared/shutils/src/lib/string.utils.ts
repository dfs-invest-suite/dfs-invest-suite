// RUTA: libs/shared/shutils/src/lib/string.utils.ts
// TODO: [LIA Legacy - Implementar StringUtils] - ¡REALIZADO Y MEJORADO!
// Propósito: Funciones utilitarias puras para manipulación de strings (capitalizar, slugify, etc.).
// Relacionado con Casos de Uso: Formateo de datos para presentación, generación de identificadores.

export class StringUtils {
  static capitalizeFirstLetter(str: string | null | undefined): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static toSlug(str: string | null | undefined): string {
    if (!str) return '';
    return str
      .toString()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  }

  static truncate(
    str: string | null | undefined,
    maxLength: number,
    ellipsis = '...'
  ): string {
    if (!str || str.length <= maxLength) {
      return str || '';
    }
    if (maxLength <= ellipsis.length) {
      return ellipsis.substring(0, maxLength);
    }
    return str.substring(0, maxLength - ellipsis.length) + ellipsis;
  }

  static generateRandomString(
    length: number,
    charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  ): string {
    let result = '';
    if (length <= 0) return result;
    const charactersLength = charset.length;
    if (charactersLength === 0) return result;

    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementación de `capitalizeFirstLetter`, `toSlug`, `truncate`, y `generateRandomString`.", "justificacion": "Funciones básicas de manipulación de strings provistas.", "impacto": "Utilidades listas para usar." },
  { "mejora": "Manejo robusto de inputs nulos/undefined y casos borde.", "justificacion": "Las funciones ahora manejan de forma segura inputs `null` o `undefined`, y casos como `length <= 0` o `charset` vacío en `generateRandomString`.", "impacto": "Mayor robustez." },
  { "mejora": "Slugify mejorado para remover diacríticos.", "justificacion": "La función `toSlug` ahora normaliza y remueve diacríticos para generar slugs más limpios y universales.", "impacto": "Mejora la calidad de los slugs generados."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
// RUTA: libs/shared/shutils/src/lib/string.utils.ts
