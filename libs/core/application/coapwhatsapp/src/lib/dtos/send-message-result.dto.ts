// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/send-message-result.dto.ts
import { MessageLogId } from '@dfs-suite/shtypes';

export interface SendMessageResultDto {
  messageLogId: MessageLogId;
  status: 'QUEUED' | 'VALIDATION_FAILED' | 'ERROR'; // Estado inicial del encolamiento
  details?: string; // Mensaje adicional
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/send-message-result.dto.ts
