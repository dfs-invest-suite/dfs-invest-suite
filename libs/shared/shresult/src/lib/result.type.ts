// RUTA: libs/shared/shresult/src/lib/result.type.ts
// TODO: [LIA Legacy - Implementar Result Patrón] - ¡REVISADO!
// Propósito: Define las interfaces y el tipo unión para el patrón Result (Ok/Err).
// Relacionado con Casos de Uso: Manejo explícito de errores en Casos de Uso y Servicios de Dominio.

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
  mapErr<F>(fn: (error: E) => F): Ok<T, F>;
  andThen<U, NextE = E>(fn: (value: T) => Result<U, NextE>): Result<U, NextE>; // NextE para el error del siguiente Result
  orElse<NextT = T, F = E>(
    fn: (error: E) => Result<NextT, F>
  ): Result<T | NextT, F>;
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
  map<U>(fn: (value: T) => U): Err<E, U>;
  mapErr<F>(fn: (error: E) => F): Err<F, T>;
  andThen<U, NextE = E>(fn: (value: T) => Result<U, NextE>): Err<E, NextE>;
  orElse<NextT = T, F = E>(
    fn: (error: E) => Result<NextT, F>
  ): Result<NextT, F>;
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

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Tipado más preciso para `andThen` y `orElse` en `Ok` y `Err`.", "justificacion": "Los tipos genéricos `NextE` y `NextT` permiten que las funciones pasadas a `andThen` y `orElse` puedan cambiar el tipo de error o el tipo de valor exitoso del `Result` devuelto, lo cual es común en el encadenamiento de operaciones.", "impacto": "Mayor flexibilidad y seguridad de tipos al componer operaciones con Result." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
// RUTA: libs/shared/shresult/src/lib/result.type.ts
