// libs/shared/types/src/lib/primitive-types.ts
import { Brand } from './brand.type';

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
 * Identificador único genérico para un Agregado de Dominio.
 * Utiliza Branded Type para mayor seguridad de tipo.
 */
export type AggregateId = Brand<string, 'AggregateId'>;

/**
 * Representa una cadena de texto que es una fecha en formato ISO 8601.
 * Utiliza Branded Type para indicar semánticamente su contenido.
 */
export type IsoDateString = Brand<string, 'IsoDateString'>;
/* SECCIÓN DE MEJORAS
// Para IsoDateString, se podría añadir una función de validación de formato en una librería de utilidades o un Value Object si se necesita más que solo el tipo.
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota estratégica 1: A medida que surjan otros identificadores comunes (ej. LeadId, WhatsAppAccountId), se crearán aquí usando el patrón Brand<string, 'NombreDelId'>.
]
*/
