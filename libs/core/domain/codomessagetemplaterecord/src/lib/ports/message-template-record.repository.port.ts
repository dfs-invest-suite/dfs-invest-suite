// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/ports/message-template-record.repository.port.ts
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { EWhatsAppTemplateStatus } from '@dfs-suite/codowhatsapp';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import {
  AggregateId,
  MessageTemplateId as HsmId,
  Maybe,
} from '@dfs-suite/shtypes';

import { MessageTemplateRecordEntity } from '../entities/message-template-record.entity';

export const MESSAGE_TEMPLATE_RECORD_REPOSITORY_PORT = Symbol(
  'IMessageTemplateRecordRepositoryPort'
);

export interface IMessageTemplateRecordRepository
  extends IRepositoryPort<MessageTemplateRecordEntity, AggregateId> {
  findByHsmId(
    hsmId: HsmId
  ): Promise<Result<Maybe<MessageTemplateRecordEntity>, ExceptionBase>>;
  findByNameAndLanguage(
    name: string,
    language: string
  ): Promise<Result<Maybe<MessageTemplateRecordEntity>, ExceptionBase>>;
  findAllByStatusMeta(
    status: EWhatsAppTemplateStatus
  ): Promise<Result<MessageTemplateRecordEntity[], ExceptionBase>>;
  // Otros métodos de búsqueda específicos podrían ser necesarios
}
// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/ports/message-template-record.repository.port.ts
