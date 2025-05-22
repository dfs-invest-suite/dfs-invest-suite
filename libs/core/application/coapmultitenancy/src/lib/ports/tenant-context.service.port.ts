// libs/core/application/coapmultitenancy/src/lib/ports/tenant-context.service.port.ts
import { CorrelationId, Maybe, TenantId, UserId } from '@dfs-suite/shtypes';

export interface ITenantContextData {
  readonly tenantId: TenantId;
  readonly userId: UserId; // Puede ser un ID de usuario real o un identificador de sistema/job
  readonly correlationId: CorrelationId;
}

export interface ITenantContextService {
  /**
   * Ejecuta una función dentro de un contexto de tenant específico.
   * AsyncLocalStorage asegura que getStore() dentro del callback devuelva este contexto.
   * @param context - Los datos del contexto (tenantId, userId, correlationId).
   * @param callback - La función a ejecutar dentro del contexto.
   */
  run<T>(context: ITenantContextData, callback: () => T): T;

  /**
   * (Alternativa para Middlewares/Jobs) Establece el contexto para el scope asíncrono actual.
   * Debe ser usado con precaución y usualmente al inicio de un request/job.
   * `run` es generalmente preferido para asegurar que el contexto se limpie.
   */
  setStore(context: ITenantContextData): void;

  /**
   * Obtiene los datos del contexto de tenant actual.
   * @returns El ITenantContextData si está definido, o undefined.
   */
  getStore(): Maybe<ITenantContextData>;

  /**
   * Obtiene el TenantId del contexto actual.
   * @throws Error si TenantId no está definido en el contexto.
   */
  getTenantIdOrFail(): TenantId;

  /**
   * Obtiene el UserId del contexto actual.
   * @throws Error si UserId no está definido en el contexto.
   */
  getUserIdOrFail(): UserId;

  /**
   * Obtiene el CorrelationId del contexto actual.
   * @throws Error si CorrelationId no está definido en el contexto.
   */
  getCorrelationIdOrFail(): CorrelationId;
}

export const TENANT_CONTEXT_SERVICE_PORT = Symbol('ITenantContextServicePort');
// FIN DEL ARCHIVO: libs/core/application/coapmultitenancy/src/lib/ports/tenant-context.service.port.ts
