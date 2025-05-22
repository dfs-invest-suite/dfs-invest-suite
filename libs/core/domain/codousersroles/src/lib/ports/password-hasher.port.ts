// RUTA: libs/core/domain/codousersroles/src/lib/ports/password-hasher.port.ts
import { Result } from '@dfs-suite/shresult';
import { ExceptionBase } from '@dfs-suite/sherrors';

/**
 * Puerto para un servicio que realiza el hasheo y la comparación de contraseñas.
 * La implementación de este puerto (ej. usando bcrypt o argon2) residirá en
 * la capa de infraestructura (ej. @dfs-suite/infrasecurity).
 * Este puerto permite que el dominio y la aplicación dependan de una abstracción
 * para el hasheo de contraseñas.
 */
export interface IPasswordHasherPort {
  /**
   * Hashea una contraseña en texto plano.
   * @param password - La contraseña en texto plano a hashear.
   * @returns Un Result con el hash de la contraseña en caso de éxito, o un error.
   */
  hash(password: string): Promise<Result<string, ExceptionBase | Error>>;

  /**
   * Compara una contraseña en texto plano con un hash existente.
   * @param plainPassword - La contraseña en texto plano.
   * @param hashedPassword - El hash de la contraseña almacenado.
   * @returns Un Result con `true` si coinciden, `false` si no, o un error.
   */
  compare(
    plainPassword: string,
    hashedPassword: string
  ): Promise<Result<boolean, ExceptionBase | Error>>;
}

export const PASSWORD_HASHER_PORT = Symbol('IPasswordHasherPort');
// RUTA: libs/core/domain/codousersroles/src/lib/ports/password-hasher.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `IPasswordHasherPort` y su token `PASSWORD_HASHER_PORT` en el dominio `codousersroles`.", "justificacion": "Establece el contrato para el servicio de hasheo de contraseñas, permitiendo que el `CreateUserUseCase` (capa de aplicación) dependa de esta abstracción en lugar de una implementación de infraestructura. Esto resuelve la violación de `depConstraint`.", "impacto": "Arquitectura más limpia y alineada con los principios de inversión de dependencias." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La implementación concreta de este puerto (ej. `BcryptPasswordHasherAdapter`) se creará en `libs/infrastructure/infrasecurity/src/lib/adapters/` y se proveerá en el módulo NestJS de `infrasecurity`." }
]
*/
