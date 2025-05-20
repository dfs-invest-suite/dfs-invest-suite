// RUTA: libs/core/domain/codoaiperassistance/src/lib/value-objects/prompt-segment.vo.ts
// TODO: [LIA Legacy - Implementar PromptSegmentVO]
// Propósito: VO para representar un segmento de un prompt (ej. system, user, retrieved_context).
export interface PromptSegmentProps {
  type: 'system' | 'user_history' | 'retrieved_context' | 'current_user_prompt';
  content: string;
  order?: number;
}
// export class PromptSegmentVO extends ValueObject<PromptSegmentProps> { /* ... */ }
