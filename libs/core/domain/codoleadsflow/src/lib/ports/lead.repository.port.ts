// libs/core/domain/codoleadsflow/src/lib/ports/lead.repository.port.ts
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import {
  EmailString,
  IPaginated,
  IPaginatedQueryParams,
  Maybe,
  PhoneNumberString,
  UserId,
} from '@dfs-suite/shtypes';

import {
  CreateLeadProps,
  LeadEntity,
  LeadProps,
} from '../entities/lead.entity';
import { LeadId } from '../types/lead.types'; // Importar el LeadId local
import { ELeadSourceChannel, ELeadStatus } from '../value-objects';

export interface LeadFilters {
  status?: Maybe<ELeadStatus[]>;
  assignedToUserId?: Maybe<UserId | null>;
  sourceChannel?: Maybe<ELeadSourceChannel[]>;
  searchQuery?: Maybe<string>;
  tags?: Maybe<string[]>;
  scoreMin?: Maybe<number>;
  scoreMax?: Maybe<number>;
  createdAtFrom?: Maybe<string>;
  createdAtTo?: Maybe<string>;
  lastInteractionFrom?: Maybe<string>;
  lastInteractionTo?: Maybe<string>;
}

export const LEAD_REPOSITORY_PORT = Symbol('ILeadRepositoryPort');

export interface ILeadRepositoryPort
  extends IRepositoryPort<LeadProps, LeadId, LeadEntity> {
  findByEmailOrPhone(
    email?: Maybe<EmailString>,
    phoneNumber?: Maybe<PhoneNumberString>
  ): Promise<Result<Maybe<LeadEntity>, ExceptionBase>>;

  findByWaId(
    waId: PhoneNumberString
  ): Promise<Result<Maybe<LeadEntity>, ExceptionBase>>;

  findBySlug(slug: string): Promise<Result<Maybe<LeadEntity>, ExceptionBase>>;

  findOrCreateByWaId(
    waId: PhoneNumberString,
    defaults: CreateLeadProps
  ): Promise<Result<LeadEntity, ExceptionBase>>;

  findAllPaginated(
    params: IPaginatedQueryParams,
    filters?: Maybe<LeadFilters>
  ): Promise<Result<IPaginated<LeadEntity>, ExceptionBase>>;
}
// FIN DEL ARCHIVO: libs/core/domain/codoleadsflow/src/lib/ports/lead.repository.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS (Reafirmadas de la iteración anterior)
[
  { "mejora": "Uso de `LeadProps` en `IRepositoryPort`. Correcta implementación de `IRepositoryPort`." },
  { "mejora": "Importación de `LeadId` desde `../types/lead.types.ts` local.", "impacto": "Uso del Branded ID específico del dominio." },
  { "mejora": "Definición de `LeadFilters` y uso en `findAllPaginated`.", "impacto": "API de filtrado más clara." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
