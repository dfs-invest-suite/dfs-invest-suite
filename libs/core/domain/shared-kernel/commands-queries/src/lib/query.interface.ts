// libs/core/domain/shared-kernel/commands-queries/src/lib/query.interface.ts
import { ICommandMetadata } from './command.interface'; // Reutilizar metadata

export interface IQuery {
  // Las queries pueden no necesitar un ID propio, pero sí metadata para tracing
  readonly metadata: ICommandMetadata;
}
