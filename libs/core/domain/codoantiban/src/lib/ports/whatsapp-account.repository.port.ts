// RUTA: libs/core/domain/codoantiban/src/lib/ports/whatsapp-account.repository.port.ts
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { WhatsAppAccountId, Maybe, TenantId } from '@dfs-suite/shtypes';

import { WhatsAppAccountEntity } from '../entities/whatsapp-account.entity';
import { EOperationalStatus } from '../value-objects/operational-status.vo';

export const WHATSAPP_ACCOUNT_REPOSITORY_PORT = Symbol(
  'IWhatsAppAccountRepositoryPort'
);

export interface IWhatsAppAccountRepository
  extends IRepositoryPort<
    WhatsAppAccountEntity['props'],
    WhatsAppAccountId,
    WhatsAppAccountEntity
  > {
  // Ajustado
  // findById ya viene de IRepositoryPort

  // Ya no necesita tenantId explícito si el repo usa TenantPrismaService
  findAllActiveForTenant(): Promise<
    // tenantId: TenantId // Implícito por el contexto del TenantPrismaService
    Result<WhatsAppAccountEntity[], ExceptionBase>
  >;

  findNextAvailableForSending(
    // tenantId: TenantId, // Implícito
    messageCategory: string, // Para seleccionar cuentas con afinidad o permiso para esa categoría
    excludedAccountIds?: WhatsAppAccountId[]
  ): Promise<Result<Maybe<WhatsAppAccountEntity>, ExceptionBase>>;

  // Para el AntiBanDecisionService
  getAccountsByHealthAndStatus(
    // tenantId: TenantId, // Implícito
    minHealthScore: number,
    allowedStatuses: EOperationalStatus[]
  ): Promise<Result<WhatsAppAccountEntity[], ExceptionBase>>;
}
// RUTA: libs/core/domain/codoantiban/src/lib/ports/whatsapp-account.repository.port.ts
