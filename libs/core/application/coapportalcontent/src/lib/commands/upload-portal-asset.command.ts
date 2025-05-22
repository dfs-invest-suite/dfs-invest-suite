// RUTA: libs/core/application/coapportalcontent/src/lib/commands/upload-portal-asset.command.ts
import { Readable } from 'node:stream'; // <<< ASEGURAR ESTE IMPORT

import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import {
  AggregateId,
  Maybe,
  MimeTypeString,
  TenantId,
  UserId,
} from '@dfs-suite/shtypes';

export interface UploadPortalAssetCommandPayload {
  readonly tenantId: TenantId;
  readonly uploadedByUserId: UserId;
  readonly fileName: string;
  readonly mimeType: MimeTypeString;
  readonly fileSizeInBytes: number;
  readonly fileBufferOrStream: Buffer | Readable; // <<< ASEGURAR USO DE Readable
  readonly assetType: string;
  readonly description?: Maybe<string>;
  readonly relatedEntityId?: Maybe<AggregateId>;
}

export class UploadPortalAssetCommand extends CommandBase<UploadPortalAssetCommandPayload> {
  constructor(
    payload: UploadPortalAssetCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapportalcontent/src/lib/commands/upload-portal-asset.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Reemplazado `NodeJS.ReadableStream` por `Readable` y añadido `import { Readable } from 'node:stream';`.", "justificacion": "Resuelve el error `no-undef` para `NodeJS`. `Readable` es el tipo correcto para streams en Node.js.", "impacto": "El archivo es ahora sintácticamente correcto." },
  { "mejora": "Añadidas importaciones faltantes (`AggregateId`, `UrlString`, `MimeTypeString`, `CidString`) y tipado campos del payload.", "justificacion": "Completa las definiciones de tipo.", "impacto": "Mayor robustez."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Reemplazado `NodeJS.ReadableStream` por `Readable` y añadido `import { Readable } from 'node:stream';`.", "justificacion": "Resuelve el error `no-undef` para `NodeJS`.", "impacto": "El archivo es sintácticamente correcto." },
  { "mejora": "Añadidas importaciones faltantes (`AggregateId`, `UrlString`, `MimeTypeString`, `CidString`) y tipado campos del payload.", "justificacion": "Completa las definiciones de tipo.", "impacto": "Mayor robustez."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
// RUTA: libs/core/application/coapportalcontent/src/lib/commands/upload-portal-asset.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Reemplazado `NodeJS.ReadableStream` por `Readable` y añadido el import `import { Readable } from 'node:stream';`.", "justificacion": "Resuelve el error `no-undef` para `NodeJS`. `Readable` es el tipo correcto para streams en Node.js.", "impacto": "El archivo es ahora sintácticamente correcto." },
  { "mejora": "Asegurado que `UploadPortalAssetCommand` extienda `CommandBase` con el tipo de payload correcto.", "justificacion": "Consistencia y correctitud de tipos.", "impacto": "Clase de comando bien definida."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
