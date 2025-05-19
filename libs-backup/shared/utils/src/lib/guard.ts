// libs/shared/utils/src/lib/guard.ts
import { Maybe } from '@dfs-suite/shared-types';

export class Guard {
  /**
   * Checks if value is null or undefined.
   */
  static isNil(value: unknown): value is null | undefined {
    return value === null || value === undefined;
  }

  /**
   * Checks if value is empty. Accepts strings, numbers, booleans, objects and arrays.
   * For objects, checks if there are no own enumerable properties.
   * For arrays, checks if the length is 0.
   */
  static isEmpty(value: Maybe<unknown>): boolean {
    if (this.isNil(value)) {
      return true;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      return false;
    }
    if (value instanceof Date) {
      return false;
    }
    if (typeof value === 'string' && value.trim().length === 0) {
      return true;
    }
    if (Array.isArray(value) && value.length === 0) {
      return true;
    }
    if (
      typeof value === 'object' &&
      value !== null &&
      Object.keys(value).length === 0
    ) {
      return true;
    }
    return false;
  }

  /**
   * Checks length range of a provided string or array.
   * Returns false if value is empty, null, undefined, or not a string/array.
   */
  static lengthIsBetween(
    value: Maybe<string | Array<unknown>>,
    min: number,
    max: number
  ): boolean {
    if (this.isNil(value) || this.isEmpty(value)) {
      return false;
    }
    // At this point, value is not nil and not "empty" by our definition.
    // Explicit type check for string or Array before accessing .length
    if (typeof value === 'string' || Array.isArray(value)) {
      const valueLength = value.length;
      return valueLength >= min && valueLength <= max;
    }
    return false; // Not a string or array, cannot check length
  }
}
