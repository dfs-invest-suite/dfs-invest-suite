// RUTA: libs/infrastructure/infratenancypersistence/src/lib/repositories/secure-tenant-config.repository.adapter.ts
import { Inject, Injectable } from '@nestjs/common';

import {
  ITenantConfigurationRepository,
  TenantConfigurationEntity,
} from '@dfs-suite/codotenancy';
import { ExceptionBase, NotFoundException } from '@dfs-suite/sherrors';
import { Result, ok, err, isErr, Maybe } from '@dfs-suite/shresult';
import { TenantId, AggregateId } from '@dfs-suite/shtypes';
// import { Prisma, TenantConfiguration as PrismaTenantConfiguration } from '@prisma/client'; // Placeholder: del cliente de plataforma
import {
  IEncryptionService,
  ENCRYPTION_SERVICE_PORT,
} from '@dfs-suite/infrasecurity'; // Asumiendo este puerto

import { PlatformPrismaService } from '../services/platform-prisma.service';
// import { TenantConfigPrismaMapper } from '../mappers/tenant-config.prisma-mapper'; // A crear

// Placeholder para el tipo Prisma, reemplazar con el generado
interface PrismaTenantConfiguration {
  id: string; // AggregateId
  tenantId: string; // TenantId
  key: string;
  valueEncrypted: string; // El valor se almacena encriptado
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class SecureTenantConfigRepositoryAdapter
  implements ITenantConfigurationRepository
{
  constructor(
    private readonly prisma: PlatformPrismaService,
    @Inject(ENCRYPTION_SERVICE_PORT)
    private readonly encryptionService: IEncryptionService // private readonly mapper: TenantConfigPrismaMapper
  ) {}

  async findOneById(
    id: AggregateId
  ): Promise<Result<Maybe<TenantConfigurationEntity>, ExceptionBase>> {
    try {
      const config = await this.prisma.tenantConfiguration.findUnique({
        // Asume que el modelo se llama tenantConfiguration
        where: { id: String(id) },
      });
      if (!config) return ok(null);

      // Desencriptar el valor ANTES de pasarlo al mapper o a la entidad
      const decryptedValueResult = await this.encryptionService.decrypt(
        config.valueEncrypted
      );
      if (isErr(decryptedValueResult)) return err(decryptedValueResult.error);

      // Placeholder para el mapper o construcción directa de la entidad
      const domainEntity = TenantConfigurationEntity.create(
        {
          tenantId: config.tenantId as TenantId,
          key: config.key,
          value: decryptedValueResult.value,
          description: config.description ?? undefined,
        },
        config.id as AggregateId
      );
      // (domainEntity as any)._createdAt = config.createdAt; // Rehidratar timestamps
      // (domainEntity as any)._updatedAt = config.updatedAt;
      return ok(domainEntity);
    } catch (e: any) {
      return err(
        new ExceptionBase(`Error finding tenant config by ID: ${e.message}`, e)
      );
    }
  }

  async findByTenantIdAndKey(
    tenantId: TenantId,
    key: string
  ): Promise<Result<Maybe<TenantConfigurationEntity>, ExceptionBase>> {
    try {
      const config = await this.prisma.tenantConfiguration.findUnique({
        where: { tenantId_key: { tenantId: String(tenantId), key } }, // Asume un índice único tenantId_key
      });
      if (!config) return ok(null);

      const decryptedValueResult = await this.encryptionService.decrypt(
        config.valueEncrypted
      );
      if (isErr(decryptedValueResult)) return err(decryptedValueResult.error);

      const domainEntity = TenantConfigurationEntity.create(
        {
          tenantId: config.tenantId as TenantId,
          key: config.key,
          value: decryptedValueResult.value,
          description: config.description ?? undefined,
        },
        config.id as AggregateId
      );
      return ok(domainEntity);
    } catch (e: any) {
      return err(
        new ExceptionBase(
          `Error finding tenant config by tenantId and key: ${e.message}`,
          e
        )
      );
    }
  }

  async findAllByTenantId(
    tenantId: TenantId
  ): Promise<Result<TenantConfigurationEntity[], ExceptionBase>> {
    // Implementar con desencriptación para cada item
    return ok([]); // Placeholder
  }

  async insert(
    entity: TenantConfigurationEntity
  ): Promise<Result<void, ExceptionBase>> {
    try {
      const encryptedValueResult = await this.encryptionService.encrypt(
        entity.value
      );
      if (isErr(encryptedValueResult)) return err(encryptedValueResult.error);

      await this.prisma.tenantConfiguration.create({
        data: {
          id: String(entity.id),
          tenantId: String(entity.tenantId),
          key: entity.key,
          valueEncrypted: encryptedValueResult.value,
          description: entity.description,
          createdAt: new Date(entity.createdAt),
          updatedAt: new Date(entity.updatedAt),
        },
      });
      return ok(undefined);
    } catch (e: any) {
      return err(
        new ExceptionBase(`Error inserting tenant config: ${e.message}`, e)
      );
    }
  }

  async update(
    entity: TenantConfigurationEntity
  ): Promise<Result<void, ExceptionBase>> {
    try {
      const encryptedValueResult = await this.encryptionService.encrypt(
        entity.value
      );
      if (isErr(encryptedValueResult)) return err(encryptedValueResult.error);

      await this.prisma.tenantConfiguration.update({
        where: { id: String(entity.id) },
        data: {
          valueEncrypted: encryptedValueResult.value,
          description: entity.description,
          updatedAt: new Date(entity.updatedAt), // Prisma puede manejar esto automáticamente
        },
      });
      return ok(undefined);
    } catch (e: any) {
      return err(
        new ExceptionBase(`Error updating tenant config: ${e.message}`, e)
      );
    }
  }

  async delete(
    entityOrId: TenantConfigurationEntity | AggregateId
  ): Promise<Result<boolean, ExceptionBase>> {
    const id = typeof entityOrId === 'string' ? entityOrId : entityOrId.id;
    try {
      await this.prisma.tenantConfiguration.delete({
        where: { id: String(id) },
      });
      return ok(true);
    } catch (e: any) {
      // Manejar error si el registro no existe para delete (Prisma puede lanzar P2025)
      return ok(false); // O err()
    }
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infratenancypersistence/src/lib/repositories/secure-tenant-config.repository.adapter.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Implementación del esqueleto de `SecureTenantConfigRepositoryAdapter`.",
    "justificacion": "Provee la lógica de persistencia para `TenantConfigurationEntity`, crucialmente integrando `IEncryptionService` para encriptar/desencriptar el campo `value`.",
    "impacto": "Adaptador de persistencia seguro para configuraciones de tenant."
  },
  {
    "mejora": "Manejo explícito de encriptación en `insert`/`update` y desencriptación en `findOneById`/`findByTenantIdAndKey`.",
    "justificacion": "Asegura que los datos sensibles se almacenen encriptados y se manejen en claro solo en memoria dentro de la entidad.",
    "impacto": "Seguridad de los datos de configuración."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Implementar un `TenantConfigPrismaMapper`.",
    "justificacion": "Para desacoplar la lógica de mapeo entre la entidad de dominio y el modelo Prisma.",
    "impacto": "Código más limpio y mantenible."
  },
  {
    "mejora": "Manejo de errores más granular de Prisma.",
    "justificacion": "Capturar y mapear códigos de error específicos de Prisma (ej. P2025 para 'Record not found') a excepciones de dominio más semánticas.",
    "impacto": "Mejor manejo de errores."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "El schema Prisma para la base de datos de plataforma debe tener un modelo `TenantConfiguration` con un campo `valueEncrypted` y un índice único en `(tenantId, key)`."
  },
  {
    "nota": "El `ENCRYPTION_SERVICE_PORT` y su implementación `AesEncryptionService` deben estar definidos y proveídos por `InfraSecurityModule`."
  }
]
*/
