// RUTA: libs/infrastructure/infratenancypersistence/src/lib/mappers/tenant.prisma-mapper.ts
import { Injectable } from '@nestjs/common';

import { IMapper } from '@dfs-suite/cdskmappers';
import {
  DbConnectionConfigVO,
  TenantEntity, // Para mapear a la creación de la entidad
  TenantProps,
  TenantStatusVO,
  WabaCredentialsVO,
} from '@dfs-suite/codotenancy';
import { IsoDateString, TenantId, UserId, WabaId } from '@dfs-suite/shtypes';
// Placeholder para el tipo Prisma Tenant.
// Reemplazar con: import { Tenant as PrismaTenant, Prisma } from '@prisma/platform-client';
// Asumimos que PrismaTenant tendrá estos campos.
interface PrismaTenant {
  id: string; // TenantId
  name: string;
  slug: string;
  ownerUserId: string; // UserId
  status: string; // TenantStatusEnum
  planId: string | null;
  dbConnectionStringEncrypted: string | null;
  wabaId: string | null; // WabaId
  wabaApiTokenEncrypted: string | null;
  wabaDefaultPhoneNumberId: string | null;
  isWhatsAppConfigured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Placeholder para los DTOs de respuesta. Se definirán en coaptenancy.
interface TenantDetailsDto {
  id: TenantId;
  name: string;
  slug: string;
  ownerUserId: UserId;
  status: string; // De TenantStatusEnum
  planId: string | null;
  isWhatsAppConfigured: boolean;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
  // No incluir dbConnectionString ni wabaApiToken
}

@Injectable()
export class TenantPrismaMapper
  implements IMapper<TenantEntity, PrismaTenant, TenantDetailsDto>
{
  toDomain(persistenceModel: PrismaTenant): TenantEntity {
    const tenantId = persistenceModel.id as TenantId;

    const dbConfig = persistenceModel.dbConnectionStringEncrypted
      ? DbConnectionConfigVO.create(
          persistenceModel.dbConnectionStringEncrypted
        ) // Asume que el VO acepta el string encriptado
      : null;

    const wabaCreds =
      persistenceModel.wabaId && persistenceModel.wabaApiTokenEncrypted
        ? WabaCredentialsVO.create(
            persistenceModel.wabaId as WabaId,
            persistenceModel.wabaApiTokenEncrypted, // El VO maneja el token en claro, el repo lo desencripta/encripta
            persistenceModel.wabaDefaultPhoneNumberId ?? undefined
          )
        : null;

    const entityProps: TenantProps = {
      name: persistenceModel.name,
      slug: persistenceModel.slug,
      ownerUserId: persistenceModel.ownerUserId as UserId,
      status: TenantStatusVO.create(persistenceModel.status as any), // Cast a any temporal
      planId: persistenceModel.planId,
      dbConnectionConfig: dbConfig,
      wabaCredentials: wabaCreds,
      isWhatsAppConfigured: persistenceModel.isWhatsAppConfigured,
    };

    // Para reconstruir la entidad desde la persistencia, necesitamos el constructor de la entidad
    // que acepte CreateEntityProps.
    return new TenantEntity({
      id: tenantId,
      props: entityProps,
      createdAt: new Date(persistenceModel.createdAt),
      updatedAt: new Date(persistenceModel.updatedAt),
    });
  }

  toPersistence(domainEntity: TenantEntity): PrismaTenant {
    // El tipo de retorno aquí debería ser Prisma.TenantCreateInput o Prisma.TenantUpdateInput
    // dependiendo de la operación. Para simplificar, usamos PrismaTenant, pero esto no es
    // estrictamente correcto para las operaciones de escritura de Prisma.
    return {
      id: domainEntity.id,
      name: domainEntity.name,
      slug: domainEntity.slug,
      ownerUserId: domainEntity.ownerUserId,
      status: domainEntity.status.value,
      planId: domainEntity.planId,
      dbConnectionStringEncrypted:
        domainEntity.dbConnectionConfig?.connectionString ?? null, // El repo se encarga de encriptar
      wabaId: domainEntity.wabaCredentials?.wabaId ?? null,
      wabaApiTokenEncrypted: domainEntity.wabaCredentials?.apiToken ?? null, // El repo se encarga de encriptar
      wabaDefaultPhoneNumberId:
        domainEntity.wabaCredentials?.defaultPhoneNumberId ?? null,
      isWhatsAppConfigured: domainEntity.isWhatsAppConfigured,
      createdAt: new Date(domainEntity.createdAt), // Prisma maneja la conversión a DateTime
      updatedAt: new Date(domainEntity.updatedAt),
    };
  }

  toResponse(domainEntity: TenantEntity): TenantDetailsDto {
    return {
      id: domainEntity.id,
      name: domainEntity.name,
      slug: domainEntity.slug,
      ownerUserId: domainEntity.ownerUserId,
      status: domainEntity.status.value,
      planId: domainEntity.planId,
      isWhatsAppConfigured: domainEntity.isWhatsAppConfigured,
      createdAt: domainEntity.createdAt,
      updatedAt: domainEntity.updatedAt,
    };
  }

  toResponseFromPersistence(persistenceModel: PrismaTenant): TenantDetailsDto {
    // Este método puede ser útil para optimizar queries de lectura
    return {
      id: persistenceModel.id as TenantId,
      name: persistenceModel.name,
      slug: persistenceModel.slug,
      ownerUserId: persistenceModel.ownerUserId as UserId,
      status: persistenceModel.status,
      planId: persistenceModel.planId,
      isWhatsAppConfigured: persistenceModel.isWhatsAppConfigured,
      createdAt: persistenceModel.createdAt.toISOString() as IsoDateString,
      updatedAt: persistenceModel.updatedAt.toISOString() as IsoDateString,
    };
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infratenancypersistence/src/lib/mappers/tenant.prisma-mapper.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Implementación del esqueleto de `TenantPrismaMapper`.",
    "justificacion": "Proporciona la lógica de mapeo entre `TenantEntity` y el modelo `PrismaTenant` (placeholder), y a `TenantDetailsDto` (placeholder). Es crucial para el adaptador de repositorio.",
    "impacto": "Componente de mapeo base."
  },
  {
    "mejora": "Manejo de VOs (`TenantStatusVO`, `DbConnectionConfigVO`, `WabaCredentialsVO`) en `toDomain` y `toPersistence`.",
    "justificacion": "Asegura que la entidad de dominio trabaje con VOs, mientras que el modelo de persistencia maneja primitivos.",
    "impacto": "Correcta implementación del patrón de mapeo con VOs."
  },
  {
    "mejora": "Notas sobre el tipo `PrismaTenant` y la necesidad de usar el cliente Prisma generado para la DB de plataforma.",
    "justificacion": "Clarifica que los tipos de Prisma son placeholders y deben ser reemplazados.",
    "impacto": "Guía para la implementación real."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Reemplazar los tipos placeholder `PrismaTenant` y `TenantDetailsDto` con los tipos reales una vez que se generen/definan.",
    "justificacion": "Seguridad de tipos completa.",
    "impacto": "Requiere que el schema Prisma de plataforma esté definido y el cliente generado, y que el DTO se defina en `coaptenancy`."
  },
  {
    "mejora": "El método `toPersistence` debería devolver tipos más específicos de Prisma como `Prisma.TenantCreateInput` o `Prisma.TenantUncheckedUpdateInput` para las operaciones de escritura, en lugar de `PrismaTenant`.",
    "justificacion": "Permite un uso más seguro y idiomático de las operaciones de escritura de Prisma.",
    "impacto": "Mapeo más preciso para operaciones CRUD."
  },
  {
    "mejora": "La lógica de encriptación/desencriptación para `dbConnectionStringEncrypted` y `wabaApiTokenEncrypted` debe ser manejada por `SecureTenantConfigRepositoryAdapter`, no directamente por el mapper.",
    "justificacion": "Separación de concerns. El mapper trabaja con el valor en claro (o el VO que lo encapsula), y el repositorio se encarga de la seguridad antes de la persistencia.",
    "impacto": "Diseño más limpio. El `WabaCredentialsVO` podría tomar el token encriptado y el `SecureTenantConfigRepositoryAdapter` desencriptarlo al cargar y encriptarlo al guardar."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "El cast `persistenceModel.status as any` en `toDomain` para `TenantStatusVO.create()` es un placeholder. Se debe asegurar que el valor de `status` en la DB sea un miembro válido de `TenantStatusEnum`."
  }
]
*/
