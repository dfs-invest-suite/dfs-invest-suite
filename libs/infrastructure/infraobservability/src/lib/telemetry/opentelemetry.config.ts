// RUTA: libs/infrastructure/infraobservability/src/lib/telemetry/opentelemetry.config.ts
// Autor: L.I.A Legacy (IA Asistente) & RaZ WriTe
// Propósito: Configuración e inicialización de OpenTelemetry para tracing distribuido y métricas.

// --- IMPORTACIONES DE OPENTELEMETRY (POST-DEMO) ---
// import { NodeSDK, NodeSDKConfiguration } from '@opentelemetry/sdk-node';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'; // O -grpc, o -proto
// import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'; // O -grpc, o -proto
// import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
// import { Resource } from '@opentelemetry/resources';
// import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
// import { BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
// import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino'; // Para vincular logs con traces
// // Importar instrumentaciones automáticas para frameworks y librerías comunes:
// import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
// import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
// import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
// import { PgInstrumentation } from '@opentelemetry/instrumentation-pg'; // Para PostgreSQL con 'pg'
// import { PrismaInstrumentation } from '@opentelemetry/instrumentation-prisma'; // Experimental o comunitaria, verificar estado
// import { IORedisInstrumentation } from '@opentelemetry/instrumentation-ioredis';
// import { BullMqInstrumentation } from '@opentelemetry/instrumentation-bullmq'; // Si existe o se crea una comunitaria
// import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql'; // Para Apollo Server

// --- CONFIGURACIÓN DE OPENTELEMETRY (POST-DEMO) ---
// const OTEL_EXPORTER_OTLP_ENDPOINT = process.env['OTEL_EXPORTER_OTLP_ENDPOINT'] || 'http://localhost:4318'; // Default para Collector OTLP HTTP
// const OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = process.env['OTEL_EXPORTER_OTLP_TRACES_ENDPOINT'] || `${OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`;
// const OTEL_EXPORTER_OTLP_METRICS_ENDPOINT = process.env['OTEL_EXPORTER_OTLP_METRICS_ENDPOINT'] || `${OTEL_EXPORTER_OTLP_ENDPOINT}/v1/metrics`;

/**
 * Configura e inicializa el SDK de OpenTelemetry.
 * Esta función debe llamarse lo más temprano posible en el ciclo de vida de la aplicación.
 * (Actualmente es un placeholder para la demo).
 *
 * @param serviceName El nombre del servicio que está siendo instrumentado (ej. "api-main").
 * @param serviceVersion La versión del servicio.
 */
export function setupOpenTelemetry(
  serviceName: string,
  serviceVersion: string
): void {
  // void es el tipo de retorno correcto para una función de setup que no devuelve nada
  console.info(
    // Usar console.info para consistencia con otros logs de bootstrap
    `[TODO-LIA-DEMO] OpenTelemetry setup for ${serviceName} v${serviceVersion} - Placeholder. Implementar post-demo.`
  );

  // --- IMPLEMENTACIÓN COMPLETA (POST-DEMO) ---
  /*
  try {
    const resource = new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      [SemanticResourceAttributes.SERVICE_VERSION]: serviceVersion,
      // Otros atributos del recurso: deployment.environment, host.name, etc.
      'deployment.environment': process.env['NODE_ENV'] || 'development',
    });

    // Exporter de Traces (ej. OTLP HTTP a un Collector o Jaeger/Tempo directo)
    const traceExporter = new OTLPTraceExporter({
      url: OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
      // headers: {}, // Para autenticación si es necesaria
    });

    // Procesador de Spans (Batch es mejor para producción)
    const spanProcessor = new BatchSpanProcessor(traceExporter, {
      // Configuraciones del BatchSpanProcessor
      // maxQueueSize: 2048,
      // scheduledDelayMillis: 5000,
    });
    // const spanProcessor = new SimpleSpanProcessor(new ConsoleSpanExporter()); // Para debug local rápido

    // Exporter de Métricas (ej. OTLP HTTP)
    const metricExporter = new OTLPMetricExporter({
      url: OTEL_EXPORTER_OTLP_METRICS_ENDPOINT,
    });

    // Lector de Métricas (PeriodicExporting es común)
    const metricReader = new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 10000, // Exportar cada 10 segundos
    });

    const sdkConfig: Partial<NodeSDKConfiguration> = {
      resource,
      spanProcessor,
      metricReader,
      // textMapPropagator: new CompositePropagator([new W3CTraceContextPropagator(), new W3CBaggagePropagator()]), // Default ya incluye estos
      instrumentations: [
        new NestInstrumentation(),
        new HttpInstrumentation(), // Captura llamadas HTTP salientes/entrantes
        new ExpressInstrumentation(), // Si NestJS usa Express bajo el capó
        new PgInstrumentation({ enhancedDatabaseReporting: true }), // Para `pg`
        new PrismaInstrumentation(), // Verificar configuración para multi-tenant si es necesario
        new IORedisInstrumentation(),
        new BullMqInstrumentation(),
        new GraphQLInstrumentation({
          // Opciones para GraphQL, ej. depth, mergeItems, etc.
          // mergeItems: true, // Para agrupar múltiples resolvers en un solo span (puede ser útil)
          // depth: 2, // Limitar la profundidad de los campos GraphQL en los spans
        }),
        new PinoInstrumentation({
          // Opcional: para correlacionar logs con traces
          // logHook: (_span, record) => { record['resource.service.name'] = resource.attributes[SemanticResourceAttributes.SERVICE_NAME]; },
        }),
        // Añadir más instrumentaciones según las librerías usadas
      ],
    };

    const sdk = new NodeSDK(sdkConfig);

    // Graceful shutdown
    process.on('SIGTERM', () => {
      sdk.shutdown()
        .then(() => console.info('OpenTelemetry SDK shut down successfully.'))
        .catch((error) => console.error('Error shutting down OpenTelemetry SDK:', error))
        .finally(() => process.exit(0));
    });

    sdk.start();
    console.info(
      `OpenTelemetry SDK initialized for service: ${serviceName} v${serviceVersion}. Traces exporting to: ${OTEL_EXPORTER_OTLP_TRACES_ENDPOINT}`
    );

  } catch (error) {
    console.error('Failed to initialize OpenTelemetry SDK:', error);
  }
  */
}
// FIN DEL ARCHIVO: libs/infrastructure/infraobservability/src/lib/telemetry/opentelemetry.config.ts
