// libs/core/domain/tenancy/src/lib/value-objects/tenant-status.vo.ts
import { ValueObject } from '@dfs-suite/core-domain-shared-kernel-value-objects';
import { ArgumentInvalidException } from '@dfs-suite/shared-errors';

export enum TenantStatusEnum {
  PENDING_SETUP = 'PENDING_SETUP', // El tenant está creado pero esperando configuración inicial (ej. DB, WhatsApp)
  ACTIVE = 'ACTIVE', // El tenant está completamente operativo.
  SUSPENDED = 'SUSPENDED', // El tenant ha sido suspendido temporalmente (ej. por pago, violación de términos).
  // CONSIDERAR: ARCHIVED = 'ARCHIVED', // Para tenants que ya no están activos pero cuya data se quiere conservar.
  // CONSIDERAR: DELETED = 'DELETED',   // Si se implementa soft-delete para tenants.
}

export class TenantStatusVO extends ValueObject<TenantStatusEnum> {
  constructor(value: TenantStatusEnum) {
    // Llamamos al constructor de la clase base (ValueObject)
    // que se encarga de la validación inicial (checkIfEmpty) y llama a nuestro `validate`.
    // ValueObject espera un objeto 'props', y para VOs de un solo valor, este es { value: <primitivo> }
    super({ value });
  }

  /**
   * Getter para acceder al valor del estado del tenant.
   */
  public get value(): TenantStatusEnum {
    return this.props.value;
  }

  /**
   * Validación específica para TenantStatusVO.
   * Asegura que el valor proporcionado sea uno de los miembros válidos de TenantStatusEnum.
   * Este método es llamado por el constructor de la clase base ValueObject.
   * @param props - Las propiedades del Value Object, en este caso, { value: TenantStatusEnum }.
   * @throws ArgumentInvalidException si el estado no es válido.
   */
  protected validate(props: { value: TenantStatusEnum }): void {
    if (!Object.values(TenantStatusEnum).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid tenant status: "${
          props.value
        }". Must be one of [${Object.values(TenantStatusEnum).join(', ')}]`
      );
    }
  }

  // Métodos factoría estáticos para crear instancias de TenantStatusVO de forma semántica y segura.
  public static newPendingSetup(): TenantStatusVO {
    return new TenantStatusVO(TenantStatusEnum.PENDING_SETUP);
  }

  public static newActive(): TenantStatusVO {
    return new TenantStatusVO(TenantStatusEnum.ACTIVE);
  }

  public static newSuspended(): TenantStatusVO {
    return new TenantStatusVO(TenantStatusEnum.SUSPENDED);
  }

  // Métodos helper para comprobaciones de estado comunes.
  public isActive(): boolean {
    return this.props.value === TenantStatusEnum.ACTIVE;
  }

  public isSuspended(): boolean {
    return this.props.value === TenantStatusEnum.SUSPENDED;
  }

  public isPendingSetup(): boolean {
    return this.props.value === TenantStatusEnum.PENDING_SETUP;
  }
}

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Más Estados): Considerar añadir más estados al `TenantStatusEnum` si el ciclo de vida del tenant se vuelve más complejo. Por ejemplo:
    - `ARCHIVED`: Para tenants que ya no están activos pero cuya información debe conservarse por un tiempo (no operativa).
    - `DISABLED_BY_PLATFORM`: Si la plataforma necesita deshabilitar un tenant por razones administrativas sin que sea una suspensión normal.
    - `PENDING_DELETION`: Si existe un proceso de eliminación programada.
  Justificación: Permitir un modelado más preciso del ciclo de vida del tenant, facilitando la lógica de negocio y las auditorías.
  Impacto: Adición de nuevos miembros al enum, posiblemente nuevos métodos helper (ej. `isArchived()`) y actualización de la lógica de transiciones de estado en `TenantEntity`.
]
[
  Mejora Propuesta 2 (Validación de Transiciones de Estado): Aunque la entidad `TenantEntity` será la principal responsable de validar las transiciones de estado (ej. no se puede pasar de PENDING_SETUP a SUSPENDED directamente), este VO podría, opcionalmente, tener métodos que indiquen transiciones válidas desde el estado actual. Por ejemplo, `canTransitionTo(newStatus: TenantStatusEnum): boolean`.
  Justificación: Podría ofrecer una API más rica para la lógica de negocio que necesita consultar sobre posibles cambios de estado, aunque esto podría aumentar el acoplamiento del VO con la lógica de flujo de estado.
  Impacto: Adición de nuevos métodos y lógica al VO. Se debe evaluar cuidadosamente si esta responsabilidad debe residir aquí o exclusivamente en la entidad.
]
[
  Mejora Propuesta 3 (Internacionalización de Nombres de Estado): Si los nombres de los estados (PENDING_SETUP, ACTIVE, etc.) necesitan ser mostrados en la UI en diferentes idiomas, este VO no es el lugar para la traducción. La traducción debería manejarse en la capa de presentación. Sin embargo, el enum podría tener asociado un "código" numérico o un identificador no traducible si los valores del enum string se usan directamente como claves de i18n.
  Justificación: Separación de concerns, el dominio no debe conocer detalles de presentación.
  Impacto: No hay cambios directos en este VO, pero sí consideraciones para la capa de UI y i18n.
]

*/
