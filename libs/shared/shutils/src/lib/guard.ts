// RUTA: libs/shared/shutils/src/lib/guard.ts
// TODO: [LIA Legacy - Implementar Guard] - ¡REALIZADO, REVISADO Y REFACTORIZADO!
// Propósito: Clase con métodos estáticos para validaciones comunes y rápidas (precondiciones, validación de argumentos).
// Relacionado con Casos de Uso: Utilizado transversalmente para validaciones en todas las capas.

import { Maybe } from '@dfs-suite/shtypes';

export class Guard {
  /**
   * Checks if value is null or undefined.
   * @param value - The value to check.
   * @returns True if the value is null or undefined, false otherwise.
   */
  static isNil(value: unknown): value is null | undefined {
    return value === null || value === undefined;
  }

  /**
   * Checks if value is "empty".
   * For strings, it's empty if null, undefined, or a string of zero length after trimming.
   * For arrays, it's empty if null, undefined, or an array of zero length.
   * For objects, it's empty if null, undefined, or an object with no own enumerable string keys (excluding Date instances).
   * For numbers and booleans, it's considered "not empty" if not null/undefined.
   * For Dates, it's considered "not empty" if not null/undefined.
   * @param value - The value to check.
   * @returns True if the value is considered empty, false otherwise.
   */
  static isEmpty(value: Maybe<unknown>): boolean {
    if (this.isNil(value)) {
      return true;
    }
    if (typeof value === 'string') {
      return value.trim().length === 0;
    }
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    if (
      typeof value === 'object' &&
      value !== null &&
      !(value instanceof Date)
    ) {
      return Object.keys(value).length === 0;
    }
    return false;
  }

  /**
   * Checks if the length of a string or array is between min and max (inclusive).
   * @param value - The string or array to check.
   * @param min - The minimum allowed length.
   * @param max - The maximum allowed length.
   * @returns True if the length is within the range, false otherwise (or if value is nil/not a string/array).
   */
  static lengthIsBetween(
    value: Maybe<string | Array<unknown>>,
    min: number,
    max: number
  ): boolean {
    if (this.isNil(value)) {
      return false;
    }
    if (typeof value === 'string' || Array.isArray(value)) {
      const valueLength = value.length;
      return valueLength >= min && valueLength <= max;
    }
    return false;
  }

  /**
   * Checks if the value is a string.
   * @param value - The value to check.
   * @returns True if the value is a string, false otherwise.
   */
  static isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  /**
   * Checks if the value is a number (and not NaN).
   * @param value - The value to check.
   * @returns True if the value is a valid number, false otherwise.
   */
  static isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
  }

  /**
   * Checks if the value is a boolean.
   * @param value - The value to check.
   * @returns True if the value is a boolean, false otherwise.
   */
  static isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
  }

  /**
   * Checks if the value is an instance of Date and represents a valid date.
   * @param value - The value to check.
   * @returns True if the value is a valid Date object, false otherwise.
   */
  static isValidDate(value: unknown): value is Date {
    return value instanceof Date && !isNaN(value.getTime());
  }
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de import de `Maybe` para usar `@dfs-suite/shtypes`.", "justificacion": "Alineación con la nueva nomenclatura de importPath.", "impacto": "Resolución de módulo correcta." },
  { "mejora": "Ajuste y clarificación en la lógica de `isEmpty`.", "justificacion": "Se asegura que `isEmpty` trimee strings y maneje correctamente objetos y `Date` instances. Se añadieron JSDoc para cada método.", "impacto": "Comportamiento más predecible y código mejor documentado." },
  { "mejora": "Añadidos métodos `isString`, `isNumber`, `isBoolean`, `isValidDate` con JSDoc.", "justificacion": "Expandir la utilidad de la clase `Guard` con validaciones comunes.", "impacto": "Mayor funcionalidad y reutilización." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Considerar si `isEmpty` para objetos debería verificar también `value.constructor === Object` si se quiere ser extremadamente estricto con "plain objects", aunque la implementación actual es común." }
]
*/
// RUTA: libs/shared/shutils/src/lib/guard.ts
