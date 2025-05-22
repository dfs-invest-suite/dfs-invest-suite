// RUTA: libs/core/application/coapusersroles/src/lib/queries/get-user-by-id.query-handler.ts
import { IQueryHandler } from '@dfs-suite/cdskcommandsqueries';
import { ILoggerPort } from '@dfs-suite/cdskports';
import { IUserRepository } from '@dfs-suite/codousersroles';
import {
  ExceptionBase,
  InternalServerErrorException,
  NotFoundException,
} from '@dfs-suite/sherrors';
import { Result, err, isErr, ok } from '@dfs-suite/shresult';

import { UserDetailsDto } from '../dtos/user-details.dto';

import { GetUserByIdQuery } from './get-user-by-id.query';

export const GET_USER_BY_ID_QUERY_HANDLER = Symbol('IGetUserByIdQueryHandler');
export type IGetUserByIdQueryHandler = IQueryHandler<
  GetUserByIdQuery,
  UserDetailsDto
>;

export class GetUserByIdQueryHandlerImpl implements IGetUserByIdQueryHandler {
  constructor(
    // @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: IUserRepository,
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort
  ) {}

  async execute(
    query: GetUserByIdQuery
  ): Promise<Result<UserDetailsDto, ExceptionBase>> {
    const { tenantId, userIdToFetch } = query.payload;
    const correlationId = query.metadata.correlationId;
    const handlerName = GetUserByIdQueryHandlerImpl.name; // Para consistencia en logs

    this.logger.log(
      `Fetching details for user ${String(userIdToFetch)} in tenant ${String(
        tenantId
      )}`,
      handlerName,
      correlationId
    );

    try {
      // El userRepo (implementación PrismaUserRepositoryAdapter) debe ser
      // instanciado con el TenantPrismaService para operar en el contexto del tenantId.
      // No es necesario pasar tenantId explícitamente al método del repo si el repo ya está contextualizado.
      const userResult = await this.userRepo.findOneById(userIdToFetch);

      if (isErr(userResult)) {
        this.logger.error(
          `Error fetching user ${String(userIdToFetch)}: ${
            userResult.error.message
          }`,
          userResult.error.stack,
          handlerName,
          correlationId
        );
        return err(userResult.error);
      }

      if (!userResult.value) {
        return err(
          new NotFoundException(
            `User with ID "${String(
              userIdToFetch
            )}" not found for tenant "${String(tenantId)}".`,
            undefined,
            { userIdToFetch, tenantId: String(tenantId) },
            correlationId
          )
        );
      }
      const userEntity = userResult.value;

      // Mapeo a DTO
      const userDto: UserDetailsDto = {
        id: userEntity.id,
        tenantId: tenantId, // El tenantId del contexto de la query
        email: userEntity.email,
        name: userEntity.name,
        role: userEntity.role.value, // Acceder al valor del VO
        isActive: userEntity.isActive,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
        lastLoginAt: userEntity.lastLoginAt,
        profilePictureUrl: userEntity.profilePictureUrl,
      };

      return ok(userDto);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error fetching user details.',
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
// RUTA: libs/core/application/coapusersroles/src/lib/queries/get-user-by-id.query-handler.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementación completa del esqueleto de `GetUserByIdQueryHandlerImpl`.", "justificacion": "Proporciona la lógica para buscar un usuario por ID y mapearlo a `UserDetailsDto`, incluyendo manejo de errores y logging.", "impacto": "Caso de uso de lectura funcional." },
  { "mejora": "Añadidos todos los imports necesarios para tipos, entidades, VOs, puertos y excepciones.", "justificacion": "Resuelve errores `no-undef`.", "impacto": "Archivo completo y type-safe." },
  { "mejora": "El `tenantId` se incluye en el `UserDetailsDto` desde el payload de la query.", "justificacion": "Proporciona contexto al cliente sobre a qué tenant pertenece el usuario, ya que `UserEntity` no almacena `tenantId` (al ser de la DB del tenant).", "impacto": "DTO más informativo."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
