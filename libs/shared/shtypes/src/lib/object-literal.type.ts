// RUTA: libs/shared/shtypes/src/lib/object-literal.type.ts
// Autor: L.I.A Legacy (IA Asistente)

/**
 * Tipo para representar un objeto literal simple.
 * Si T es un objeto, lo mantiene. Si no, usa la signatura de índice.
 * Esto permite que interfaces sin signatura de índice explícita (como nuestros payloads de evento)
 * sigan siendo compatibles con `TPayload extends ObjectLiteral`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ObjectLiteral<T = any> = T extends object
  ? T
  : { [key: string]: T };

// Definición anterior (más restrictiva):
// export interface ObjectLiteral<V = unknown> {
//   [key: string]: V;
// }
// RUTA: libs/shared/shtypes/src/lib/object-literal.type.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Flexibilizada la definición de `ObjectLiteral` usando un tipo condicional.", "justificacion": "Permite que interfaces simples sin una signatura de índice explícita (como `TenantActivatedEventPayload { readonly tenantId: TenantId; }`) cumplan la restricción `extends ObjectLiteral`. Esto es menos restrictivo que requerir `[key: string]: V;` en todos los payloads.", "impacto": "Debería resolver los errores TS2344 sobre payloads de evento no conformes con `ObjectLiteral`." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
