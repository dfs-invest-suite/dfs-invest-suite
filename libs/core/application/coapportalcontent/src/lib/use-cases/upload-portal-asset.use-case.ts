// RUTA: libs/core/application/coapportalcontent/src/lib/use-cases/upload-portal-asset.use-case.ts
// TODO: [LIA Legacy - Implementar UploadPortalAssetUseCase]
// Propósito: Maneja la subida de un activo, lo guarda usando un IFileStoragePort (de infra),
// y crea/actualiza PortalAssetEntity.
// Relacionado con Casos de Uso: BP-PORTAL-ASSET-001
// import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
// import { UploadPortalAssetCommand } from '../commands/upload-portal-asset.command';
// import { PortalAssetDto } from '../dtos/portal-asset.dto';
// import { IFileStoragePort, INFRASTRUCTURE_FILE_STORAGE_PORT } from '@dfs-suite/infrastorageservice'; // Asumiendo puerto en infra
// import { IPortalAssetRepository, PORTALASSET_REPOSITORY_PORT, PortalAssetEntity } from '@dfs-suite/codoportalcontent';

// export class UploadPortalAssetUseCase implements ICommandHandler<UploadPortalAssetCommand, PortalAssetDto> {
//   constructor(
//      // @Inject(INFRASTRUCTURE_FILE_STORAGE_PORT) private readonly fileStorage: IFileStoragePort,
//      // @Inject(PORTALASSET_REPOSITORY_PORT) private readonly assetRepo: IPortalAssetRepository
//   ) {}
//   async execute(command: UploadPortalAssetCommand): Promise<Result<PortalAssetDto, ExceptionBase>> {
//     // 1. Subir archivo usando fileStorage.uploadFile(tenantId, command.payload.fileBufferOrStream, command.payload.fileName, command.payload.assetType)
//     // 2. Si subida exitosa, obtener URL/path de almacenamiento.
//     // 3. Crear o actualizar PortalAssetEntity con los detalles y la URL.
//     // 4. Guardar PortalAssetEntity.
//     // 5. Mapear a PortalAssetDto.
//     return ok({} as PortalAssetDto); // Placeholder
//   }
// }
