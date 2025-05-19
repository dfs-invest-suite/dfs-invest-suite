// libs/shared/result/src/lib/result.type.ts

/**
 * Representa un resultado exitoso, conteniendo un valor del tipo T.
 * @template T - El tipo del valor exitoso.
 * @template E - El tipo del error (usado para compatibilidad en Result).
 */
export interface Ok<T, E = never> {
  readonly _tag: 'Ok';
  readonly value: T;
  isOk(): this is Ok<T, E>;
  isErr(): this is Err<E, T>;
  map<U>(fn: (value: T) => U): Ok<U, E>;
  mapErr<F>(fn: (error: E) => F): Ok<T, F>; // No opera sobre el error, devuelve Ok
  andThen<U, F>(fn: (value: T) => Result<U, F>): Result<U, F>;
  orElse<U, F>(fn: (error: E) => Result<U, F>): Result<T | U, F>; // Devuelve el Ok actual
  unwrap(): T;
  unwrapOr(defaultValue: T): T;
  unwrapErr(): E; // Debería lanzar un error si se llama en Ok
}

/**
 * Representa un resultado fallido, conteniendo un error del tipo E.
 * @template E - El tipo del error.
 * @template T - El tipo del valor exitoso (usado para compatibilidad en Result).
 */
export interface Err<E, T = never> {
  readonly _tag: 'Err';
  readonly error: E;
  isOk(): this is Ok<T, E>;
  isErr(): this is Err<E, T>;
  map<U>(fn: (value: T) => U): Err<E, U>; // No opera sobre el valor, devuelve Err
  mapErr<F>(fn: (error: E) => F): Err<F, T>;
  andThen<U, F>(fn: (value: T) => Result<U, F>): Err<E, F>; // No opera, devuelve el Err actual
  orElse<U, F>(fn: (error: E) => Result<U, F>): Result<U, F>;
  unwrap(): T; // Debería lanzar un error si se llama en Err
  unwrapOr(defaultValue: T): T;
  unwrapErr(): E;
}

/**
 * Tipo Result que puede ser un éxito (Ok) o un fallo (Err).
 * Facilita el manejo explícito de errores sin usar excepciones try/catch para la lógica de negocio.
 * @template T - El tipo del valor en caso de éxito.
 * @template E - El tipo del error en caso de fallo.
 */
export type Result<T, E> = Ok<T, E> | Err<E, T>;
