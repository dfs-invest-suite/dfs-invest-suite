// libs/shared/types/src/lib/maybe.type.ts

/**
 * Tipo utilitario para representar un valor que podría ser del tipo T,
 * o bien `null` o `undefined`. Útil para indicar opcionalidad
 * o la ausencia de un valor de una manera explícita.
 *
 * @template T - El tipo del valor si está presente.
 */
export type Maybe<T> = T | null | undefined;
/* SECCIÓN DE MEJORAS
// No se prevén mejoras directas para este tipo simple.
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota estratégica 1: Este tipo es fundamental para la claridad en las interfaces y tipos de retorno, evitando ambigüedades sobre si un valor puede ser nulo/indefinido.
]
*/
