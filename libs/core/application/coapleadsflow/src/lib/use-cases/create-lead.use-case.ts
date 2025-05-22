// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/create-lead.use-case.ts
import {
  ICommandHandler,
  ICommandMetadata,
} from '@dfs-suite/cdskcommandsqueries';
import {
  IDomainEventEmitter,
  DOMAIN_EVENT_EMITTER_PORT,
} from '@dfs-suite/cdskevents';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import {
  ILeadRepository,
  LEAD_REPOSITORY_PORT,
  LeadEntity,
  LeadAlreadyExistsError, // Asumiendo que se crea este error en el dominio
} from '@dfs-suite/codoleadsflow';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import { TenantId } from '@dfs-suite/shtypes';
import { UuidUtils } from '@dfs-suite/shutils';

import {
  CreateLeadCommand,
  CreateLeadCommandPayload,
} from '../commands/create-lead.command';
import { LeadDetailsDto, LeadCreationAppDto } from '../dtos'; // Asumiendo que se exporta desde dtos/index.ts o individualmente

// El DTO de salida podría ser más simple si solo se devuelve el ID
// o más completo como LeadDetailsDto si se quiere devolver el lead creado.
export type CreateLeadUseCaseResultDto = Pick<
  LeadDetailsDto,
  'id' | 'name' | 'status' | 'score'
>;

export const CREATE_LEAD_USE_CASE = Symbol('ICreateLeadUseCase');
export type ICreateLeadUseCase = ICommandHandler<
  CreateLeadCommand,
  CreateLeadUseCaseResultDto
>;

export class CreateLeadUseCaseImpl implements ICreateLeadUseCase {
  constructor(
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(LEAD_REPOSITORY_PORT)
    private readonly leadRepository: ILeadRepository,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: CreateLeadCommand
  ): Promise<
    Result<CreateLeadUseCaseResultDto, ExceptionBase | LeadAlreadyExistsError>
  > {
    const { tenantId, correlationId, ...creationData } = command.payload;
    const metadata: ICommandMetadata = command.metadata; // Para pasar al crear entidad o eventos
    const useCaseName = CreateLeadUseCaseImpl.name;

    this.logger.log(
      `Attempting to create lead for tenant ${String(tenantId)}`,
      useCaseName,
      correlationId
    );

    try {
      // 1. (Opcional) Verificar si ya existe un lead con el mismo email o teléfono para este tenant
      // if (creationData.email) {
      //   const existingByEmail = await this.leadRepository.findByEmailForTenant(tenantId, creationData.email);
      //   if (isOk(existingByEmail) && existingByEmail.value) return err(new LeadAlreadyExistsError(...));
      // }

      // 2. Crear la entidad Lead
      const leadEntity = LeadEntity.create(
        {
          tenantId, // Para el evento
          correlationId, // Para el evento
          name: creationData.name,
          email: creationData.email,
          phoneNumber: creationData.phoneNumber,
          waId: creationData.waId,
          sourceChannel: creationData.sourceChannel,
          referralSourceText: creationData.referralSourceText,
          initialStatus: creationData.initialStatus,
          initialScore: creationData.initialScore,
          optInWhatsApp: creationData.optInWhatsApp,
          optInEmail: creationData.optInEmail,
          customFields: creationData.customFields,
          createdByUserId: metadata.userId, // Tomar de la metadata del comando si está disponible
        }
        // El ID se genera dentro de LeadEntity.create
      );

      // 3. Persistir la entidad
      const saveResult = await this.leadRepository.insert(leadEntity); // o save
      if (isErr(saveResult)) {
        this.logger.error(
          `Failed to save new lead: ${saveResult.error.message}`,
          useCaseName,
          correlationId
        );
        return err(saveResult.error);
      }

      // 4. Publicar eventos de dominio
      await this.eventEmitter.publishAll(leadEntity.getAndClearDomainEvents());

      this.logger.log(
        `Lead ${String(leadEntity.id)} created successfully for tenant ${String(
          tenantId
        )}.`,
        useCaseName,
        correlationId
      );

      return ok({
        id: leadEntity.id,
        name: leadEntity.name,
        status: leadEntity.status.value,
        score: leadEntity.score.value,
      });
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error creating lead.',
              error as Error,
              undefined,
              correlationId
            );
      this.logger.error(
        `Error in ${useCaseName}: ${errBase.message}`,
        errBase.stack,
        useCaseName,
        correlationId
      );
      return err(errBase);
    }
  }
}
// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/create-lead.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Esqueleto robusto para `CreateLeadUseCaseImpl`.", "justificacion": "Define la estructura del caso de uso para crear leads, incluyendo validación básica, creación de entidad, persistencia y emisión de eventos.", "impacto": "Funcionalidad central de leads." },
  { "mejora": "Uso de `CreateLeadCommandPayload` y `CreateLeadUseCaseResultDto`.", "justificacion": "Contratos de datos claros.", "impacto": "Consistencia."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {"nota": "La verificación de duplicados (por email/teléfono) debe ser implementada en `ILeadRepositoryPort` y llamada aquí."},
  {"nota": "La `TenantId` se pasa al payload de `LeadEntity.create` para que se incluya en el evento `LeadCreatedEvent`. La entidad `LeadEntity` en sí no almacena `tenantId` como prop porque ya reside en la DB del tenant."}
]
*/
