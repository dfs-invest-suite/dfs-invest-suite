// libs/shared/result/src/lib/result.utils.ts
import { Ok, Err, Result } from './result.type';

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
    map: <U>(fn: (val: T) => U) => ok(fn(value)),
    mapErr: <F>() => ok<T, F>(value),
    andThen: <U, F>(fn: (val: T) => Result<U, F>) => fn(value),
    orElse: <U, F>() => ok<T | U, F>(value),
    unwrap: () => value,
    unwrapOr: () => value,
    unwrapErr: () => {
      throw new Error(
        'Called unwrapErr on an Ok value. Value: ' + JSON.stringify(value)
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
    map: <U>() => err<E, U>(errorValue),
    mapErr: <F>(fn: (errVal: E) => F) => err(fn(errorValue)),
    andThen: <F>() => err<E, F>(errorValue),
    orElse: <U, F>(fn: (errVal: E) => Result<U, F>) => fn(errorValue),
    unwrap: () => {
      throw errorValue instanceof Error
        ? errorValue
        : new Error(
            'Called unwrap on an Err value. Error: ' +
              JSON.stringify(errorValue)
          );
    },
    unwrapOr: (defaultValue: T) => defaultValue,
    unwrapErr: () => errorValue,
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
