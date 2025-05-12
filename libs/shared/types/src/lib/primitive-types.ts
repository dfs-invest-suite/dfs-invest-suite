// libs/shared/types/src/lib/primitive-types.ts
import { Brand } from './brand.type';

/**
 * Identificador único genérico para un Agregado de Dominio.
 */
export type AggregateId = Brand<string, 'AggregateId'>;

/**
 * Identificador único específico para un Tenant.
 */
export type TenantId = Brand<string, 'TenantId'>;

/**
 * Identificador único específico para un Usuario.
 */
export type UserId = Brand<string, 'UserId'>;

/**
 * Identificador único para correlacionar logs y trazas.
 */
export type CorrelationId = Brand<string, 'CorrelationId'>;


/**
 * Representa una cadena de texto que se garantiza (por convención o validación)
 * que está en formato ISO 8601 (ej. "2023-10-27T10:30:00.000Z").
 */
export type IsoDateString = Brand<string, 'IsoDateString'>;

/* SECCIÓN DE MEJORAS FUTURAS
// (Mismas que antes, centradas en validación de IsoDateString y jerarquía de IDs)
*/
// libs/shared/types/src/lib/primitive-types.ts

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Validación de Formato para IsoDateString en un Value Object):
    Actualmente, `IsoDateString` es solo una marca de tipo. Para una mayor robustez, se podría crear un `IsoDateStringVO` en `libs/core/domain/shared-kernel/value-objects/` que valide activamente el formato ISO 8601 en su construcción.
    Justificación: Asegura que cualquier `IsoDateString` en el dominio no solo esté marcada como tal, sino que realmente cumpla con el formato, previniendo errores en serialización, deserialización o interacciones con bases de datos.
    Impacto: Creación de un nuevo Value Object. Las entidades y DTOs que usen fechas como string necesitarían usar este VO o asegurar la conversión/validación en los bordes.
]
[
  Mejora Propuesta 2 (Tipos de ID Específicos por Agregado):
    En lugar de solo `TenantId` y `UserId` como brands de `string`, si se desea una distinción aún más fuerte y evitar cualquier posibilidad de asignar un `TenantId` donde se espera un `AggregateId` genérico (o viceversa, aunque el problema suele ser al revés), se podría considerar que `TenantId` y `UserId` *extiendan* o sean *alias con refinamiento* de `AggregateId` si son IDs de agregados. O, mantenerlos como brands de `string` separados y manejar la conversión/casting en los puntos donde se interactúa con interfaces genéricas que esperan `AggregateId`. La decisión actual es mantenerlos como brands de `string` separados para máxima distinción semántica y manejar la compatibilidad con casts explícitos (`as unknown as AggregateId`) cuando un ID específico debe pasarse a una función que espera el `AggregateId` genérico.
    Justificación: Busca el balance entre seguridad de tipos extrema y pragmatismo en la implementación de interfaces genéricas.
    Impacto: Si se cambia, podría requerir ajustes en cómo se definen los IDs en las entidades y cómo se usan en los repositorios o servicios genéricos.
]
[
  Mejora Propuesta 3 (Generador de Tipos de ID):
    Si el número de IDs específicos (como TenantId, UserId, LeadId, etc.) crece mucho, se podría considerar una función generadora de tipos de Brand para IDs para reducir la repetición:
    `type CreateIdType<S extends string, B extends string> = Brand<S, B>;`
    `export type TenantId = CreateIdType<string, 'TenantId'>;`
    Justificación: Mínima reducción de boilerplate, principalmente estético.
    Impacto: Prácticamente nulo, solo un cambio en la forma de definir los tipos.
]

*/

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
