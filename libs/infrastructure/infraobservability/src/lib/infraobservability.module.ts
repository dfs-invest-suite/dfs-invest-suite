// RUTA: libs/infrastructure/infraobservability/src/lib/infraobservability.module.ts
import { Global, Logger, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Necesario para PinoLoggerAdapter

import { LOGGER_PORT } from '@dfs-suite/cdskports';

import { PinoLoggerAdapter } from './logger/pino-logger.adapter';
// Los filtros e interceptores no necesitan ser proveídos por el módulo si se instancian
// directamente en main.ts y se les pasa la instancia del logger.
// Si se quisiera que NestJS los maneje con DI, se podrían añadir aquí.
// import { AllExceptionsFilter } from './filters/all-exceptions.filter';
// import { LoggingInterceptor } from './interceptors/logging.interceptor';
// import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';

const pinoLoggerProvider: Provider = {
  provide: LOGGER_PORT, // Nuestro puerto de dominio
  useClass: PinoLoggerAdapter,
};

// Provider para que NestJS use nuestro logger para sus logs internos
const nestJsLoggerProvider: Provider = {
  provide: Logger, // El token Logger de @nestjs/common
  useExisting: LOGGER_PORT, // Reutiliza la instancia de PinoLoggerAdapter
};

@Global() // Hacer el módulo global para que el logger esté disponible en toda la app
@Module({
  imports: [
    ConfigModule, // PinoLoggerAdapter depende de ConfigService
  ],
  providers: [
    PinoLoggerAdapter, // Para que pueda ser inyectado directamente por su clase si es necesario
    pinoLoggerProvider,
    nestJsLoggerProvider,
    // Si los filtros/interceptors se gestionaran con DI:
    // AllExceptionsFilter,
    // LoggingInterceptor,
    // TransformResponseInterceptor,
  ],
  exports: [
    LOGGER_PORT,
    Logger, // Exportar el token Logger de NestJS para que otros módulos puedan inyectarlo
    PinoLoggerAdapter,
    // AllExceptionsFilter,
    // LoggingInterceptor,
    // TransformResponseInterceptor,
  ],
})
export class InfraObservabilityModule {}
// FIN DEL ARCHIVO: libs/infrastructure/infraobservability/src/lib/infraobservability.module.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Creación de `InfraObservabilityModule`.",
    "justificacion": "Encapsula la provisión del `PinoLoggerAdapter` tanto para nuestro `ILoggerPort` como para el `Logger` de NestJS, haciendo que el logger esté disponible globalmente para la inyección de dependencias.",
    "impacto": "Configuración de logging centralizada y limpia."
  },
  {
    "mejora": "Módulo marcado como `@Global()`.",
    "justificacion": "Permite que los providers exportados (especialmente `LOGGER_PORT` y `Logger`) estén disponibles en toda la aplicación sin necesidad de importar `InfraObservabilityModule` en cada módulo que necesite logging.",
    "impacto": "Simplifica la inyección del logger."
  },
  {
    "mejora": "Importación de `ConfigModule`.",
    "justificacion": "`PinoLoggerAdapter` ahora inyecta `ConfigService` para obtener el nivel de log y el entorno, por lo que este módulo debe estar disponible.",
    "impacto": "Dependencia necesaria para la configuración del logger."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Proveer y exportar `AllExceptionsFilter`, `LoggingInterceptor` y `TransformResponseInterceptor` desde este módulo.",
    "justificacion": "Permitiría que estos componentes también puedan tener dependencias inyectadas por NestJS si fuera necesario, y se registrarían globalmente en `AppModule` en lugar de `main.ts`.",
    "impacto": "Mayor integración con el sistema DI de NestJS para estos componentes."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Este módulo debe ser importado en el `AppModule` de `apps/api-main/src/app/app.module.ts`."
  }
]
*/
