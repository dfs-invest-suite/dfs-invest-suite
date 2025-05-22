// RUTA: libs/shared/shtypes/src/lib/primitive-types.ts
import { Brand } from '../brand.type';

// Helper local para mantener la consistencia en la creación de Branded IDs
type CreateSystemId<K, T extends string> = Brand<K, T>;

// --- IDs de Sistema y Kernel Compartido ---
export type AggregateId = string; // Tipo base para IDs de Agregados, es un string simple.
// Los IDs específicos de dominio serán Branded Types que extienden esto conceptualmente.

export type CommandInstanceId = CreateSystemId<string, 'CommandInstanceId'>;
export type QueryInstanceId = CreateSystemId<string, 'QueryInstanceId'>;
export type DomainEventInstanceId = CreateSystemId<
  string,
  'DomainEventInstanceId'
>;
export type IntegrationEventInstanceId = CreateSystemId<
  string,
  'IntegrationEventInstanceId'
>;

export type CorrelationId = CreateSystemId<string, 'CorrelationId'>;
export type CausationId = CreateSystemId<string, 'CausationId'>;
export type SessionId = CreateSystemId<string, 'SessionId'>;

// --- Tipos Primitivos Semánticos ---
export type IsoDateString = Brand<string, 'IsoDateString'>;
export type EmailString = Brand<string, 'EmailString'>;
export type PhoneNumberString = Brand<string, 'PhoneNumberString'>;
export type UrlString = Brand<string, 'UrlString'>;
export type JwtString = Brand<string, 'JwtString'>;
export type HexColorString = Brand<string, 'HexColorString'>;
export type CidString = Brand<string, 'CidString'>; // Para IPFS
export type HtmlString = Brand<string, 'HtmlString'>;
export type MarkdownString = Brand<string, 'MarkdownString'>;
export type FilePathString = Brand<string, 'FilePathString'>;
export type MimeTypeString = Brand<string, 'MimeTypeString'>;

// NOTA: Los IDs específicos de Dominio (TenantId, UserId, LeadId, etc.)
// AHORA SE DEFINIRÁN DENTRO DE SUS RESPECTIVAS LIBRERÍAS DE DOMINIO.
// Ejemplo: TenantId se definirá en @dfs-suite/codotenancy/types
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/primitive-types.ts
