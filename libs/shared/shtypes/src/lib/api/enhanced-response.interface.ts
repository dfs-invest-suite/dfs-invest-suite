// RUTA: libs/shared/shtypes/src/lib/api/enhanced-response.interface.ts
import { TenantId } from '../domains/tenant/tenant.types'; // Correcto
import { UserId } from '../domains/user/user.types'; // Correcto
import { Maybe } from '../maybe.type'; // Correcto
import { CorrelationId, IsoDateString } from '../primitives/core-primitives'; // Correcto para estos dos

export enum ApiErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTH_ERROR',
  AUTHORIZATION_ERROR = 'AUTHZ_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  RATE_LIMITED = 'RATE_LIMITED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
}

export interface ApiErrorDetail {
  readonly field?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly actualValue?: any;
  readonly constraint?: string;
  readonly expectedFormat?: string;
  readonly message?: string;
}

export interface EnhancedApiError {
  readonly code: ApiErrorCode | string;
  readonly message: string;
  readonly path?: string;
  readonly details?: ReadonlyArray<ApiErrorDetail>;
  readonly stack?: string;
}

export interface EnhancedApiResponseMetadata {
  readonly requestId?: string;
  readonly userId?: Maybe<UserId>;
  readonly tenantId?: Maybe<TenantId>;
  readonly version?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly [key: string]: any;
}

export interface EnhancedApiResponsePerformance {
  readonly durationMs: number;
  readonly memoryUsageMb?: number;
  readonly cacheHit?: boolean;
}

export interface IEnhancedApiResponse<_TData = unknown> {
  // _TData para no-unused-vars
  readonly success: boolean;
  readonly data?: _TData;
  readonly error?: Readonly<EnhancedApiError>;
  readonly timestamp: IsoDateString;
  readonly correlationId: CorrelationId;
  readonly metadata?: Readonly<EnhancedApiResponseMetadata>;
  readonly performance?: Readonly<EnhancedApiResponsePerformance>;
}
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/api/enhanced-response.interface.ts
