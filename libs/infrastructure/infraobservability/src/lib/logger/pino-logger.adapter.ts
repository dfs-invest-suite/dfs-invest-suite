// libs/infrastructure/infraobservability/src/lib/logger/pino-logger.adapter.ts
import * as os from 'node:os';

import {
  Inject,
  Injectable,
  LoggerService,
  Optional,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import pino, {
  DestinationStream,
  LogEvent,
  Logger as PinoLoggerInstance,
} from 'pino'; // Importar LogEvent
import pinoPretty from 'pino-pretty';

import { ILoggerPort } from '@dfs-suite/cdskports';
import {
  ITenantContextService,
  TENANT_CONTEXT_SERVICE_PORT,
} from '@dfs-suite/core-application-multitenancy';
import { CorrelationId, Maybe, ObjectLiteral } from '@dfs-suite/shtypes';

@Injectable({ scope: Scope.TRANSIENT })
export class PinoLoggerAdapter implements ILoggerPort, LoggerService {
  private pinoInstance: PinoLoggerInstance;
  private baseContext: string = 'Application';

  constructor(
    private readonly configService: ConfigService,
    @Optional()
    @Inject(TENANT_CONTEXT_SERVICE_PORT)
    private readonly tenantContextService?: ITenantContextService
  ) {
    const nodeEnv = this.configService.get<string>('NODE_ENV') ?? 'development';
    const logLevel = this.configService.get<string>('LOG_LEVEL', 'info');

    const stream: DestinationStream =
      nodeEnv !== 'production'
        ? pinoPretty({
            colorize: true,
            singleLine: false,
            translateTime: 'SYS:standard',
            ignore:
              'pid,hostname,contextValue,correlationIdValue,userIdValue,tenantIdValue,req,res,err,stack,tenantId,userId,correlationId,context', // Ignorar los campos que ya formateamos
            messageFormat: (log, messageKey) => {
              const logAny = log as LogEvent & Record<string, any>; // Usar LogEvent y Record
              const context =
                logAny['contextValue'] || this.baseContext || 'App';
              const correlation =
                logAny['correlationIdValue'] ||
                logAny['correlationId'] ||
                'N/A';
              const user =
                logAny['userIdValue'] || logAny['userId'] || 'system';
              const tenant =
                logAny['tenantIdValue'] || logAny['tenantId'] || 'platform';
              return `[${String(tenant)}|${String(user)}] <${String(
                correlation
              )}> (${String(context)}) ${logAny[messageKey] as string}`;
            },
          })
        : process.stdout;

    this.pinoInstance = pino(
      {
        level: logLevel,
        base: {
          pid: process.pid,
          hostname: os.hostname(),
        },
        timestamp: pino.stdTimeFunctions.isoTime,
        mixin: () => {
          const store = this.tenantContextService?.getStore();
          const contextFields: ObjectLiteral = {};
          if (store) {
            // Estos son los que usa el messageFormat de pino-pretty
            if (store.tenantId) contextFields['tenantIdValue'] = store.tenantId;
            if (store.userId) contextFields['userIdValue'] = store.userId;
            if (store.correlationId)
              contextFields['correlationIdValue'] = store.correlationId;
          }
          return contextFields;
        },
        formatters: {
          log: (obj: Record<string, any>) => {
            // Tipar obj más explícitamente
            const store = this.tenantContextService?.getStore();
            // Asignar directamente al nivel raíz para el stream JSON
            obj['tenantId'] =
              obj['tenantIdValue'] || store?.tenantId || 'platform_CTX_MISSING';
            obj['userId'] =
              obj['userIdValue'] || store?.userId || 'system_CTX_MISSING';
            obj['correlationId'] =
              obj['correlationIdValue'] ||
              store?.correlationId ||
              'NOT_SET_CTX_MISSING';
            obj['context'] = obj['contextValue'] || this.baseContext;

            delete obj['tenantIdValue'];
            delete obj['userIdValue'];
            delete obj['correlationIdValue'];
            delete obj['contextValue'];
            return obj;
          },
        },
      },
      stream
    );
  }

  setContext(context: string): void {
    this.baseContext = context;
  }

  // getLogMeta ahora solo necesita añadir contextValue y el correlationId explícito si se pasa
  private getLogMeta(
    passedContext?: Maybe<string>,
    passedCorrelationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral>
  ): ObjectLiteral {
    const logObject: ObjectLiteral = { ...(metadata || {}) };
    logObject['contextValue'] = passedContext || this.baseContext;

    if (passedCorrelationId) {
      logObject['correlationIdValue'] = passedCorrelationId; // Para pino-pretty
      logObject['correlationId'] = passedCorrelationId; // Para JSON output
    }
    // Los demás campos (tenantId, userId) son añadidos por el mixin o el formatter.log
    return logObject;
  }

  debug(
    message: string,
    context?: Maybe<string>,
    correlationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral>
  ): void {
    this.pinoInstance.debug(
      this.getLogMeta(context, correlationId, metadata),
      message
    );
  }
  log(
    message: string,
    context?: Maybe<string>,
    correlationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral>
  ): void {
    this.pinoInstance.info(
      this.getLogMeta(context, correlationId, metadata),
      message
    );
  }
  warn(
    message: string,
    context?: Maybe<string>,
    correlationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral>
  ): void {
    this.pinoInstance.warn(
      this.getLogMeta(context, correlationId, metadata),
      message
    );
  }
  error(
    errorInstanceOrMessage: string | Error,
    stack?: Maybe<string>,
    context?: Maybe<string>,
    correlationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral>
  ): void {
    const meta = this.getLogMeta(context, correlationId, metadata);
    if (errorInstanceOrMessage instanceof Error) {
      this.pinoInstance.error(
        {
          ...meta,
          err: errorInstanceOrMessage,
          stack: stack || errorInstanceOrMessage.stack,
        },
        errorInstanceOrMessage.message
      );
    } else {
      this.pinoInstance.error(
        { ...meta, stack },
        errorInstanceOrMessage as string
      );
    }
  }
  verbose(
    message: string,
    context?: Maybe<string>,
    correlationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral>
  ): void {
    this.pinoInstance.trace(
      this.getLogMeta(context, correlationId, metadata),
      message
    );
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infraobservability/src/lib/logger/pino-logger.adapter.ts
