// RUTA: libs/core/domain/codonotificationscore/src/lib/value-objects/notification-recipient.vo.ts
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { EUserRole as ETenantUserRole } from '@dfs-suite/codousersroles'; // Rol de tenant
import { ArgumentInvalidException } from '@dfs-suite/sherrors';
import { UserId, Maybe } from '@dfs-suite/shtypes';
import { EPlatformUserRole } from '@dfs-suite/shtypes'; // Asumiendo que este enum está en shtypes o se crea

export type RecipientType =
  | 'USER_ID'
  | 'TENANT_ROLE'
  | 'PLATFORM_ROLE'
  | 'TENANT_ALL_USERS';

export interface NotificationRecipientProps {
  readonly type: RecipientType;
  readonly userId?: Maybe<UserId>; // Si type es USER_ID
  readonly tenantRole?: Maybe<ETenantUserRole>; // Si type es TENANT_ROLE
  readonly platformRole?: Maybe<EPlatformUserRole>; // Si type es PLATFORM_ROLE
  // tenantId se manejaría en la capa de aplicación al determinar los UserIds para TENANT_ROLE o TENANT_ALL_USERS
}

export class NotificationRecipientVO extends ValueObject<NotificationRecipientProps> {
  protected constructor(props: NotificationRecipientProps) {
    super(props);
  }
  // Getters ...
  get type(): RecipientType {
    return this.props.type;
  }

  protected validate(props: NotificationRecipientProps): void {
    if (props.type === 'USER_ID' && !props.userId) {
      throw new ArgumentInvalidException(
        'UserId is required for USER_ID recipient type.'
      );
    }
    if (props.type === 'TENANT_ROLE' && !props.tenantRole) {
      throw new ArgumentInvalidException(
        'TenantRole is required for TENANT_ROLE recipient type.'
      );
    }
    if (props.type === 'PLATFORM_ROLE' && !props.platformRole) {
      throw new ArgumentInvalidException(
        'PlatformRole is required for PLATFORM_ROLE recipient type.'
      );
    }
  }

  public static forUser(userId: UserId): NotificationRecipientVO {
    return new NotificationRecipientVO({ type: 'USER_ID', userId });
  }
  public static forTenantRole(role: ETenantUserRole): NotificationRecipientVO {
    return new NotificationRecipientVO({
      type: 'TENANT_ROLE',
      tenantRole: role,
    });
  }
  public static forPlatformRole(
    role: EPlatformUserRole
  ): NotificationRecipientVO {
    return new NotificationRecipientVO({
      type: 'PLATFORM_ROLE',
      platformRole: role,
    });
  }
  public static forTenantAllUsers(): NotificationRecipientVO {
    return new NotificationRecipientVO({ type: 'TENANT_ALL_USERS' });
  }
}
// RUTA: libs/core/domain/codonotificationscore/src/lib/value-objects/notification-recipient.vo.ts
