// RUTA: libs/core/domain/codowhatsapp/src/lib/types/whatsapp-pricing.types.ts
import { Maybe, IsoDateString } from '@dfs-suite/shtypes';

import {
  EWhatsAppConversationCategory,
  EWhatsAppTemplateCategory,
} from '../enums'; // <<< AÑADIDO IMPORT

export interface TWhatsAppPricing {
  billable: boolean;
  pricing_model: 'CBP' | 'PMP' | string;
  category: EWhatsAppConversationCategory | string; // Usar el Enum importado
  origin_type?: Maybe<string>;
  conversation_id?: Maybe<string>;
  conversation_expiration_timestamp?: Maybe<number>;
  message_type?: Maybe<string>;
  cost?: Maybe<number>;
  currency?: Maybe<string>;
  rate_id?: Maybe<string>;
}

export interface TWhatsAppConversationAnalyticsDataPoint {
  start: IsoDateString;
  end: IsoDateString;
  conversation_type: EWhatsAppConversationCategory | string; // Usar el Enum importado
  conversation_direction: 'USER_INITIATED' | 'BUSINESS_INITIATED';
  cost: number;
  count: number;
}

export interface TWhatsAppConversationAnalyticsResponse {
  conversation_analytics: {
    data: TWhatsAppConversationAnalyticsDataPoint[];
  };
}

export interface TWhatsAppTemplateAnalyticsDataPoint {
  start: IsoDateString;
  end: IsoDateString;
  template_id: string;
  template_name: string;
  template_category: EWhatsAppTemplateCategory | string; // Usar el Enum importado
  template_language: string;
  sent_count: number;
  delivered_count: number;
  read_count: number;
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/types/whatsapp-pricing.types.ts
