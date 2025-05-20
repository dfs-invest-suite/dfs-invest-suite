// RUTA: libs/core/application/coapaiperassistance/src/lib/dtos/ai-analysis-result.dto.ts
// TODO: [LIA Legacy - Implementar AiAnalysisResultDto]
// Propósito: DTO para la salida del AnalyzeConversationTextUseCase.
// Relacionado con Casos de Uso: AnalyzeConversationTextUseCase
import { Maybe } from '@dfs-suite/shtypes';

export interface AiAnalysisResultDto {
  readonly sentiment?: Maybe<'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'>;
  readonly sentimentScore?: Maybe<number>;
  readonly intents?: Maybe<string[]>;
  readonly keywords?: Maybe<string[]>;
  readonly summary?: Maybe<string>;
  // readonly entities?: Maybe<Array<{ type: string; text: string; confidence: number }>>;
}
