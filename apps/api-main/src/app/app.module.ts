// apps/api-main/src/app/app.module.ts
import { join } from 'path';

import { type ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bullmq';
import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  Inject,
  OnApplicationShutdown, // <<< AÑADIDO
} from '@nestjs/common'; // <<< AÑADIDO OnApplicationShutdown
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';

import {
  ITenantContextService,
  TENANT_CONTEXT_SERVICE_PORT,
  CoapMultiTenancyModule,
} from '@dfs-suite/core-application-multitenancy';
import { InfraObservabilityModule } from '@dfs-suite/infraobservability';
import { InfraPrismaPersistenceModule } from '@dfs-suite/infrapersistence';
import { InfraSecurityModule } from '@dfs-suite/infrasecurity';
import { InfraTenancyPersistenceModule } from '@dfs-suite/infratenancypersistence';
import { TenantPrismaService } from '@dfs-suite/infrapersistence'; // <<< AÑADIDO PARA onApplicationShutdown

import { TenantContextMiddleware } from '../middleware/tenant-context.middleware'; // Path relativo dentro de app
import { TestHelloResolver } from './test-hello.resolver'; // Path relativo dentro de app (app/test-hello.resolver.ts)
import { AuthModule } from '../auth/auth.module'; // Path relativo dentro de app

interface GqlContextParams {
  req: any;
  res: any;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env['NODE_ENV'] === 'test' ? '.env.test' : '.env',
    }),
    InfraObservabilityModule,
    CoapMultiTenancyModule,

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule, CoapMultiTenancyModule],
      useFactory: (
        configService: ConfigService,
        tenantContextService: ITenantContextService
      ) => ({
        autoSchemaFile: join(process.cwd(), 'schema.graphql'),
        sortSchema: true,
        installSubscriptionHandlers: false,
        playground: configService.get<string>('NODE_ENV') !== 'production',
        context: ({
          req,
          res,
          connection,
        }: GqlContextParams & { connection?: { context?: any } }) => {
          if (req) {
            const store = tenantContextService.getStore();
            return { req, res, user: req.user, tenantContext: store };
          }
          if (connection && connection.context) {
            return { ...connection.context };
          }
          return {};
        },
      }),
      inject: [ConfigService, TENANT_CONTEXT_SERVICE_PORT],
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 20,
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          password: configService.get<string>('REDIS_PASSWORD'),
          db: configService.get<number>('REDIS_DB_QUEUE', 1),
        },
      }),
      inject: [ConfigService],
    }),
    InfraTenancyPersistenceModule,
    InfraPrismaPersistenceModule,
    InfraSecurityModule,
    AuthModule,
  ],
  controllers: [],
  providers: [TestHelloResolver],
})
export class AppModule implements NestModule, OnApplicationShutdown {
  // <<< AÑADIDO OnApplicationShutdown
  constructor(
    private readonly logger: Logger,
    @Inject(TENANT_CONTEXT_SERVICE_PORT)
    private readonly tenantContextService: ITenantContextService
  ) {
    if (this.tenantContextService) {
      this.logger.log(
        'TenantContextService inyectado correctamente en AppModule (constructor).',
        AppModule.name
      );
    } else {
      this.logger.error(
        'TenantContextService NO PUDO ser inyectado en AppModule (constructor).',
        AppModule.name
      );
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantContextMiddleware).forRoutes('*');
    this.logger.log(
      'TenantContextMiddleware aplicado globalmente a todas las rutas.',
      AppModule.name
    );
  }

