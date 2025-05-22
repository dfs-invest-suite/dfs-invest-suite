// RUTA: libs/core/domain/codoaiperassistance/src/lib/ports/conversation-analyzer.port.ts
// TODO: [LIA Legacy - Finalizar definición de IConversationAnalyzerPort]
// Propósito: Puerto específico para analizar texto de conversación y extraer insights
//            como sentimiento, intención, entidades nombradas, etc.
// Relacionado con Casos de Uso: QualifyLeadUseCase, AnalyzeConversationTextUseCase (app).

import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { TenantId, Maybe } from '@dfs-suite/shtypes';

import { AIAnalysisResult } from '../types/ai-analysis-result.type';
import { AiModelIdentifierVO } from '../value-objects/ai-model-identifier.vo';

export interface ConversationAnalysisConfig {
  model?: AiModelIdentifierVO; // Permite especificar un modelo si el default no es adecuado
  // Otras opciones específicas de análisis
}

export const CONVERSATION_ANALYZER_PORT = Symbol('IConversationAnalyzerPort');

export interface IConversationAnalyzerPort {
  analyzeText(
    input: {
      tenantId?: Maybe<TenantId>; // Para configuraciones de IA por tenant
      text: string;
      language?: Maybe<string>; // ej. 'es', 'pt-BR'
      contextHint?: Maybe<string>; // ej. 'WHATSAPP_LEAD_MESSAGE', 'PROPERTY_REVIEW'
    },
    config?: ConversationAnalysisConfig
  ): Promise<Result<AIAnalysisResult, ExceptionBase | Error>>;
}
