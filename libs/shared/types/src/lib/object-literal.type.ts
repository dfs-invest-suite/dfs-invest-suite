// libs/shared/types/src/lib/object-literal.type.ts

/**
 * Interfaz para representar un objeto literal simple con claves de tipo string
 * y valores de cualquier tipo. Útil para tipos de datos genéricos o no estructurados,
 * pero debe usarse con precaución para no perder la seguridad de tipos.
 */
export interface ObjectLiteral<V = unknown> {
  [key: string]: V;
}
/* SECCIÓN DE MEJORAS
// Podría parametrizarse el tipo del valor: `export interface ObjectLiteral<V = any> { [key: string]: V; }` para mayor flexibilidad controlada.
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota estratégica 1: Usar este tipo con moderación. Preferir interfaces específicas siempre que la estructura del objeto sea conocida.
]
*/
