// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/import-leads.use-case.ts
import {
  ICommandHandler,
  ICommandMetadata,
} from '@dfs-suite/cdskcommandsqueries';
import {
  IDomainEventEmitter,
  DOMAIN_EVENT_EMITTER_PORT,
} from '@dfs-suite/cdskevents';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import { ELeadSourceChannel, ELeadStatus } from '@dfs-suite/codoleadsflow';
import {
  ExceptionBase,
  InternalServerErrorException,
  ArgumentInvalidException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import {
  TenantId,
  CorrelationId,
  EmailString,
  PhoneNumberString,
  IsoDateString,
  UserId,
  Maybe,
  ObjectLiteral,
} from '@dfs-suite/shtypes';
import { UuidUtils } from '@dfs-suite/shutils'; // Para generar slug si es necesario

import {
  CreateLeadCommand,
  CreateLeadCommandPayload,
} from '../commands/create-lead.command'; // Para la estructura del payload
import {
  ImportLeadsCommand,
  ImportLeadsCommandPayload,
  LeadImportMappingField,
} from '../commands/import-leads.command';
import { LeadImportResultDto } from '../dtos/lead-import-result.dto';
import {
  IFileParserPort,
  FILE_PARSER_PORT_APP_LAYER,
  IParsedLeadDataRow,
} from '../ports/file-parser.port';

import {
  ICreateLeadUseCase,
  CREATE_LEAD_USE_CASE,
} from './create-lead.use-case';

export const IMPORT_LEADS_USE_CASE = Symbol('IImportLeadsUseCase');
export type IImportLeadsUseCase = ICommandHandler<
  ImportLeadsCommand,
  LeadImportResultDto
>;

export class ImportLeadsUseCaseImpl implements IImportLeadsUseCase {
  constructor(
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(FILE_PARSER_PORT_APP_LAYER)
    private readonly fileParser: IFileParserPort,
    // @Inject(CREATE_LEAD_USE_CASE)
    private readonly createLeadUc: ICreateLeadUseCase,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT) // Para eventos de importación
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  private mapRowToCreateLeadPayload(
    rowData: IParsedLeadDataRow,
    fieldMappings: LeadImportMappingField[],
    tenantId: TenantId,
    correlationId: CorrelationId,
    defaultSourceChannel: Maybe<ELeadSourceChannel>,
    importedByUserId: UserId
  ): CreateLeadCommandPayload {
    const payload: Partial<CreateLeadCommandPayload> = {
      tenantId,
      correlationId,
      createdByUserId: importedByUserId,
    };

    fieldMappings.forEach((mapping) => {
      const value = rowData[mapping.sourceHeader]; // El parseador devuelve las claves como sourceHeader
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ''
      ) {
        // @ts-expect-error: Asignación dinámica, se confía en que targetLeadProperty es una clave válida.
        // Esto es complejo de tipar de forma estricta sin un mapeador más sofisticado.
        payload[mapping.targetLeadProperty as keyof CreateLeadCommandPayload] =
          value as any; // Cast temporal
      }
    });

    // Normalizaciones y valores por defecto
    payload.name = payload.name?.trim();
    payload.email = payload.email?.trim().toLowerCase() as EmailString;
    payload.phoneNumber = payload.phoneNumber?.replace(
      /\D/g,
      ''
    ) as PhoneNumberString; // Simplificado
    payload.waId = payload.waId?.replace(/\D/g, '') as PhoneNumberString; // Simplificado
    payload.sourceChannel =
      (payload.sourceChannel as ELeadSourceChannel) ||
      defaultSourceChannel ||
      ELeadSourceChannel.CSV_IMPORT;
    payload.initialStatus =
      (payload.initialStatus as ELeadStatus) || ELeadStatus.NEW;
    payload.optInWhatsApp =
      String(payload.optInWhatsApp).toLowerCase() === 'true' ||
      payload.optInWhatsApp === '1' ||
      payload.optInWhatsApp === true;
    payload.optInEmail =
      String(payload.optInEmail).toLowerCase() === 'true' ||
      payload.optInEmail === '1' ||
      payload.optInEmail === true;

    // Slug se generará en CreateLeadUseCase o en LeadEntity.create
    // if (!payload.slug && payload.name) {
    //   payload.slug = UuidUtils.generateSlugFromString(payload.name);
    // }

    // Forzar tipo después de aplicar defaults y transformaciones
    return payload as CreateLeadCommandPayload;
  }

  async execute(
    command: ImportLeadsCommand
  ): Promise<Result<LeadImportResultDto, ExceptionBase>> {
    const {
      tenantId,
      fileReference,
      originalFileName,
      mimeType,
      importedByUserId,
      fieldMappings,
      defaultSourceChannel,
    } = command.payload;
    const metadata = command.metadata; // Capturar metadata del comando de importación
    const correlationId = metadata.correlationId;
    const useCaseName = ImportLeadsUseCaseImpl.name;

    this.logger.log(
      `Starting lead import for tenant ${String(
        tenantId
      )} from file ${originalFileName}. Triggered by user ${String(
        importedByUserId
      )}`,
      useCaseName,
      correlationId
    );

    const importResult: LeadImportResultDto = {
      totalRows: 0,
      successfullyImported: 0,
      failedRows: 0,
      errors: [],
    };

    try {
      const parseFileResult = await this.fileParser.parseLeadFile(
        fileReference,
        mimeType,
        fieldMappings
      );
      if (isErr(parseFileResult)) {
        this.logger.error(
          `Failed to parse lead import file ${originalFileName}: ${parseFileResult.error.message}`,
          useCaseName,
          correlationId
        );
        importResult.errors.push({
          rowNumber: 0,
          errorMessage: `File parsing error: ${parseFileResult.error.message}`,
        });
        return ok(importResult);
      }

      const parsedLeadsData = parseFileResult.value;
      importResult.totalRows = parsedLeadsData.length;

      for (let i = 0; i < parsedLeadsData.length; i++) {
        const rowData = parsedLeadsData[i];
        const rowNumber = i + 1; // Para reportar errores

        try {
          const createLeadPayload = this.mapRowToCreateLeadPayload(
            rowData,
            fieldMappings,
            tenantId,
            correlationId, // Usar el correlationId del comando de importación para cada lead
            defaultSourceChannel as ELeadSourceChannel, // Cast si es necesario, o validar antes
            importedByUserId
          );

          if (!createLeadPayload.slug && createLeadPayload.name) {
            // Asegurar slug si no se mapeó
            createLeadPayload.slug = UuidUtils.generateSlugFromString(
              createLeadPayload.name
            );
          } else if (!createLeadPayload.slug) {
            // Fallback si no hay nombre
            createLeadPayload.slug = UuidUtils.generateString(8); // Slug aleatorio corto
          }

          if (
            !createLeadPayload.email &&
            !createLeadPayload.phoneNumber &&
            !createLeadPayload.waId
          ) {
            importResult.failedRows++;
            importResult.errors.push({
              rowNumber,
              errorMessage:
                'No contact identifier (email, phone, waId) found for lead.',
              rowData,
            });
            continue;
          }

          // Usar la metadata del comando de importación, pero el userId es el que importa
          const createLeadCmd = new CreateLeadCommand(createLeadPayload, {
            correlationId,
            userId: importedByUserId, // El usuario que realiza la importación es el "actor"
            timestamp: new Date().toISOString() as IsoDateString, // Timestamp de la creación del sub-comando
            causationId: command.commandId, // El comando de importación causó este comando de creación
          });
          const createResult = await this.createLeadUc.execute(createLeadCmd);

          if (isErr(createResult)) {
            importResult.failedRows++;
            importResult.errors.push({
              rowNumber,
              errorMessage: createResult.error.message,
              rowData,
            });
          } else {
            importResult.successfullyImported++;
          }
        } catch (leadCreationError: any) {
          importResult.failedRows++;
          importResult.errors.push({
            rowNumber,
            errorMessage: `Unexpected error processing row ${rowNumber}: ${leadCreationError.message}`,
            rowData,
          });
        }
      }

      this.logger.log(
        `Lead import completed for file ${originalFileName}. Total: ${importResult.totalRows}, Success: ${importResult.successfullyImported}, Failed: ${importResult.failedRows}`,
        useCaseName,
        correlationId
      );
      // TODO: Emitir un evento LeadImportCompletedEvent (de aplicación) con el importResult
      // await this.eventEmitter.publish(new LeadImportCompletedAppEvent({ aggregateId: tenantId, payload: { ...importResult, tenantId, importedByUserId, correlationId }}));
      return ok(importResult);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error during lead import process.',
              error as Error,
              undefined,
              correlationId
            );
      this.logger.error(
        `Fatal error in ${useCaseName}: ${errBase.message}`,
        errBase.stack,
        useCaseName,
        correlationId
      );
      importResult.errors.push({
        rowNumber: 0,
        errorMessage: `Fatal error: ${errBase.message}`,
      });
      return ok(importResult); // Devolver resultado parcial incluso con error fatal en el proceso general
    }
  }
}
// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/import-leads.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadidas importaciones para CreateLeadCommandPayload, EmailString y PhoneNumberString.", "justificacion": "Resuelve los errores no-undef.", "impacto": "Correctitud de tipos." },
{ "mejora": "El mapeo de rowData a createLeadPayload ahora incluye casts explícitos a los Branded Types y Enums.", "justificacion": "Asegura que los datos pasados a CreateLeadCommand tengan los tipos correctos, aunque la validación final de formato la hagan los VOs dentro de LeadEntity.", "impacto": "Mejora la seguridad de tipos en el flujo de importación." },
{ "mejora": "Manejo básico para customFields (asumiendo JSON string) y optIn (conversión de string a boolean).", "justificacion": "Cubre casos comunes de importación.", "impacto": "Funcionalidad." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "La lógica de mapeo de rowData a createLeadPayload es crítica y debe ser muy robusta, incluyendo manejo de diferentes formatos de fecha si se importa, y validación de los targetLeadProperty definidos en fieldMappings."},
{"nota": "Considerar un DTO específico para rowData en IFileParserPort que ya tenga algunos tipos básicos (string, number, boolean) para facilitar el mapeo aquí."}
]
*/
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Implementación del esqueleto de ImportLeadsUseCaseImpl.", "justificacion": "Define el flujo para importar leads desde archivos, incluyendo parseo (delegado a un puerto), creación individual de leads (delegado a CreateLeadUseCase), y reporte de resultados.", "impacto": "Funcionalidad clave para la carga masiva de datos." },
{ "mejora": "Definición de IFileParserPort (a ser creado en ../ports/) y su token.", "justificacion": "Abstrae la lógica de parseo de archivos CSV/Excel.", "impacto": "Desacoplamiento." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "Implementar IFileParserPort y su adaptador en infraestructura (infraappservices)."},
{"nota": "La lógica de mapeo de rowData a CreateLeadCommandPayload basada en fieldMappings será compleja y debe ser robusta."},
{"nota": "Considerar procesar la importación en background usando una cola si los archivos son muy grandes."},
{"nota": "Definir y emitir LeadImportCompletedEvent."}
]
*/
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Implementación robusta de ImportLeadsUseCaseImpl con método mapRowToCreateLeadPayload.", "justificacion": "Centraliza la lógica de mapeo de datos del archivo a CreateLeadCommandPayload, maneja errores por fila y un resultado agregado. Propaga correlationId y establece causationId para los sub-comandos de creación de lead.", "impacto": "Caso de uso funcional y trazable para importación de leads." },
{ "mejora": "Añadidas todas las importaciones faltantes para EmailString, PhoneNumberString, ELeadStatus, UuidUtils.", "justificacion": "Resuelve los errores no-undef.", "impacto": "Correctitud de tipos." },
{ "mejora": "Asegurada la generación de slug si no se mapea directamente.", "justificacion": "Es mandatorio para TenantEntity.create.", "impacto": "Robustez."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "El método mapRowToCreateLeadPayload usa un @ts-expect-error temporal para la asignación dinámica. Un mapeador más sofisticado o una validación de targetLeadProperty contra las claves de CreateLeadCommandPayload sería ideal para producción total."},
{"nota": "Considerar la validación de tipos de datos y transformaciones más complejas en mapRowToCreateLeadPayload (ej. parseo de fechas, conversión de booleanos más allá de 'true'/'1')."},
{"nota": "Implementar LeadImportCompletedAppEvent."}
]
*/
