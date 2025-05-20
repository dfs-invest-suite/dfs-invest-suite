// RUTA: libs/shared/shutils/src/lib/uuid.utils.spec.ts
// TODO: [LIA Legacy - Verificar contenido y imports de uuid.utils.spec.ts] - ¡REALIZADO!
import * as uuid from 'uuid';

import { UUID_V4_REGEX } from '@dfs-suite/shconstants';

import { UuidUtils } from './uuid.utils';

jest.mock('uuid', () => {
  const originalModule = jest.requireActual('uuid');
  return {
    ...originalModule,
    v4: jest.fn(),
  };
});

describe('UuidUtils', () => {
  const mockUuidV4Default = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d';

  beforeEach(() => {
    (uuid.v4 as jest.Mock).mockReturnValue(mockUuidV4Default);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('la función base `generate` (privada) debe llamar a uuid.v4 y devolver su valor', () => {
    const id = UuidUtils.generateAggregateId();
    expect(uuid.v4).toHaveBeenCalledTimes(1);
    expect(id).toBe(mockUuidV4Default);
  });

  describe('Generadores de ID Específicos', () => {
    const idGeneratorTestCases: Array<{
      method: keyof typeof UuidUtils;
      typeName: string;
    }> = [
      { method: 'generateAggregateId', typeName: 'AggregateId' },
      { method: 'generateTenantId', typeName: 'TenantId' },
      { method: 'generateUserId', typeName: 'UserId' },
      { method: 'generateLeadId', typeName: 'LeadId' },
      { method: 'generateWhatsAppAccountId', typeName: 'WhatsAppAccountId' },
      { method: 'generateWabaId', typeName: 'WabaId' },
      { method: 'generateMessageTemplateId', typeName: 'MessageTemplateId' },
      { method: 'generateMessageLogId', typeName: 'MessageLogId' },
      {
        method: 'generateAiperConversationId',
        typeName: 'AiperConversationId',
      },
      { method: 'generateAiperMessageId', typeName: 'AiperMessageId' },
      {
        method: 'generateAiperSystemPromptId',
        typeName: 'AiperSystemPromptId',
      },
      {
        method: 'generateKnowledgeDocumentId',
        typeName: 'KnowledgeDocumentId',
      },
      { method: 'generateKnowledgeChunkId', typeName: 'KnowledgeChunkId' },
      { method: 'generatePropertyListingId', typeName: 'PropertyListingId' },
      {
        method: 'generatePortalAppearanceConfigId',
        typeName: 'PortalAppearanceConfigId',
      },
      {
        method: 'generateEducationalContentId',
        typeName: 'EducationalContentId',
      },
      { method: 'generateContentCategoryId', typeName: 'ContentCategoryId' },
      { method: 'generateDocumentId', typeName: 'DocumentId' },
      { method: 'generateContractTemplateId', typeName: 'ContractTemplateId' },
      { method: 'generateSignatureRequestId', typeName: 'SignatureRequestId' },
      {
        method: 'generateBlockchainTransactionHash',
        typeName: 'BlockchainTransactionHash',
      },
      { method: 'generateWalletAddress', typeName: 'WalletAddress' },
      { method: 'generateAssetId', typeName: 'AssetId' },
      { method: 'generateSPEId', typeName: 'SPEId' },
      { method: 'generateCampaignId', typeName: 'CampaignId' },
      { method: 'generateBillingPlanId', typeName: 'BillingPlanId' },
      { method: 'generateBilledUsageId', typeName: 'BilledUsageId' },
      { method: 'generatePricingRateId', typeName: 'PricingRateId' },
      { method: 'generateCommandInstanceId', typeName: 'CommandInstanceId' },
      { method: 'generateQueryInstanceId', typeName: 'QueryInstanceId' },
      {
        method: 'generateDomainEventInstanceId',
        typeName: 'DomainEventInstanceId',
      },
      {
        method: 'generateIntegrationEventInstanceId',
        typeName: 'IntegrationEventInstanceId',
      },
      { method: 'generateCorrelationId', typeName: 'CorrelationId' },
      { method: 'generateCausationId', typeName: 'CausationId' },
      { method: 'generateSessionId', typeName: 'SessionId' },
    ];

    it.each(idGeneratorTestCases)(
      'debe generar un UUID v4 válido para $typeName usando $method',
      ({ method }) => {
        const generatorFunction = UuidUtils[method];
        if (typeof generatorFunction !== 'function') {
          throw new Error(
            `El método ${method} no es una función en UuidUtils.`
          );
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const generatedId = (generatorFunction as any).call(UuidUtils);

        expect(uuid.v4).toHaveBeenCalledTimes(1);
        expect(generatedId).toBe(mockUuidV4Default);
        expect(UUID_V4_REGEX.test(generatedId as string)).toBe(true);

        (uuid.v4 as jest.Mock).mockClear();
      }
    );

    it('debe generar diferentes UUIDs en llamadas subsecuentes si uuid.v4 devuelve valores diferentes', () => {
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
// RUTA: libs/shared/shutils/src/lib/uuid.utils.spec.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Contenido del test restaurado a su versión correcta para `UuidUtils`.", "justificacion": "El archivo había sido sobrescrito accidentalmente con el contenido de `result.utils.spec.ts`.", "impacto": "Permite que los tests para `UuidUtils` se ejecuten como es debido." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
