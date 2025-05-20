// RUTA: libs/infrastructure/infrawhatsappcloudapi/src/lib/utils/webhook-signature.validator.ts
// TODO: [LIA Legacy - Implementar WebhookSignatureValidator]
// Propósito: Lógica para validar la firma HMAC-SHA256 de los webhooks de WhatsApp.
// Usa el App Secret de la plataforma.
// import * as crypto from 'crypto';
// export function isValidWebhookSignature(rawBody: string, signatureHeader: string, appSecret: string): boolean {
//   if (!rawBody || !signatureHeader || !appSecret) return false;
//   const [algorithm, signature] = signatureHeader.split('=');
//   if (algorithm !== 'sha256' || !signature) return false;
//   const hmac = crypto.createHmac('sha256', appSecret);
//   hmac.update(rawBody);
//   const expectedSignature = hmac.digest('hex');
//   return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
// }
