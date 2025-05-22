// RUTA: libs/core/application/coapleadsflow/src/lib/ports/file-parser.port.ts
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { ObjectLiteral } from '@dfs-suite/shtypes';

import { LeadImportMappingField } from '../commands/import-leads.command'; // Usar la interfaz definida en el comando

export interface IParsedLeadDataRow extends ObjectLiteral {
  // Las claves serán los 'targetLeadProperty' definidos en LeadImportMappingField
  // Los valores serán strings o el tipo parseado si se hace conversión.
  [key: string]: string | number | boolean | undefined | null;
}

export const FILE_PARSER_PORT_APP_LAYER = Symbol('IFileParserPortAppLayer');

/**
 * Puerto de la capa de aplicación para un servicio que parsea archivos de leads (CSV, Excel).
 */
export interface IFileParserPort {
  /**
   * Parsea un archivo de leads.
   * @param fileReference - Path al archivo o Buffer.
   * @param mimeType - Para identificar el tipo de archivo.
   * @param fieldMappings - Cómo mapear las columnas del archivo a las propiedades del lead.
   * @returns Un Result con un array de objetos, donde cada objeto representa una fila
   *          de datos del lead parseada según los mappings, o un error.
   */
  parseLeadFile(
    fileReference: string | Buffer,
    mimeType: string,
    fieldMappings: LeadImportMappingField[]
  ): Promise<Result<IParsedLeadDataRow[], ExceptionBase>>;
}
// RUTA: libs/core/application/coapleadsflow/src/lib/ports/file-parser.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de IFileParserPort y FILE_PARSER_PORT_APP_LAYER.", "justificacion": "Abstrae la lógica de parseo de archivos para la importación de leads, permitiendo diferentes implementaciones (CSV, Excel) en la capa de infraestructura.", "impacto": "Desacoplamiento y testabilidad para ImportLeadsUseCase." },
{ "mejora": "Definición de IParsedLeadDataRow para el tipo de retorno.", "justificacion": "Clarifica la estructura de datos esperada del parseador.", "impacto": "Tipado."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
