// RUTA: libs/core/domain/codotenancy/src/lib/errors/tenant-configuration-not-found.error.ts
// Autor: L.I.A Legacy (IA Asistente)
import { NotFoundException } from '@dfs-suite/sherrors';
import {
  CorrelationId,
  Maybe,
  ObjectLiteral,
  TenantId,
} from '@dfs-suite/shtypes';

export const TENANT_CONFIGURATION_NOT_FOUND_ERROR_CODE =
  'TENANCY.CONFIGURATION_NOT_FOUND';

export class TenantConfigurationNotFoundError extends NotFoundException {
  // Mover la asignación de 'code' al constructor después de llamar a super()
  // o eliminarla si ExceptionBase ya permite pasar el código.
  // ExceptionBase.code es abstract readonly, por lo que debe definirse en la subclase.
  public readonly code = TENANT_CONFIGURATION_NOT_FOUND_ERROR_CODE; // Esto es correcto

  constructor(
    tenantId: TenantId,
    configKey?: Maybe<string>,
    cause?: Maybe<Error | unknown>,
    correlationId?: Maybe<CorrelationId>
  ) {
    const message = configKey
      ? `Configuration with key "${configKey}" not found for tenant "${String(
          tenantId
        )}".`
      : `No configuration found for tenant "${String(tenantId)}".`;
    const metadata: ObjectLiteral = { tenantId: String(tenantId) };
    if (configKey) metadata['configKey'] = configKey;

    super(message, cause, metadata, correlationId);
    // this.code = TENANT_CONFIGURATION_NOT_FOUND_ERROR_CODE; // No se puede asignar aquí si es readonly y ya asignado arriba
  }
}
// RUTA: libs/core/domain/codotenancy/src/lib/errors/tenant-configuration-not-found.error.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "La asignación de `this.code` se hace como una propiedad de instancia `readonly` en la declaración de la clase.", "justificacion": "`ExceptionBase.code` es `abstract readonly`, por lo que las subclases deben declararlo como `readonly` y asignarle valor directamente en la declaración o en el constructor antes de `super()` si no fuera `readonly`. La forma actual es la más limpia para propiedades `readonly`.", "impacto": "Resuelve el error TS2540." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
