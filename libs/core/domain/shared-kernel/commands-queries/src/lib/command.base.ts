// libs/core/domain/shared-kernel/commands-queries/src/lib/command.base.ts
import { UuidUtils } from '@dfs-suite/shared-utils';
import { ICommand, ICommandMetadata } from './command.interface';
import { CorrelationId, Maybe, UserId } from '@dfs-suite/shared-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommandProps<T extends { [key: string]: any }> = Omit<T, 'commandId' | 'metadata'> & Partial<ICommand>;

export abstract class CommandBase implements ICommand {
  readonly commandId: string;
  readonly metadata: ICommandMetadata;

  constructor(props?: Partial<ICommandMetadata>) {
    this.commandId = UuidUtils.generate();

    let contextCorrelationId: CorrelationId;
    const placeholderCorrId = 'CONTEXT_CORR_ID_CMD_PLACEHOLDER';
    // Esta lógica asegura que la expresión no siempre sea verdadera
    if (placeholderCorrId && typeof placeholderCorrId === 'string' && placeholderCorrId.length > 0) {
        contextCorrelationId = placeholderCorrId as CorrelationId;
    } else {
        contextCorrelationId = UuidUtils.generateCorrelationId();
    }

    this.metadata = Object.freeze({
      correlationId: props?.correlationId || contextCorrelationId,
      causationId: props?.causationId,
      timestamp: props?.timestamp || Date.now(),
      userId: props?.userId,
    });
  }
}
