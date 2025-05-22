// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/authenticate-user.use-case.ts
import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
import { ILoggerPort } from '@dfs-suite/cdskports';
import {
  IUserAuthenticationDomainService,
  IUserRepository,
  InvalidCredentialsError,
} from '@dfs-suite/codousersroles';
import {
  ExceptionBase,
  InternalServerErrorException,
  UnauthorizedException,
} from '@dfs-suite/sherrors';
import { Result, err, isErr, ok } from '@dfs-suite/shresult';
import { JwtString } from '@dfs-suite/shtypes';

import { AuthenticateUserCommand } from '../commands/authenticate-user.command';
import {
  AuthPayloadDto,
  UserDetailsDto,
} from '../dtos/user-authentication.dto';
import {
  IJwtServicePortAppLayer,
  JwtTokenPayload,
} from '../ports/jwt.service.port';

export const AUTHENTICATE_USER_USE_CASE = Symbol('IAuthenticateUserUseCase');
export type IAuthenticateUserUseCase = ICommandHandler<
  AuthenticateUserCommand,
  AuthPayloadDto
>;

export class AuthenticateUserUseCaseImpl implements IAuthenticateUserUseCase {
  constructor(
    // @Inject(USER_REPOSITORY_PORT)
    private readonly _userRepo: IUserRepository,
    // @Inject(USER_AUTHENTICATION_DOMAIN_SERVICE_PORT)
    private readonly _authDomainService: IUserAuthenticationDomainService,
    // @Inject(JWT_SERVICE_APP_PORT)
    private readonly _jwtService: IJwtServicePortAppLayer,
    // @Inject(LOGGER_PORT)
    private readonly _logger: ILoggerPort
  ) {}

