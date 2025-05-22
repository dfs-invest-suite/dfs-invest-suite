// RUTA: libs/core/domain/codotenancy/src/lib/value-objects/waba-credentials.vo.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import { WabaId, Maybe } from '@dfs-suite/shtypes'; // Asumimos que WabaId es un BrandedType
import { Guard } from '@dfs-suite/shutils';

export interface WabaCredentialsProps {
  readonly wabaId: WabaId;
  readonly apiToken: string; // El token en claro. La encriptación es responsabilidad de la infraestructura.
  readonly defaultPhoneNumberId?: Maybe<string>; // Phone Number ID de Meta
}

export class WabaCredentialsVO extends ValueObject<WabaCredentialsProps> {
  constructor(props: WabaCredentialsProps) {
    super(props);
  }

  get wabaId(): WabaId {
    return this.props.wabaId;
  }
  get apiToken(): string {
    return this.props.apiToken;
  }
  get defaultPhoneNumberId(): Maybe<string> {
    return this.props.defaultPhoneNumberId;
  }

  protected validate(props: WabaCredentialsProps): void {
    if (Guard.isEmpty(props.wabaId)) {
      throw new ArgumentNotProvidedException('WABA ID cannot be empty.');
    }
    if (Guard.isEmpty(props.apiToken)) {
      throw new ArgumentNotProvidedException('API Token cannot be empty.');
    }
    // Opcional: Validar formato de wabaId o defaultPhoneNumberId si es conocido
  }

  public static create(
    wabaId: WabaId,
    apiToken: string,
    defaultPhoneNumberId?: Maybe<string>
  ): WabaCredentialsVO {
    return new WabaCredentialsVO({ wabaId, apiToken, defaultPhoneNumberId });
  }
}
// RUTA: libs/core/domain/codotenancy/src/lib/value-objects/waba-credentials.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "**NUEVO ARTEFACTO**: Creado `WabaCredentialsVO`.", "justificacion": "Encapsula las credenciales de WhatsApp Business Account (WABA ID y Token API) y el número por defecto para un tenant, promoviendo la cohesión y el tipado fuerte.", "impacto": "Nuevo Value Object disponible para representar la configuración WABA de un tenant." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "El `apiToken` se maneja en claro dentro de este VO en memoria. La encriptación y desencriptación DEBEN ocurrir en la capa de infraestructura (`SecureTenantConfigRepository`) antes de persistir o al cargar la configuración del tenant." }
]
*/
