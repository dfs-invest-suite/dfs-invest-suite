// RUTA: libs/core/domain/codoantiban/src/lib/value-objects/messaging-limit-tier.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { EWhatsAppMessagingLimitTier } from '@dfs-suite/codowhatsapp';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export class MessagingLimitTierVO extends ValueObject<EWhatsAppMessagingLimitTier> {
  constructor(value: EWhatsAppMessagingLimitTier) {
    super({ value });
  }

  get value(): EWhatsAppMessagingLimitTier {
    return this.props.value;
  }

  protected validate(
    props: IDomainPrimitive<EWhatsAppMessagingLimitTier>
  ): void {
    if (!Object.values(EWhatsAppMessagingLimitTier).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid messaging limit tier: "${props.value}".`
      );
    }
  }

  public static create(
    tier: EWhatsAppMessagingLimitTier
  ): MessagingLimitTierVO {
    return new MessagingLimitTierVO(tier);
  }

  public getQuota(): number {
    // Devuelve la cuota numérica aproximada
    switch (this.props.value) {
      case EWhatsAppMessagingLimitTier.TIER_0:
        return 250;
      case EWhatsAppMessagingLimitTier.TIER_1:
        return 1000;
      case EWhatsAppMessagingLimitTier.TIER_2:
        return 10000;
      case EWhatsAppMessagingLimitTier.TIER_3:
        return 100000;
      case EWhatsAppMessagingLimitTier.TIER_4:
        return Infinity; // Representa ilimitado
      default:
        return 0;
    }
  }
}
// RUTA: libs/core/domain/codoantiban/src/lib/value-objects/messaging-limit-tier.vo.ts
