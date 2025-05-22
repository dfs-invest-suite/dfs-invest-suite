// RUTA: libs/core/domain/codotenancy/src/lib/entities/tenant.entity.ts
// Autor: L.I.A Legacy (IA Asistente)
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from '@dfs-suite/sherrors';
import { Result, err, ok } from '@dfs-suite/shresult';
import {
  TenantId, // Específico Branded ID
  UserId,
  WabaId,
  Maybe,
  AggregateId, // Este es string
} from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';

import { InvalidTenantStatusTransitionError } from '../errors/invalid-tenant-status-transition.error';
// import { TenantAlreadyExistsError } from '../errors/tenant-already-exists.error'; // Se usa en el Caso de Uso
import {
  TenantActivatedEvent,
  TenantActivatedEventPayload,
} from '../events/tenant-activated.event';
import {
  TenantCreatedEvent,
  ITenantCreatedEventPayload,
} from '../events/tenant-created.event';
import {
  TenantSuspendedEvent,
  TenantSuspendedEventPayload,
} from '../events/tenant-suspended.event';
import {
  TenantWabaConfigUpdatedEvent,
  TenantWabaConfigUpdatedPayload,
} from '../events/tenant-waba-config-updated.event';
import { DbConnectionConfigVO } from '../value-objects/db-connection-config.vo';
import {
  TenantStatusVO,
  TenantStatusEnum,
} from '../value-objects/tenant-status.vo';
import { WabaCredentialsVO } from '../value-objects/waba-credentials.vo';

export interface TenantProps {
  name: string;
  slug: string;
  ownerUserId: UserId;
  status: TenantStatusVO;
  planId: Maybe<string>;
  dbConnectionConfig: Maybe<DbConnectionConfigVO>;
  wabaCredentials: Maybe<WabaCredentialsVO>;
  isWhatsAppConfigured: boolean;
}

export interface CreateTenantProps {
  name: string;
  slug: string;
  ownerUserId: UserId;
  planId?: Maybe<string>;
}

// TenantEntity usa TenantId como su tipo de ID específico
export class TenantEntity extends AggregateRoot<TenantProps, TenantId> {
  constructor(createEntityProps: CreateEntityProps<TenantProps, TenantId>) {
    super(createEntityProps);
  }

