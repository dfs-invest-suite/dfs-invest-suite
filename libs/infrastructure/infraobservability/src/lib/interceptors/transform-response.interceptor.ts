// RUTA: libs/infrastructure/infraobservability/src/lib/interceptors/transform-response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CorrelationId,
  IEnhancedApiResponse, // Usando la interfaz mejorada
  IsoDateString,
  TenantId, // Importar TenantId
  UserId,
} from '@dfs-suite/shtypes';
import { createOperationMetadata } from '@dfs-suite/shutils';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, IEnhancedApiResponse<T> | T>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<IEnhancedApiResponse<T> | T> {
    const requestType = context.getType<GqlContextType | 'http'>();

    if (requestType === 'graphql') {
      return next.handle();
    }

    const req = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyReq = req as any;
    const correlationIdFromReq: CorrelationId =
      (req.headers?.['x-correlation-id'] as CorrelationId) ||
      anyReq.id ||
      createOperationMetadata().correlationId;
    const userIdFromReq: string | undefined = anyReq.user?.userId; // Sigue siendo string | undefined aquí
    const tenantIdFromReq: string | undefined = anyReq.tenantId; // Sigue siendo string | undefined aquí

    return next.handle().pipe(
      map((data): IEnhancedApiResponse<T> | T => {
        if (
          data &&
          typeof data === 'object' &&
          'success' in data &&
          'timestamp' in data &&
          'correlationId' in data
        ) {
          return data as IEnhancedApiResponse<T>;
        }
        const response: IEnhancedApiResponse<T> = {
          success: true,
          data,
          timestamp: new Date().toISOString() as IsoDateString,
          correlationId: correlationIdFromReq,
          metadata: {
            requestId: correlationIdFromReq,
            // TODO: [LIA-POST-SPRINT] Asegurar que userIdFromReq y tenantIdFromReq tengan el tipo Branded correcto
            // antes de castear, una vez que la autenticación y el contexto del tenant estén completamente tipados.
            userId: userIdFromReq as UserId, // Cast temporal para satisfacer el tipo UserId
            tenantId: tenantIdFromReq as TenantId, // Cast temporal para satisfacer el tipo TenantId
          },
        };
        return response;
      })
    );
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infraobservability/src/lib/interceptors/transform-response.interceptor.ts
