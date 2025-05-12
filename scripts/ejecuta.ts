// scripts/ejecuta.ts
import * as fs from 'fs';
import * as path from 'path';

interface FileToCreate {
  relativePath: string;
  content?: string;
}

// Concatenamos la nueva lista de archivos con la anterior,
// o simplemente reemplazamos si solo queremos crear estos nuevos.
// Para este caso, voy a asumir que quieres añadir estos a los que ya existían,
// pero si solo quieres los nuevos, elimina la lista anterior de `filesToCreate`.
const existingFiles: FileToCreate[] = [
  // Los archivos de libs/core/domain/tenancy/... que definimos antes
  { relativePath: 'libs/core/domain/tenancy/src/lib/entities/tenant.entity.ts' },
  { relativePath: 'libs/core/domain/tenancy/src/lib/entities/tenant-configuration.entity.ts' },
  { relativePath: 'libs/core/domain/tenancy/src/lib/value-objects/tenant-status.vo.ts' },
  { relativePath: 'libs/core/domain/tenancy/src/lib/value-objects/db-connection-config.vo.ts' },
  { relativePath: 'libs/core/domain/tenancy/src/lib/events/tenant-created.event.ts' },
  { relativePath: 'libs/core/domain/tenancy/src/lib/events/tenant-activated.event.ts' },
  { relativePath: 'libs/core/domain/tenancy/src/lib/events/tenant-suspended.event.ts' },
  { relativePath: 'libs/core/domain/tenancy/src/lib/ports/tenant.repository.port.ts' },
  { relativePath: 'libs/core/domain/tenancy/src/lib/ports/tenant-configuration.repository.port.ts' },
  { relativePath: 'libs/core/domain/tenancy/src/lib/errors/tenant-already-exists.error.ts' },
  { relativePath: 'libs/core/domain/tenancy/src/lib/errors/invalid-tenant-status-transition.error.ts' },
  { relativePath: 'libs/core/domain/tenancy/src/lib/services/.gitkeep' },
];

const newApplicationTenancyFiles: FileToCreate[] = [
  { relativePath: 'libs/core/application/tenancy/src/lib/commands/create-tenant/create-tenant.command.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/commands/activate-tenant/activate-tenant.command.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/commands/set-tenant-db-config/set-tenant-db-config.command.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/use-cases/create-tenant/create-tenant.use-case.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/use-cases/activate-tenant/activate-tenant.use-case.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/use-cases/set-tenant-db-config/set-tenant-db-config.use-case.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/queries/get-tenant-details/get-tenant-details.query.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/queries/get-tenant-details/get-tenant-details.query-handler.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/queries/list-tenants/list-tenants.query.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/queries/list-tenants/list-tenants.query-handler.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/dtos/tenant-details.dto.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/dtos/tenant-summary.dto.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/ports/database-provisioning.service.port.ts', content: '// Placeholder\n' },
  { relativePath: 'libs/core/application/tenancy/src/lib/ports/user-provisioning.service.port.ts', content: '// Placeholder\n' },
];

// Decide si quieres crear todos (los anteriores y los nuevos) o solo los nuevos.
// Para solo los nuevos: const filesToCreate: FileToCreate[] = newApplicationTenancyFiles;
// Para todos (añadir los nuevos a los existentes):
const filesToCreate: FileToCreate[] = [...existingFiles, ...newApplicationTenancyFiles];
// Si solo quieres los nuevos de esta tanda, comenta la línea de arriba y descomenta la siguiente:
// const filesToCreate: FileToCreate[] = newApplicationTenancyFiles;


async function createPlaceholderFiles(): Promise<void> {
  const projectRoot = path.resolve(__dirname, '..');

  for (const file of filesToCreate) {
    const filePath = path.join(projectRoot, file.relativePath);
    const dirName = path.dirname(filePath);

    try {
      if (!fs.existsSync(dirName)) {
        await fs.promises.mkdir(dirName, { recursive: true });
        console.log(`Directorio creado: ${dirName}`);
      }

      // Usar el contenido personalizado si se proporciona, de lo contrario la ruta comentada.
      const fileContent = file.content !== undefined ? file.content : `// ${file.relativePath}\n`;
      await fs.promises.writeFile(filePath, fileContent, 'utf8');
      console.log(`Archivo placeholder creado: ${filePath}`);

    } catch (error) {
      console.error(`Error creando archivo ${filePath}:`, error);
    }
  }
  console.log('\nProceso de creación de placeholders completado.');
}

createPlaceholderFiles()
  .then(() => {
    // Opcional
  })
  .catch((error) => {
    console.error('Error general en el script:', error);
    process.exit(1);
  });