  public static create(props: CreateTenantProps, id?: TenantId): TenantEntity {
    if (Guard.isEmpty(props.name?.trim())) {
      throw new ArgumentNotProvidedException('Tenant name cannot be empty.');
    }
    if (Guard.isEmpty(props.slug?.trim())) {
      throw new ArgumentNotProvidedException('Tenant slug cannot be empty.');
    }
    if (Guard.isEmpty(props.ownerUserId)) {
      throw new ArgumentNotProvidedException(
        'Tenant ownerUserId cannot be empty.'
      );
    }

    const entityId = id || UuidUtils.generateTenantId(); // Genera TenantId
    const initialStatus = TenantStatusVO.newPendingSetup();

    const tenant = new TenantEntity({
      id: entityId, // Pasa TenantId
      props: {
        name: props.name.trim(),
        slug: props.slug.trim().toLowerCase(), // Slug siempre en minúscula
        ownerUserId: props.ownerUserId,
        status: initialStatus,
        planId: props.planId ?? null,
        dbConnectionConfig: null,
        wabaCredentials: null,
        isWhatsAppConfigured: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const eventPayload: ITenantCreatedEventPayload = {
      tenantId: entityId,
      name: tenant.props.name,
      slug: tenant.props.slug,
      ownerUserId: tenant.props.ownerUserId,
      status: initialStatus.value,
      planId: tenant.props.planId,
    };
    tenant.addEvent(
      new TenantCreatedEvent({
        aggregateId: entityId, // this.id (TenantId) es asignable a AggregateId (string)
        payload: eventPayload,
      })
    );
    return tenant;
  }

  // --- Getters ---
  get name(): string {
    return this.props.name;
  }
  get slug(): string {
    return this.props.slug;
  }
  get ownerUserId(): UserId {
    return this.props.ownerUserId;
  }
  get status(): TenantStatusVO {
    return this.props.status;
  }
  get planId(): Maybe<string> {
    return this.props.planId;
  }
  get dbConnectionConfig(): Maybe<DbConnectionConfigVO> {
    return this.props.dbConnectionConfig;
  }
  get wabaCredentials(): Maybe<WabaCredentialsVO> {
    return this.props.wabaCredentials;
  }
  get isWhatsAppConfigured(): boolean {
    return this.props.isWhatsAppConfigured;
  }

  public activate(): Result<void, InvalidTenantStatusTransitionError> {
    if (this.props.status.isActive()) return ok(undefined);
    if (
      !this.props.status.isPendingSetup() &&
      !this.props.status.isSuspended()
    ) {
      return err(
        new InvalidTenantStatusTransitionError(
          `Cannot activate tenant from status "${this.props.status.value}".`
        )
      );
    }
    if (!this.props.dbConnectionConfig) {
      return err(
        new InvalidTenantStatusTransitionError(
          'Cannot activate tenant: Database configuration is missing.'
        )
      );
    }
    if (!this.props.isWhatsAppConfigured || !this.props.wabaCredentials) {
      return err(
        new InvalidTenantStatusTransitionError(
          'Cannot activate tenant: WhatsApp configuration is incomplete.'
        )
      );
    }
    this.props.status = TenantStatusVO.newActive();
    this.setUpdatedAt();
    const payload: TenantActivatedEventPayload = { tenantId: this.id };
    this.addEvent(new TenantActivatedEvent({ aggregateId: this.id, payload }));
    return ok(undefined);
  }

  public suspend(
    reason?: string
  ): Result<void, InvalidTenantStatusTransitionError> {
    if (this.props.status.isSuspended()) return ok(undefined);
    if (!this.props.status.isActive()) {
      return err(
        new InvalidTenantStatusTransitionError(
          `Cannot suspend tenant from status "${this.props.status.value}".`
        )
      );
    }
    this.props.status = TenantStatusVO.newSuspended();
    this.setUpdatedAt();
    const payload: TenantSuspendedEventPayload = { tenantId: this.id, reason };
    this.addEvent(new TenantSuspendedEvent({ aggregateId: this.id, payload }));
    return ok(undefined);
  }

  public setDatabaseConfiguration(
    config: DbConnectionConfigVO
  ): Result<void, ArgumentNotProvidedException> {
    if (Guard.isNil(config)) {
      return err(
        new ArgumentNotProvidedException(
          'Database configuration cannot be null or undefined.'
        )
      );
    }
    this.props.dbConnectionConfig = config;
    this.setUpdatedAt();
    return ok(undefined);
  }

  public setWabaConfiguration(
    credentials: WabaCredentialsVO
  ): Result<void, ArgumentNotProvidedException> {
    if (Guard.isNil(credentials)) {
      return err(
        new ArgumentNotProvidedException(
          'WABA credentials cannot be null or undefined.'
        )
      );
    }
    this.props.wabaCredentials = credentials;
    this.props.isWhatsAppConfigured = true;
    this.setUpdatedAt();
    const payload: TenantWabaConfigUpdatedPayload = {
      tenantId: this.id,
      wabaId: credentials.wabaId,
    };
    this.addEvent(
      new TenantWabaConfigUpdatedEvent({ aggregateId: this.id, payload })
    );
    return ok(undefined);
  }

  public updateName(
    newName: string
  ): Result<void, ArgumentNotProvidedException> {
    const trimmedNewName = newName?.trim();
    if (Guard.isEmpty(trimmedNewName)) {
      return err(
        new ArgumentNotProvidedException('New tenant name cannot be empty.')
      );
    }
    if (trimmedNewName === this.props.name) return ok(undefined);
    this.props.name = trimmedNewName;
    this.setUpdatedAt();
    return ok(undefined);
  }

  public updateSlug(
    newSlug: string
  ): Result<void, ArgumentNotProvidedException> {
    const trimmedNewSlug = newSlug?.trim().toLowerCase();
    if (Guard.isEmpty(trimmedNewSlug)) {
      return err(
        new ArgumentNotProvidedException('New tenant slug cannot be empty.')
      );
    }
    if (trimmedNewSlug === this.props.slug) return ok(undefined);
    this.props.slug = trimmedNewSlug;
    this.setUpdatedAt();
    return ok(undefined);
  }

  public validate(): void {
    if (Guard.isEmpty(this.props.name))
      throw new ArgumentNotProvidedException('TenantEntity: name is required.');
    if (Guard.isEmpty(this.props.slug))
      throw new ArgumentNotProvidedException('TenantEntity: slug is required.');
    if (Guard.isEmpty(this.props.ownerUserId))
      throw new ArgumentNotProvidedException(
        'TenantEntity: ownerUserId is required.'
      );
    if (!(this.props.status instanceof TenantStatusVO))
      throw new ArgumentInvalidException(
        'TenantEntity: status must be a valid TenantStatusVO.'
      );
    if (
      this.props.dbConnectionConfig &&
      !(this.props.dbConnectionConfig instanceof DbConnectionConfigVO)
    ) {
      throw new ArgumentInvalidException(
        'TenantEntity: dbConnectionConfig must be a valid DbConnectionConfigVO if provided.'
      );
    }
    if (
      this.props.wabaCredentials &&
      !(this.props.wabaCredentials instanceof WabaCredentialsVO)
    ) {
      throw new ArgumentInvalidException(
        'TenantEntity: wabaCredentials must be a valid WabaCredentialsVO if provided.'
      );
    }
    if (this.props.status.isActive()) {
      if (
        !this.props.dbConnectionConfig ||
        !this.props.wabaCredentials ||
        !this.props.isWhatsAppConfigured
      ) {
        throw new ArgumentInvalidException(
          'TenantEntity: An ACTIVE tenant must have DB and WhatsApp configured.'
        );
      }
    }
  }
}
// RUTA: libs/core/domain/codotenancy/src/lib/entities/tenant.entity.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "`TenantEntity` ahora extiende `AggregateRoot<TenantProps, TenantId>` y su constructor usa `CreateEntityProps<TenantProps, TenantId>`.", "justificacion": "Alinea la entidad con las clases base genéricas que aceptan un tipo de ID específico (`TenantId`) que extiende `string`.", "impacto": "Resuelve los errores TS2344 (incompatibilidad con restricción `AggregateId`) y TS2314 (argumentos de tipo faltantes)." },
  { "mejora": "Al emitir eventos, `this.id` (que es `TenantId`) se pasa directamente a `aggregateId` en `DomainEventProps`.", "justificacion": "Con `IDomainEvent.aggregateId` siendo `string` (o `AggregateId` que es `string`), y `TenantId` siendo `Brand<string, 'TenantId'>`, `TenantId` es asignable a `string`. Esto elimina la necesidad de casts como `as unknown as AggregateId` y resuelve errores TS2322.", "impacto": "Código más limpio y type-safe para la emisión de eventos." },
  { "mejora": "Slug ahora se normaliza a minúsculas en `create()` y `updateSlug()`.", "justificacion": "Asegura consistencia para los slugs usados en URLs.", "impacto": "Mejora la usabilidad de los slugs."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
