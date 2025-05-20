// RUTA: libs/core/application/coapaiperassistance/src/lib/dtos/ai-analysis-request.dto.ts
// TODO: [LIA Legacy - Implementar AiAnalysisRequestDto]
// Propósito: DTO para la entrada del AnalyzeConversationTextUseCase.
// Relacionado con Casos de Uso: AnalyzeConversationTextUseCase
import { TenantId, Maybe } from '@dfs-suite/shtypes';

export interface AiAnalysisRequestDto {
  readonly tenantId?: Maybe<TenantId>;
  readonly textToAnalyze: string;
  readonly contextHint?: Maybe<string>;
}
