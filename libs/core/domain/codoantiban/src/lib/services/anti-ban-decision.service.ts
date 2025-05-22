// RUTA: libs/core/domain/codoantiban/src/lib/services/anti-ban-decision.service.ts
import { EWhatsAppTemplateCategory } from '@dfs-suite/codowhatsapp';
import { ExceptionBase, NotFoundException } from '@dfs-suite/sherrors';
import {
  Result,
  ok,
  err,
  isErr /* <<< AÑADIDO isErr */,
} from '@dfs-suite/shresult';
import { Maybe, TenantId, WhatsAppAccountId } from '@dfs-suite/shtypes';

import { WhatsAppAccountEntity } from '../entities/whatsapp-account.entity';
import {
  NoAvailableWhatsAppAccountError,
  RateLimitExceededAntiBanError,
} from '../errors';
import {
  IRateLimiterPort,
  RATE_LIMITER_PORT,
  RateLimitConsumeResult,
} from '../ports/rate-limiter.port';
import {
  IWhatsAppAccountRepository,
  WHATSAPP_ACCOUNT_REPOSITORY_PORT,
} from '../ports/whatsapp-account.repository.port';
import { EOperationalStatus } from '../value-objects/operational-status.vo';

// @Injectable()
export class AntiBanDecisionService {
  private readonly HIGH_PRIORITY_THRESHOLD = 70;
  private readonly MEDIUM_PRIORITY_THRESHOLD = 40;
  private readonly MIN_INTERVAL_BETWEEN_SAME_NUMBER_MS = 5000;

  constructor(
    // @Inject(WHATSAPP_ACCOUNT_REPOSITORY_PORT)
    private readonly accountRepo: IWhatsAppAccountRepository,
    // @Inject(RATE_LIMITER_PORT)
    private readonly rateLimiter: IRateLimiterPort
  ) {}

  public async determineSendAction(
    tenantId: TenantId,
    messageCategory: EWhatsAppTemplateCategory | 'SESSION',
    preferredAccountId?: Maybe<WhatsAppAccountId>
  ): Promise<
    Result<{ accountId: WhatsAppAccountId; delayMs: number }, ExceptionBase>
  > {
    const activeAccountsResult =
      await this.accountRepo.getAccountsByHealthAndStatus(
        // tenantId, // Implícito
        this.MEDIUM_PRIORITY_THRESHOLD,
        [EOperationalStatus.ACTIVE, EOperationalStatus.WARMUP]
      );

    if (isErr(activeAccountsResult)) {
      // <<< USA isErr
      // this.logger.error(...) // Añadir logging cuando ILoggerPort esté disponible
      return err(activeAccountsResult.error);
    }
    let availableAccounts = activeAccountsResult.value;
    if (!availableAccounts || availableAccounts.length === 0) {
      return err(
        new NoAvailableWhatsAppAccountError(
          tenantId,
          'No healthy/active accounts found.'
        )
      );
    }

    availableAccounts.sort((a, b) => b.healthScore.value - a.healthScore.value);

    let selectedAccount: Maybe<WhatsAppAccountEntity> = null;

    if (preferredAccountId) {
      const preferred = availableAccounts.find(
        (acc) => acc.id === preferredAccountId
      );
      if (preferred && preferred.canCurrentlySendMessage) {
        selectedAccount = preferred;
      }
    }

    if (!selectedAccount) {
      for (const account of availableAccounts) {
        if (account.canCurrentlySendMessage) {
          if (account.props.lastUsedForSendingAt) {
            const lastUsed = new Date(
              account.props.lastUsedForSendingAt
            ).getTime();
            if (
              Date.now() - lastUsed <
              this.MIN_INTERVAL_BETWEEN_SAME_NUMBER_MS
            ) {
              continue;
            }
          }
          selectedAccount = account;
          break;
        }
      }
    }

    if (!selectedAccount) {
      return err(
        new NoAvailableWhatsAppAccountError(
          tenantId,
          'No suitable account can send message now.'
        )
      );
    }

    const rateLimitKey = `${String(tenantId)}:${String(
      selectedAccount.id
    )}:${messageCategory}`;
    const consumeResult = await this.rateLimiter.consume(rateLimitKey, 1);

    if (isErr(consumeResult)) {
      // <<< USA isErr
      // this.logger.error(...)
      return err(consumeResult.error);
    }
    const { allowed, msBeforeNext } = consumeResult.value;

    if (!allowed) {
      return err(
        new RateLimitExceededAntiBanError(
          tenantId,
          selectedAccount.id,
          msBeforeNext || 0
        )
      );
    }

    return ok({ accountId: selectedAccount.id, delayMs: 0 });
  }
}
// RUTA: libs/core/domain/codoantiban/src/lib/services/anti-ban-decision.service.ts
