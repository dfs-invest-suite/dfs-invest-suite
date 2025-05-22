// RUTA: libs/core/application/coapleadsflow/src/lib/queries/list-leads.query.ts
import {
  IQueryHandler,
  IQueryMetadata,
  OrderBy,
  PaginatedQueryBase,
} from '@dfs-suite/cdskcommandsqueries';
import { ILoggerPort } from '@dfs-suite/cdskports';
import { ILeadRepository } from '@dfs-suite/codoleadsflow';
import { IUserRepository } from '@dfs-suite/codousersroles';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import {
  Result,
  err,
  isErr,
  isOk /* <<< ASEGURAR isOk */,
  ok,
} from '@dfs-suite/shresult';
import {
  IPaginated,
  IPaginatedQueryParams,
  Maybe,
  TenantId,
  UserId,
} from '@dfs-suite/shtypes';

import { LeadFilterAppDto } from '../dtos/lead-filter.dto';
import { LeadSummaryDto } from '../dtos/lead-summary.dto';

export interface ListLeadsQueryPayload {
  tenantId: TenantId;
  filters?: Maybe<LeadFilterAppDto>;
}
export type LeadSortableFields =
  | 'name'
  | 'status'
  | 'score'
  | 'lastInteractionAt'
  | 'createdAt'
  | 'updatedAt'
  | 'assignedToUserName';
export class ListLeadsQuery extends PaginatedQueryBase<
  LeadSummaryDto,
  LeadSortableFields
> {
  public readonly payload: ListLeadsQueryPayload;
  constructor(
    payload: ListLeadsQueryPayload,
    pagination?: Partial<
      IPaginatedQueryParams & { orderBy?: OrderBy<LeadSortableFields> }
    >,
    metadata?: Partial<IQueryMetadata>
  ) {
    super(pagination, metadata);
    this.payload = payload;
  }
}

export const LIST_LEADS_QUERY_HANDLER = Symbol('IListLeadsQueryHandler');
export type IListLeadsQueryHandler = IQueryHandler<
  ListLeadsQuery,
  IPaginated<LeadSummaryDto>
>;

export class ListLeadsQueryHandlerImpl implements IListLeadsQueryHandler {
  constructor(
    private readonly logger: ILoggerPort,
    private readonly leadRepo: ILeadRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(
    query: ListLeadsQuery
  ): Promise<Result<IPaginated<LeadSummaryDto>, ExceptionBase>> {
    const { tenantId, filters } = query.payload;
    const correlationId = query.metadata.correlationId;
    const useCaseName = ListLeadsQueryHandlerImpl.name;

    this.logger.log(
      `Listing leads for tenant ${String(
        tenantId
      )} with filters: ${JSON.stringify(filters || {})}`,
      useCaseName,
      correlationId
    );
    try {
      const paginatedEntitiesResult = await this.leadRepo.findAllPaginated(
        {
          page: query.page,
          limit: query.limit,
          offset: query.offset,
          orderBy: query.orderBy,
        },
        filters || {} // Pasar un objeto vacío si los filtros son undefined
      );
      if (isErr(paginatedEntitiesResult))
        return err(paginatedEntitiesResult.error);
      const paginatedEntities = paginatedEntitiesResult.value;

      const assignedUserIds = paginatedEntities.data
        .map((lead) => lead.props.assignedToUserId)
        .filter(
          (userId) => userId !== null && userId !== undefined
        ) as UserId[];

      const uniqueUserIds = [...new Set(assignedUserIds)];
      const userMap = new Map<UserId, string>();

      if (uniqueUserIds.length > 0) {
        // Considerar un método findManyByIds en IUserRepository para eficiencia
        for (const userId of uniqueUserIds) {
          const userResult = await this.userRepo.findOneById(userId);
          if (isOk(userResult) && userResult.value) {
            // <<< Usa isOk
            userMap.set(userId, userResult.value.name);
          }
        }
      }

      const dtos: LeadSummaryDto[] = paginatedEntities.data.map((entity) => ({
        id: entity.id,
        tenantId: tenantId,
        name: entity.props.name,
        primaryContact:
          entity.props.email || entity.props.phoneNumber || entity.props.waId,
        status: entity.props.status.value,
        score: entity.props.score.value,
        sourceChannel: entity.props.sourceChannel?.value,
        assignedToUserName: entity.props.assignedToUserId
          ? userMap.get(entity.props.assignedToUserId)
          : undefined,
        lastInteractionAt: entity.props.lastInteractionAt,
        updatedAt: entity.updatedAt,
        createdAt: entity.createdAt, // Añadido para consistencia y posible ordenación
      }));
      const paginatedDto: IPaginated<LeadSummaryDto> = {
        data: dtos,
        count: paginatedEntities.count,
        limit: paginatedEntities.limit,
        page: paginatedEntities.page,
        totalPages: paginatedEntities.totalPages,
      };
      return ok(paginatedDto);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error listing leads.',
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
// RUTA: libs/core/application/coapleadsflow/src/lib/queries/list-leads.query.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Implementación de ListLeadsQuery y ListLeadsQueryHandlerImpl.", "justificacion": "Permite listar leads con paginación, filtros (vía LeadFilterAppDto) y ordenación. Incluye lógica para obtener el nombre del consultor asignado.", "impacto": "Funcionalidad de listado robusta para las PWAs." },
{ "mejora": "Optimización en la obtención de nombres de usuarios asignados.", "justificacion": "Recopila todos los UserIds únicos y hace consultas (o una consulta findManyByIds idealmente) para evitar N+1 queries a la tabla de usuarios.", "impacto": "Mejora de rendimiento."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "El ILeadRepositoryPort necesitará que su método findAllPaginated acepte el LeadFilterAppDto y lo traduzca a condiciones de query Prisma."},
{"nota": "El IUserRepositoryPort idealmente debería tener un método findManyByIds(userIds: UserId[]): Promise<Result<UserEntity[], ...>> para optimizar la búsqueda de nombres de usuarios."}
]
*/
