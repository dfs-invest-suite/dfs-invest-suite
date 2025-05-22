// RUTA: libs/shared/shtypes/src/lib/primitives/core-primitives.ts
import { EnhancedBrand } from '../core/enhanced-brand.type'; // 'type BrandMetadata' para import de tipo

// --- IDs de Sistema y Kernel Compartido ---
export type AggregateId = string;

export type CommandInstanceId = EnhancedBrand<
  string,
  'CommandInstanceId',
  {
    readonly description: 'Unique identifier for a specific command instance.';
    readonly example: 'cmd_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d';
    readonly since: '1.0.0';
  }
>;

export type QueryInstanceId = EnhancedBrand<
  string,
  'QueryInstanceId',
  {
    readonly description: 'Unique identifier for a specific query instance.';
    readonly example: 'qry_b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e';
    readonly since: '1.0.0';
  }
>;

export type DomainEventInstanceId = EnhancedBrand<
  string,
  'DomainEventInstanceId',
  {
    readonly description: 'Unique identifier for a specific domain event instance.';
    readonly example: 'evt_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f';
    readonly since: '1.0.0';
  }
>;

export type IntegrationEventInstanceId = EnhancedBrand<
  string,
  'IntegrationEventInstanceId',
  {
    readonly description: 'Unique identifier for a specific integration event instance.';
    readonly example: 'ievt_d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80';
    readonly since: '1.0.0';
  }
>;

export type CorrelationId = EnhancedBrand<
  string,
  'CorrelationId',
  {
    readonly description: 'Identifier to correlate operations across services, contexts, or a single request lifecycle.';
    readonly example: 'cor_e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091';
    readonly since: '1.0.0';
  }
>;

export type CausationId = EnhancedBrand<
  string,
  'CausationId',
  {
    readonly description: 'Identifier of the operation (command, event, or correlationId) that directly caused the current operation.';
    readonly example: 'cmd_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d';
    readonly since: '1.0.0';
  }
>;

export type SessionId = EnhancedBrand<
  string,
  'SessionId',
  {
    readonly description: 'Unique identifier for a user session or a specific interaction session (e.g., Aiper chat session).';
    readonly example: 'ses_f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8091a2';
    readonly since: '1.0.0';
  }
>;

// --- Tipos Primitivos Semánticos ---
export type IsoDateString = EnhancedBrand<
  string,
  'IsoDateString',
  {
    readonly description: 'A string representing a date and time in ISO 8601 format (UTC or with offset).';
    readonly example: '2023-10-27T10:30:00.000Z';
    readonly validationRules?: readonly string[]; // Mantener opcional para el tipo base BrandMetadata
    readonly since: '1.0.0';
  }
>;

export type EmailString = EnhancedBrand<
  string,
  'EmailString',
  {
    readonly description: 'A string representing a valid email address, typically normalized (e.g., to lowercase).';
    readonly example: 'user@example.com';
    readonly validationRules?: readonly string[];
    readonly since: '1.0.0';
  }
>;

export type PhoneNumberString = EnhancedBrand<
  string,
  'PhoneNumberString',
  {
    readonly description: 'A string representing a phone number, typically normalized to E.164 format (e.g., +5511987654321).';
    readonly example: '+5511987654321';
    readonly validationRules?: readonly string[];
    readonly since: '1.0.0';
  }
>;

export type UrlString = EnhancedBrand<
  string,
  'UrlString',
  {
    readonly description: 'A string representing a valid URL.';
    readonly example: 'https://www.example.com/path?query=value';
    readonly validationRules?: readonly string[];
    readonly since: '1.0.0';
  }
>;

export type JwtString = EnhancedBrand<
  string,
  'JwtString',
  {
    readonly description: 'A string representing a JSON Web Token.';
    readonly example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    readonly validationRules?: readonly string[];
    readonly since: '1.0.0';
  }
>;

export type HexColorString = EnhancedBrand<
  string,
  'HexColorString',
  {
    readonly description: 'A string representing a color in hexadecimal format (e.g., #RRGGBB, #RGB, #RRGGBBAA, #RGBA).';
    readonly example: '#FF5733';
    readonly validationRules?: readonly string[];
    readonly since: '1.0.0';
  }
>;

export type CidString = EnhancedBrand<
  string,
  'CidString',
  {
    readonly description: 'A string representing a Content Identifier (CID) for IPFS.';
    readonly example: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojhGUxXg';
    readonly validationRules?: readonly string[];
    readonly since: '1.0.0';
  }
>;

export type HtmlString = EnhancedBrand<
  string,
  'HtmlString',
  {
    readonly description: 'A string containing HTML content. Requires sanitization if from user input.';
    readonly example: '<p>Hello <strong>World</strong>!</p>';
    readonly since: '1.0.0';
  }
>;

export type MarkdownString = EnhancedBrand<
  string,
  'MarkdownString',
  {
    readonly description: 'A string containing content formatted in Markdown.';
    readonly example: '**Hello** _World_!';
    readonly since: '1.0.0';
  }
>;

export type FilePathString = EnhancedBrand<
  string,
  'FilePathString',
  {
    readonly description: 'A string representing a file system path (local or relative).';
    readonly example: '/usr/local/bin/my_script.sh';
    readonly since: '1.0.0';
  }
>;

export type MimeTypeString = EnhancedBrand<
  string,
  'MimeTypeString',
  {
    readonly description: 'A string representing a MIME type (e.g., "application/json", "image/png").';
    readonly example: 'application/pdf';
    readonly validationRules?: readonly string[];
    readonly since: '1.0.0';
  }
>;

// NOTA: Los IDs específicos de Dominio (TenantId, UserId, LeadId, etc.)
// se definirán y exportarán desde sus respectivas librerías de dominio
// en `libs/shared/shtypes/src/lib/domains/<domain>/<domain>.types.ts`
// y se re-exportarán a través de `libs/shared/shtypes/src/lib/domains/index.ts`
// y finalmente a través de `libs/shared/shtypes/src/index.ts`.
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/primitives/core-primitives.ts
