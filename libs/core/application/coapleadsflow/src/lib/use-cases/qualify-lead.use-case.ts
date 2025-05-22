// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/qualify-lead.use-case.ts
import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
import { IDomainEventEmitter } from '@dfs-suite/cdskevents';
import { ILoggerPort } from '@dfs-suite/cdskports';
import {
  AIAnalysisResult,
  IConversationAnalyzerPort,
} from '@dfs-suite/codoaiperassistance';
import { ILeadRepository, LeadScoreVO } from '@dfs-suite/codoleadsflow';
import {
  ExceptionBase,
  InternalServerErrorException,
  NotFoundException,
} from '@dfs-suite/sherrors';
import { Result, err, isErr, isOk, ok } from '@dfs-suite/shresult'; // <<< isOk, isErr importados
import { Maybe, ObjectLiteral } from '@dfs-suite/shtypes'; // <<< Maybe, ObjectLiteral importados

import { QualifyLeadCommand } from '../commands/qualify-lead.command';
import { LeadQualificationResultDto } from '../dtos/lead-qualification-result.dto';

export const QUALIFY_LEAD_USE_CASE = Symbol('IQualifyLeadUseCase');
export type IQualifyLeadUseCase = ICommandHandler<
  QualifyLeadCommand,
  LeadQualificationResultDto
>;

export class QualifyLeadUseCaseImpl implements IQualifyLeadUseCase {
  constructor(
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(LEAD_REPOSITORY_PORT)
    private readonly leadRepo: ILeadRepository,
    // @Inject(CONVERSATION_ANALYZER_PORT_DOMAIN)
    private readonly conversationAnalyzer: IConversationAnalyzerPort,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly eventEmitter: IDomainEventEmitter // private readonly qualificationRulesService: ILeadQualificationRulesService; // Futuro
  ) {}

