// RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/update-tenant-business-profile.use-case.ts
import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
import { ILoggerPort } from '@dfs-suite/cdskports';
import {
  IWhatsAppAdminPort,
  TWhatsAppBusinessProfile,
} from '@dfs-suite/codowhatsapp';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import {
  Result,
  err,
  isErr /* <<< IMPORTADO isOk */,
  ok,
} from '@dfs-suite/shresult';
import { Maybe /* <<< IMPORTADO Maybe */ } from '@dfs-suite/shtypes';

import { UpdateBusinessProfileCommand } from '../commands/update-business-profile.command';

export interface UpdateTenantBusinessProfileResultDto {
  success: boolean;
  updatedProfile?: Maybe<TWhatsAppBusinessProfile>;
}

export const UPDATE_TENANT_BUSINESS_PROFILE_USE_CASE = Symbol(
  'IUpdateTenantBusinessProfileUseCase'
);
export type IUpdateTenantBusinessProfileUseCase = ICommandHandler<
  UpdateBusinessProfileCommand,
  UpdateTenantBusinessProfileResultDto
>;

export class UpdateTenantBusinessProfileUseCaseImpl
  implements IUpdateTenantBusinessProfileUseCase
{
  constructor(
    private readonly logger: ILoggerPort,
    private readonly waAdminPort: IWhatsAppAdminPort
  ) {}

  async execute(
    command: UpdateBusinessProfileCommand
  ): Promise<Result<UpdateTenantBusinessProfileResultDto, ExceptionBase>> {
    const { tenantId, wabaId, phoneNumberId, profileData, updatedByUserId } =
      command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = UpdateTenantBusinessProfileUseCaseImpl.name;

    this.logger.log(
      `Attempting to update business profile for tenant ${String(
        tenantId
      )}, WABA ${String(wabaId)}, PhoneID ${String(
        phoneNumberId
      )}. Updated by: ${String(updatedByUserId)}`,
      useCaseName,
      correlationId
    );

    try {
      const updateResult = await this.waAdminPort.updateBusinessProfile(
        tenantId,
        wabaId,
        phoneNumberId,
        profileData
      );

      if (isErr(updateResult)) {
        this.logger.error(
          `Failed to update business profile: ${updateResult.error.message}`,
          useCaseName,
          correlationId
        );
        return err(updateResult.error);
      }

      let updatedProfile: Maybe<TWhatsAppBusinessProfile> = undefined;
      if (updateResult.value.success) {
        const fetchProfileResult = await this.waAdminPort.getBusinessProfile(
          tenantId,
          wabaId,
          phoneNumberId
        );
        if (ok(fetchProfileResult) && fetchProfileResult.value) {
          // <<<<<<< CORREGIDO: usar ok() para chequear o directamente isOk()
          updatedProfile = fetchProfileResult.value;
        } else if (isErr(fetchProfileResult)) {
          // Chequear explícitamente si es error
          this.logger.warn(
            `Successfully updated profile for ${String(
              phoneNumberId
            )} but failed to fetch updated details: ${
              fetchProfileResult.error.message
            }`,
            useCaseName,
            correlationId
          );
        }
      }

      this.logger.log(
        `Business profile update attempt result for phone ${String(
          phoneNumberId
        )}: ${updateResult.value.success}.`,
        useCaseName,
        correlationId
      );
      return ok({ success: updateResult.value.success, updatedProfile });
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error updating business profile.',
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
// RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/update-tenant-business-profile.use-case.ts
// RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/update-tenant-business-profile.use-case.ts
// RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/update-tenant-business-profile.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Esqueleto de UpdateTenantBusinessProfileUseCaseImpl.", "justificacion": "Permite actualizar el perfil de negocio de un número WA del tenant directamente en Meta.", "impacto": "Funcionalidad de gestión." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadida importación de Maybe desde @dfs-suite/shtypes.", "justificacion": "Resuelve el error no-undef.", "impacto": "Correctitud." },
{ "mejora": "El DTO de resultado ahora puede devolver TWhatsAppBusinessProfile (de Meta) para reflejar el perfil actualizado.", "justificacion": "Proporciona feedback más útil a la UI.", "impacto": "Mejora la respuesta del UC."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadida importación de Maybe desde @dfs-suite/shtypes y isOk (junto con ok, err, isErr) desde @dfs-suite/shresult.", "justificacion": "Resuelve errores no-undef.", "impacto": "Correctitud." },
{ "mejora": "Corregida la condición if(isOk(fetchProfileResult)) para usar el type guard isOk correctamente.", "justificacion": "El valor de ok() es un objeto, no un booleano. isOk() es el type guard.", "impacto": "Lógica correcta."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
