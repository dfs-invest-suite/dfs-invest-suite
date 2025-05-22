// libs/shared/shutils/src/lib/uuid.utils.ts
import { v4 as uuidv4 } from 'uuid';
import {
  AggregateId,
  CommandInstanceId,
  CorrelationId,
  CausationId,
  DomainEventInstanceId,
  IntegrationEventInstanceId,
  QueryInstanceId,
  SessionId,
  // NO SE IMPORTAN IDs DE DOMINIO AQUÍ
} from '@dfs-suite/shtypes';

export class UuidUtils {
  private static generate(): string {
    return uuidv4();
  }

  // --- IDs de Sistema y Kernel Compartido ---
  static generateAggregateId(): AggregateId {
    return this.generate();
  }
  static generateCommandInstanceId(): CommandInstanceId {
    return this.generate() as CommandInstanceId;
  }
  static generateQueryInstanceId(): QueryInstanceId {
    return this.generate() as QueryInstanceId;
  }
  static generateDomainEventInstanceId(): DomainEventInstanceId {
    return this.generate() as DomainEventInstanceId;
  }
  static generateIntegrationEventInstanceId(): IntegrationEventInstanceId {
    return this.generate() as IntegrationEventInstanceId;
  }
  static generateCorrelationId(): CorrelationId {
    return this.generate() as CorrelationId;
  }
  static generateCausationId(): CausationId {
    return this.generate() as CausationId;
  }
  static generateSessionId(): SessionId {
    return this.generate() as SessionId;
  }

  // --- Generadores de IDs Específicos de Dominio (ELIMINADOS DE AQUÍ) ---
  // La creación de Branded IDs de dominio se hará así en el código consumidor:
  // import { LeadId } from '@dfs-suite/shtypes';
  // const newLeadId = UuidUtils.generateAggregateId() as LeadId;

  static generateSlugFromString(input: string, maxLength = 50): string {
    if (!input) return UuidUtils.generateRandomString(8).toLowerCase();
    const slug = input
      .toString()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
    return slug.substring(0, maxLength);
  }

  static generateRandomString(
    length: number,
    charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
  ): string {
    let result = '';
    if (length <= 0) return result;
    const charactersLength = charset.length;
    if (charactersLength === 0) return result;
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
// FIN DEL ARCHIVO: libs/shared/shutils/src/lib/uuid.utils.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmada la eliminación de todos los métodos `generate[SpecificDomain]Id()`.", "justificacion": "Adopción de la estrategia donde `UuidUtils` solo provee `generateAggregateId()` y los IDs de sistema. La creación de un Branded ID específico se hará mediante un cast (`as SpecificIdType`) en el punto de uso.", "impacto": "Simplifica `UuidUtils` y resuelve los errores TS2339 (método no existe) en las entidades que intentaban llamar a generadores específicos." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
