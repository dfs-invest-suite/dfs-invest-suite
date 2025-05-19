// libs/core/domain/tenancy/src/lib/errors/tenant-already-exists.error.ts
import { ExceptionBase } from '@dfs-suite/shared-errors'; // CAMBIO: Heredar de ExceptionBase
import { CorrelationId, ObjectLiteral } from '@dfs-suite/shared-types';

export const TENANT_ALREADY_EXISTS = 'TENANCY.TENANT_ALREADY_EXISTS';

// CAMBIO: Heredar de ExceptionBase en lugar de ConflictException
export class TenantAlreadyExistsError extends ExceptionBase {
  // 'override' ya no es necesario porque 'code' es abstracto en ExceptionBase
  public readonly code = TENANT_ALREADY_EXISTS;

  constructor(
    message = 'Tenant with the same identifier already exists.',
    cause?: Error,
    metadata?: ObjectLiteral,
    correlationId?: CorrelationId
  ) {
    super(message, cause, metadata, correlationId);
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Contexto en Metadata):
    Para este error, la metadata podría incluir el identificador (ej. nombre del tenant o email del owner) que causó el conflicto de "ya existe".
    Justificación: Ayuda a identificar rápidamente qué valor específico causó el error de duplicidad sin necesidad de buscar en logs adicionales o en los parámetros de la solicitud original.
    Impacto: El constructor necesitaría aceptar este dato contextual (ej. `conflictingIdentifier: string`) y pasarlo al objeto `metadata` de `ExceptionBase`. El servicio o caso de uso que lanza este error sería responsable de proveer esta información.
]
[
  Mejora Propuesta 2 (Error Más Específico para Diferentes Conflictos):
    Si un tenant puede "ya existir" debido a diferentes atributos únicos (ej. mismo nombre de empresa, mismo subdominio asignado, mismo email de owner principal), se podrían crear clases de error más específicas que hereden de `TenantAlreadyExistsError` o utilizar diferentes mensajes y códigos de error internos (pasados a la metadata) para diferenciar la causa exacta del conflicto.
    Justificación: Permite un manejo de errores más granular en la capa de aplicación o en la UI, pudiendo dar mensajes más precisos al usuario.
    Impacto: Definición de más clases de error o una lógica más compleja en el constructor de `TenantAlreadyExistsError` para manejar diferentes tipos de conflictos.
]
*/
// libs/core/domain/tenancy/src/lib/errors/tenant-already-exists.error.ts

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