  async onApplicationShutdown(signal?: string) {
    this.logger.warn(
      `Application shutting down (signal: ${signal || 'UNKNOWN'})...`,
      AppModule.name
    );
    await TenantPrismaService.onApplicationShutdown();
    this.logger.log('TenantPrismaService cache cleaned.', AppModule.name);
  }
}
// FIN DEL ARCHIVO: apps/api-main/src/app/app.module.ts
/* SECCIÓN DE MEJORAS FUTURAS
Resumen de Mejoras Realizadas en app.module.ts:
Corrección de Imports en CoapMultiTenancyModule:
Justificación: Las rutas relativas ../ports/ y ../services/ eran incorrectas. Se corrigieron a ./ports/ y ./services/ respectivamente.
Impacto: Resuelve los errores Module not found y TS2307 para coap-multi-tenancy.module.ts.
Descomentados Módulos de Infraestructura:
Justificación: Se han descomentado InfraPrismaPersistenceModule, InfraSecurityModule, y InfraTenancyPersistenceModule en los imports de AppModule, asumiendo que sus respectivos index.ts ahora exportan los módulos NestJS correctamente (ej. InfraPrismaPersistenceModule, InfraSecurityModule, InfraTenancyPersistenceModule).
Impacto: Permite que api-main comience a integrar estos módulos de infraestructura fundamentales. Si los index.ts de estas librerías aún no exportan sus módulos, o si los módulos tienen nombres diferentes, se generarán nuevos errores TS2305 que deberemos corregir.
PinoLoggerAdapter Correcciones:
Justificación: Se eliminaron imports no usados de tipos de shtypes y se corrigió el acceso a propiedades en obj dentro de formatters.log para usar la notación de corchetes obj['propertyName'] debido a la signatura de índice. Se simplificó getLogMeta.
Impacto: Resuelve los errores TS6133 y TS4111. El logging contextualizado debería funcionar mejor.
Mejoras Futuras Detectadas (para app.module.ts y relacionados):
Implementación de AuthModule:
Propuesta: Proceder con la Fase 2.B del roadmap, implementando el AuthModule con sus componentes (AuthService, AuthResolver, JwtTenantStrategy, LocalTenantStrategy, DTOs, etc.).
Justificación: Es el siguiente paso lógico para habilitar la autenticación en pwa-supervisor.
Impacto: Habilita el flujo de login.
Implementación de Módulos de API de Dominio:
Propuesta: Después de AuthModule, comenzar a implementar los módulos de API de dominio uno por uno (ej. TenancyApiModule, LeadsApiModule), incluyendo sus resolvers, DTOs y la inyección de los Casos de Uso y Repositorios correspondientes.
Justificación: Expone la lógica de negocio a través de GraphQL.
Impacto: Proporciona los endpoints para las PWAs.
Revisión de index.ts de Módulos de Infraestructura:
Propuesta: Si los errores TS2305 persisten para los módulos de infraestructura, revisar cada uno de sus archivos index.ts para asegurar que el nombre del módulo exportado (ej. export class InfraPrismaPersistenceModule {}) coincida exactamente con el nombre usado en la importación en app.module.ts.
Justificación: Asegurar la correcta exportación e importación de módulos NestJS.
Impacto: Elimina errores de compilación restantes.
Resumen de Mejoras Realizadas en app.module.ts:
Integración de CoapMultiTenancyModule:
Justificación: Para proveer ITenantContextServicePort globalmente y permitir su inyección en el TenantContextMiddleware y otros servicios que lo necesiten (como el factory de GraphQLModule).
Impacto: Habilita el sistema de contexto de tenant en toda la aplicación api-main.
Inyección de ITenantContextService en GraphQLModule.forRootAsync factory:
Justificación: Permite que el contexto GraphQL (context function) tenga acceso al TenantContextService para poder obtener el tenantId, userId, y correlationId del store de AsyncLocalStorage y adjuntarlos al contexto GraphQL. Esto es crucial para que los resolvers puedan acceder a esta información si es necesario.
Impacto: Contexto de tenant disponible en los resolvers GraphQL.
Ajuste en el context de GraphQLModule:
Justificación: Se ha modificado la función context para obtener el store del tenantContextService (que fue establecido por el TenantContextMiddleware para HTTP o por el onConnect para WebSockets) y lo añade como tenantContext al objeto de contexto GraphQL. También se mantiene el req.user poblado por el AuthGuard.
Impacto: Los resolvers y servicios que dependen del contexto GraphQL pueden acceder al tenantContext completo.
Separación de REDIS_DB_QUEUE:
Justificación: Se añadió una variable de entorno REDIS_DB_QUEUE (default 1) para la conexión de BullMQ, separándola de la DB 0 que podría usarse para caché Redis.
Impacto: Mejor organización de los datos en Redis.
Módulos de Infraestructura y Aplicación Comentados:
Justificación: Se mantienen comentados los módulos de API de dominio y algunos de infraestructura que aún no están completamente implementados o configurados, para asegurar que la aplicación arranque sin errores de dependencias no resueltas durante esta fase de estabilización del contexto.
Impacto: Arranque limpio de api-main enfocado en la funcionalidad de contexto.
Verificación de Inyección en Constructor de AppModule:
Justificación: Se añadió una inyección de prueba de ITenantContextServicePort en el constructor de AppModule con un log para verificar que el servicio (configurado como request-scoped) pueda ser resuelto cuando AppModule se inicializa. Esto es más una prueba de la configuración de DI que una necesidad funcional directa de AppModule.
Impacto: Ayuda a depurar la configuración de DI para el servicio de contexto.
Mejoras Futuras Detectadas (para app.module.ts y relacionados):
Separar redisClientProvider del InfraCacheModule:
Problema: El InfraCacheModule actualmente provee REDIS_CLIENT_INJECTION_TOKEN que es usado por BullMqQueueAdapter (que reside en infraqueue). Esto crea una dependencia circular conceptual si InfraQueueModule (que usa BullMqQueueAdapter) también fuera a ser usado por InfraCacheModule para algún propósito (poco probable, pero es un acoplamiento).
Propuesta: Crear una librería más fundamental, por ejemplo, libs/infrastructure/infra-redis-client/, que solo se encargue de proveer la instancia global del cliente ioredis (o un pool) a través de un token. Tanto InfraCacheModule como InfraBullmqQueueModule (y el BullModule.forRootAsync en app.module.ts) importarían este InfraRedisClientModule para obtener la instancia del cliente Redis.
Justificación: Mejor separación de concerns y gestión de dependencias para la conexión Redis.
Impacto: Creación de una nueva librería, refactorización de InfraCacheModule e InfraBullmqQueueModule (y el BullModule.forRootAsync en AppModule).
Validación de Variables de Entorno con Zod/Joi en ConfigModule:
Problema: Actualmente, ConfigModule.forRoot no tiene un validationSchema.
Propuesta: Implementar un schema de validación (ej. usando Zod desde shvalidationschemas) para todas las variables de entorno requeridas y opcionales.
Justificación: Asegura que la aplicación falle rápido al inicio si faltan variables de entorno críticas o tienen formatos incorrectos.
Impacto: Desarrollo más seguro y detección temprana de errores de configuración.
Configuración de installSubscriptionHandlers para GraphQL Subscriptions:
Problema: Actualmente false.
Propuesta: Una vez que se implemente RealtimeModule con NotificationsGateway (Socket.io) y se decida usar GraphQL Subscriptions sobre WebSockets, esto deberá configurarse adecuadamente (ej. path, onConnect para autenticación y establecimiento de TenantContext para la conexión WebSocket).
Justificación: Habilita la funcionalidad de suscripciones GraphQL.
Impacto: Requiere implementación y configuración adicional en RealtimeModule y el factory de GraphQLModule.
Refinar el context de GraphQL para WebSockets:
Problema: El connection.context para WebSockets necesita ser poblado correctamente durante el onConnect del gateway de WebSocket.
Propuesta: El onConnect del NotificationsGateway debe validar el token JWT del cliente WebSocket, extraer userId y tenantId, y establecer el TenantContext para esa conexión específica, luego adjuntar estos datos al connection.context para que el factory de GraphQLModule pueda usarlos.
Justificación: Asegura que las suscripciones GraphQL operen en el contexto de tenant correcto.
Impacto: Lógica de autenticación y contexto en el gateway de WebSocket.

[
  {
    "mejora": "Reintroducir y verificar cada módulo comentado uno por uno a medida que se implementan sus esqueletos funcionales y se corrigen sus `index.ts`.",
    "justificacion": "Construcción incremental y controlada de la aplicación.",
    "impacto": "Evita una avalancha de errores al intentar integrar todo de golpe."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
/* SECCIÓN DE MEJORAS FUTURAS: (Se mantienen las de la iteración anterior) */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: (Se mantienen las de la iteración anterior) */
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "**ELIMINAR LA DIRECTIVA `eslint-disable` A NIVEL DE ARCHIVO POST-DEMO.**",
    "justificacion": "Es crucial investigar y resolver la causa raíz de los problemas de inferencia de tipos de ESLint con los módulos NestJS para asegurar la máxima calidad y seguridad de tipos.",
    "impacto": "Restauración de la calidad de código y validaciones estrictas de ESLint."
  }
  // Otras mejoras futuras se mantienen.
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Si `@typescript-eslint/prefer-nullish-coalescing` sigue apareciendo para `REDIS_PASSWORD` después de esto, se puede añadir a la lista de `eslint-disable` a nivel de archivo o deshabilitarlo solo para esa línea."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Investigar a fondo la causa de los errores de ESLint con `EventEmitterModule.forRoot()` y `consumer.apply()` para eliminar los `eslint-disable`.",
    "justificacion": "Asegurar la máxima calidad y seguridad de tipos sin supresiones de reglas.",
    "impacto": "Código más robusto y mantenible a largo plazo."
  }
  // Otras mejoras futuras se mantienen de la iteración anterior.
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Si `configService.get<string>('REDIS_PASSWORD')` devuelve `undefined` y la librería BullMQ/ioredis espera estrictamente un `string` para `password` (incluso si es opcional, lo cual sería raro), entonces se podría necesitar una lógica como `password: configService.get<string>('REDIS_PASSWORD') || undefined,` para asegurar que se pase `undefined` explícitamente si la variable no existe. Sin embargo, la mayoría de las librerías manejan bien que una propiedad opcional no esté presente en el objeto de configuración."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Reemplazar `user?: any` en `GqlHttpRequest` con el tipo `AuthenticatedUser` real una vez que `AuthModule` esté completamente definido.",
    "justificacion": "Seguridad de tipos completa.",
    "impacto": "Eliminación de `any`."
  },
  {
    "mejora": "Investigar y resolver el tipado para `consumer.apply(TenantContextMiddleware)` para eliminar el `eslint-disable-next-line`.",
    "justificacion": "Código 100% type-safe y sin deshabilitaciones de ESLint.",
    "impacto": "Calidad a largo plazo."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "La efectividad del tipado en `GqlContextParams` para eliminar los errores `no-unsafe-*` dependerá de si ESLint puede ahora inferir correctamente los tipos a través de estas interfaces. Si persisten, podríamos necesitar `// @ts-expect-error` o `eslint-disable-next-line` más localizados con TODOs específicos para la demo."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Definir un tipo específico para `req.user` (ej. `AuthenticatedUserPayload`) una vez que `AuthModule` y `JwtStrategy` estén implementados, y usarlo en `GqlContextParams`.",
    "justificacion": "Reemplazar `any` por un tipo fuerte para el usuario autenticado.",
    "impacto": "Mayor seguridad de tipos."
  },
  {
    "mejora": "Investigar a fondo y resolver el tipado para `consumer.apply()` para eliminar el `eslint-disable-next-line`.",
    "justificacion": "Tener un código 100% type-safe sin deshabilitaciones de ESLint.",
    "impacto": "Calidad de código a largo plazo."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Los `TODO: [LIA-24H-DEMO]` indican puntos donde se tomó un atajo por la urgencia y deben ser revisados/refactorizados después de la demo."
  },
  {
    "nota": "La importación de módulos de API de dominio (`// TenancyApiModule, ...`) sigue comentada y se activará a medida que esos módulos se implementen."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Implementar `validationSchema` en `ConfigModule.forRoot` usando Joi o Zod.",
    "justificacion": "Para validar las variables de entorno al inicio de la aplicación.",
    "impacto": "Arranque más seguro y detección temprana de errores de configuración."
  },
  {
    "mejora": "Mover la instanciación y registro global de `AllExceptionsFilter`, `LoggingInterceptor`, y `TransformResponseInterceptor` de `main.ts` a los `providers` de `AppModule` (o `InfraObservabilityModule`) usando `APP_FILTER` y `APP_INTERCEPTOR`.",
    "justificacion": "Es la forma más idiomática de NestJS para registrar componentes globales que pueden participar en el ciclo de vida de DI.",
    "impacto": "Mejor integración con NestJS. Requeriría que estos componentes sean `@Injectable()`."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Los módulos de API de dominio (LeadsApiModule, etc.) se añadirán a `imports` a medida que se implementen. Lo mismo para otros módulos de infraestructura (`infraaiproviders`, `infravectorstore`, etc.)."
  },
  {
    "nota": "La librería `@dfs-suite/infraobservability` debe exportar `InfraObservabilityModule`."
  },
  {
    "nota": "El `TenantContextModule` (o donde se provea `TenantContextService`) también debe ser importado aquí y asegurar que el servicio sea `Scope.REQUEST`."
  }
]
*/
