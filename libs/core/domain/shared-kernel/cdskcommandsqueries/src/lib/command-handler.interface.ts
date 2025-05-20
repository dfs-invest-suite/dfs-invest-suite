// libs/core/domain/shared-kernel/commands-queries/src/lib/command-handler.interface.ts
import { ExceptionBase } from '@dfs-suite/shared-errors';
import { Result } from '@dfs-suite/shared-result';

import { ICommand } from './command.interface';
// Error vendrá de ExceptionBase o un tipo de error de dominio

export interface ICommandHandler<C extends ICommand, R = void> {
  execute(command: C): Promise<Result<R, ExceptionBase | Error>>;
}
