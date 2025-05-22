// libs/infrastructure/infraqueue/src/lib/adapters/bullmq-queue.adapter.ts
import { Injectable, Logger } from '@nestjs/common';
import { Queue as BullMQQueueInstance } from 'bullmq'; // Renombrar para evitar colisión si Queue se importa de otro lado

import {
  IQueuePort,
  QueueJobOptions,
  // QUEUE_PORT, // No es necesario aquí, el provider lo usa
} from '@dfs-suite/coapwhatsapp';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, err, ok } from '@dfs-suite/shresult';
import { ObjectLiteral } from '@dfs-suite/shtypes';

@Injectable()
export class BullMqQueueAdapter implements IQueuePort {
  private readonly logger = new Logger(BullMqQueueAdapter.name);
  private queues: Map<string, BullMQQueueInstance> = new Map();

  // Las instancias de BullMQQueueInstance se inyectarán a través del módulo
  // o se registrarán a través del método registerQueue.

  constructor() {
    // Este constructor puede permanecer vacío si las colas se registran
    // a través de registerQueue desde el InfraQueueModule.
  }

  public registerQueue(
    queueName: string,
    queueInstance: BullMQQueueInstance
  ): void {
    if (this.queues.has(queueName)) {
      this.logger.warn(
        `Queue "${queueName}" is being re-registered. This might be a configuration issue or intentional override.`
      );
    }
    this.queues.set(queueName, queueInstance);
    this.logger.log(
      `BullMQ Queue "${queueName}" registered with BullMqQueueAdapter.`
    );
  }

  private getQueue(queueName: string): BullMQQueueInstance | undefined {
    const queue = this.queues.get(queueName);
    if (!queue) {
      this.logger.error(
        `Attempted to get queue "${queueName}" but it was not registered with BullMqQueueAdapter.`
      );
    }
    return queue;
  }

  async add(
    queueName: string,
    data: ObjectLiteral,
    options?: QueueJobOptions
  ): Promise<Result<BullMQQueueInstance.Job, ExceptionBase>> {
    // Tipo de retorno específico de BullMQ
    try {
      const queue = this.getQueue(queueName);
      if (!queue) {
        return err(
          new InternalServerErrorException(
            `Queue "${queueName}" not found or not registered.`
          )
        );
      }

      // El primer argumento de queue.add es el NOMBRE DEL JOB (opcional, BullMQ lo genera si no),
      // el segundo son los datos.
      const jobName = options?.jobId || `job_${queueName}_${Date.now()}`; // Un nombre de job por defecto si no se provee

      const job = await queue.add(jobName, data, {
        jobId: options?.jobId,
        priority: options?.priority,
        delay: options?.delay,
        attempts: options?.attempts,
        backoff: options?.backoff,
        removeOnComplete:
          options?.removeOnComplete === undefined
            ? true
            : options.removeOnComplete, // Default a true si no se especifica
        removeOnFail:
          options?.removeOnFail === undefined ? 1000 : options.removeOnFail, // Default a 1000 si no se especifica
      });
      this.logger.debug(
        `Job ${job.id} (name: ${jobName}) added to BullMQ queue ${queueName}`
      );
      return ok(job);
    } catch (e: unknown) {
      // Tipar error como unknown
      const error = e as Error;
      this.logger.error(
        `Failed to add job to BullMQ queue ${queueName}: ${error.message}`,
        error.stack
      );
      return err(
        new InternalServerErrorException(
          `Queueing error: ${error.message}`,
          error
        )
      );
    }
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infraqueue/src/lib/adapters/bullmq-queue.adapter.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Corregido el import de `IQueuePort` y `QueueJobOptions` para usar `@dfs-suite/coapwhatsapp`.", "justificacion": "Asegura que se use la definición correcta del puerto de aplicación.", "impacto": "Resuelve errores `TS2305` para estos tipos." },
  { "mejora": "Renombrado `Queue` de `bullmq` a `BullMQQueueInstance` para evitar colisiones de nombres.", "justificacion": "Claridad y prevención de errores.", "impacto": "Código más legible." },
  { "mejora": "Implementado `registerQueue` para que `InfraQueueModule` pueda pasar las instancias de colas a este adaptador.", "justificacion": "Proporciona un mecanismo para que el adaptador conozca las colas que debe manejar, resolviendo el problema de cómo obtenerlas dinámicamente con DI estática.", "impacto": "Adaptador más funcional y mejor integrado con NestJS." },
  { "mejora": "`getQueue` ahora devuelve `undefined` y loguea un error si la cola no está registrada.", "justificacion": "Manejo más explícito de colas no encontradas.", "impacto": "Mejor depuración." },
  { "mejora": "El método `add` de BullMQ ahora recibe un `jobName` como primer argumento. Se genera un nombre por defecto si no se provee en `options.jobId`.", "justificacion": "Alineación con la API de BullMQ.", "impacto": "Correcto encolamiento de jobs." },
  { "mejora": "Añadidos valores por defecto para `removeOnComplete` y `removeOnFail` en las opciones del job.", "justificacion": "Buenas prácticas para la gestión de jobs en BullMQ.", "impacto": "Mejor manejo de colas." },
  { "mejora": "Tipado de error en `catch` a `unknown` y luego cast a `Error`.", "justificacion": "Práctica más segura en TypeScript moderno.", "impacto": "Robustez."}
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {"nota": "Considerar si el `BullMqQueueAdapter` debería ser un provider `TRANSIENT` o `REQUEST_SCOPED` si la lógica de obtener colas se vuelve más compleja o dependiente del contexto, aunque generalmente los adaptadores a sistemas externos pueden ser singletons si se maneja bien el estado interno (como el `Map` de colas)."}
]
*/
