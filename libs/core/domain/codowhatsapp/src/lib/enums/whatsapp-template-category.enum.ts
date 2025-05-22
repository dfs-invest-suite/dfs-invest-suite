// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-template-category.enum.ts
/**
 * Categorías de plantillas de mensajes de WhatsApp.
 * @see https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates#categories
 */
export enum EWhatsAppTemplateCategory {
  AUTHENTICATION = 'AUTHENTICATION', // Antes TRANSACTIONAL
  MARKETING = 'MARKETING', // Antes PROMOTIONAL
  UTILITY = 'UTILITY', // Antes TRANSACTIONAL
  // Las siguientes son más específicas y pueden solaparse o ser obsoletas
  // ACCOUNT_UPDATE = 'ACCOUNT_UPDATE',
  // PAYMENT_UPDATE = 'PAYMENT_UPDATE',
  // PERSONAL_FINANCE_UPDATE = 'PERSONAL_FINANCE_UPDATE',
  // SHIPPING_UPDATE = 'SHIPPING_UPDATE',
  // RESERVATION_UPDATE = 'RESERVATION_UPDATE',
  // ISSUE_RESOLUTION = 'ISSUE_RESOLUTION',
  // APPOINTMENT_UPDATE = 'APPOINTMENT_UPDATE',
  // TRANSPORTATION_UPDATE = 'TRANSPORTATION_UPDATE',
  // TICKET_UPDATE = 'TICKET_UPDATE',
  // ALERT_UPDATE = 'ALERT_UPDATE',
  // AUTO_REPLY = 'AUTO_REPLY',
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/enums/whatsapp-template-category.enum.ts
