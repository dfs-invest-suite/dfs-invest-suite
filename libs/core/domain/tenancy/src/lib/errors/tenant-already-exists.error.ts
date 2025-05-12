// libs/core/domain/tenancy/src/lib/errors/tenant-already-exists.error.ts
import { ExceptionBase } from '@dfs-suite/shared-errors'; // Cambiar a ExceptionBase
import { CorrelationId, ObjectLiteral } from '@dfs-suite/shared-types';

export const TENANT_ALREADY_EXISTS = 'TENANCY.TENANT_ALREADY_EXISTS';

// Heredar directamente de ExceptionBase
export class TenantAlreadyExistsError extends ExceptionBase {
  public readonly code = TENANT_ALREADY_EXISTS; // 'override' ya no es necesario

  constructor(message = 'Tenant with the same identifier already exists.', cause?: Error, metadata?: ObjectLiteral, correlationId?: CorrelationId) {
    super(message, cause, metadata, correlationId);
  }
}

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Contexto en Metadata): Para este error, la metadata podría incluir el identificador (ej. nombre o email) que causó el conflicto de "ya existe".
  Justificación: Ayuda a identificar rápidamente qué causó el error de duplicidad sin necesidad de buscar en logs adicionales.
  Impacto: El constructor necesitaría aceptar estos datos contextuales y pasarlos a la metadata de `ExceptionBase`. El servicio que lanza este error (probablemente un Caso de Uso) debería proveer esta información.
]
[
  Mejora Propuesta 2 (Códigos de Error Específicos): Si "Tenant ya existe" puede ocurrir por diferentes razones (ej. mismo nombre, mismo email de owner), se podrían crear códigos de error aún más específicos que hereden de `TenantAlreadyExistsError` o usar diferentes mensajes/metadata.
  Justificación: Permite un manejo de errores más granular en la UI o en la lógica del cliente.
  Impacto: Definición de más clases de error o lógica adicional en el constructor.
]

*/
// libs/core/domain/tenancy/src/lib/errors/tenant-already-exists.error.ts