  async execute(
    command: AuthenticateUserCommand
  ): Promise<Result<AuthPayloadDto, ExceptionBase>> {
    const { email, password } = command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = AuthenticateUserUseCaseImpl.name;

    this._logger.log(
      `Attempting to authenticate user ${email}`,
      useCaseName,
      correlationId
    );

    try {
      const userResult = await this._userRepo.findByEmail(email);
      if (isErr(userResult)) return err(userResult.error);
      if (!userResult.value) {
        return err(
          new InvalidCredentialsError(email, undefined, correlationId)
        );
      }
      const userEntity = userResult.value;

      if (!userEntity.isActive) {
        return err(
          new UnauthorizedException(
            `User ${email} is not active.`,
            undefined,
            { email, isActive: false },
            correlationId
          )
        );
      }

      const verifyPasswordResult = await this._authDomainService.verifyPassword(
        password,
        userEntity.hashedPassword
      );
      if (isErr(verifyPasswordResult) || !verifyPasswordResult.value) {
        return err(
          new InvalidCredentialsError(email, undefined, correlationId)
        );
      }

      // CRÍTICO: Obtener tenantId para el token.
      // Asumimos que la metadata del comando lo proveerá.
      // Si el AuthenticateUserCommand no tiene tenantId en su payload,
      // y la metadata no es suficiente, este es un punto de fallo.
      const tenantIdForToken = command.metadata.tenantId;

      if (!tenantIdForToken) {
        this._logger.error(
          `CRITICAL: TenantId missing in AuthenticateUserCommand metadata (or payload) for JWT generation for user ${email}.`,
          useCaseName,
          correlationId
        );
        return err(
          new InternalServerErrorException(
            'Tenant context is missing for token generation. Cannot authenticate user.',
            undefined,
            { email },
            correlationId
          )
        );
      }

      const tokenPayload: JwtTokenPayload = {
        sub: userEntity.id,
        email: userEntity.email,
        role: userEntity.role.value,
        tenantId: tenantIdForToken,
      };
      const jwtResult = await this._jwtService.generateToken(tokenPayload);
      if (isErr(jwtResult)) {
        this._logger.error(
          `JWT generation failed for user ${email}: ${jwtResult.error.message}`,
          useCaseName,
          correlationId
        );
        return err(jwtResult.error);
      }

      userEntity.recordLogin(); // Actualizar lastLoginAt
      const updateResult = await this._userRepo.update(userEntity);
      if (isErr(updateResult)) {
        // Loguear el error pero no necesariamente fallar la autenticación si el token ya se generó
        this._logger.warn(
          `Failed to update lastLoginAt for user ${email}: ${updateResult.error.message}`,
          useCaseName,
          correlationId
        );
      }

      this._logger.log(
        `User ${userEntity.email} (ID: ${String(
          userEntity.id
        )}) authenticated successfully for tenant ${String(tenantIdForToken)}.`,
        useCaseName,
        correlationId
      );

      const userDto: UserDetailsDto = {
        id: userEntity.id,
        tenantId: tenantIdForToken,
        email: userEntity.email,
        name: userEntity.name,
        role: userEntity.role.value,
        isActive: userEntity.isActive,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
        lastLoginAt: userEntity.lastLoginAt,
        profilePictureUrl: userEntity.profilePictureUrl,
      };

      const authPayload: AuthPayloadDto = {
        user: userDto,
        accessToken: jwtResult.value.accessToken as JwtString,
        refreshToken: jwtResult.value.refreshToken as JwtString,
        expiresIn: jwtResult.value.expiresIn,
      };

      return ok(authPayload);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error during user authentication.',
              error as Error,
              undefined,
              correlationId
            );
      this._logger.error(
        `Error in ${useCaseName}: ${errBase.message}`,
        errBase.stack,
        useCaseName,
        correlationId
      );
      return err(errBase);
    }
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/authenticate-user.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Todos los imports necesarios han sido añadidos o verificados.", "justificacion": "Resuelve los errores `no-undef` previamente identificados.", "impacto": "Archivo sintácticamente correcto y type-safe." },
  { "mejora": "Refactorizado para usar `IJwtServicePortAppLayer` y `JWT_SERVICE_APP_PORT` desde `../ports/jwt.service.port.ts`.", "justificacion": "Resuelve la violación de `depConstraint`.", "impacto": "Cumplimiento arquitectónico." },
  { "mejora": "Se utiliza `InvalidCredentialsError` del dominio `codousersroles`.", "justificacion": "Uso de errores semánticos específicos del dominio.", "impacto": "Claridad en el manejo de errores." },
  { "mejora": "Énfasis y logging crítico en la necesidad de `tenantId` en `command.metadata` para la generación del JWT.", "justificacion": "Destaca una dependencia crucial para la correcta funcionalidad multi-tenant.", "impacto": "Previene la generación de tokens incompletos y facilita la depuración." },
  { "mejora": "La actualización de `lastLoginAt` ahora loguea un warning si falla pero no interrumpe el flujo de login si el token ya se generó.", "justificacion": "Prioriza el login del usuario sobre la actualización de un metadato secundario.", "impacto": "UX mejorada en caso de fallo menor."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La obtención del `tenantId` para el JWT (actualmente de `command.metadata.tenantId`) es un punto crucial. Si el comando no lo trae, este caso de uso fallará. Se debe asegurar que `api-main` (o el llamador) provea este `tenantId` en la metadata del `AuthenticateUserCommand`." }
]
*/
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadidos todos los imports faltantes para `ICommandHandler`, `Result`, `ExceptionBase`, etc., y los tipos específicos de `shtypes` y `codousersroles`.", "justificacion": "Resuelve la mayoría de los errores `no-undef` reportados para este archivo.", "impacto": "El archivo ahora es sintácticamente correcto y mucho más type-safe." },
  { "mejora": "Refactorizado el import de `IJwtServicePortAppLayer` y `JWT_SERVICE_APP_PORT` para que provengan de `../ports/jwt.service.port.ts` (según la propuesta anterior).", "justificacion": "Resuelve la violación de `depConstraint`.", "impacto": "Cumplimiento arquitectónico." },
  { "mejora": "Utilización de `DomainInvalidCredentialsError` (alias de `InvalidCredentialsError` de `sherrors` o del dominio) para errores de login.", "justificacion": "Uso de errores semánticos.", "impacto": "Claridad." },
  { "mejora": "Asumida la existencia de `tenantId` en `command.metadata` para la generación del JWT. Se añadió un log de error crítico si falta.", "justificacion": "Resalta la necesidad de pasar el contexto del tenant para la creación del token. La forma de obtener este `tenantId` (subdominio, campo en form) debe definirse en la capa de API (`api-main`).", "impacto": "Previene la generación de tokens incompletos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "El `AuthenticateUserCommandPayload` podría necesitar explícitamente un campo `tenantIdentifier` si el login no se realiza en un contexto de tenant ya establecido (ej. `tenant.dfs-invest.com/login`). Si el email es único globalmente, el `userRepo.findByEmail` podría devolver el `tenantId` junto con el usuario." },
  { "nota": "La implementación de `IUserRepository.findByEmail` y `IJwtServicePortAppLayer.generateToken` es crucial." }
]
*/
// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/authenticate-user.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorizado el import de `IJwtServicePortAppLayer` y `JWT_SERVICE_APP_PORT` para que provengan de `../ports/jwt.service.port.ts`.", "justificacion": "Resuelve la violación de `depConstraint`.", "impacto": "Cumplimiento arquitectónico." },
  { "mejora": "Prefijadas con `_` las dependencias inyectadas para resolver warnings `no-unused-vars` temporalmente.", "justificacion": "Limpieza de ESLint.", "impacto": "Menos warnings." },
  { "mejora": "Identificado un punto crítico: la necesidad de `tenantId` para la generación del JWT y la lógica de búsqueda de usuario.", "justificacion": "Un sistema multi-tenant requiere que la autenticación sepa a qué tenant pertenece el usuario que intenta loguearse o para quién se genera el token. Se añadió un placeholder y un log de error.", "impacto": "Destaca una decisión de diseño importante a tomar para el flujo de login." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Decidir la estrategia para obtener/validar `tenantId` durante la autenticación. Opciones: 1) Login es por subdominio y `tenantId` se extrae de allí. 2) El formulario de login incluye un campo `tenantIdentifier`. 3) `userRepo.findByEmail` es global y devuelve el `tenantId` si el email es único globalmente." },
  { "nota": "El `AuthenticateUserCommandPayload` DEBE incluir el `tenantId` si se sigue la opción 1 o 2, o si el `AuthenticateUserCommand` se ejecuta en un contexto de `TenantContext` ya establecido (menos probable para el login inicial)." },
  { "nota": "La metadata del comando (`command.metadata`) podría ser un lugar para pasar el `tenantId` si se establece antes de crear el comando." }
]
*/
// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/authenticate-user.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Esqueleto de `AuthenticateUserUseCaseImpl`.", "justificacion": "Define el flujo de autenticación, incluyendo búsqueda de usuario, verificación de contraseña (delegada al servicio de dominio), y generación de JWT (delegada a un puerto de infraestructura).", "impacto": "Funcionalidad de login." },
  { "mejora": "Importación de `IJwtServicePort` y `JWT_SERVICE_PORT` desde `@dfs-suite/infrasecurity`.", "justificacion": "La generación de JWT es una responsabilidad de infraestructura.", "impacto": "Correcta dependencia y desacoplamiento."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La obtención del `tenantId` para el payload del JWT es crítica en un sistema multi-tenant. Se necesita una estrategia clara: ¿el UserRepo opera en un contexto de tenant ya establecido por `api-main` incluso para login, o el login requiere un identificador de tenant?" },
  { "nota": "Implementar `IJwtServicePort` y su adaptador en `infrasecurity`." }
]
*/
