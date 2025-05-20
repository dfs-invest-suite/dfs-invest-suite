// RUTA: libs/core/domain/codousersroles/src/lib/services/user-authentication.domain-service.ts
// TODO: [LIA Legacy - Implementar UserAuthenticationDomainService]
// Propósito: Lógica de dominio para validar credenciales (comparar contraseña en texto plano con hash).
// Relacionado con Casos de Uso: AuthenticateUserUseCase.
import { UserEntity } from '../entities/user.entity';
import { HashedPasswordVO } from '../value-objects/hashed-password.vo';
import { Result, ok, err } from '@dfs-suite/shresult';
import { InvalidCredentialsError } from '../errors'; // Se creará después

export interface IUserAuthenticationDomainService {
  // El puerto de hasheo podría ser inyectado o ser un helper estático
  verifyPassword(
    plainPassword: string,
    hashedPassword: HashedPasswordVO
  ): Promise<Result<boolean, Error>>;
}
export const USER_AUTHENTICATION_DOMAIN_SERVICE_PORT = Symbol(
  'IUserAuthenticationDomainService'
);

// La implementación podría estar en infraestructura (si depende de bcrypt) o aquí si es pura
// export class UserAuthenticationDomainService implements IUserAuthenticationDomainService {
//   constructor(private readonly passwordHasher: IPasswordHasherPort) {} // IPasswordHasherPort de infrasecurity
//   async verifyPassword(plainPassword: string, hashedPassword: HashedPasswordVO): Promise<Result<boolean, Error>> {
//      const match = await this.passwordHasher.compare(plainPassword, hashedPassword.value);
//      if (!match) return err(new InvalidCredentialsError('Password does not match.'));
//      return ok(true);
//   }
// }
