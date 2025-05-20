// RUTA: libs/shared/shutils/src/lib/object.utils.ts
// TODO: [LIA Legacy - Implementar ObjectUtils] - ¡REALIZADO Y MEJORADO!
// Propósito: Funciones utilitarias para manipulación de objetos (deepClone, isEmptyObject, pick, omit).
// Relacionado con Casos de Uso: Transformación de DTOs, manejo de datos, clonación de objetos.

import { Maybe } from '@dfs-suite/shtypes';

export class ObjectUtils {
  static isEmptyObject(obj: Maybe<object>): boolean {
    if (obj === null || obj === undefined) {
      return true;
    }
    if (typeof obj !== 'object' || Array.isArray(obj)) {
      return false;
    }
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  static pick<T extends object, K extends keyof T>(
    obj: T,
    keys: readonly K[]
  ): Pick<T, K> {
    const result = {} as Pick<T, K>;
    if (obj === null || typeof obj !== 'object') return result;

    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  static omit<T extends object, K extends keyof T>(
    obj: T,
    keys: readonly K[]
  ): Omit<T, K> {
    if (obj === null || typeof obj !== 'object') return {} as Omit<T, K>;

    const result = { ...obj };
    for (const key of keys) {
      delete result[key];
    }
    return result;
  }

  static simpleDeepClone<T>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {
      if (Array.isArray(obj)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return [...(obj as any[])] as unknown as T;
      }
      return { ...(obj as object) } as T;
    }
  }
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementación de `isEmptyObject`, `pick`, `omit`, y `simpleDeepClone`.", "justificacion": "Funciones básicas de manipulación de objetos provistas.", "impacto": "Utilidades listas para usar." },
  { "mejora": "Manejo de inputs nulos/undefined en `pick` y `omit`.", "justificacion": "Devuelven un objeto vacío si el input `obj` es nulo/undefined o no es un objeto.", "impacto": "Mayor robustez." },
  { "mejora": "Ajuste en `isEmptyObject` para ser más específico.", "justificacion": "Clarifica que `null` y `undefined` se consideran vacíos para este método, y que arrays vacíos no lo son. También verifica `constructor === Object`.", "impacto": "Comportamiento más definido." },
  { "mejora": "Refactorización de import de `Maybe` para usar `@dfs-suite/shtypes`.", "justificacion": "Alineación.", "impacto": "Resolución." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Para `simpleDeepClone`, considerar librería externa para casos complejos." }
]
*/
// RUTA: libs/shared/shutils/src/lib/object.utils.ts
