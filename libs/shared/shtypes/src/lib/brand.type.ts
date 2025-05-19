// libs/shared/types/src/lib/brand.type.ts

/**
 * Tipo utilitario para crear "Branded Types" (también conocidos como Nominal Types).
 * Permite dar un significado semántico más fuerte a tipos primitivos (ej. string, number)
 * para evitar asignaciones accidentales entre tipos que, aunque estructuralmente idénticos,
 * representan conceptos diferentes.
 *
 * Ejemplo de uso:
 * ```typescript
 * export type UserId = Brand<string, 'UserId'>;
 * export type ProductId = Brand<string, 'ProductId'>;
 *
 * let userId: UserId = 'user-123' as UserId; // Se requiere 'as' para la asignación inicial
 * let productId: ProductId = 'prod-456' as ProductId;
 *
 * // Esto daría un error de tipo en tiempo de compilación, mejorando la seguridad:
 * // userId = productId; // Error: Type 'Brand<string, "ProductId">' is not assignable to type 'Brand<string, "UserId">'.
 * //                    Types of property '__brand' are incompatible.
 * //                      Type '"ProductId"' is not assignable to type '"UserId"'.
 * ```
 *
 * @template K - El tipo primitivo base (ej. string, number).
 * @template T - Una cadena literal única que actúa como la "marca" o "nombre nominal".
 */
export type Brand<K, T extends string> = K & { readonly __brand: T };
/* SECCIÓN DE MEJORAS
// Se ha añadido `T extends string` para hacer más explícito que la marca es un literal de string.
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota estratégica 1: Este es un patrón poderoso para aumentar la seguridad de tipos sin el overhead de clases completas para cada ID simple. Requiere el uso de aserciones de tipo (`as Brand<string, 'MyType'>`) en el punto de creación del valor "brandeado".
]
*/