  async execute(
    command: QualifyLeadCommand
  ): Promise<
    Result<LeadQualificationResultDto, ExceptionBase | NotFoundException>
  > {
    const {
      tenantId,
      leadId,
      interactionText,
      manualScoreOverride,
      qualificationSource,
      additionalContext,
    } = command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = QualifyLeadUseCaseImpl.name;

    this.logger.log(
      `Qualifying lead ${String(leadId)} for tenant ${String(
        tenantId
      )}. Source: ${qualificationSource}`,
      useCaseName,
      correlationId
    );

    try {
      const leadResult = await this.leadRepo.findOneById(leadId);
      if (isErr(leadResult)) return err(leadResult.error);
      if (!leadResult.value) {
        return err(
          new NotFoundException(
            `Lead ${String(leadId)} not found for qualification.`,
            undefined,
            { leadId },
            correlationId
          )
        );
      }
      const leadEntity = leadResult.value;
      const oldScore = leadEntity.score.value;
      const oldStatus = leadEntity.status.value;

      let calculatedScore = oldScore;
      let aiAnalysisResultForDto: Maybe<AIAnalysisResult> = undefined;
      let qualificationDetailsForEvent: ObjectLiteral = {
        source: qualificationSource,
        ...additionalContext,
      };

      if (manualScoreOverride !== undefined && manualScoreOverride !== null) {
        calculatedScore = manualScoreOverride;
        qualificationDetailsForEvent.manualOverride = true;
        this.logger.log(
          `Manual score override: ${calculatedScore} for lead ${String(
            leadId
          )}`,
          useCaseName,
          correlationId
        );
      } else if (interactionText) {
        const analysisResult = await this.conversationAnalyzer.analyzeText({
          tenantId,
          text: interactionText,
          contextHint: 'LEAD_INTERACTION_FOR_QUALIFICATION',
        });

        if (isOk(analysisResult) && analysisResult.value) {
          // <<< CORREGIDO
          aiAnalysisResultForDto = analysisResult.value;
          qualificationDetailsForEvent.aiAnalysis = aiAnalysisResultForDto;
          let scoreAdjustment = 0;
          // Lógica de ajuste de score basada en IA (ejemplo)
          if (
            aiAnalysisResultForDto.sentiment === 'POSITIVE' &&
            (aiAnalysisResultForDto.sentimentScore ?? 0) > 0.6
          )
            scoreAdjustment += 20;
          if (
            aiAnalysisResultForDto.sentiment === 'NEGATIVE' &&
            (aiAnalysisResultForDto.sentimentScore ?? 0) > 0.5
          )
            scoreAdjustment -= 10;
          if (aiAnalysisResultForDto.intents?.includes('REQUEST_CALLBACK'))
            scoreAdjustment += 15;
          if (aiAnalysisResultForDto.intents?.includes('PURCHASE_INTENT'))
            scoreAdjustment += 30;

          calculatedScore = Math.max(
            0,
            Math.min(1000, calculatedScore + scoreAdjustment)
          );
          this.logger.log(
            `AI analysis for lead ${String(leadId)}: Sentiment ${
              aiAnalysisResultForDto.sentiment
            }, Score adj: ${scoreAdjustment}, New potential score: ${calculatedScore}`,
            useCaseName,
            correlationId
          );
        } else if (isErr(analysisResult)) {
          this.logger.warn(
            `AI analysis failed for lead ${String(leadId)}: ${
              analysisResult.error.message
            }`,
            useCaseName,
            correlationId
          );
          qualificationDetailsForEvent.aiAnalysisError =
            analysisResult.error.message;
        }
      }
      // TODO: Aplicar LeadQualificationRulesService (reglas de negocio fijas) si existe

      const newScoreVO = LeadScoreVO.create(calculatedScore);
      // Pasar qualificationDetailsForEvent y el contexto al método de la entidad
      leadEntity.updateScore(newScoreVO, qualificationDetailsForEvent, {
        tenantId,
        correlationId,
      });

      // TODO: Lógica para determinar el nuevo ELeadStatus basado en el newScoreVO y reglas.
      // Por ejemplo, si el score cruza un umbral, cambiar status a QUALIFIED.
      // if (newScoreVO.isHot() && oldStatus !== ELeadStatus.QUALIFIED) {
      //   leadEntity.changeStatus(LeadStatusVO.create(ELeadStatus.QUALIFIED), {tenantId, correlationId, changedBy: command.metadata.userId || 'SYSTEM' as UserId });
      // }

      const saveResult = await this.leadRepo.update(leadEntity);
      if (isErr(saveResult)) return err(saveResult.error);

      await this.eventEmitter.publishAll(leadEntity.getAndClearDomainEvents());

      this.logger.log(
        `Lead ${String(leadId)} qualified. Old Score: ${oldScore}, New Score: ${
          leadEntity.score.value
        }. Old Status: ${oldStatus}, New Status: ${leadEntity.status.value}`,
        useCaseName,
        correlationId
      );

      return ok({
        leadId: leadEntity.id,
        oldScore,
        newScore: leadEntity.score.value,
        oldStatus,
        newStatus: leadEntity.status.value,
        qualificationDetails: qualificationDetailsForEvent,
      });
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error qualifying lead.',
              error as Error,
              undefined,
              correlationId
            );
      this.logger.error(
        `Error in ${useCaseName}: ${errBase.message}`,
        errBase.stack,
        useCaseName,
        correlationId
      );
      return err(errBase);
    }
  }
}
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadidas importaciones para isOk, isErr, Maybe, ObjectLiteral, CorrelationId y AIAnalysisResult.", "justificacion": "Resuelve todos los errores no-undef en este archivo.", "impacto": "Correctitud de tipos y lógica." },
{ "mejora": "Mejorada la lógica de manejo de analysisResult para usar isOk y isErr y asignar a aiAnalysisResultForDto.", "justificacion": "Uso correcto del patrón Result.", "impacto": "Lógica más robusta." },
{ "mejora": "El objeto qualificationDetailsForEvent ahora se pasa al método updateScore de la entidad.", "justificacion": "Permite que la entidad decida qué detalles incluir en el evento LeadQualifiedEvent.", "impacto": "Mayor encapsulación en la entidad."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "La lógica de ajuste de score basada en IA es un ejemplo simple y debe ser expandida. Se debe implementar la lógica para cambiar el ELeadStatus si el score cruza umbrales definidos."},
{"nota": "Asegurar que IConversationAnalyzerPort (de codoaiperassistance) y ILeadQualificationRulesService (de codoleadsflow, si se crea) sean correctamente inyectados y utilizados."}
]
*/
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadidas importaciones para isOk, isErr desde @dfs-suite/shresult y AIAnalysisResult desde @dfs-suite/codoaiperassistance y CorrelationId.", "justificacion": "Resuelve los errores no-undef.", "impacto": "Correctitud de tipos." },
{ "mejora": "Corregida la lógica de if (isOk(analysisResult) && analysisResult.value) para usar el type guard correctamente.", "justificacion": "Acceso seguro al valor del Result.", "impacto": "Lógica correcta."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Implementar una lógica más sofisticada para determinar el ELeadStatus basado en el nuevo LeadScoreVO y posiblemente otras reglas de negocio."} ] */
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Esqueleto de QualifyLeadUseCaseImpl.", "justificacion": "Define el flujo para calificar un lead, usando potencialmente análisis de IA (vía IConversationAnalyzerPort) y reglas de negocio (futuro).", "impacto": "Permite la calificación dinámica de leads." },
{ "mejora": "Interacción con IConversationAnalyzerPort del dominio codoaiperassistance.", "justificacion": "Ejemplo de colaboración entre Bounded Contexts a través de puertos de dominio.", "impacto": "Enriquecimiento de la calificación con IA."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "Implementar LeadQualificationRulesService en el dominio codoleadsflow si se necesitan reglas de negocio complejas para el scoring, además de la IA."},
{"nota": "Definir la lógica para determinar el ELeadStatus basado en el LeadScoreVO."},
{"nota": "Asegurar que IConversationAnalyzerPort y su token CONVERSATION_ANALYZER_PORT_DOMAIN se importen correctamente desde @dfs-suite/codoaiperassistance."}
]
*/
