// libs/core/domain/shared-kernel/commands-queries/src/lib/command.interface.ts
import { CorrelationId, Maybe, UserId } from '@dfs-suite/shared-types';

export interface ICommandMetadata {
  readonly correlationId: CorrelationId;
  readonly causationId?: Maybe<CorrelationId>;
  readonly userId?: Maybe<UserId>;
  readonly timestamp: number; // Unix timestamp o ISO string
}

export interface ICommand {
  readonly commandId: string; // ID único para esta instancia del comando
  readonly metadata: ICommandMetadata;
}
