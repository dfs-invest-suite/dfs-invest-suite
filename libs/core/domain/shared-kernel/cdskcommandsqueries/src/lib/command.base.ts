// RUTA: libs/core/domain/shared-kernel/commands-queries/src/lib/command.base.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import { CommandInstanceId } from '@dfs-suite/shtypes';
import { createOperationMetadata, UuidUtils } from '@dfs-suite/shutils';

import { ICommand, ICommandMetadata } from './command.interface';

/**
 * @abstract
 * @class CommandBase
 * @implements ICommand
 * @description Clase base abstracta para todos los comandos del sistema.
 */
export abstract class CommandBase implements ICommand {
  readonly commandId: CommandInstanceId;
  readonly commandName: string;
  readonly metadata: ICommandMetadata;

  /**
   * @constructor
   * @param {Partial<ICommandMetadata>} [metadataProps] - Valores parciales para la metadata.
   */
  constructor(metadataProps?: Partial<ICommandMetadata>) {
    this.commandId = UuidUtils.generateCommandInstanceId();
    this.commandName = this.constructor.name;

    this.metadata = createOperationMetadata(metadataProps) as ICommandMetadata;
  }
}
// RUTA: libs/core/domain/shared-kernel/commands-queries/src/lib/command.base.ts
/* SECCIÓN DE MEJORAS (sin cambios respecto a la versión anterior que debería funcionar) */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (sin cambios respecto a la versión anterior que debería funcionar) */
