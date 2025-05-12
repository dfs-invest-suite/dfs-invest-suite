// libs/core/domain/shared-kernel/commands-queries/src/lib/command-handler.interface.ts
import { ICommand } from './command.interface';
import { Result } from '@dfs-suite/shared-result';
// Error vendrá de ExceptionBase o un tipo de error de dominio
import { ExceptionBase } from '@dfs-suite/shared-errors';


export interface ICommandHandler<C extends ICommand, R = void> {
  execute(command: C): Promise<Result<R, ExceptionBase | Error>>;
}
