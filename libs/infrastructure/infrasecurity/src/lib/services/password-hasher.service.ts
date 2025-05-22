// RUTA: libs/infrastructure/infrasecurity/src/lib/services/password-hasher.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { IPasswordHasherPort } from '@dfs-suite/codousersroles'; // Puerto del dominio
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, err, ok } from '@dfs-suite/shresult';

@Injectable()
export class BcryptPasswordHasherAdapter implements IPasswordHasherPort {
  private readonly logger = new Logger(BcryptPasswordHasherAdapter.name);
  private readonly saltRounds = 10; // Configurable

  async hash(password: string): Promise<Result<string, ExceptionBase>> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return ok(hashedPassword);
    } catch (e: any) {
      this.logger.error(`Password hashing failed: ${e.message}`, e.stack);
      return err(
        new InternalServerErrorException('Password hashing process failed.', e)
      );
    }
  }

  async compare(
    plainPassword: string,
    hashedPassword: string
  ): Promise<Result<boolean, ExceptionBase>> {
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return ok(match);
    } catch (e: any) {
      this.logger.error(`Password comparison failed: ${e.message}`, e.stack);
      return err(
        new InternalServerErrorException(
          'Password comparison process failed.',
          e
        )
      );
    }
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infrasecurity/src/lib/services/password-hasher.service.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Implementación de `BcryptPasswordHasherAdapter` para `IPasswordHasherPort`.",
    "justificacion": "Provee hasheo y comparación de contraseñas usando bcrypt, una librería estándar y segura.",
    "impacto": "Adaptador funcional para la seguridad de contraseñas."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Hacer `saltRounds` configurable vía `ConfigService`.",
    "justificacion": "Flexibilidad.",
    "impacto": "Menor."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
