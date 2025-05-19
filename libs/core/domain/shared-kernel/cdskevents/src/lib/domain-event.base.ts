// RUTA: libs/core/domain/shared-kernel/events/src/lib/domain-event.base.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { ArgumentInvalidException } from '@dfs-suite/shared-errors';
import {
  AggregateId,
  // CorrelationId, // No es necesario aquí si se usa IOperationMetadataOutput
  DomainEventInstanceId,
} from '@dfs-suite/shared-types';
import {
  createOperationMetadata,
  Guard,
  UuidUtils,
} from '@dfs-suite/shared-utils'; // Importar createOperationMetadata de su nueva ubicación
import { IDomainEvent, IDomainEventMetadata } from './domain-event.interface';
// IsoDateStringSchema ya no es necesario aquí si la factoría lo maneja

export type DomainEventProps<Payload extends Record<string, unknown>> = {
  readonly aggregateId: AggregateId;
  readonly payload: Payload;
  readonly metadata?: Partial<IDomainEventMetadata>; // Partial de la interfaz específica del evento
};

export abstract class DomainEventBase<
  Payload extends Record<string, unknown> = Record<string, never>
> implements IDomainEvent<Payload>
{
  readonly id: DomainEventInstanceId;
  readonly eventName: string;
  readonly aggregateId: AggregateId;
  readonly payload: Readonly<Payload>;
  readonly metadata: Readonly<IDomainEventMetadata>; // Sigue siendo IDomainEventMetadata

  protected constructor(props: DomainEventProps<Payload>) {
    if (Guard.isNil(props)) {
      throw new ArgumentInvalidException('DomainEvent props cannot be empty');
    }
    if (Guard.isEmpty(props.aggregateId)) {
      throw new ArgumentInvalidException(
        'DomainEvent aggregateId cannot be empty'
      );
    }
    if (Guard.isNil(props.payload)) {
      throw new ArgumentInvalidException(
        'DomainEvent payload cannot be null or undefined'
      );
    }

    this.id = UuidUtils.generateDomainEventInstanceId();
    this.eventName = this.constructor.name;
    this.aggregateId = props.aggregateId;
    this.payload = Object.freeze({ ...props.payload });

    // Usar la factoría para crear la metadata
    // Se asume que IDomainEventMetadata es compatible con IOperationMetadataOutput
    this.metadata = createOperationMetadata(
      props.metadata
    ) as IDomainEventMetadata;
  }
}
// RUTA: libs/core/domain/shared-kernel/events/src/lib/domain-event.base.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Revertido el cambio temporal y uso de `createOperationMetadata` desde `@dfs-suite/shared-utils`.",
    "justificacion": "Restaura la centralización de la lógica de creación de metadata y elimina la duplicación de código, ahora que la factoría está en una ubicación que no crea ciclos.",
    "impacto": "Código más limpio, DRY, y los tests de `core-domain-tenancy` deberían seguir pasando."
  },
  {
    "mejora": "Cast a `IDomainEventMetadata`.",
    "justificacion": "Asegura que `this.metadata` tenga el tipo específico esperado por `IDomainEvent`, asumiendo compatibilidad estructural con `IOperationMetadataOutput`.",
    "impacto": "Mantiene la seguridad de tipos."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Verificar que `IDomainEventMetadata` sea estructuralmente compatible con `IOperationMetadataOutput` para que el cast sea seguro."
  }
]
*/
// RUTA: libs/core/domain/shared-kernel/events/src/lib/domain-event.base.ts
// ...
// En el constructor:
// const providedCorrelationId = props.metadata?.correlationId; // Accede a través de props.metadata
// const providedUserId = props.metadata?.userId;
// const providedCausationId = props.metadata?.causationId;
// const effectiveTimestamp = props.metadata?.timestamp || (new Date().toISOString() as IsoDateString);
/* SECCIÓN DE MEJORAS (Actualizada)
[
  Mejora Aplicada: Lógica de `correlationId` ahora local y corregida.
]
[
  Mejora Aplicada: `id` de evento ahora es `DomainEventInstanceId`.
]
[
  Mejora Aplicada: `metadata.timestamp` es `IsoDateString`.
]
[
  Mejora Aplicada: Validación básica para `userId` y `causationId` en metadata.
]
[
  Mejora Eliminada (Temporalmente): Uso de `createOperationMetadata` para evitar dependencia circular.
                  Se reintroduce duplicación de lógica de metadata, que es un mal menor.
                  La Mejora Pendiente de "Reutilización de Lógica de Metadata" sigue siendo válida
                  pero requeriría que la factoría esté en un nivel más bajo (ej. shared-utils)
                  o que los tipos de metadata base sean más genéricos.
]
... (otras mejoras pendientes se mantienen)
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Mantenidas) */
/* SECCIÓN DE MEJORAS (Actualizada)
[
  Mejora Aplicada: Utiliza `createOperationMetadata` para inicializar `metadata`.
]
[
  Mejora Aplicada: `id` de evento ahora es `DomainEventInstanceId`.
]
[
  Mejora Eliminada: La corrección de `correlationId` y `timestamp` ahora es manejada por la factoría.
]
[
  Mejora Eliminada: La validación básica de `userId` en metadata ahora es manejada por la factoría.
]
[
  Mejora Pendiente (Tests Unitarios): Crucial añadir `domain-event.base.spec.ts`.
    - Los tests deben verificar que `createOperationMetadata` se llama correctamente
      y que las otras propiedades (`id`, `eventName`, `aggregateId`, `payload`) se inicializan bien.
]
... (otras mejoras pendientes para DomainEventBase se mantienen)
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Actualizada)
[
  Nota 1: Asume que `UuidUtils.generateDomainEventInstanceId()` existe.
]
[
  Nota 2: La compatibilidad entre `Partial<IDomainEventMetadata>` y lo que espera
          `createOperationMetadata` (que definimos como `Partial<ICommandMetadata | ...>`)
          y lo que devuelve (que casteamos a `IDomainEventMetadata`) debe ser estructuralmente sólida.
          Si las interfaces de metadata divergen mucho, `createOperationMetadata` necesitaría
          ser más genérica o tener sobrecargas.
]
*/
/* SECCIÓN DE MEJORAS (Actualizada)
[
  Mejora Aplicada: Lógica de `correlationId` corregida.
]
[
  Mejora Aplicada: `id` de evento ahora es `DomainEventInstanceId`.
]
[
  Mejora Aplicada: `metadata.timestamp` es consistentemente `IsoDateString`.
]
[
  Mejora Aplicada: Validación básica para `userId` en metadata.
]
[
  Mejora Pendiente (Reutilización de Lógica de Metadata): Extraer a función/clase base.
]
[
  Mejora Pendiente (Tests Unitarios): Crucial añadir `domain-event.base.spec.ts`.
]
[
  Mejora Pendiente (Validación de Payload con Schema Zod): Opcional.
]
[
  Mejora Pendiente (Inmutabilidad Profunda del Payload): Considerar `deepFreeze`.
]
[
  Mejora Pendiente (Validación más robusta de `metadataProps.timestamp`):
    Si `metadataProps.timestamp` se provee como string, validar que sea un `IsoDateString` válido.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1 (UuidUtils): Asume que `UuidUtils.generateDomainEventInstanceId()` existe.
]
*/
// libs/core/domain/shared-kernel/events/src/lib/domain-event.base.ts
/* SECCIÓN DE MEJORAS (Consolidado de propuestas anteriores y nuevas observaciones)

[
  Mejora 1 (Reutilización de Lógica de Metadata):
    Similar a `CommandBase` y `QueryBase`, la lógica de inicialización de `metadata` (especialmente
    `correlationId` y `timestamp`) podría compartirse a través de una clase base común
    (`MessageBase` o `OperationMetadataBase`) o una función utilitaria.
  Justificación: DRY.
]
[
  Mejora 2 (Tipado de `id` del Evento):
    La propiedad `id` (ID de la instancia del evento) es `AggregateId`. Podría ser un Branded Type más
    específico como `DomainEventInstanceId = Brand<string, 'DomainEventInstanceId'>`.
  Justificación: Mayor seguridad de tipos y semántica.
]
[
  Mejora 3 (Validación de Payload con Schema Zod en Constructor - Opcional):
    Considerar permitir que el constructor acepte un schema Zod para validar el `payload`.
  Justificación: Mayor robustez en la creación de eventos.
]
[
  Mejora 4 (Inmutabilidad Profunda del Payload):
    `Object.freeze({ ...props.payload })` es una copia superficial. Considerar `deepFreeze` si los
    payloads pueden ser complejos y la inmutabilidad profunda es crítica.
  Justificación: Garantizar inmutabilidad completa del payload.
]
[
  Mejora 5 (Tests Unitarios):
    Añadir tests unitarios para `DomainEventBase` para verificar:
    - Correcta inicialización de `id`, `eventName`, `aggregateId`, `payload` (inmutabilidad).
    - Correcta inicialización de `metadata` (timestamp, lógica de `correlationId` corregida).
    - Comportamiento de las validaciones de entrada.
  Justificación: Asegurar robustez de esta clase base.
]
[
  Mejora 6 (Timestamp en `IDomainEventMetadata`):
    `IDomainEventMetadata.timestamp` ya es `IsoDateString`. `DomainEventBase` lo inicializa con
    `new Date().toISOString() as IsoDateString`. Esto es consistente.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA

[
  Nota 1 (Inmutabilidad): Propiedades `readonly` y `Object.freeze` para `payload` y `metadata`. Correcto.
]
[
  Nota 2 (`eventName`): `this.constructor.name` es una convención útil.
]
[
  Nota 3 (Payload): Debe contener información relevante para los consumidores.
]
*/
// libs/core/domain/shared-kernel/events/src/lib/domain-event.base.ts
/* SECCIÓN DE MEJORAS FUTURAS (Mismas que antes, excepto la Nota 4 que ya se aborda)
    [
      Mejora Propuesta 1 (Gestión de `userId` en Metadata): ...
    ]
    [
      Mejora Propuesta 2 (Schema de Payload Opcional y Validación en Constructor): ...
    ]
    [
      Mejora Propuesta 3 (Serialización/Deserialización Estándar para Eventos): ...
    ]
    [
      Mejora Propuesta 4 (Inmutabilidad Profunda del Payload): ...
    ]
    [
      Mejora Propuesta 5 (Tests Unitarios parajest.spyOn(Date, 'now').mockReturnValue(mockTimestamp);
      const command = new TestCommand({ data: 'test' });
      expect(command.metadata.timestamp).toBe(mockTimestamp);
      (Date.now as jest.Mock).mockRestore();
    });

    it('should use a provided timestamp', () => {
      const command = new TestCommand({ data: 'test' }, { timestamp: mockTimestamp });
      expect(command.metadata.timestamp).toBe(mockTimestamp);
    });

    it('should have undefined causationId if none is provided', () => {
      const command = new TestCommand({ data: 'test' });
      expect(command.metadata.causationId).toBeUndefined();
    });

    it('should use a provided causationId', () => {
      const causationId = UuidUtils.generateCorrelationId();
      const command = new TestCommand({ data: 'test' }, { causationId });
      expect(command.metadata.causationId).toBe(causationId);
    });

    it('should have undefined userId if none is provided', () => {
      const command = new TestCommand({ data: 'test' });
      expect(command.metadata.userId).toBeUndefined();
    });

    it('should use a provided userId', () => {
      const command = new TestCommand({ data: 'test' }, { userId: mockProvidedUserId });
      expect(command.metadata.userId).toBe(mockProvidedUserId);
    });

    it('metadata object should be frozen', () => {
      const command = new TestCommand({ data: 'test' });
      expect(Object.isFrozen(command.metadata)).toBe(true);
    });
  });
});
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Integración con RequestContextService para CorrelationID):
    (Reiterada) La lógica actual para `correlationId` es un placeholder. Implementar la obtención del `correlationId` desde un servicio de contexto de solicitud (si está disponible en el scope del evento) sería ideal para una trazabilidad automática. Si no hay contexto (ej. un proceso batch), se generaría uno nuevo.
    Justificación: Trazabilidad y correlación robusta y automática de eventos.
    Impacto: Requeriría acceso a un servicio de contexto, lo que podría ser complicado para una clase base del shared-kernel de dominio. Una alternativa es que la capa de aplicación/caso de uso sea siempre responsable de pasar explícitamente el `correlationId` en la metadata del evento.
]
[
  Mejora Propuesta 2 (Schema de Payload Opcional):
    Considerar la posibilidad de que `DomainEventBase` acepte opcionalmente un schema de Zod/Valibot para el `Payload` en su constructor y realice la validación del payload contra ese schema.
    Justificación: Aumentaría la seguridad al crear eventos, asegurando que el payload cumpla con una estructura definida más allá del tipado de TypeScript.
    Impacto: Añadiría una dependencia opcional a `shared-validation-schemas` (o a `zod` directamente, lo cual no es ideal para el kernel) y complejidad al constructor.
]
[
  Mejora Propuesta 3 (Serialización/Deserialización Estándar):
    Si los eventos necesitan ser serializados (ej. para colas de mensajes o almacenamiento), `DomainEventBase` podría incluir métodos `serialize(): string` y un método estático `deserialize(json: string): DomainEventBaseSubclass`.
    Justificación: Facilitaría la interoperabilidad y persistencia de eventos.
    Impacto: Requeriría una estrategia de registro de tipos de eventos y manejo de la (de)serialización, lo cual puede ser complejo. Podría ser mejor manejarlo en una capa de infraestructura de mensajería.
]

*/
// libs/core/domain/shared-kernel/events/src/lib/domain-event.base.ts

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Integración con RequestContextService para CorrelationID):
    Actualmente, `correlationId` usa un placeholder o genera uno nuevo si no se pasa en `props.metadata`.
    Lo ideal sería que `DomainEventBase` pudiera acceder a un `RequestContextService` (similar al del ejemplo `domain-driven-hexagon-master`)
    para obtener el `correlationId` de la solicitud actual de forma automática si no se especifica.
    Justificación: Asegura una trazabilidad y correlación consistentes a través de todo el sistema sin necesidad de pasarlo manualmente a cada evento.
    Impacto: Requeriría que `DomainEventBase` tenga acceso (posiblemente estático o a través de un helper) al `RequestContextService`. Esto podría introducir una dependencia indirecta a un concepto de la capa de aplicación/infraestructura en el shared-kernel, lo cual debe manejarse con cuidado (ej. el servicio de contexto se registra globalmente). Alternativamente, el `correlationId` se sigue pasando explícitamente desde el caso de uso que crea el comando/evento.
]
[
  Mejora Propuesta 2 (Tipado más Estricto para `Payload` por Defecto):
    El default `Payload extends object = Record<string, never>` es bueno porque fuerza a las clases de evento concretas a definir su payload si realmente tienen uno. Si un evento no tiene payload, `Record<string, never>` (un objeto vacío) es un buen tipo.
    Justificación: Mejora la intención y la seguridad de tipos.
    Impacto: Ninguno si se mantiene; es una buena práctica.
]
[
  Mejora Propuesta 3 (Validación del Payload):
    Actualmente, solo se valida que `props.payload` no sea `null` o `undefined`. Se podría añadir una validación más profunda para asegurar que `payload` sea realmente un objeto y no, por ejemplo, un array u otro tipo si la restricción `extends object` no es suficiente para el linter en todos los casos de uso.
    Justificación: Mayor robustez en la creación de eventos.
    Impacto: Añadir lógica de validación en el constructor.
]

*/
