// libs/core/application/coapmultitenancy/src/lib/services/tenant-context.service.ts
import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable, Scope } from '@nestjs/common';

import { TenantId, UserId, CorrelationId, Maybe } from '@dfs-suite/shtypes';

import {
  ITenantContextData,
  ITenantContextService,
} from '../ports/tenant-context.service.port';

@Injectable({ scope: Scope.REQUEST }) // Crucial para NestJS si se inyecta en otros request-scoped providers
export class TenantContextServiceImpl implements ITenantContextService {
  private readonly asyncLocalStorage =
    new AsyncLocalStorage<ITenantContextData>();

  run<T>(context: ITenantContextData, callback: () => T): T {
    return this.asyncLocalStorage.run(context, callback);
  }

  setStore(context: ITenantContextData): void {
    // Este método es peligroso si no se gestiona bien el ciclo de vida del store.
    // `run` es preferible. Si se usa `setStore`, el llamador es responsable de limpiar
    // o asegurar que no haya fugas de contexto entre requests/jobs.
    // Para NestJS con Scope.REQUEST, cada request obtiene una nueva instancia de este servicio,
    // por lo que el `asyncLocalStorage` también sería "nuevo" para esa instancia, mitigando
    // algunos riesgos si `setStore` se usara desde un middleware.
    this.asyncLocalStorage.enterWith(context);
  }

  getStore(): Maybe<ITenantContextData> {
    return this.asyncLocalStorage.getStore();
  }

  getTenantIdOrFail(): TenantId {
    const store = this.getStore();
    if (!store?.tenantId) {
      throw new Error(
        'TenantId not found in TenantContext. Context not set or tenantId missing.'
      );
    }
    return store.tenantId;
  }

  getUserIdOrFail(): UserId {
    const store = this.getStore();
    if (!store?.userId) {
      throw new Error(
        'UserId not found in TenantContext. Context not set or userId missing.'
      );
    }
    return store.userId;
  }

  getCorrelationIdOrFail(): CorrelationId {
    const store = this.getStore();
    if (!store?.correlationId) {
      throw new Error(
        'CorrelationId not found in TenantContext. Context not set or correlationId missing.'
      );
    }
    return store.correlationId;
  }
}
// FIN DEL ARCHIVO: libs/core/application/coapmultitenancy/src/lib/services/tenant-context.service.ts
