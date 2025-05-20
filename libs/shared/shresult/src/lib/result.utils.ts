// RUTA: libs/shared/shresult/src/lib/result.utils.ts
// TODO: [LIA Legacy - Implementar Result Utils] - ¡REVISADO!
// Propósito: Funciones helper para crear y trabajar con el tipo Result.
// Relacionado con Casos de Uso: Ampliamente utilizado para retornar de Casos de Uso y Servicios de Dominio.

import { Ok, Err, Result } from './result.type'; // OK (relativo interno)

/**
 * Crea una instancia de Ok (resultado exitoso).
 * @param value El valor del resultado exitoso.
 */
export function ok<T, E = never>(value: T): Ok<T, E> {
  return {
    _tag: 'Ok',
    value,
    isOk: function (): this is Ok<T, E> {
      return true;
    },
    isErr: function (): this is Err<E, T> {
      return false;
    },
    map: <U>(fn: (val: T) => U): Ok<U, E> => ok(fn(value)),
    mapErr: <F>(_fn: (errVal: E) => F): Ok<T, F> => ok<T, F>(value), // fn no se usa, devuelve el Ok original
    andThen: <U, NextE = E>(
      fn: (val: T) => Result<U, NextE>
    ): Result<U, NextE> => fn(value),
    orElse: <NextT = T, F = E>(
      _fn: (errVal: E) => Result<NextT, F>
    ): Result<T | NextT, F> => ok<T | NextT, F>(value), // fn no se usa
    unwrap: (): T => value,
    unwrapOr: (_defaultValue: T): T => value, // defaultValue no se usa
    unwrapErr: (): E => {
      throw new Error(
        'Called unwrapErr on an Ok value. Value: ' +
          (typeof value === 'object' ? JSON.stringify(value) : String(value))
      );
    },
  };
}

/**
 * Crea una instancia de Err (resultado fallido).
 * @param errorValue El error del resultado fallido.
 */
export function err<E, T = never>(errorValue: E): Err<E, T> {
  return {
    _tag: 'Err',
    error: errorValue,
    isOk: function (): this is Ok<T, E> {
      return false;
    },
    isErr: function (): this is Err<E, T> {
      return true;
    },
    map: <U>(_fn: (val: T) => U): Err<E, U> => err<E, U>(errorValue), // fn no se usa
    mapErr: <F>(fn: (errVal: E) => F): Err<F, T> => err(fn(errorValue)),
    andThen: <U, NextE = E>(_fn: (val: T) => Result<U, NextE>): Err<E, NextE> =>
      err<E, NextE>(errorValue), // fn no se usa
    orElse: <NextT = T, F = E>(
      fn: (errVal: E) => Result<NextT, F>
    ): Result<NextT, F> => fn(errorValue),
    unwrap: (): T => {
      // Si el error es una instancia de Error, lánzalo directamente.
      // Si no, envuélvelo en un Error genérico.
      if (errorValue instanceof Error) {
        throw errorValue;
      }
      throw new Error(
        'Called unwrap on an Err value. Error: ' +
          (typeof errorValue === 'object'
            ? JSON.stringify(errorValue)
            : String(errorValue))
      );
    },
    unwrapOr: (defaultValue: T): T => defaultValue,
    unwrapErr: (): E => errorValue,
  };
}

/**
 * Type guard para verificar si un Result es Ok.
 */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T, E> {
  return result._tag === 'Ok';
}

/**
 * Type guard para verificar si un Result es Err.
 */
export function isErr<T, E>(result: Result<T, E>): result is Err<E, T> {
  return result._tag === 'Err';
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Ajuste en `unwrapErr` de `ok` y `unwrap` de `err` para ser más informativos o relanzar el error original si es una instancia de Error.", "justificacion": "Mejora la experiencia de debugging.", "impacto": "Cambios menores en el manejo de errores internos." },
  { "mejora": "Ajuste en el tipado de `mapErr` en `ok` y `map` en `err` para reflejar que la función `fn` no se utiliza y el tipo de error/valor no cambia.", "justificacion": "Mayor precisión en los tipos.", "impacto": "Claridad de la API." },
  { "mejora": "Tipado de `andThen` y `orElse` en `ok` y `err` consistente con `result.type.ts`.", "justificacion": "Consistencia y flexibilidad.", "impacto": "Alineación de tipos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Considerar si los métodos `mapErr` en `ok` y `map` en `err` deberían realmente tomar una función `fn` si no la usan. Podrían simplificarse para no tomar `fn` y ajustar los tipos genéricos correspondientemente, pero la firma actual es común en implementaciones del patrón Either/Result para mantener la simetría."}
]
*/
// RUTA: libs/shared/shresult/src/lib/result.utils.ts
