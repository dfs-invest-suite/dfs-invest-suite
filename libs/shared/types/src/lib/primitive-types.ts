// libs/shared/types/src/lib/primitive-types.ts
import { Brand } from './brand.type';

/**
 * Identificador único genérico para un Agregado de Dominio.
 * Utiliza Branded Type para mayor seguridad de tipo.
 */
export type AggregateId = Brand<string, 'AggregateId'>;

/**
 * Identificador único para un Tenant.
 * Utiliza Branded Type para mayor seguridad de tipo.
 */
export type TenantId = Brand<string, 'TenantId'>;

/**
 * Identificador único para un Usuario.
 * Utiliza Branded Type para mayor seguridad de tipo.
 */
export type UserId = Brand<string, 'UserId'>;

/**
 * Representa una cadena de texto que es una fecha en formato ISO 8601.
 * Utiliza Branded Type para indicar semánticamente su contenido.
 */
export type IsoDateString = Brand<string, 'IsoDateString'>;

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Validación de Formato para IsoDateString): Para IsoDateString, se podría añadir una función de validación de formato en una librería de utilidades (`shared-utils`) o un Value Object (`IsoDateStringVO` en `core/domain/shared-kernel/value-objects`) si se necesita más que solo el tipo de marca.
  Justificación: Asegurar que las cadenas de fecha realmente cumplan con el formato ISO 8601 antes de ser utilizadas, previniendo errores en parsers de fechas o bases de datos.
  Impacto: Creación de lógica de validación adicional, ya sea como una función utilitaria o un VO completo.
]
[
  Mejora Propuesta 2 (Jerarquía de IDs con Brands): Si se identifica una necesidad de mayor granularidad, se podrían crear subtipos de `AggregateId` usando brands (ej. `type ProductId = Brand<AggregateId, 'ProductId'>`). Actualmente, `TenantId` y `AggregateId` son brands de `string` paralelos. Si un `TenantId` siempre ES un `AggregateId`, se podría definir `type TenantId = Brand<AggregateId, 'TenantId'>` o hacer `TenantId extends AggregateId` (requeriría que `AggregateId` no sea `final` si fuera una clase). La opción actual de brands paralelos sobre `string` es más simple para iniciar.
  Justificación: Potencialmente mayor seguridad y expresividad semántica de los tipos de ID.
  Impacto: Refactorización de cómo se definen y usan los Branded Types para IDs.
]

*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota estratégica 1: A medida que surjan otros identificadores comunes (ej. LeadId, WhatsAppAccountId), se crearán aquí usando el patrón Brand<string, 'NombreDelId'>.
]
*/
