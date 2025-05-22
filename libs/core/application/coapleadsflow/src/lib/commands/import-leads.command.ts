// RUTA: libs/core/application/coapleadsflow/src/lib/commands/import-leads.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import {
  TenantId,
  UserId,
  FilePathString,
  Maybe,
  ObjectLiteral,
} from '@dfs-suite/shtypes';

export interface LeadImportMappingField {
  sourceHeader: string; // Nombre de la columna en el archivo CSV/Excel
  targetLeadProperty: string; // Nombre de la propiedad en LeadEntity (ej. 'name', 'email', 'customFields.campo_x')
  // dataType?: 'string' | 'number' | 'boolean' | 'date'; // Para transformaciones futuras
  // defaultValue?: any;
}

export interface ImportLeadsCommandPayload {
  readonly tenantId: TenantId;
  readonly fileReference: FilePathString | string; // Path al archivo subido o referencia
  readonly originalFileName: string;
  readonly mimeType: string; // Para saber si es CSV, XLSX
  readonly importedByUserId: UserId;
  readonly fieldMappings: LeadImportMappingField[]; // Cómo mapear columnas a campos del lead
  readonly defaultSourceChannel?: Maybe<string>; // Si no se mapea, usar este
  // readonly tagToApply?: Maybe<string>; // Aplicar un tag a todos los leads importados
}

export class ImportLeadsCommand extends CommandBase<ImportLeadsCommandPayload> {
  constructor(payload: ImportLeadsCommandPayload, metadata: ICommandMetadata) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapleadsflow/src/lib/commands/import-leads.command.ts

/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de ImportLeadsCommand.", "justificacion": "Comando para iniciar la importación masiva de leads desde un archivo.", "impacto": "Funcionalidad clave para carga de datos." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
