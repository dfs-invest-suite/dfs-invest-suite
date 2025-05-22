// RUTA: libs/core/application/coapwhatsapp/src/lib/ports/queue.port.ts (NUEVO ARCHIVO)
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { ObjectLiteral } from '@dfs-suite/shtypes';

export interface QueueJobOptions {
  jobId?: string;
  priority?: number;
  delay?: number; // en milisegundos
  attempts?: number; // número de reintentos
  backoff?: { type: 'fixed' | 'exponential'; delay: number };
  // ... otras opciones de BullMQ u otra librería de colas
}

export interface IQueuePort {
  add(
    queueName: string,
    data: ObjectLiteral,
    options?: QueueJobOptions
  ): Promise<Result<any, ExceptionBase>>; // El tipo de retorno 'any' puede ser el Job de BullMQ
}

export const QUEUE_PORT = Symbol('IQueuePort'); // Usaremos este token para inyección

/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Creación de IQueuePort y QUEUE_PORT.", "justificacion": "Define una abstracción para interactuar con el sistema de colas, resolviendo la violación de depConstraints.", "impacto": "Permite a la capa de aplicación depender de una interfaz en lugar de una implementación de infraestructura." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Este puerto podría moverse a una librería libs/core/application/shared-ports/ para ser reutilizado por otros Casos de Uso que necesiten encolar tareas."} ] */
