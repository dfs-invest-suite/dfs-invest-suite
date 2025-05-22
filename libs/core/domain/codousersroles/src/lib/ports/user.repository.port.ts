// RUTA: libs/core/domain/codousersroles/src/lib/ports/user.repository.port.ts
// Autor: L.I.A Legacy (IA Asistente)
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { EmailString as Email, Maybe, UserId } from '@dfs-suite/shtypes';

import { UserEntity, UserProps } from '../entities/user.entity'; // <<< IMPORTACIÓN AÑADIDA UserProps

export const USER_REPOSITORY_PORT = Symbol('IUserRepositoryPort');

export interface IUserRepositoryPort
  extends IRepositoryPort<UserProps, UserId, UserEntity> {
  findByEmail(
    email: Email
  ): Promise<Result<Maybe<UserEntity>, ExceptionBase | Error>>;
}
// RUTA: libs/core/domain/codousersroles/src/lib/ports/user.repository.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadida la importación de `UserProps` desde `../entities/user.entity`.", "justificacion": "Resuelve el error de ESLint `no-undef` y TypeScript `TS2304` para `UserProps`.", "impacto": "El archivo ahora es sintácticamente correcto." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
