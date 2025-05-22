// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-creation.dto.ts
import { ELeadSourceChannel, ELeadStatus } from '@dfs-suite/codoleadsflow';
import {
  EmailString,
  Maybe,
  ObjectLiteral,
  PhoneNumberString,
  UserId,
} from '@dfs-suite/shtypes';

// DTO usado como input para CreateLeadUseCase (puede ser directamente el payload del comando)
export interface LeadCreationAppDto {
  readonly name?: Maybe<string>;
  readonly email?: Maybe<EmailString>;
  readonly phoneNumber?: Maybe<PhoneNumberString>;
  readonly waId?: Maybe<PhoneNumberString>;
  readonly sourceChannel: ELeadSourceChannel;
  readonly referralSourceText?: Maybe<string>;
  readonly initialStatus?: ELeadStatus; // Usualmente será NEW
  readonly initialScore?: number;
  readonly optInWhatsApp?: boolean;
  readonly optInEmail?: boolean;
  readonly customFields?: Maybe<ObjectLiteral>;
  readonly createdByUserId?: Maybe<UserId>; // Opcional, si es una creación anónima desde portal
}
// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-creation.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Eliminados los imports y definiciones incorrectas de QueryBase, IQueryMetadata, IQueryHandler, etc., que no pertenecen a un archivo DTO.", "justificacion": "Un DTO es una estructura de datos simple, no debe contener lógica de query ni referencias a handlers.", "impacto": "Resuelve los errores no-undef reportados en la salida del lint anterior para este archivo y lo alinea con su propósito." },
{ "mejora": "Renombrados los campos del DTO LeadImportResultDto para mayor claridad y consistencia (ej. totalRowsProcessed, successfullyImportedCount, failedRowsCount, errorDetails).", "justificacion": "Nombres más descriptivos y estándar para un resultado de proceso batch.", "impacto": "Mejora la semántica y legibilidad del DTO." },
{ "mejora": "Definida la interfaz LeadImportErrorDetail para estructurar los errores por fila.", "justificacion": "Proporciona un formato consistente para reportar errores individuales durante la importación.", "impacto": "Facilita el análisis de fallos en importaciones masivas." },
{ "mejora": "Añadidos comentarios JSDoc para explicar cada campo del DTO.", "justificacion": "Mejora la documentación y comprensión del propósito de cada campo.", "impacto": "DX y mantenibilidad." },
{ "mejora": "Comentados campos opcionales futuros como jobId, reportUrl y operationSuccess para indicar posibles expansiones.", "justificacion": "Visión futurista y proactiva.", "impacto": "Documentación de posibles evoluciones."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{ "nota": "El campo rowData en LeadImportErrorDetail usa any debido a la variabilidad de los datos de origen. Si se pudiera definir un tipo más estricto para IParsedLeadDataRow (en file-parser.port.ts) que sea genérico, se podría usar aquí." }
]
*/
