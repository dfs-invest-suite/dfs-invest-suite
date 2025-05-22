// libs/infrastructure/infraqueue/src/lib/infraqueue.module.ts
import {
  BullModule,
  getQueueToken, // Para obtener instancias de Queue
} from '@nestjs/bullmq';
import {
  DynamicModule,
  Module,
  Provider,
  OnApplicationBootstrap, // Para registrar las colas en el adaptador
  Inject, // Para inyectar el adaptador
  Logger, // Para logging
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { QUEUE_PORT } from '@dfs-suite/coapwhatsapp'; // Asegurar que el token se exporte correctamente

import {
  WHATSAPP_OUTBOUND_QUEUE,
  WHATSAPP_WEBHOOK_QUEUE,
  LEAD_IMPORT_QUEUE,
  NOTIFICATION_DELIVERY_QUEUE, // Asegurar que esté definido
} from './constants/queue-names.constants';
import { BullMqQueueAdapter } from './adapters/bullmq-queue.adapter';
// Procesadores (descomentar cuando se implementen)
// import { LeadImportProcessor } from './processors/lead-import.processor';
// import { WhatsappOutboundProcessor } from './processors/whatsapp-outbound.processor';
// import { WhatsappWebhookProcessor } from './processors/whatsapp-webhook.processor';

const QUEUE_NAMES_TO_REGISTER = [
  WHATSAPP_OUTBOUND_QUEUE,
  WHATSAPP_WEBHOOK_QUEUE,
  LEAD_IMPORT_QUEUE,
  NOTIFICATION_DELIVERY_QUEUE,
];

const queuePortProvider: Provider = {
  provide: QUEUE_PORT,
  useClass: BullMqQueueAdapter, // BullMqQueueAdapter será un singleton aquí
};

@Module({})
export class InfraQueueModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(InfraQueueModule.name);

  constructor(
    // Inyectar el adaptador para poder registrar las colas en él
    @Inject(QUEUE_PORT) private readonly queueAdapter: BullMqQueueAdapter,
    // Inyectar cada cola para pasarlas al adaptador
    @Inject(getQueueToken(WHATSAPP_OUTBOUND_QUEUE))
    private readonly whatsappOutboundQueue: any, // Tipo BullMQ.Queue
    @Inject(getQueueToken(WHATSAPP_WEBHOOK_QUEUE))
    private readonly whatsappWebhookQueue: any,
    @Inject(getQueueToken(LEAD_IMPORT_QUEUE))
    private readonly leadImportQueue: any,
    @Inject(getQueueToken(NOTIFICATION_DELIVERY_QUEUE))
    private readonly notificationDeliveryQueue: any
  ) {}

  onApplicationBootstrap() {
    // Registrar las colas inyectadas en el adaptador
    if (
      this.queueAdapter &&
      typeof this.queueAdapter.registerQueue === 'function'
    ) {
      this.queueAdapter.registerQueue(
        WHATSAPP_OUTBOUND_QUEUE,
        this.whatsappOutboundQueue
      );
      this.queueAdapter.registerQueue(
        WHATSAPP_WEBHOOK_QUEUE,
        this.whatsappWebhookQueue
      );
      this.queueAdapter.registerQueue(LEAD_IMPORT_QUEUE, this.leadImportQueue);
      this.queueAdapter.registerQueue(
        NOTIFICATION_DELIVERY_QUEUE,
        this.notificationDeliveryQueue
      );
      this.logger.log(
        'All BullMQ queues successfully registered with BullMqQueueAdapter.'
      );
    } else {
      this.logger.error(
        'queueAdapter is not available or registerQueue method is missing for InfraQueueModule.'
      );
    }
  }

  static forRootAsync(): DynamicModule {
    const queueModules = QUEUE_NAMES_TO_REGISTER.map((queueName) =>
      BullModule.registerQueueAsync({
        name: queueName,
        imports: [ConfigModule], // ConfigModule para useFactory
        useFactory: (configService: ConfigService) => ({
          // La conexión Redis se define en BullModule.forRootAsync en AppModule
          // Aquí solo configuramos opciones específicas de la cola
          defaultJobOptions: {
            attempts:
              configService.get<number>(
                `BULLMQ_QUEUE_${queueName.toUpperCase()}_ATTEMPTS`
              ) ?? 3,
            backoff: {
              type: 'exponential',
              delay:
                configService.get<number>(
                  `BULLMQ_QUEUE_${queueName.toUpperCase()}_BACKOFF_DELAY`
                ) ?? 1000,
            },
            removeOnComplete: { count: 1000, age: 24 * 3600 }, // Mantener últimos 1000 por 24h
            removeOnFail: { count: 5000, age: 7 * 24 * 3600 }, // Mantener últimos 5000 fallidos por 7 días
          },
          // Opcional: Limiter para la cola (rate limiting a nivel de cola)
          // limiter: { max: 100, duration: 1000 }, // ej. 100 jobs por segundo
        }),
        inject: [ConfigService],
      })
    );

    return {
      module: InfraQueueModule,
      imports: [
        ConfigModule, // Para el constructor del módulo si necesita ConfigService
        ...queueModules, // Importar todos los BullModule.registerQueueAsync
      ],
      providers: [
        queuePortProvider, // Provee BullMqQueueAdapter para el token QUEUE_PORT
        // BullMqQueueAdapter, // No es necesario proveer la clase explícitamente si se usa useClass en queuePortProvider
        // Procesadores (descomentar cuando existan)
        // LeadImportProcessor,
        // WhatsappOutboundProcessor,
        // WhatsappWebhookProcessor,
      ],
      exports: [
        BullModule, // Re-exportar para que api-main u otros puedan inyectar colas específicas con @InjectQueue()
        QUEUE_PORT,
      ],
    };
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infraqueue/src/lib/infraqueue.module.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementado `OnApplicationBootstrap` en `InfraQueueModule` para inyectar las instancias de `Queue` (obtenidas con `getQueueToken`) y registrarlas en `BullMqQueueAdapter`.", "justificacion": "Este es un patrón común en NestJS para asegurar que un servicio (el adaptador) tenga acceso a instancias gestionadas por otros módulos (BullModule) después de que todas las dependencias estén resueltas. Resuelve el problema de cómo el adaptador genérico conoce las colas específicas.", "impacto": "El `BullMqQueueAdapter` ahora puede obtener las instancias de `Queue` correctamente para añadir jobs." },
  { "mejora": "Añadida la cola `NOTIFICATION_DELIVERY_QUEUE` a `QUEUE_NAMES_TO_REGISTER` y a la inyección en el constructor.", "justificacion": "Completitud y preparación para futuras funcionalidades de notificación.", "impacto": "Preparación." },
  { "mejora": "Opciones `removeOnComplete` y `removeOnFail` en `defaultJobOptions` configuradas con valores más específicos.", "justificacion": "Mejora la gestión de jobs completados y fallidos en Redis.", "impacto": "Mantenimiento de colas."}
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {"nota": "Los procesadores de cola (`LeadImportProcessor`, etc.) deben ser creados e importados/proveídos en este módulo para que comiencen a procesar jobs."},
  {"nota": "El tipo `any` para las colas inyectadas en el constructor (`whatsappOutboundQueue: any`) debería reemplazarse con el tipo `Queue` de `bullmq` una vez que se confirme la importación."}
]
*/
