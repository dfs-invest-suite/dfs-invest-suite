// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-filter.dto.ts
import { ELeadStatus, ELeadSourceChannel } from '@dfs-suite/codoleadsflow';
import { Maybe, UserId } from '@dfs-suite/shtypes';

// Usado como parte del payload de ListLeadsQuery
export interface LeadFilterAppDto {
  status?: Maybe<ELeadStatus[]>; // Array para filtrar por múltiples estados
  assignedToUserId?: Maybe<UserId | null>; // null para no asignados
  sourceChannel?: Maybe<ELeadSourceChannel[]>;
  searchQuery?: Maybe<string>; // Para buscar por nombre, email, teléfono
  tags?: Maybe<string[]>;
  scoreMin?: Maybe<number>;
  scoreMax?: Maybe<number>;
  createdAtFrom?: Maybe<string>; // IsoDateString
  createdAtTo?: Maybe<string>; // IsoDateString
  lastInteractionFrom?: Maybe<string>;
  lastInteractionTo?: Maybe<string>;
  // Filtros por campos custom (más complejo, podría ser un objeto)
  // customFieldFilters?: Maybe<Record<string, string | number | boolean>>;
}
// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-filter.dto.ts
