// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/assign-lead.use-case.ts
import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
import { IDomainEventEmitter } from '@dfs-suite/cdskevents';
import { ILoggerPort } from '@dfs-suite/cdskports';
import { ILeadRepository } from '@dfs-suite/codoleadsflow';
import {
  IUserRepository,
  UserEntity /* <<< IMPORTADO UserEntity */,
} from '@dfs-suite/codousersroles';
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
  ExceptionBase,
  InternalServerErrorException,
  NotFoundException,
} from '@dfs-suite/sherrors';
import { Result, err, isErr, ok } from '@dfs-suite/shresult';
import { Maybe, UserId } from '@dfs-suite/shtypes';

import { AssignLeadCommand } from '../commands/assign-lead.command';
import { LeadDetailsDto } from '../dtos';

export const ASSIGN_LEAD_USE_CASE = Symbol('IAssignLeadUseCase');
export type IAssignLeadUseCase = ICommandHandler<
  AssignLeadCommand,
  LeadDetailsDto
>;

export class AssignLeadUseCaseImpl implements IAssignLeadUseCase {
  constructor(
    private readonly logger: ILoggerPort,
    private readonly leadRepo: ILeadRepository,
    private readonly userRepo: IUserRepository,
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: AssignLeadCommand
  ): Promise<Result<LeadDetailsDto, ExceptionBase | NotFoundException>> {
    const {
      tenantId,
      leadId,
      targetUserId,
      assignedByUserId,
      assignmentMethod,
    } = command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = AssignLeadUseCaseImpl.name;

    this.logger.log(
      `Attempting to assign lead ${String(leadId)} for tenant ${String(
        tenantId
      )} to user ${String(targetUserId || 'AUTO')}. Assigned by ${String(
        assignedByUserId
      )} via ${assignmentMethod || 'N/A'}`,
      useCaseName,
      correlationId
    );

    try {
      const leadResult = await this.leadRepo.findOneById(leadId);
      if (isErr(leadResult)) return err(leadResult.error);
      if (!leadResult.value) {
        return err(
          new NotFoundException(
            `Lead ${String(leadId)} not found for assignment.`,
            undefined,
            { leadId },
            correlationId
          )
        );
      }
      const leadEntity = leadResult.value;

      let finalTargetUserId: Maybe<UserId> = targetUserId;
      let userForDto: Maybe<UserEntity> = undefined;

      if (targetUserId) {
        const userResult = await this.userRepo.findOneById(targetUserId); // Asume que userRepo opera en contexto de tenant si es necesario o es global
        if (
          isErr(userResult) ||
          !userResult.value ||
          !userResult.value.isActive
        ) {
          return err(
            new ArgumentInvalidException(
              `Target user ${String(
                targetUserId
              )} not found or not active for assignment.`,
              undefined,
              { targetUserId },
              correlationId
            )
          );
        }
        userForDto = userResult.value;
      } else {
        if (
          assignmentMethod === 'ROUND_ROBIN' ||
          assignmentMethod === 'AI_SUGGESTION'
        ) {
          return err(
            new ArgumentNotProvidedException(
              'Automatic assignment (targetUserId=null) via roleta/AI not yet implemented.',
              undefined,
              {},
              correlationId
            )
          );
        } else {
          finalTargetUserId = null;
        }
      }

      leadEntity.assignTo(finalTargetUserId, {
        tenantId,
        correlationId,
        assignedBy: assignedByUserId,
      });

      const saveResult = await this.leadRepo.update(leadEntity);
      if (isErr(saveResult)) return err(saveResult.error);

      await this.eventEmitter.publishAll(leadEntity.getAndClearDomainEvents());

      this.logger.log(
        `Lead ${String(leadId)} assigned to ${String(
          finalTargetUserId || 'UNASSIGNED'
        )} successfully.`,
        useCaseName,
        correlationId
      );

      const dto: LeadDetailsDto = {
        id: leadEntity.id,
        tenantId: tenantId,
        name: leadEntity.props.name,
        email: leadEntity.props.email,
        phoneNumber: leadEntity.props.phoneNumber,
        waId: leadEntity.props.waId,
        status: leadEntity.status.value,
        score: leadEntity.score.value,
        sourceChannel: leadEntity.props.sourceChannel?.value,
        referralSourceText: leadEntity.props.referralSourceText,
        assignedToUser: userForDto
          ? {
              id: userForDto.id,
              name: userForDto.name,
              email: userForDto.email,
            }
          : undefined,
        lastInteractionAt: leadEntity.props.lastInteractionAt,
        optInWhatsApp: leadEntity.props.optInWhatsApp || false,
        optInEmail: leadEntity.props.optInEmail || false,
        tags: leadEntity.props.tags,
        customFields: leadEntity.props.customFields,
        createdAt: leadEntity.createdAt,
        updatedAt: leadEntity.updatedAt,
        // interactions: undefined, // No se cargan aquí por defecto
      };
      return ok(dto);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error assigning lead.',
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
// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/assign-lead.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadidas importaciones para ArgumentNotProvidedException y ArgumentInvalidException desde @dfs-suite/sherrors, y CommandBase desde @dfs-suite/cdskcommandsqueries.", "justificacion": "Resuelve el error no-undef para ArgumentNotProvidedException (y el potencial para ArgumentInvalidException). Asegura que el comando base esté disponible aunque no se use directamente aquí.", "impacto": "Correctitud de tipos." },
{ "mejora": "Añadidos imports de CorrelationId y EmailString a @dfs-suite/shtypes para el mapeo del DTO (placeholder).", "justificacion": "Preparación para un mapeo más completo.", "impacto": "Completitud de tipos."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Completar el mapeo de LeadEntity a LeadDetailsDto, incluyendo sourceChannel, optIns, tags, customFields, lastInteractionAt."} ] */
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadida importación de ArgumentNotProvidedException desde @dfs-suite/sherrors y CommandBase desde @dfs-suite/cdskcommandsqueries (aunque AssignLeadCommand ya lo extiende, asegurar que esté disponible para el contexto).", "justificacion": "Resuelve el error no-undef para ArgumentNotProvidedException.", "impacto": "Correctitud." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTWhatsAppTemplateCategory, EWhatsAppTemplateStatus } from '@dfs-suite/codowhatsapp';
import { TemplateSummaryAppDto } from '../dtos/template-management.dtos';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import { ExceptionBase, NotFoundException, InternalServerErrorException } from '@dfs-suite/sherrors'; // <<< ASEGURAR InternalServerErrorException
import { IMessageTemplateRecordRepository, MESSAGE_TEMPLATE_RECORD_REPOSITORY_PORT } from '@dfs-suite/codomessagetemplaterecord';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/assign-lead.use-case.ts
// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/assign-lead.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Esqueleto de AssignLeadUseCaseImpl.", "justificacion": "Orquesta la asignación de leads, incluyendo validación del usuario destino y futura lógica de asignación automática.", "impacto": "Gestión del pipeline." },
{ "mejora": "Interacción con IUserRepository para validar el consultor.", "justificacion": "Asegura que los leads se asignen a usuarios válidos.", "impacto": "Integridad de datos."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "Implementar la lógica de asignación automática ('ROUND_ROBIN', 'AI_SUGGESTION') usando una estrategia o servicio dedicado."},
{"nota": "Validar que el rol del targetUserId sea apropiado para recibir leads."},
{"nota": "Completar el mapeo de LeadEntity a LeadDetailsDto."}
]
*/
