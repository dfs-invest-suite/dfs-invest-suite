// libs/shared/types/src/lib/primitive-types.ts
import { Brand } from './brand.type';

/**
 * @file primitive-types.ts
 * @description Define un conjunto de "Branded Types" y un generador para ellos.
 */

/**
 * @type CreateDomainId<K, T>
 * @template K - El tipo primitivo base (ej. `string`).
 * @template T - Una cadena literal única que actúa como la "marca" del ID.
 * @description Un tipo helper genérico para crear Branded Types para IDs de forma consistente.
 */
type CreateDomainId<K, T extends string> = Brand<K, T>;

// --- IDs de Agregados de Dominio ---
export type AggregateId = CreateDomainId<string, 'AggregateId'>;
export type TenantId = CreateDomainId<string, 'TenantId'>;
export type UserId = CreateDomainId<string, 'UserId'>;
// Añadir futuros IDs de Agregado aquí, ej:
// export type LeadId = CreateDomainId<string, 'LeadId'>;
// export type WhatsAppAccountId = CreateDomainId<string, 'WhatsAppAccountId'>;

// --- IDs de Mensajería (Comandos, Queries, Eventos) ---
export type CommandInstanceId = CreateDomainId<string, 'CommandInstanceId'>;
export type QueryInstanceId = CreateDomainId<string, 'QueryInstanceId'>;
export type DomainEventInstanceId = CreateDomainId<
  string,
  'DomainEventInstanceId'
>;

// --- IDs de Contexto y Trazabilidad ---
export type CorrelationId = CreateDomainId<string, 'CorrelationId'>;

// --- Tipos Primitivos Semánticos ---
/**
 * @type IsoDateString
 * @description Un tipo "brandeado" para representar una cadena de texto que se espera
 * que esté en formato de fecha y hora ISO 8601.
 * La validación del formato real se recomienda a través de `IsoDateStringVO` o schemas Zod.
 */
export type IsoDateString = CreateDomainId<string, 'IsoDateString'>; // Sigue siendo un Brand<string, ...>

// libs/shared/types/src/lib/primitive-types.ts
/* SECCIÓN DE MEJORAS (Actualizada)
[
  Mejora Aplicada: `CorrelationId` consolidado aquí.
]
[
  Mejora Aplicada: Tipos de ID de Mensajería (`CommandInstanceId`, `QueryInstanceId`, `DomainEventInstanceId`) añadidos.
]
[
  Mejora Aplicada Parcialmente: Se añadió el helper `CreateDomainId` para la definición de los IDs.
]
[
  Mejora Crítica Pendiente: Creación de `IsoDateStringVO` en `libs/core/domain/shared-kernel/value-objects/`
                           para validación en runtime del formato ISO 8601.
]
[
  Mejora Mantenida (Discusión de Jerarquía de IDs): Se mantiene el enfoque actual de `Brand<string, 'SpecificId'>`
                                                  y se abordará la compatibilidad con `AggregateId`
                                                  mediante la mejora de `IRepositoryPort` genérico.
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Mantenidas) */
