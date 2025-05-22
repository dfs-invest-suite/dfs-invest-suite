// apps/api-main/src/middleware/tenant-context.middleware.ts
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';

import {
  ITenantContextData,
  ITenantContextService,
  TENANT_CONTEXT_SERVICE_PORT,
} from '@dfs-suite/core-application-multitenancy';
import { CorrelationId, Maybe, TenantId, UserId } from '@dfs-suite/shtypes';
import { createOperationMetadata } from '@dfs-suite/shutils'; // Para generar CorrelationId si no existe

import type { NextFunction, Request, Response } from 'express'; // Asegúrate de que los tipos de Express estén disponibles

// Interfaz para extender el objeto Request de Express
interface AuthenticatedRequest extends Request {
  user?: {
    // Asumiendo que el AuthGuard poblará req.user
    userId: UserId;
    tenantId: TenantId;
    // otros campos del payload del JWT...
  };
  // El middleware anterior ya no añade tenantId directamente a req
}

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  constructor(
    @Inject(TENANT_CONTEXT_SERVICE_PORT)
    private readonly tenantContextService: ITenantContextService
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    // 1. Obtener Correlation ID
    let correlationId = req.headers['x-correlation-id'] as Maybe<CorrelationId>;
    if (!correlationId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requestId = (req as any).id as Maybe<string>; // Algunos frameworks añaden req.id
      correlationId = (requestId ||
        createOperationMetadata().correlationId) as CorrelationId;
    }
    // Adjuntar al response para trazabilidad
    res.setHeader('X-Correlation-ID', correlationId);

    // 2. Obtener Tenant ID y User ID (asumiendo que un AuthGuard ya los validó y adjuntó a req.user)
    // Si no hay req.user (ej. ruta pública o webhook antes de procesamiento), estos serán undefined.
    // Los webhooks necesitarán establecer el contexto en el worker después de identificar el tenant.
    const tenantIdFromAuth = req.user?.tenantId;
    const userIdFromAuth = req.user?.userId;

    // 3. Construir los datos del contexto
    // Para rutas no autenticadas o si el tenant no se puede determinar aquí,
    // tenantId y userId pueden ser placeholders o undefined.
    // La lógica del servicio/caso de uso deberá manejar esto.
    const contextData: ITenantContextData = {
      tenantId: tenantIdFromAuth || ('UNKNOWN_TENANT' as TenantId), // Placeholder si no hay auth/tenant
      userId: userIdFromAuth || ('ANONYMOUS_OR_SYSTEM' as UserId), // Placeholder
      correlationId,
    };

    // 4. Ejecutar el resto del pipeline de request DENTRO del contexto
    // El TenantContextService es request-scoped, por lo que cada request
    // tendrá su propia instancia y, por ende, su propio AsyncLocalStorage store implícito.
    // Usar el método `run` para asegurar que el contexto se establezca y limpie correctamente.
    this.tenantContextService.run(contextData, () => {
      next();
    });
  }
}
// FIN DEL ARCHIVO: apps/api-main/src/middleware/tenant-context.middleware.ts
