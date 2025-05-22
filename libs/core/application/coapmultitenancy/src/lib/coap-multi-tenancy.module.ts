// libs/core/application/coapmultitenancy/src/lib/coap-multi-tenancy.module.ts
import { Global, Module, Scope } from '@nestjs/common';

import { TENANT_CONTEXT_SERVICE_PORT } from './ports/tenant-context.service.port'; // Path relativo correcto
import { TenantContextServiceImpl } from './services/tenant-context.service'; // Path relativo correcto

@Global()
@Module({
  providers: [
    {
      provide: TENANT_CONTEXT_SERVICE_PORT,
      useClass: TenantContextServiceImpl,
      scope: Scope.REQUEST,
    },
  ],
  exports: [TENANT_CONTEXT_SERVICE_PORT],
})
export class CoapMultiTenancyModule {}
// FIN DEL ARCHIVO: libs/core/application/coapmultitenancy/src/lib/coap-multi-tenancy.module.ts
