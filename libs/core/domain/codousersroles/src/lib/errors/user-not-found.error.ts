// RUTA: libs/core/domain/codousersroles/src/lib/errors/user-not-found.error.ts
// TODO: [LIA Legacy - Implementar UserNotFoundError]
import { NotFoundException } from '@dfs-suite/sherrors'; // Usar genérica o crear una específica
export class UserNotFoundError extends NotFoundException {
  constructor(identifier: string) {
    super(`User with identifier "${identifier}" not found.`);
    this.name = 'UserNotFoundError';
  }
}
// (Crear esqueletos similares para los otros errores)
