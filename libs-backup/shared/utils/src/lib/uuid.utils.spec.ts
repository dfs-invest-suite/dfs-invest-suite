// RUTA: libs/shared/utils/src/lib/uuid.utils.spec.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { UUID_V4_REGEX } from '@dfs-suite/shared-constants';
import * as uuid from 'uuid';
import { UuidUtils } from './uuid.utils';

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: jest.fn(),
}));

describe('UuidUtils', () => {
  const mockUuidV4 = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d';

  beforeEach(() => {
    (uuid.v4 as jest.Mock).mockReturnValue(mockUuidV4);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have a private generate method that calls uuid.v4', () => {
    UuidUtils.generateTenantId();
    expect(uuid.v4).toHaveBeenCalledTimes(1);
  });

  describe('Specific ID Generators', () => {
    const testCases = [
      { method: 'generateTenantId', typeName: 'TenantId' },
      { method: 'generateUserId', typeName: 'UserId' },
      { method: 'generateAggregateId', typeName: 'AggregateId' },
      { method: 'generateCorrelationId', typeName: 'CorrelationId' },
      { method: 'generateCommandInstanceId', typeName: 'CommandInstanceId' },
      { method: 'generateQueryInstanceId', typeName: 'QueryInstanceId' },
      {
        method: 'generateDomainEventInstanceId',
        typeName: 'DomainEventInstanceId',
      },
    ] as const; // 'as const' para que `method` sea un tipo literal de string

    it.each(testCases)(
      'should generate a valid v4 UUID for $typeName using $method',
      ({ method }) => {
        // Acceder al método de forma tipada si es posible, o mantener el any pero castear el resultado
        const generatedIdFunction = UuidUtils[method]; // method es ahora un tipo literal más específico
        let generatedId: string;

        if (typeof generatedIdFunction === 'function') {
          generatedId = generatedIdFunction.call(UuidUtils) as string; // Llamar y castear a string
        } else {
          // Esto no debería ocurrir si testCases está bien definido
          throw new Error(`Method ${method} not found on UuidUtils`);
        }

        expect(uuid.v4).toHaveBeenCalledTimes(1);
        expect(generatedId).toBe(mockUuidV4);
        // Ahora generatedId es string, por lo que es seguro pasarlo a .test()
        expect(UUID_V4_REGEX.test(generatedId)).toBe(true);

        (uuid.v4 as jest.Mock).mockClear();
      }
    );

    it('should generate different UUIDs on subsequent calls if uuid.v4 returns different values', () => {
      const mockUuid1 = '11111111-1111-4111-8111-111111111111';
      const mockUuid2 = '22222222-2222-4222-a222-222222222222';

      (uuid.v4 as jest.Mock)
        .mockReturnValueOnce(mockUuid1)
        .mockReturnValueOnce(mockUuid2);

      const id1 = UuidUtils.generateTenantId();
      const id2 = UuidUtils.generateUserId();

      expect(id1).toBe(mockUuid1);
      expect(id2).toBe(mockUuid2);
      expect(id1).not.toBe(id2);
      expect(uuid.v4).toHaveBeenCalledTimes(2);
    });
  });
});
