// RUTA: libs/infrastructure/infraobservability/src/lib/filters/all-exceptions.filter.ts
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';

import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import {
  ApiErrorCode, // Importar el enum si se va a usar para castear
  CorrelationId,
  IEnhancedApiResponse,
  IsoDateString,
  ObjectLiteral,
} from '@dfs-suite/shtypes';
import { createOperationMetadata } from '@dfs-suite/shutils';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    @Inject(LOGGER_PORT) private readonly logger: ILoggerPort,
    httpAdapterHost?: HttpAdapterHost
  ) {
    super(httpAdapterHost?.httpAdapter);
  }

  public override catch(exception: unknown, host: ArgumentsHost): void {
    const httpAdapter = this.applicationRef;
    const requestType: GqlContextType | 'http' | 'rpc' | 'ws' | string =
      host.getType();

    let correlationId: CorrelationId =
      'UNKNOWN_CORRELATION_ID' as CorrelationId;
    let path: string | undefined;
    let userIdFromRequest: string | undefined; // Usar un nombre diferente para evitar shadowing
    let tenantIdFromRequest: string | undefined; // Usar un nombre diferente
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let request: any;

    if (requestType === 'http' && httpAdapter) {
      const ctx = host.switchToHttp();
      request = ctx.getRequest();
      path =
        typeof httpAdapter.getRequestUrl === 'function'
          ? httpAdapter.getRequestUrl(request)
          : request.url;
      correlationId =
        (request.headers?.['x-correlation-id'] as CorrelationId) ||
        request.id ||
        createOperationMetadata().correlationId;
      userIdFromRequest = request.user?.userId;
      tenantIdFromRequest = request.tenantId;
    } else if (requestType === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host);
      const gqlContext = gqlHost.getContext();
      request = gqlContext.req;
      path = request?.body?.operationName || 'GraphQLOperation';
      correlationId =
        (request?.headers?.['x-correlation-id'] as CorrelationId) ||
        request?.id ||
        createOperationMetadata().correlationId;
      userIdFromRequest = request?.user?.userId;
      tenantIdFromRequest = request?.tenantId;
    }

    const baseError: ExceptionBase =
      exception instanceof ExceptionBase
        ? exception
        : exception instanceof HttpException
        ? new InternalServerErrorException(
            exception.message,
            exception,
            {
              statusCode: exception.getStatus(),
              response: exception.getResponse(),
            },
            correlationId
          )
        : new InternalServerErrorException(
            'An unexpected error occurred in the application.',
            exception instanceof Error
              ? exception
              : new Error(String(exception)),
            { originalError: String(exception) },
            correlationId
          );

    if (
      !baseError.correlationId ||
      baseError.correlationId === 'UNKNOWN_CORRELATION_ID' ||
      baseError.correlationId === 'NOT_SET_YET'
    ) {
      (baseError as { correlationId: CorrelationId }).correlationId =
        correlationId;
    }

    const logMetadata: ObjectLiteral = { ...(baseError.metadata || {}), path };
    if (userIdFromRequest) logMetadata['userId'] = userIdFromRequest;
    if (tenantIdFromRequest) logMetadata['tenantId'] = tenantIdFromRequest;

    if (
      exception instanceof HttpException &&
      !(exception instanceof ExceptionBase)
    ) {
      logMetadata['httpStatus'] = exception.getStatus();
      logMetadata['httpResponse'] = exception.getResponse();
    }

    this.logger.error(
      `[${baseError.code || 'UNHANDLED_EXCEPTION'}] ${
        baseError.message
      } (Path: ${path || 'N/A'})`,
      baseError.stack,
      'AllExceptionsFilter',
      baseError.correlationId,
      logMetadata
    );

    if (requestType === 'graphql') {
      throw baseError;
    } else if (httpAdapter && requestType === 'http') {
      const httpCtx = host.switchToHttp();
      const response = httpCtx.getResponse();
      const status =
        baseError instanceof HttpException
          ? baseError.getStatus()
          : (baseError.metadata as { statusCode?: number })?.statusCode ||
            HttpStatus.INTERNAL_SERVER_ERROR;
      const responsePath = path;

      const apiResponse: IEnhancedApiResponse<null> = {
        success: false,
        error: {
          code: baseError.code as ApiErrorCode, // TODO: [LIA-POST-SPRINT] Asegurar que todos los ExceptionBase.code sean ApiErrorCode
          message: baseError.message,
          path: responsePath,
          details: baseError.metadata
            ? [{ message: JSON.stringify(baseError.metadata) }]
            : undefined,
          stack:
            process.env['NODE_ENV'] === 'development' ||
            process.env['NODE_ENV'] === 'test'
              ? baseError.stack
              : undefined,
        },
        timestamp: new Date().toISOString() as IsoDateString,
        correlationId: baseError.correlationId,
        metadata: {
          requestId: baseError.correlationId,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          userId: userIdFromRequest as any, // TODO: [LIA-POST-SPRINT] Castear a UserId cuando el request.user esté bien tipado
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tenantId: tenantIdFromRequest as any, // TODO: [LIA-POST-SPRINT] Castear a TenantId cuando el request.tenantId esté bien tipado
        },
      };

      if (!response.headersSent) {
        httpAdapter.reply(response, apiResponse, status);
      } else {
        this.logger.warn(
          `Headers already sent for request to ${String(
            responsePath
          )}, cannot send error response.`,
          'AllExceptionsFilter',
          baseError.correlationId
        );
      }
    } else {
      this.logger.error(
        `Unhandled exception in non-HTTP/non-GraphQL context: ${baseError.message}`,
        baseError.stack,
        'AllExceptionsFilter',
        baseError.correlationId
      );
    }
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infraobservability/src/lib/filters/all-exceptions.filter.ts
