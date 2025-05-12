// libs/shared/types/src/lib/correlation-id.type.ts
    import { Brand } from './brand.type';

    /**
     * Identificador único para correlacionar logs y trazas a través de
     * múltiples servicios o procesos dentro de una misma solicitud o flujo.
     * Utiliza Branded Type para mayor seguridad de tipo.
     */
    export type CorrelationId = Brand<string, 'CorrelationId'>;
