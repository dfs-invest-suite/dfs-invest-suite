// RUTA: libs/core/domain/codoaiperassistance/src/lib/value-objects/ai-model-identifier.vo.ts
// TODO: [LIA Legacy - Implementar validaciones y lógica adicional para AiModelIdentifierVO]
// Propósito: Value Object para identificar un modelo de IA específico (ej. "gemini-1.5-pro", "openai/gpt-4-turbo"),
//            incluyendo opcionalmente el proveedor y la versión para mayor especificidad.
// Relacionado con Casos de Uso: Configuración de Aiper, llamadas a LLMs y servicios de embedding.

import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { Guard } from '@dfs-suite/shutils';
import {
  ArgumentNotProvidedException,
  ArgumentInvalidException,
} from '@dfs-suite/sherrors';
import { Maybe } from '@dfs-suite/shtypes';

// Futuro: Podríamos tener un enum de proveedores conocidos.
// export enum AiModelProvider { GOOGLE = 'GOOGLE', OPENAI = 'OPENAI', ANTHROPIC = 'ANTHROPIC', AZURE_OPENAI = 'AZURE_OPENAI' }

export interface AiModelIdentifierProps {
  readonly modelId: string; // Nombre/ID del modelo, ej: "gemini-1.5-pro-latest", "text-embedding-3-large"
  readonly provider?: Maybe<string>; // Ej: "google", "openai", "anthropic"
  readonly version?: Maybe<string>; // Ej: "20240515", "v1"
}

export class AiModelIdentifierVO extends ValueObject<AiModelIdentifierProps> {
  constructor(props: AiModelIdentifierProps) {
    super(props);
  }

  public get modelId(): string {
    return this.props.modelId;
  }
  public get provider(): Maybe<string> {
    return this.props.provider;
  }
  public get version(): Maybe<string> {
    return this.props.version;
  }

  public static create(props: AiModelIdentifierProps): AiModelIdentifierVO {
    this.validateProps(props);
    return new AiModelIdentifierVO(props);
  }

  protected validate(props: AiModelIdentifierProps): void {
    AiModelIdentifierVO.validateProps(props);
  }

  private static validateProps(props: AiModelIdentifierProps): void {
    if (Guard.isEmpty(props.modelId)) {
      throw new ArgumentNotProvidedException(
        'AiModelIdentifierVO: modelId cannot be empty.'
      );
    }
    // Opcional: Validar formato de modelId si hay un patrón esperado
    // Opcional: Validar si el provider es uno de los conocidos si se implementa un enum
  }

  public toString(): string {
    let identifier = this.props.provider
      ? `${this.props.provider}/${this.props.modelId}`
      : this.props.modelId;
    if (this.props.version) {
      identifier += `@${this.props.version}`;
    }
    return identifier;
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  { "mejora": "Introducir un Enum para AiModelProvider y validar contra él.", "justificacion": "Mayor robustez y control de tipos.", "impacto": "Menor flexibilidad si se añaden nuevos providers no listados." },
  { "mejora": "Añadir un método para verificar compatibilidad de features con el modelo (ej. streaming, tool use).", "justificacion": "Abstracción útil.", "impacto": "Podría requerir metadatos adicionales sobre los modelos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
