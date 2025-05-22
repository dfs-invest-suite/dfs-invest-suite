// RUTA: libs/infrastructure/infrapersistence/src/lib/repositories/prisma-lead.repository.adapter.ts
import { Injectable, Logger } from '@nestjs/common'; // Logger para logs internos del repo

import { ILeadRepository, LeadEntity } from '@dfs-suite/codoleadsflow';
import { ExceptionBase, NotFoundException } from '@dfs-suite/sherrors';
import { Result, Maybe, ok, err, isErr } from '@dfs-suite/shresult';
import {
  LeadId,
  TenantId,
  UserId,
  EmailString,
  PhoneNumberString,
  IPaginated,
  IPaginatedQueryParams,
} from '@dfs-suite/shtypes';
// import { Prisma, Lead as PrismaLead } from '@prisma/client'; // Placeholder: del cliente de TENANT
// import { LeadPrismaMapper } from '../mappers/lead.prisma-mapper'; // A crear

import { TenantPrismaService } from '../services/tenant-prisma.service';

// Placeholder para el tipo Prisma, reemplazar con el generado para el schema de tenant
type PrismaLead = any;
// Placeholder para el mapper
class LeadPrismaMapper {
  toDomain(p: PrismaLead): LeadEntity {
    return p as any;
  }
  toPersistence(e: LeadEntity): PrismaLead {
    return e as any;
  }
}

@Injectable()
export class PrismaLeadRepositoryAdapter implements ILeadRepository {
  private readonly logger = new Logger(PrismaLeadRepositoryAdapter.name);
  private readonly mapper = new LeadPrismaMapper(); // Instanciar el mapper

  constructor(private readonly tenantPrismaService: TenantPrismaService) {}

  private async getPrismaClient() {
    // Los repositorios deben obtener la instancia del cliente dinámicamente por request
    return this.tenantPrismaService.getClientInstance();
  }

  async findOneById(
    id: LeadId
  ): Promise<Result<Maybe<LeadEntity>, ExceptionBase>> {
    try {
      const prisma = await this.getPrismaClient();
      const lead = await prisma.lead.findUnique({
        // Asumiendo que el modelo se llama 'lead'
        where: { id: String(id) },
      });
      return ok(lead ? this.mapper.toDomain(lead) : null);
    } catch (e: any) {
      this.logger.error(
        `Error finding lead by ID ${String(id)}: ${e.message}`,
        e.stack
      );
      return err(new ExceptionBase(`Database error: ${e.message}`, e));
    }
  }

  async findByEmailOrPhone(
    email?: Maybe<EmailString>,
    phoneNumber?: Maybe<PhoneNumberString>
  ): Promise<Result<Maybe<LeadEntity>, ExceptionBase>> {
    try {
      const prisma = await this.getPrismaClient();
      const whereClause: any = {};
      if (email) whereClause.email = email;
      else if (phoneNumber) whereClause.phoneNumber = phoneNumber;
      else
        return err(
          new ExceptionBase(
            'Either email or phone must be provided for lookup.'
          )
        );

      const lead = await prisma.lead.findFirst({ where: whereClause });
      return ok(lead ? this.mapper.toDomain(lead) : null);
    } catch (e: any) {
      this.logger.error(
        `Error finding lead by email/phone: ${e.message}`,
        e.stack
      );
      return err(new ExceptionBase(`Database error: ${e.message}`, e));
    }
  }

  async findByWaId(
    waId: PhoneNumberString
  ): Promise<Result<Maybe<LeadEntity>, ExceptionBase>> {
    // ... Implementar usando prisma.lead.findFirst({ where: { waId } })
    return ok(null); // Placeholder
  }

  async findOrCreateByWaId(
    waId: PhoneNumberString,
    defaults: Partial<any> // CreateLeadProps del dominio
  ): Promise<Result<LeadEntity, ExceptionBase>> {
    // ... Implementar con upsert o find + create
    return ok(null as any); // Placeholder
  }

