// RUTA: libs/infrastructure/infraobservability/src/lib/interceptors/logging.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  LoggerService, // Usar la interfaz LoggerService de NestJS para DI
  NestInterceptor,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CorrelationId } from '@dfs-suite/shtypes';
import { createOperationMetadata } from '@dfs-suite/shutils';

// TODO: [LIA Legacy] Inyectar ILoggerPort de cdskports en lugar de LoggerService de NestJS

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const requestType = context.getType<GqlContextType | 'http'>();

    let requestDetails = {
      method: '',
      path: '',
      ip: '',
      correlationId: 'UNKNOWN_CORRELATION_ID' as CorrelationId,
      userId: undefined as string | undefined,
      operationName: undefined as string | undefined, // Para GraphQL
    };

    if (requestType === 'http') {
      const req = context.switchToHttp().getRequest();
      requestDetails.method = req.method;
      requestDetails.path = req.url;
      requestDetails.ip = req.ip || req.connection?.remoteAddress;
      requestDetails.correlationId =
        req.headers?.['x-correlation-id'] ||
        req.id ||
        createOperationMetadata().correlationId;
      requestDetails.userId = req.user?.userId;
    } else if (requestType === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context).getContext();
      requestDetails.method = 'GraphQL'; // O 'Query', 'Mutation'
      requestDetails.path = gqlContext.req?.body?.operationName || 'N/A';
      requestDetails.operationName = requestDetails.path;
      requestDetails.ip =
        gqlContext.req?.ip || gqlContext.req?.connection?.remoteAddress;
      requestDetails.correlationId =
        gqlContext.req?.headers?.['x-correlation-id'] ||
        gqlContext.req?.id ||
        createOperationMetadata().correlationId;
      requestDetails.userId = gqlContext.req?.user?.userId;
    }

    this.logger.log(
      `[REQ] ${requestDetails.method} ${requestDetails.path} (User: ${
        requestDetails.userId || 'anonymous'
      }, IP: ${requestDetails.ip})`,
      'LoggingInterceptor', // Contexto del logger
      requestDetails.correlationId, // Pasar como correlationId explícito
      { type: 'REQUEST_START', ...requestDetails } // Metadata adicional
    );

    return next.handle().pipe(
      tap({
        next: (val) => {
          // Evitar loguear el valor completo 'val' si es muy grande o sensible
          const duration = Date.now() - now;
          this.logger.log(
            `[RES] ${requestDetails.method} ${
              requestDetails.path
            } - Status: ${this.getStatus(context, val)} - ${duration}ms`,
            'LoggingInterceptor',
            requestDetails.correlationId,
            {
              type: 'REQUEST_SUCCESS',
              durationMs: duration,
              ...requestDetails,
              // responseBody: val // CUIDADO: Puede ser muy grande o sensible
            }
          );
        },
        // El error se loguea en AllExceptionsFilter, pero podemos loguear aquí que la request falló
        error: (err) => {
          const duration = Date.now() - now;
          this.logger.warn(
            // Usar warn o error si se quiere que sea más ruidoso
            `[FAIL] ${requestDetails.method} ${requestDetails.path} - Error: ${err.message} - ${duration}ms`,
            'LoggingInterceptor',
            requestDetails.correlationId,
            {
              type: 'REQUEST_FAILURE',
              durationMs: duration,
              error: err.message,
              ...requestDetails,
            }
          );
        },
      })
    );
  }

  private getStatus(
    context: ExecutionContext,
    responseValue: any
  ): number | string {
    if (context.getType<GqlContextType | 'http'>() === 'http') {
      return context.switchToHttp().getResponse().statusCode;
    }
    // Para GraphQL, el status HTTP suele ser 200 incluso si hay errores en la respuesta.
    // Se podría inferir de `responseValue.errors` si es una respuesta GraphQL.
    if (
      responseValue &&
      Array.isArray(responseValue.errors) &&
      responseValue.errors.length > 0
    ) {
      return 'GraphQL Error';
    }
    return 'GraphQL Success';
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infraobservability/src/lib/interceptors/logging.interceptor.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Implementación de `LoggingInterceptor`.",
    "justificacion": "Proporciona logging estructurado para el inicio y fin (éxito/fallo) de cada solicitud HTTP y GraphQL, incluyendo `correlationId`, `userId`, IP, método, path y duración.",
    "impacto": "Mejora significativamente la observabilidad y trazabilidad de las solicitudes."
  },
  {
    "mejora": "Extracción de `correlationId` y `userId` del contexto de la solicitud.",
    "justificacion": "Permite que los logs sean correlacionados y atribuidos a usuarios.",
    "impacto": "Logs más útiles."
  },
  {
    "mejora": "Distinción entre logs de request HTTP y GraphQL.",
    "justificacion": "Captura información relevante para cada tipo de protocolo.",
    "impacto": "Precisión en el logging."
  },
  {
    "mejora": "Logging de la duración de la solicitud.",
    "justificacion": "Permite el análisis de performance.",
    "impacto": "Métricas de latencia."
  },
  {
    "mejora": "Manejo cuidadoso de no loguear el cuerpo de la respuesta (`val`) directamente para evitar verbosidad o exposición de datos sensibles.",
    "justificacion": "Seguridad y concisión de logs.",
    "impacto": "Logs más seguros."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Inyectar `ILoggerPort` en lugar de `LoggerService`.",
    "justificacion": "Desacoplamiento y uso de nuestra abstracción.",
    "impacto": "Alineación arquitectónica."
  },
  {
    "mejora": "Configuración de niveles de log y qué loguear (ej. headers, body parcial) a través de `ConfigService`.",
    "justificacion": "Mayor flexibilidad sin modificar el código del interceptor.",
    "impacto": "Personalización."
  },
  {
    "mejora": "Integración más profunda con OpenTelemetry para que los logs incluyan `traceId` y `spanId` automáticamente.",
    "justificacion": "Correlación completa con traces distribuidos.",
    "impacto": "Observabilidad mejorada."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Este interceptor debe ser registrado globalmente en `main.ts` de `api-main` usando `app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));`."
  },
  {
    "nota": "La lógica para obtener el `userId` de `req.user.userId` asume que un `AuthGuard` ya ha poblado `req.user`."
  }
]
*/
