// libs/core/domain/codoleadsflow/src/lib/errors/lead-already-exists.error.ts
import { ConflictException } from '@dfs-suite/sherrors';
import { CorrelationId, Maybe, ObjectLiteral } from '@dfs-suite/shtypes';

export const LEAD_ALREADY_EXISTS_ERROR_CODE = 'LEAD.ALREADY_EXISTS';

export class LeadAlreadyExistsError extends ConflictException {
  // No se redeclara `code` si `ConflictException` ya lo tiene como readonly y con un valor fijo.
  // Si se quisiera un código diferente, se pasaría en metadata o ExceptionBase tendría que ser más flexible.
  // Por ahora, si ConflictException tiene `public readonly code = GENERIC_CONFLICT;`, este se usará.
  // Si queremos que este error tenga un código específico 'LEAD.ALREADY_EXISTS',
  // y ExceptionBase lo permite, podríamos hacer:
  // public readonly code = LEAD_ALREADY_EXISTS_ERROR_CODE;

  constructor(
    identifier: string, // ej. email o teléfono que ya existe
    cause?: Maybe<Error | unknown>,
    correlationId?: Maybe<CorrelationId>
  ) {
    const metadata: ObjectLiteral = {
      identifier,
      specificDomainCode: LEAD_ALREADY_EXISTS_ERROR_CODE,
    };
    super(
      `Lead with identifier "${identifier}" already exists.`,
      cause,
      metadata,
      correlationId
    );
    // Si se permite sobreescribir/definir el code en la subclase y ConflictException no lo hace final:
    // this.code = LEAD_ALREADY_EXISTS_ERROR_CODE; // Esto daría error si code es readonly en ExceptionBase y ya asignado.
  }
}
// FIN DEL ARCHIVO: libs/core/domain/codoleadsflow/src/lib/errors/lead-already-exists.error.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creado el archivo `lead-already-exists.error.ts` que hereda de `ConflictException`.", "justificacion": "Define un error de dominio específico para cuando se intenta crear un lead que ya existe (ej. por email duplicado).", "impacto": "Manejo de errores de negocio más preciso." },
  { "mejora": "Se pasa un código específico de dominio (`LEAD.ALREADY_EXISTS`) a través de la `metadata`.", "justificacion": "Permite identificar el tipo de error de forma más granular sin necesidad de que la clase base `ConflictException` cambie su propio `code`.", "impacto": "Mayor información en el error sin romper la herencia." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