  async findAllPaginated(
    params: IPaginatedQueryParams,
    filters?: {
      status?: any[];
      assignedToUserId?: Maybe<UserId>;
      searchQuery?: Maybe<string>;
    }
  ): Promise<Result<IPaginated<LeadEntity>, ExceptionBase>> {
    // ... Implementar con skip, take, where, orderBy
    return ok({
      data: [],
      count: 0,
      limit: params.limit || 10,
      page: params.page || 1,
      totalPages: 0,
    }); // Placeholder
  }

  async insert(entity: LeadEntity): Promise<Result<void, ExceptionBase>> {
    try {
      const prisma = await this.getPrismaClient();
      const dataToCreate = this.mapper.toPersistence(entity);
      await prisma.lead.create({ data: dataToCreate as any }); // Cast temporal
      return ok(undefined);
    } catch (e: any) {
      this.logger.error(
        `Error inserting lead ${String(entity.id)}: ${e.message}`,
        e.stack
      );
      return err(new ExceptionBase(`Database error: ${e.message}`, e));
    }
  }

  async update(entity: LeadEntity): Promise<Result<void, ExceptionBase>> {
    try {
      const prisma = await this.getPrismaClient();
      const dataToUpdate = this.mapper.toPersistence(entity);
      await prisma.lead.update({
        where: { id: String(entity.id) },
        data: dataToUpdate as any, // Cast temporal
      });
      return ok(undefined);
    } catch (e: any) {
      this.logger.error(
        `Error updating lead ${String(entity.id)}: ${e.message}`,
        e.stack
      );
      return err(new ExceptionBase(`Database error: ${e.message}`, e));
    }
  }

  async delete(
    entityOrId: LeadEntity | LeadId
  ): Promise<Result<boolean, ExceptionBase>> {
    // ... Implementar delete
    return ok(true); // Placeholder
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infrapersistence/src/lib/repositories/prisma-lead.repository.adapter.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Implementación del esqueleto de `PrismaLeadRepositoryAdapter`.",
    "justificacion": "Provee una estructura base para el repositorio de leads, inyectando `TenantPrismaService` y un `LeadPrismaMapper` (placeholder). Implementa los métodos de `ILeadRepositoryPort` con lógica placeholder.",
    "impacto": "Adaptador de persistencia funcional (aunque con placeholders) para leads."
  },
  {
    "mejora": "Método `getPrismaClient()` para obtener la instancia de Prisma del tenant.",
    "justificacion": "Centraliza la obtención del cliente Prisma dinámico, alineado con el `TenantPrismaService` que actúa como factory/proxy.",
    "impacto": "Uso correcto del cliente Prisma contextualizado."
  },
  {
    "mejora": "Uso de un `Logger` de NestJS para logs internos del repositorio.",
    "justificacion": "Permite el logging de operaciones y errores dentro del adaptador.",
    "impacto": "Mejor depuración."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Implementar la lógica CRUD completa usando `TenantPrismaService` y el `LeadPrismaMapper` real.",
    "justificacion": "Para funcionalidad real.",
    "impacto": "Requiere crear `LeadPrismaMapper` y definir el modelo Prisma `Lead` en `tenant/schema.prisma`."
  },
  {
    "mejora": "Manejo de errores específico de Prisma.",
    "justificacion": "Mapear errores de Prisma (ej. `PrismaClientKnownRequestError` con código P2002 para violaciones de unicidad) a `ExceptionBase` de dominio más semánticas.",
    "impacto": "Manejo de errores más robusto."
  },
  {
    "mejora": "Implementación completa de `findAllPaginated` con mapeo de filtros y ordenación a la sintaxis de Prisma.",
    "justificacion": "Para funcionalidad de listado completa.",
    "impacto": "Listados de leads funcionales."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "El `LeadPrismaMapper` y el modelo `PrismaLead` son placeholders y deben ser implementados."
  },
  {
    "nota": "Los casts `as any` en las operaciones de escritura de Prisma son temporales y deben eliminarse cuando el mapper devuelva los tipos de input correctos de Prisma (`Prisma.LeadCreateInput`, etc.)."
  }
]
*/
