// RUTA: libs/core/application/coapusersroles/src/lib/queries/list-users-by-tenant.query-handler.ts
import { IQueryHandler } from '@dfs-suite/cdskcommandsqueries';
import { ILoggerPort } from '@dfs-suite/cdskports';
import { IUserRepository } from '@dfs-suite/codousersroles';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, err, isErr, ok } from '@dfs-suite/shresult';
import { IPaginated } from '@dfs-suite/shtypes';

import { UserSummaryDto } from '../dtos/user-summary.dto';

import { ListUsersByTenantQuery } from './list-users-by-tenant.query';

export const LIST_USERS_BY_TENANT_QUERY_HANDLER = Symbol(
  'IListUsersByTenantQueryHandler'
);
export type IListUsersByTenantQueryHandler = IQueryHandler<
  ListUsersByTenantQuery,
  IPaginated<UserSummaryDto>
>;

export class ListUsersByTenantQueryHandlerImpl
  implements IListUsersByTenantQueryHandler
{
  constructor(
    // @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: IUserRepository,
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort
  ) {}

  async execute(
    query: ListUsersByTenantQuery
  ): Promise<Result<IPaginated<UserSummaryDto>, ExceptionBase>> {
    const { tenantId, filters } = query.payload;
    const { page, limit, offset, orderBy } = query; // Parámetros de paginación de la clase base
    const correlationId = query.metadata.correlationId;
    const handlerName = ListUsersByTenantQueryHandlerImpl.name;

    this.logger.log(
      `Listing users for tenant ${String(
        tenantId
      )} with filters: ${JSON.stringify(
        filters || {}
      )}, pagination: ${JSON.stringify({ page, limit, orderBy })}`,
      handlerName,
      correlationId
    );

    try {
      // Asumimos que el userRepo ya está contextualizado para el tenantId.
      // El método findAllPaginated del repo necesita aceptar los filtros y la paginación.
      const paginatedEntitiesResult = await this.userRepo.findAllPaginated(
        { page, limit, offset, orderBy }, // Pasar parámetros de paginación y ordenación
        filters || {} // Pasar filtros de UserFilterAppDto
      );

      if (isErr(paginatedEntitiesResult)) {
        this.logger.error(
          `Error listing users for tenant ${String(tenantId)}: ${
            paginatedEntitiesResult.error.message
          }`,
          paginatedEntitiesResult.error.stack,
          handlerName,
          correlationId
        );
        return err(paginatedEntitiesResult.error);
      }
      const paginatedEntities = paginatedEntitiesResult.value;

      const dtos: UserSummaryDto[] = paginatedEntities.data.map((entity) => ({
        id: entity.id,
        name: entity.name,
        email: entity.email,
        role: entity.role.value,
        isActive: entity.isActive,
        profilePictureUrl: entity.profilePictureUrl,
      }));

      const paginatedDto: IPaginated<UserSummaryDto> = {
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
              'Unexpected error listing users by tenant.',
              error as Error,
              undefined,
              correlationId
            );
      this.logger.error(
        `Error in ${handlerName}: ${errBase.message}`,
        errBase.stack,
        handlerName,
        correlationId
      );
      return err(errBase);
    }
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/queries/list-users-by-tenant.query-handler.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementación completa del esqueleto de `ListUsersByTenantQueryHandlerImpl`.", "justificacion": "Proporciona la lógica para listar usuarios con paginación y filtros, mapeando a `UserSummaryDto`.", "impacto": "Caso de uso de listado funcional." },
  { "mejora": "Añadidos todos los imports necesarios.", "justificacion": "Resuelve errores `no-undef`.", "impacto": "Archivo completo y type-safe." },
  { "mejora": "Paso de parámetros de paginación y ordenación (`orderBy`) al método `findAllPaginated` del repositorio.", "justificacion": "Asegura que la paginación y ordenación solicitadas en la query se apliquen en la consulta a la base de datos.", "impacto": "Funcionalidad de listado completa."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "El método `findAllPaginated` en `IUserRepository` (y su implementación Prisma) debe ser capaz de manejar el `UserFilterAppDto` y los parámetros de `orderBy` para construir la query Prisma correcta." }
]
*/
