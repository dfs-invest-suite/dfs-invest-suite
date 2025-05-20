// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/create-user.use-case.ts
// TODO: [LIA Legacy - Implementar CreateUserUseCase]
// Propósito: Orquesta la creación de un nuevo usuario para un tenant (consultor, supervisor).
// Relacionado con Casos de Uso: BP-USER-CREATE-001
import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserDetailsDto } from '../dtos/user-details.dto';
import { Result, ok, err } from '@dfs-suite/shresult';
import { ExceptionBase, ArgumentInvalidException } from '@dfs-suite/sherrors';
import {
  IUserRepository,
  USER_REPOSITORY_PORT,
  UserEntity,
  HashedPasswordVO,
  UserRoleVO,
} from '@dfs-suite/codousersroles';
import {
  IPasswordHasherPort,
  PASSWORD_HASHER_PORT,
} from '@dfs-suite/infrasecurity'; // Puerto de infra
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import { TenantId, UserId } from '@dfs-suite/shtypes';
import { UuidUtils } from '@dfs-suite/shutils';

export class CreateUserUseCase
  implements ICommandHandler<CreateUserCommand, UserDetailsDto>
{
  constructor() // @Inject(USER_REPOSITORY_PORT) private readonly userRepo: IUserRepository,
  // @Inject(PASSWORD_HASHER_PORT) private readonly passwordHasher: IPasswordHasherPort,
  // @Inject(LOGGER_PORT) private readonly logger: ILoggerPort
  {}

  async execute(
    command: CreateUserCommand
  ): Promise<Result<UserDetailsDto, ExceptionBase>> {
    const { tenantId, email, name, role, password, createdByUserId } =
      command.payload; // Asumiendo que el payload del comando tiene estos campos
    this.logger.log(
      `Attempting to create user ${email} for tenant ${tenantId}`,
      this.constructor.name,
      command.metadata.correlationId
    );

    // 1. Validar input (ej. que password no esté vacía antes de hashear)
    // 2. Hashear la contraseña usando this.passwordHasher.hash(password)
    // 3. Crear HashedPasswordVO y UserRoleVO
    // 4. Crear UserEntity con UserEntity.create(...)
    // 5. Guardar la entidad usando this.userRepo.insert(userEntity) (o save)
    // 6. Emitir UserCreatedEvent (el UserEntity podría hacerlo, o el caso de uso después de persistir)
    // 7. Mapear la entidad a UserDetailsDto
    // Ejemplo muy simplificado:
    // const hashedPassword = await this.passwordHasher.hash(password);
    // const user = UserEntity.create({ email, name, role: UserRoleVO.create(role), hashedPassword: HashedPasswordVO.create(hashedPassword.value) });
    // await this.userRepo.insert(user);
    // const userDto: UserDetailsDto = { id: user.id as UserId, email: user.email, name: user.name, role: user.role.value, isActive: user.isActive };
    // return ok(userDto);
    return ok({} as UserDetailsDto); // Placeholder
  }
}
