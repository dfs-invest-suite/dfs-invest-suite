https://aistudio.google.com/app/prompts/15hDKywdfm0FtOjqbVhpvTHzavRg2WSrb iamdfsinvestimentos.dev3 mmi whatsapp

Guía Arquitectónica y de Implementación para la IA Experta en NX: dfs-invest-suite v3.3
A LA ATENCIÓN DE LA IA EXPERTA EN NX:

Este documento detalla la arquitectura proyectada, la estructura de archivos, los componentes clave y la lógica fundamental para la plataforma dfs-invest-suite. Tu tarea será traducir estas especificaciones en un workspace Nx funcional, configurando las aplicaciones, librerías y las interconexiones iniciales.

**I. FILOSOFÍA Y PRINCIPIOS ARQUITECTÓNICOS RECTORES (A APLICAR EN NX)**:
Monorepo Estricto con Nx:
Justificación: Visibilidad completa, compartición de código optimizada, consistencia en tooling, builds/tests afectados para eficiencia, gestión centralizada de dependencias.
Acción IA NX: Utilizar generadores Nx para crear todas las apps y libs. Configurar nx.json para npmScope (ej. @dfs-suite), targetDefaults, namedInputs, y plugins (@nx/nest, @nx/next, @nx/js, @nx/eslint, @nx/jest).
Arquitectura Hexagonal (Puertos y Adaptadores) en el Backend Core:
Justificación: Desacoplamiento máximo de la lógica de negocio de la infraestructura. Alta testeabilidad. Flexibilidad para cambiar tecnologías de infraestructura.
Acción IA NX: Estructurar libs/core/ para definir dominios con entidades, servicios de dominio y puertos (interfaces). libs/application/ para casos de uso que usan estos puertos. libs/infrastructure/ para las implementaciones concretas de los puertos.
Diseño Orientado al Dominio (DDD) Táctico:
Justificación: Modelar el negocio de forma clara, con un lenguaje ubicuo y límites de contexto bien definidos.
Acción IA NX: Crear subdirectorios dentro de libs/core/src/ para cada dominio principal (tenancy, anti-ban, leads-flow, whatsapp, users-roles, aiper-assistance, etc.).
Multi-Tenancy con Aislamiento Total (Database-per-Tenant):
Justificación: Máxima seguridad, privacidad, escalabilidad por tenant y personalización.
Acción IA NX:
El PrismaService en libs/infrastructure/persistence/ debe ser diseñado para aceptar un tenantId y conectarse a la base de datos correspondiente (la lógica de gestión de connection strings se abstraerá a través de un TenantConfigRepository).
Los scripts de migración Prisma se aplicarán a un schema "plantilla", y el provisioning de tenants (gestionado por apps/admin-platform a través de un TenantOrchestrationService) se encargará de crear y migrar la DB del nuevo tenant.
API-First (GraphQL Prioritario):
Justificación: Flexibilidad para los clientes frontend, reducción de over/under-fetching, schema tipado.
Acción IA NX: Configurar apps/api-main con @nestjs/apollo y generar los módulos GraphQL por dominio.
Tipado Estricto (TypeScript):
Justificación: Detección temprana de errores, mejor mantenibilidad, auto-documentación.
Acción IA NX: Configurar tsconfig.base.json con strict: true y opciones recomendadas. Todas las libs y apps deben adherirse.
Testing Integral:
Justificación: Asegurar calidad y prevenir regresiones.
Acción IA NX: Configurar Jest con jest.preset.js de Nx. Generar specs para servicios, controladores, casos de uso, adaptadores. Configurar Playwright/Cypress para E2E en apps frontend.

II. ESTRUCTURA DE DIRECTORIOS Y ARCHIVOS (PROPUESTA NX):
(Basada en la estructura ya refinada, aquí se enfatiza la perspectiva Nx)
dfs-invest-suite/
├── apps/
│ ├── api-main/ # NestJS (GraphQL/REST API Gateway Multi-Tenant)
│ │ ├── src/
│ │ │ ├── app/ # Módulo raíz, config global, TenantContextMiddleware/Guard
│ │ │ ├── domains/ # Módulos NestJS por dominio (ej. leads, whatsapp, tenancy)
│ │ │ │ ├── leads/
│ │ │ │ │ ├── leads.module.ts
│ │ │ │ │ ├── resolvers/ # Resolvers GraphQL para Leads
│ │ │ │ │ └── controllers/ # Controladores REST (si aplica)
│ │ │ │ └── # ... otros módulos de dominio
│ │ │ ├── webhooks/ # Controlador específico para Webhook de WhatsApp
│ │ │ │ ├── controllers/
│ │ │ │ └── utils/ # whatsapp-security.utils.ts
│ │ │ └── main.ts # Bootstrap, config bodyParser (rawBody)
│ │ ├── Dockerfile
│ │ ├── project.json # Config Nx para esta app
│ │ └── tsconfig.app.json
│ ├── pwa-supervisor/ # Next.js PWA para Supervisores de Tenant
│ │ ├── src/
│ │ │ ├── app/ # Next.js App Router
│ │ │ ├── components/ # Componentes UI específicos de esta PWA
│ │ │ ├── hooks/
│ │ │ ├── services/ # Servicios para consumir api-main (GraphQL client)
│ │ │ └── lib/ # Utils, config específica de la PWA
│ │ ├── project.json
│ │ └── # ... (next.config.mjs, public/, etc.)
│ ├── pwa-consultant/ # Next.js PWA para Consultores de Tenant (similar a pwa-supervisor)
│ └── admin-platform/ # Next.js PWA para Administradores de Plataforma (DFS)
│
├── libs/
│ ├── core/ # Lógica de Dominio (agnóstica a frameworks)
│ │ ├── src/
│ │ │ ├── tenancy/ # Dominio: Tenant, ITenantRepositoryPort, ITenantConfigRepositoryPort
│ │ │ ├── anti-ban/ # Dominio: WhatsAppAccount, AntiBanDecisionService, IWhatsAppAccountRepositoryPort, IRateLimiterPort
│ │ │ ├── leads-flow/ # Dominio: Lead, ILeadRepositoryPort, LeadQualificationService
│ │ │ ├── whatsapp/ # Dominio: TWhatsAppApiMessageRequest, TWebhookPayloads, Eventos WA, IWhatsAppMessagePort, IWhatsAppAdminPort
│ │ │ ├── users-roles/ # Dominio: User (de tenant), Role, IPermissionService
│ │ │ ├── aiper-assistance/ # Dominio: IConversationAnalyzerPort, IPromptManagerPort, AnalysisResult
│ │ │ └── # ... (otros dominios: properties-spe, analytics-core, notifications-core)
│ │ ├── index.ts # Exportaciones públicas (interfaces, tipos, enums, constantes)
│ │ └── project.json # Config Nx para esta librería
│ ├── application/ # Casos de Uso y Lógica de Aplicación (Tenant-Aware)
│ │ ├── src/
│ │ │ ├── tenancy/ # CreateTenantUseCase, SetTenantWhatsAppConfigUseCase
│ │ │ ├── anti-ban/ # AccountHealthManagerService (o su puerto), SyncWhatsAppAssetsUseCase (parcialmente aquí)
│ │ │ ├── leads-flow/ # CreateLeadUseCase, QualifyLeadUseCase, AssignLeadUseCase
│ │ │ ├── whatsapp/ # SendWhatsAppMessageUseCase, Listeners de eventos WA (IncomingMessage, StatusUpdate, AssetUpdate)
│ │ │ └── # ...
│ │ ├── index.ts
│ │ └── project.json
│ ├── infrastructure/ # Implementaciones Concretas (Adaptadores)
│ │ ├── src/
│ │ │ ├── tenancy-persistence/ # PrismaTenantRepository (para DB de plataforma)
│ │ │ ├── tenancy-config/ # VaultTenantConfigRepository (o similar para secretos de tenant)
│ │ │ ├── persistence/ # PrismaService (dinámico por tenant), Repositorios Prisma (Leads, WAAccounts, etc. para DBs de tenant)
│ │ │ ├── cache/ # RedisRateLimiterAdapter, RedisAccountStateCacheAdapter
│ │ │ ├── queue/ # QueueModule (BullMQ), WhatsappWebhookProcessor, WhatsappOutboundProcessor
│ │ │ ├── whatsapp-cloud-api/ # WhatsappOfficialApiAdapter
│ │ │ ├── whatsapp-admin-api/ # WhatsAppAdminApiAdapter
│ │ │ ├── ai-providers/ # GoogleGeminiAdapter (implementa IConversationAnalyzerPort)
│ │ │ ├── security/ # Implementación de AuthGuards NestJS, Estrategias Passport
│ │ │ └── observability/ # Configuración de PinoLogger, OpenTelemetry
│ │ ├── index.ts
│ │ └── project.json
│ ├── shared/ # Código 100% compartido y agnóstico
│ │ ├── src/
│ │ │ ├── types/ # DTOs base, interfaces comunes, TApiErrorPayload
│ │ │ ├── enums/ # Enums globales (ej. EOperationalStatus, EWhatsAppQualityRating)
│ │ │ ├── utils/ # Funciones puras
│ │ │ ├── validation/ # Schemas Valibot/Zod
│ │ │ ├── constants/
│ │ │ └── errors/ # Clases de error personalizadas (AppError, DomainError)
│ │ ├── index.ts
│ │ └── project.json
│ └── ui-shared/ # Componentes UI React compartidos (Shadcn/UI base)
│ ├── src/
│ │ ├── components/ # Átomos, moléculas, organismos
│ │ └── lib/ # Utils específicos de UI
│ ├── index.ts
│ └── project.json
│
├── tools/
├── docs/
├── prisma/
│ ├── schema.prisma # Schema Prisma "plantilla" para las DBs de los tenants
│ ├── platform-schema.prisma # (Opcional) Schema Prisma para la DB de plataforma (gestión de tenants, config global)
│ └── migrations/ # Migraciones del schema plantilla
│
└── # ... (Archivos raíz: .github, .husky, .vscode, .dockerignore, .env.example, etc.)

III. Configuración Inicial con Nx (Guía para la IA Experta en Nx):
Crear Workspace:
npx create-nx-workspace dfs-invest-suite --preset=ts --pm yarn --nxCloud=skip --ci=github
(Usar preset ts o apps y luego añadir manualmente.)
Instalar Plugins Nx:
yarn add -D @nx/nest @nx/next @nx/js @nx/eslint @nx/jest @nx/node (y @nx/react si no está).
Generar Aplicaciones:
api-main: yarn nx g @nx/nest:app api-main --tags="scope:api,type:app" --directory="apps/api-main"
Añadir módulos GraphQL (@nestjs/apollo, apollo-server-express, graphql).
pwa-supervisor: yarn nx g @nx/next:app pwa-supervisor --tags="scope:pwa,type:app" --directory="apps/pwa-supervisor" --style=tailwind --appDir=true --e2eTestRunner=none (Playwright se puede añadir después).
Generar pwa-consultant y admin-platform de forma similar.
Generar Librerías:
core: yarn nx g @nx/js:lib core --tags="scope:core,type:domain" --directory="libs/core" --importPath="@dfs-suite/core"
application: yarn nx g @nx/js:lib application --tags="scope:application,type:app-logic" --directory="libs/application" --importPath="@dfs-suite/application"
infrastructure: yarn nx g @nx/js:lib infrastructure --tags="scope:infrastructure,type:adapter" --directory="libs/infrastructure" --importPath="@dfs-suite/infrastructure"
shared: yarn nx g @nx/js:lib shared --tags="scope:shared,type:util" --directory="libs/shared" --importPath="@dfs-suite/shared"
ui-shared: yarn nx g @nx/react:lib ui-shared --tags="scope:ui,type:feature" --directory="libs/ui-shared" --bundler=none --importPath="@dfs-suite/ui-shared"
Configurar tsconfig.base.json:
Añadir paths para los alias de importación (ej. @dfs-suite/core -> libs/core/src/index.ts).
Opciones estrictas: strict: true, noImplicitAny: true, strictNullChecks: true, etc.
esModuleInterop: true, allowSyntheticDefaultImports: true.
target: "ES2021" o superior, module: "commonjs" para NestJS, module: "esnext" para Next.js (Nx maneja esto en los tsconfig.lib.json y tsconfig.app.json generados).
Configurar nx.json:
npmScope: "dfs-suite".
Definir targetDefaults para build, serve, lint, test (ej. cache: true, dependsOn, inputs, outputs).
Configurar namedInputs.
Configurar Herramientas de Calidad: ESLint (con @nx/eslint/plugin), Prettier, Husky, lint-staged, commitlint.
Configurar Prisma:
Instalar prisma y @prisma/client como dev dependencies.
yarn prisma init en la raíz (creará prisma/schema.prisma). Este será el schema "plantilla" para los tenants.
(Opcional) Crear un segundo platform-schema.prisma para la DB de plataforma y configurar scripts en package.json para generar clientes para ambos (ej. prisma generate --schema=./prisma/schema.prisma y prisma generate --schema=./prisma/platform-schema.prisma --output=./node_modules/@prisma/platform-client).
IV. Flujos de Datos y Lógica de Componentes Clave (Guía para Desarrollo):
(Aquí se detallarían los flujos como los describimos en el prompt anterior, pero enfocados en la implementación técnica dentro de esta estructura Nx y la arquitectura SaaS multi-tenant. Se explicaría cómo el TenantContextService y el PrismaClient Factory dinámico son usados por los Casos de Uso y Repositorios.)
Ejemplo: Flujo de Webhook Entrante (Resumido para la IA NX):
apps/api-main/src/webhooks/controllers/whatsapp-webhook.controller.ts:
Recibe POST, valida firma usando App Secret (global de la plataforma).
Extrae WABA_ID del payload.
Llama a TenantConfigRepository.findTenantByWabaId(wabaId) (este repo usa la DB de plataforma).
Si encuentra tenantId, encola { payloadWebhook, tenantId } a WHATSAPP_WEBHOOK_QUEUE.
libs/infrastructure/src/queue/processors/whatsapp-webhook.processor.ts:
Recibe job con payloadWebhook y tenantId.
Usa TenantContextService.setTenantId(tenantId) (o un mecanismo similar de DI para el scope del job).
Parsea payloadWebhook. Basado en change.field, emite un evento de aplicación (ej. IncomingWhatsAppMessageReceivedEvent) que ahora incluye el tenantId.
libs/application/src/whatsapp/listeners/incoming-message.listener.ts:
Escucha IncomingWhatsAppMessageReceivedEvent.
Extrae tenantId del evento. Usa TenantContextService.setTenantId(event.tenantId) si el listener no es request-scoped o si el contexto se perdió.
Llama a ILeadRepository.findByWaId(event.messageDetails.from) (el PrismaLeadRepository usará el PrismaClient del tenant actual).
...y así sucesivamente para el resto de la lógica.
Consideración para la IA NX: Al generar servicios y controladores en NestJS, asegurar que aquellos que necesitan operar en un contexto de tenant puedan acceder al tenantId (sea por inyección del TenantContextService o porque el tenantId se pasa como parámetro desde el llamador que ya conoce el contexto, como el procesador de cola).

---

**Blueprint Maestro v3.3**
**DFS-Invest-Suite**
Integración WhatsApp, Núcleo Anti-Ban y Arquitectura SaaS Multi-Tenant
Fecha de Documento: 2025-05-10
Versión: 3.3
Autores: L.I.A Legacy & RaZ WriTe
Estado: En Desarrollo Activo (Guía Oficial para Implementación)

Tabla de Contenidos:

**PARTE I: VISIÓN ARQUITECTÓNICA, ESTRATEGIA SAAS Y GOBERNANZA TÉCNICA**
Introducción a DFS-Invest-Suite
1.1. Propósito y Alcance del Blueprint v3.3
1.2. De DFS-Invest-Flow a DFS-Invest-Suite: Evolución a una Plataforma SaaS
1.3. Objetivos Estratégicos de la Plataforma
1.4. Principios Fundamentales de Diseño y Arquitectura
Modelo de Negocio SaaS y Arquitectura Multi-Tenant
2.1. Concepto de Tenant y Estrategia de Aislamiento
2.1.1. Definición de Tenant
2.1.2. Estrategia de Aislamiento de Datos: Database-per-Tenant
2.1.3. Aislamiento de Configuración (Credenciales WA, IA, etc.)
2.2. Estrategia de Provisioning y Gestión de Tenants
2.2.1. Rol de admin-platform
2.2.2. Proceso de Onboarding de Tenant y Conexión de WABA
2.3. Implicaciones de Seguridad y Cumplimiento en un Modelo SaaS
2.4. TenantContextService y Flujo de Identificación/Contextualización del Tenant
Plataforma WhatsApp Business (PWB): Fundamentos Técnicos para la Suite
3.1. Comparativa y Elección: API de Nube (Cloud API) vs. API Local
3.2. Componentes Esenciales de la PWB y su Gestión por Tenant en dfs-invest-suite
3.2.1. Meta Business Manager (MBM) del Tenant
3.2.2. Cuenta de WhatsApp Business (WABA) del Tenant
3.2.3. Número de Teléfono de Empresa (WABA Phone Number) del Tenant
3.2.4. Tokens de Acceso Específicos del Tenant (System User Token)
3.2.5. Plantillas de Mensajes del Tenant
3.2.6. Verificación de la Empresa del Tenant y OBA
3.2.7. Webhook Global de dfs-invest-suite y Suscripción de WABAs de Tenant
3.3. Modelo de Precios PWB (CBP y Transición a PMP) y su Impacto en los Tenants
3.3.1. Facturación por Meta al Tenant
3.3.2. Rol de dfs-invest-suite en la Optimización de Costos del Tenant
3.3.3. Comunicación de Cambios de Precios a Tenants
3.4. Políticas Fundamentales de Meta para WhatsApp Business y Responsabilidad del Tenant
3.4.1. Política de Mensajes y Comercio de WhatsApp
3.4.2. Consentimiento del Usuario (Opt-In)
3.4.3. Detección de Infracciones y Consecuencias
3.4.4. Rol de dfs-invest-suite como Facilitador del Cumplimiento
Gobernanza Técnica del Proyecto dfs-invest-suite
4.1. Stack Tecnológico Estratificado (Confirmado y Detallado)
4.2. Principios SOLID, Arquitectura Hexagonal, DDD Táctico en el Monorepo NX
4.3. Gestión de Código, Calidad y CI/CD
4.4. Gestión de Riesgos y Deuda Técnica

**PARTE I: VISIÓN ARQUITECTÓNICA, ESTRATEGIA SAAS Y GOBERNANZA TÉCNICA**

1. Introducción a dfs-invest-suite
   1.1. Propósito y Alcance del Blueprint v3.3
   Este Blueprint Técnico Integral v3.3 sirve como el documento maestro y la fuente única de verdad técnica para el diseño, desarrollo, implementación y evolución de la plataforma dfs-invest-suite. Sustituye y consolida todas las versiones anteriores de blueprints y análisis, incorporando la visión estratégica de una solución Software as a Service (SaaS) multi-tenant. Detalla la arquitectura, stack tecnológico, componentes, flujos de datos, estrategias de cumplimiento, y el roadmap ejecutivo, con un enfoque particular en la integración robusta y conforme con la Plataforma WhatsApp Business Cloud API y el desarrollo de un Núcleo Anti-Ban sofisticado. Se adhiere a las directivas DFS y a los más altos estándares de ingeniería de software.
   1.2. De DFS-Invest-Flow a dfs-invest-suite: Evolución a una Plataforma SaaS
   El concepto original de DFS-Invest-Flow, inicialmente concebido como una solución a medida para DFS Investimentos Imobiliários, evoluciona estratégicamente hacia dfs-invest-suite: una plataforma SaaS multi-tenant. Esta suite ofrecerá a múltiples empresas clientes (tenants), principalmente del sector inmobiliario (con potencial de expansión a otros verticales), las herramientas avanzadas de gestión de leads, comunicación optimizada (inicialmente vía WhatsApp), automatización de procesos de marketing y ventas, y analíticas de negocio. Cada tenant operará en un entorno de datos y configuración completamente aislado, utilizando sus propias credenciales de servicios externos como WhatsApp.
   1.3. Objetivos Estratégicos de la Plataforma
   Para los Tenants (Empresas Clientes):
   Maximizar la eficiencia en la captación, calificación, nurturing y conversión de leads.
   Establecer y mantener comunicaciones profesionales, seguras, personalizadas y conformes a través de WhatsApp, eliminando drásticamente el riesgo de interrupciones por baneos.
   Optimizar el Retorno sobre la Inversión (ROI) de sus esfuerzos de marketing y el costo total de comunicación con clientes.
   Obtener visibilidad completa y control operacional sobre su pipeline comercial y la efectividad de sus interacciones.
   Facilitar el cultivo de relaciones a largo plazo con sus prospectos y clientes.
   Para dfs-invest-suite (Como Proveedor de la Plataforma):
   Posicionarse como la solución SaaS líder y de referencia en el mercado para la gestión inteligente de leads y comunicación multicanal, comenzando por el sector inmobiliario.
   Construir una plataforma tecnológicamente avanzada, robusta, escalable y altamente confiable.
   Establecer un modelo de negocio sostenible y recurrente basado en suscripciones por niveles de servicio o uso.
   Fomentar la innovación continua, incorporando capacidades de IA y expandiendo las funcionalidades y canales soportados.
   1.4. Principios Fundamentales de Diseño y Arquitectura
   Multi-Tenancy con Aislamiento Fuerte: Cada tenant operará en su propio espacio de datos lógicamente aislado (idealmente, base de datos dedicada por tenant) y con su propia configuración de servicios externos (ej. WABA, tokens API), garantizando máxima seguridad, privacidad y previniendo el efecto "vecino ruidoso".
   API-First y Modularidad (Arquitectura Hexagonal): El sistema se construye con una API central (api-main) como fachada principal. La lógica de negocio (core) está rigurosamente desacoplada de la infraestructura (UI, Base de Datos, APIs Externas, Colas) mediante el uso de Puertos y Adaptadores.
   Diseño Orientado al Dominio (DDD Táctico): Modelado claro y cohesivo de los dominios de negocio fundamentales (Tenancy, AntiBan, LeadsFlow, WhatsAppIntegration, UsersRoles, AiperAssistance, etc.) con Entidades ricas, Value Objects y Servicios de Dominio bien definidos.
   Escalabilidad y Resiliencia Nativas: Diseño para soportar crecimiento en el número de tenants, usuarios por tenant y volumen de datos/mensajes. Implementación de mecanismos de tolerancia a fallos como colas persistentes, circuit breakers, y reintentos inteligentes.
   Calidad y Seguridad por Diseño (DevSecOps): Prácticas de testing exhaustivas (unitarias, integración, E2E), estándares de código estrictos (linting, formatting), revisiones de código, seguridad integrada en cada capa (OWASP, encriptación de datos sensibles en reposo y tránsito), y cumplimiento con regulaciones de privacidad (LGPD).
   Observabilidad Integral: Logging estructurado y contextualizado (tenantId, userId, traceId), métricas de rendimiento y negocio detalladas, y tracing distribuido para un monitoreo proactivo, diagnóstico rápido y mejora continua.
   Experiencia de Usuario (UX) Optimizada y por Rol: Interfaces de usuario (pwa-supervisor, pwa-consultant, admin-platform) intuitivas, eficientes, responsivas y adaptadas a las necesidades específicas de cada rol.
   Desarrollo Iterativo e Incremental Ágil: Entregas de valor frecuentes, priorización basada en impacto, y adaptabilidad a través de Sprints y un roadmap faseado, permitiendo feedback temprano y ajustes.

**PARTE II: DISEÑO DETALLADO DEL DOMINIO (LIBS/CORE/)**

Las librerías core contienen la lógica de negocio más pura y agnóstica, las entidades y los puertos (interfaces) que definen los contratos con las capas externas. No deben tener dependencias de frameworks como NestJS o Next.js, ni de tecnologías de infraestructura específicas.

**II.A. Librería Core: shared (libs/shared)**
Propósito: Contener tipos, enums, utilidades puras, constantes y errores personalizados que son compartidos globalmente por múltiples librerías y aplicaciones, tanto frontend como backend (si es posible, aunque inicialmente el foco será backend). Debe tener CERO dependencias de otras librerías de dfs-invest-suite.
Acción IA Nx: yarn nx g @nx/js:lib shared --tags="scope:shared,type:util" --directory="libs/shared" --importPath="@dfs-suite/shared"
Estructura Interna y Artefactos Iniciales:
libs/shared/src/index.ts: Archivo de barril para exportar todo lo público.
libs/shared/src/types/:
global.types.ts: Interfaces o tipos muy genéricos (ej. Maybe<T> = T | null | undefined;, PaginatedResult<T>).
api-error.types.ts:
export interface IApiErrorDetail {
code: string | number; // Código de error específico de la aplicación o de Meta
message: string; // Mensaje legible para humanos
field?: string; // Campo que causó el error (opcional)
details?: any; // Información adicional, ej. el objeto error de Meta
}
export interface IApiResponse<T = any> {
success: boolean;
data?: T;
error?: IApiErrorDetail;
requestId?: string; // Para tracing
}

libs/shared/src/enums/:
whatsapp-quality-rating.enum.ts:
export enum EWhatsAppQualityRating {
GREEN = 'GREEN',
YELLOW = 'YELLOW',
RED = 'RED',
UNKNOWN = 'UNKNOWN',
NA = 'NA', // Not Available
}

whatsapp-messaging-tier.enum.ts:
export enum EWhatsAppMessagingTier {
TIER_0 = 'TIER_0', // 250 conversaciones/24h
TIER_1 = 'TIER_1', // 1K
TIER_2 = 'TIER_2', // 10K
TIER_3 = 'TIER_3', // 100K
TIER_4 = 'TIER_4', // UNLIMITED
UNKNOWN = 'UNKNOWN',
}

TypeScript
internal-account-status.enum.ts:
export enum EInternalAccountStatus {
HEALTHY = 'HEALTHY',
WARN = 'WARN', // Calidad Meta YELLOW o healthScore interno bajo
FLAGGED = 'FLAGGED', // Calidad Meta RED pero aún no restringido
RESTRICTED = 'RESTRICTED', // Restricción de Meta
BLOCKED = 'BLOCKED', // Bloqueo de Meta
UNKNOWN = 'UNKNOWN',
}

internal-operational-status.enum.ts:
export enum EInternalOperationalStatus {
ACTIVE = 'ACTIVE',
IN_WARMUP = 'IN_WARMUP',
COOLING_DOWN = 'COOLING_DOWN',
MAINTENANCE_BY_ADMIN = 'MAINTENANCE_BY_ADMIN',
SUSPENDED_BY_META_CONFIRMED = 'SUSPENDED_BY_META_CONFIRMED',
PENDING_SETUP = 'PENDING_SETUP',
}

message-category.enum.ts:
export enum EMessageCategory {
MARKETING = 'MARKETING',
UTILITY = 'UTILITY',
AUTHENTICATION = 'AUTHENTICATION',
SERVICE = 'SERVICE', // Para conversaciones iniciadas por usuario
UNKNOWN = 'UNKNOWN',
}

(Otros enums globales que surjan)
libs/shared/src/utils/:
object.utils.ts: Funciones puras para manipulación de objetos (deepClone, isEmpty, etc.).
string.utils.ts: Para manipulación de strings (capitalize, etc.).
date.utils.ts: Para formateo y manipulación de fechas (usando date-fns o similar, que sería una dependencia).
libs/shared/src/validation/: (Se configurará con Valibot o Zod más adelante)
Aquí irían schemas compartidos para DTOs comunes o variables de entorno.
libs/shared/src/constants/:
common.constants.ts: Constantes globales (ej. DEFAULT_PAGE_SIZE = 20).
libs/shared/src/errors/:
custom-errors.ts: Clases base para errores de dominio y aplicación.
export class BaseError extends Error {
public readonly context?: string;
public readonly code?: string | number;
constructor(message: string, code?: string | number, context?: string) {
super(message);
this.name = this.constructor.name;
this.code = code;
this.context = context;
Error.captureStackTrace(this, this.constructor);
}
}
export class DomainError extends BaseError {}
export class ApplicationError extends BaseError {}
export class InfrastructureError extends BaseError {}
export class NotFoundError extends ApplicationError {
constructor(resource: string, id: string | number) {
super(`${resource} with ID ${id} not found`, 'NOT_FOUND');
}
}

**II.B. Librería Core: tenancy (libs/core/src/tenancy/)**
Propósito: Lógica de dominio para la gestión de Tenants de la plataforma dfs-invest-suite.
Acción IA Nx: Crear subdirectorio. No es una librería Nx separada, sino un módulo lógico dentro de libs/core/.
Estructura y Artefactos:
libs/core/src/tenancy/index.ts
libs/core/src/tenancy/entities/tenant.entity.ts:
import { EInternalTenantStatus } from '@dfs-suite/shared'; // Asumiendo que se mueve a shared o se define aquí

export class Tenant {
constructor(
public readonly id: string, // UUID
public name: string,
public status: EInternalTenantStatus,
public planId: string,
public readonly createdAt: Date,
public updatedAt: Date,
// Configuración sensible NO se almacena aquí.
) {}

static create(id: string, name: string, planId: string): Tenant {
const now = new Date();
return new Tenant(id, name, EInternalTenantStatus.PENDING_ONBOARDING, planId, now, now);
}

public activate(): void {
if (this.status === EInternalTenantStatus.SUSPENDED_BY_PLATFORM) {
throw new DomainError('Cannot activate a suspended tenant directly. Must be unsuspended first.');
}
this.status = EInternalTenantStatus.ACTIVE;
this.updatedAt = new Date();
}
// ... otros métodos: deactivate, suspend, changePlan, isSubscriptionActive ...
}
export enum EInternalTenantStatus {
ACTIVE = 'ACTIVE',
INACTIVE = 'INACTIVE', // Ej. canceló suscripción pero datos aún existen por un tiempo
SUSPENDED_BY_PLATFORM = 'SUSPENDED_BY_PLATFORM', // Ej. por abuso o impago
TRIAL = 'TRIAL',
PENDING_ONBOARDING = 'PENDING_ONBOARDING', // Creado, pero no ha completado configuración (ej. WA token)
}

libs/core/src/tenancy/ports/tenant-repository.port.ts:
import type { Tenant } from '../entities/tenant.entity';
export interface ITenantRepositoryPort {
findById(id: string): Promise<Tenant | null>;
findByWabaId(wabaId: string): Promise<Tenant | null>; // Necesario para el webhook controller
save(tenant: Tenant): Promise<Tenant>;
// ... otros métodos como listAll, findByOwnerEmail, etc.
}
export const TENANT_REPOSITORY_PORT = Symbol('ITenantRepositoryPort');

libs/core/src/tenancy/ports/tenant-config-repository.port.ts:
export interface TenantWhatsAppCredentials {
wabaId: string;
apiToken: string; // Este será el token encriptado para almacenamiento y desencriptado en uso
phoneNumbers: Array<{
id: string; // Phone Number ID
displayNumber: string;
isDefault?: boolean;
// otros metadatos que el tenant quiera asociar al número para la suite
}>;
}
export interface ITenantConfigRepositoryPort {
getDbConnectionString(tenantId: string): Promise<string | null>; // Encriptada
setDbConnectionString(tenantId: string, connectionString: string): Promise<void>;
getWhatsAppApiCredentials(tenantId: string): Promise<TenantWhatsAppCredentials | null>; // Token desencriptado para uso
setWhatsAppApiCredentials(tenantId: string, creds: TenantWhatsAppCredentials): Promise<void>; // Token se encripta antes de guardar
// ... métodos para otros secretos/configuraciones del tenant (ej. API Key de IA si es por tenant)
}
export const TENANT_CONFIG_REPOSITORY_PORT = Symbol('ITenantConfigRepositoryPort');

(Servicios de Dominio para tenancy pueden ser mínimos en MVP, la lógica de orquestación de onboarding puede estar en la Capa de Aplicación).

**II.C. Librería Core: whatsapp (libs/core/src/whatsapp/)**
Propósito: Definiciones de dominio agnósticas para la interacción con WhatsApp (tipos de payloads, eventos, puertos genéricos de la API).
Acción IA Nx: Crear subdirectorio.
Estructura y Artefactos:
libs/core/src/whatsapp/index.ts
libs/core/src/whatsapp/types/:
whatsapp-api-message-request.type.ts: Contiene TWhatsAppApiMessageRequest y todos sus sub-tipos (interfaces para WhatsAppLanguage, WhatsAppCurrency, WhatsAppMediaObject, WhatsAppTemplateParameter, WhatsAppTemplateComponent, WhatsAppTextMessage, WhatsAppTemplateMessage, WhatsAppImageMessage, WhatsAppInteractiveMessage, WhatsAppReactionMessage, etc.). Basada en la información oficial más reciente de Meta y los ejemplos. Debe ser exhaustiva.
whatsapp-webhook-payload.type.ts: Contiene los tipos para los value de CADA field de webhook (TWhatsAppWebhookMessagesValue, TWebhookTemplateStatusUpdateValue, TWebhookAccountUpdateValue, etc.). Esta es un área con GAPs que necesita la documentación oficial.
whatsapp-asset.types.ts:
import { EMessageCategory, EWhatsAppQualityRating, EInternalOperationalStatus, EInternalAccountStatus, EWhatsAppMessagingTier, EWhatsAppNameStatus } from '@dfs-suite/shared';

export interface WhatsAppTemplateFromApi {
id: string; // HSM ID
name: string;
language: string;
status: string; // 'APPROVED', 'PENDING', 'REJECTED', etc. (valores exactos de Meta)
category: EMessageCategory;
quality_score?: EWhatsAppQualityRating; // o el tipo que devuelva Meta
components: Array<{ // Estructura de cómo Meta devuelve los componentes definidos
type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
text?: string; // Con placeholders {{n}}
format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'LOCATION';
example?: any; // Objeto example tal como lo devuelve la API GET /template
buttons?: Array<{ type: string; text: string; url?: string; phone_number?: string; [key: string]: any; }>;
}>;
// ... otros campos de la respuesta GET /template
}

export interface WabaPhoneNumberDetailsFromApi {
id: string; // Phone Number ID
display_phone_number: string;
verified_name: string | null;
quality_rating: EWhatsAppQualityRating;
name_status: EWhatsAppNameStatus;
code_verification_status?: string; // VERIFIED, NOT_VERIFIED
messaging_limit_tier?: EWhatsAppMessagingTier; // ¡Campo y valores a confirmar!
current_messaging_limit?: number; // ¡Campo y valores a confirmar!
throughput?: { level: string }; // ¡Campo y estructura a confirmar!
// ... otros campos que devuelva GET /phone_number_id
}

libs/core/src/whatsapp/ports/:
whatsapp-message.port.ts: IWhatsAppMessagePort y TSendMessageResult (como se definió antes).
whatsapp-admin.port.ts: IWhatsAppAdminPort (como se definió y expandió antes, con todos los métodos para plantillas, números, media, perfil, etc.).
libs/core/src/whatsapp/events/:
Definir todas las clases de eventos con sus payloads tipados, asegurando que incluyan tenantId.
Ejemplos: IncomingWhatsAppMessageReceivedEvent(tenantId, wabaId, phoneNumberId, messageDetails, jobId?), WhatsAppMessageStatusUpdatedEvent(tenantId, ...), WhatsAppTemplateStatusChangedEvent(tenantId, ...), WhatsAppAccountViolationEvent(tenantId, ...).
(Continuará con los dominios anti-ban, leads-flow, users-roles, aiper-assistance dentro de libs/core/, y luego pasaremos a libs/application/ en el próximo prompt).

---

PARTE I: VISIÓN ARQUITECTÓNICA, ESTRATEGIA SAAS Y GOBERNANZA TÉCNICA
Introducción a DFS-Invest-Suite
1.1. Propósito y Alcance del Blueprint v3.3
1.2. De DFS-Invest-Flow a DFS-Invest-Suite: Evolución a una Plataforma SaaS
1.3. Objetivos Estratégicos de la Plataforma
1.4. Principios Fundamentales de Diseño y Arquitectura
Modelo de Negocio SaaS y Arquitectura Multi-Tenant
2.1. Concepto de Tenant y Estrategia de Aislamiento
2.1.1. Definición de Tenant
2.1.2. Estrategia de Aislamiento de Datos: Database-per-Tenant
2.1.3. Aislamiento de Configuración (Credenciales WA, IA, etc.)
2.2. Estrategia de Provisioning y Gestión de Tenants
2.2.1. Rol de admin-platform
2.2.2. Proceso de Onboarding de Tenant y Conexión de WABA
2.3. Implicaciones de Seguridad y Cumplimiento en un Modelo SaaS
2.4. TenantContextService y Flujo de Identificación/Contextualización del Tenant
Plataforma WhatsApp Business (PWB): Fundamentos Técnicos para la Suite
3.1. Comparativa y Elección: API de Nube (Cloud API) vs. API Local
3.2. Componentes Esenciales de la PWB y su Gestión por Tenant en dfs-invest-suite
3.2.1. Meta Business Manager (MBM) del Tenant
3.2.2. Cuenta de WhatsApp Business (WABA) del Tenant
3.2.3. Número de Teléfono de Empresa (WABA Phone Number) del Tenant
3.2.4. Tokens de Acceso Específicos del Tenant (System User Token)
3.2.5. Plantillas de Mensajes del Tenant
3.2.6. Verificación de la Empresa del Tenant y OBA
3.2.7. Webhook Global de dfs-invest-suite y Suscripción de WABAs de Tenant
3.3. Modelo de Precios PWB (CBP y Transición a PMP) y su Impacto en los Tenants
3.3.1. Facturación por Meta al Tenant
3.3.2. Rol de dfs-invest-suite en la Optimización de Costos del Tenant
3.3.3. Comunicación de Cambios de Precios a Tenants
3.4. Políticas Fundamentales de Meta para WhatsApp Business y Responsabilidad del Tenant
3.4.1. Política de Mensajes y Comercio de WhatsApp
3.4.2. Consentimiento del Usuario (Opt-In)
3.4.3. Detección de Infracciones y Consecuencias
3.4.4. Rol de dfs-invest-suite como Facilitador del Cumplimiento
Gobernanza Técnica del Proyecto dfs-invest-suite
4.1. Stack Tecnológico Estratificado (Confirmado y Detallado)
4.2. Principios SOLID, Arquitectura Hexagonal, DDD Táctico en el Monorepo NX
4.3. Gestión de Código, Calidad y CI/CD
4.4. Gestión de Riesgos y Deuda Técnica
PARTE II: DISEÑO DETALLADO DEL DOMINIO (LIBS/CORE/)
II.A. Librería Core: shared (libs/shared)
Propósito: Contener tipos, enums, utilidades puras, constantes y errores personalizados que son compartidos globalmente por múltiples librerías y aplicaciones, tanto frontend como backend. Debe tener CERO dependencias de otras librerías de dfs-invest-suite.
Estructura Interna y Artefactos Iniciales:
libs/shared/src/index.ts
libs/shared/src/types/:
global.types.ts: Maybe<T>, PaginatedResult<T>.
api-error.types.ts: IApiErrorDetail, IApiResponse<T>.
libs/shared/src/enums/:
whatsapp-quality-rating.enum.ts: EWhatsAppQualityRating (GREEN, YELLOW, RED, UNKNOWN, NA).
whatsapp-messaging-tier.enum.ts: EWhatsAppMessagingTier (TIER_0, TIER_1, TIER_2, TIER_3, TIER_4, UNKNOWN).
internal-account-status.enum.ts: EInternalAccountStatus (HEALTHY, WARN, FLAGGED, RESTRICTED, BLOCKED, UNKNOWN).
internal-operational-status.enum.ts: EInternalOperationalStatus (ACTIVE, IN_WARMUP, COOLING_DOWN, MAINTENANCE_BY_ADMIN, SUSPENDED_BY_META_CONFIRMED, PENDING_SETUP).
message-category.enum.ts: EMessageCategory (MARKETING, UTILITY, AUTHENTICATION, SERVICE, UNKNOWN).
libs/shared/src/utils/: object.utils.ts, string.utils.ts, date.utils.ts.
libs/shared/src/validation/: (Espacio para schemas Valibot/Zod compartidos).
libs/shared/src/constants/: common.constants.ts.
libs/shared/src/errors/: custom-errors.ts (BaseError, DomainError, ApplicationError, InfrastructureError, NotFoundError).
II.B. Librería Core: tenancy (libs/core/src/tenancy/)
Propósito: Lógica de dominio para la gestión de Tenants de la plataforma dfs-invest-suite.
Artefactos Principales:
Entidad: Tenant (libs/core/src/tenancy/entities/tenant.entity.ts):
Atributos: id (UUID), name, status (EInternalTenantStatus), planId, createdAt, updatedAt.
Métodos: create(), activate(), deactivate(), suspend(), changePlan(), isOnActivePlan().
Enum EInternalTenantStatus: (ACTIVE, INACTIVE, SUSPENDED_BY_PLATFORM, TRIAL, PENDING_ONBOARDING).
Puerto: ITenantRepositoryPort (libs/core/src/tenancy/ports/tenant-repository.port.ts):
Métodos: findById(id), findByWabaId(wabaId), save(tenant), listAll(filters?).
Puerto: ITenantConfigRepositoryPort (libs/core/src/tenancy/ports/tenant-config-repository.port.ts):
Tipo TenantWhatsAppCredentials: { wabaId, apiToken, phoneNumbers: Array<{id, displayNumber, isDefault?}> }.
Métodos: getDbConnectionString(tenantId), setDbConnectionString(tenantId, cs), getWhatsAppApiCredentials(tenantId), setWhatsAppApiCredentials(tenantId, creds).
II.C. Librería Core: whatsapp (libs/core/src/whatsapp/)
Propósito: Definiciones de dominio agnósticas para la interacción con WhatsApp (tipos de payloads, eventos, puertos genéricos de la API), conscientes del contexto del tenant a través de los eventos o parámetros.
Artefactos Principales:
Tipos de Payloads de Envío (TWhatsAppApiMessageRequest y sub-tipos):
Ubicación: libs/core/src/whatsapp/types/whatsapp-api-message-request.type.ts.
Detalla la estructura JSON para CADA tipo de mensaje saliente: WhatsAppLanguage, WhatsAppCurrency, WhatsAppDateTime, WhatsAppMediaObject, WhatsAppTemplateParameter, WhatsAppTemplateComponent (con parameters para valores), WhatsAppTemplateButton (con parameters para valores de variables en URL o payload para QR), WhatsAppTextMessage, WhatsAppTemplateMessage, WhatsAppImageMessage, WhatsAppInteractiveMessage (con todos sus sub-tipos button, list, product, flow, etc.), WhatsAppReactionMessage. (Estructura detallada en Blueprint v1.2 Parte 3).
Tipos para Payloads de Webhook (TWhatsAppWebhook...Value):
Ubicación: libs/core/src/whatsapp/types/whatsapp-webhook-payload.type.ts.
Define la estructura del objeto value para CADA field de webhook: TWhatsAppWebhookMessagesValue (con TReceivedMessageObject, TMessageStatusObject, TWebhookErrorObject), TWebhookTemplateStatusUpdateValue, TWebhookTemplateQualityUpdateValue, TWebhookPhoneNumberQualityValue, TWebhookAccountUpdateValue (con sus sub-tipos por event), TWebhookUserPreferencesValue. (Estructura detallada en Blueprint v1.2 Parte 3 y basada en información de la librería Go).
Tipos de Activos WhatsApp (Respuesta API Admin):
Ubicación: libs/core/src/whatsapp/types/whatsapp-asset.types.ts.
WhatsAppTemplateFromApi: Estructura de una plantilla como la devuelve GET /{template-id} o GET /{waba-id}/message_templates, incluyendo id, name, language, status, category, quality_score, y el array components que define la estructura de la plantilla (con text incluyendo placeholders {{n}}, format para header, y example).
WabaPhoneNumberDetailsFromApi: Detalles de un número (id, display_phone_number, verified_name, quality_rating, name_status, messaging_limit_tier, throughput).
Puertos:
IWhatsAppMessagePort y TSendMessageResult (whatsapp-message.port.ts).
IWhatsAppAdminPort (whatsapp-admin.port.ts) con todos los métodos para plantillas, números, media, perfil, etc.
Eventos de Dominio/Aplicación (con tenantId):
Ubicación: libs/core/src/whatsapp/events/.
IncomingWhatsAppMessageReceivedEvent(tenantId, wabaId, phoneNumberId, messageDetails, jobId?).
WhatsAppMessageStatusUpdatedEvent(tenantId, wabaId, phoneNumberId, statusDetails, jobId?).
WhatsAppTemplateStatusChangedEvent(tenantId, wabaId, updateDetails, jobId?).
WhatsAppTemplateQualityChangedEvent(tenantId, ...).
WhatsAppPhoneNumberQualityUpdatedEvent(tenantId, ...).
WhatsAppAccountViolationEvent(tenantId, ...).
WhatsAppAccountRestrictionEvent(tenantId, ...).
WhatsAppAccountCapabilityUpdatedEvent(tenantId, ...).
WhatsAppUserMarketingPreferenceChangedEvent(tenantId, ...).

**II.D. Librería Core: anti-ban (libs/core/src/anti-ban/) - REVISADO PARA SAAS**
Propósito: Contiene la lógica de negocio pura para proteger las WABAs de los tenants contra suspensiones, gestionando la salud de sus números, límites y patrones de envío. Opera en el contexto de un tenant específico.
Acción IA Nx: Crear subdirectorio.
Estructura y Artefactos:
libs/core/src/anti-ban/index.ts
libs/core/src/anti-ban/entities/whatsapp-account.entity.ts:
Definición: Como se detalló en la Sección 3.1 del Blueprint v1.2 (Parte 3) y refinado en la Sección 3.1 de la Parte 4 (Blueprint v3.3 anterior).
Clave SaaS: Esta entidad NO contiene tenantId ni wabaId. Representa un número de teléfono dentro de la base de datos del tenant. El phoneNumberId es su identificador único dentro del contexto de la WABA del tenant.
Atributos Reafirmados: phoneNumberId (ID), phoneNumberDisplay, verifiedName, nameStatus (Enum de shared), qualityRating (Enum de shared), messagingLimitTier (Enum de shared), currentConversationsInitiated24h, canCommunicate, isOfficiallyVerified, status (Enum interno de shared), operationalStatus (Enum interno de shared), healthScore, lastSentMessageTimestamp, etc.
Métodos: create, updateFromMetaWebhook, setQualityRating, setMessagingLimitTier, addRestriction, incrementConversationsInitiated, canInitiateConversation, calculateInternalHealthScore, determineAppropriateStatus (toda esta lógica opera sobre los datos del número individual).
libs/core/src/anti-ban/ports/whatsapp-account-repository.port.ts:
Interfaz IWhatsAppAccountRepositoryPort.
Métodos (Sin tenantId como parámetro explícito, ya que la implementación será contextualizada):
findById(phoneNumberId: string): Promise<WhatsAppAccount | null>
findByDisplayPhoneNumber(displayPhoneNumber: string): Promise<WhatsAppAccount | null>
getAll(): Promise<WhatsAppAccount[]> (Devuelve todas las cuentas del tenant actual)
getAllActive(): Promise<WhatsAppAccount[]> (Filtra por isActive y operationalStatus dentro del tenant actual)
save(account: WhatsAppAccount): Promise<WhatsAppAccount>
updateHealthAndStatus(phoneNumberId: string, updates: Partial<Pick<WhatsAppAccount, 'healthScore' | 'status' | 'operationalStatus' | 'qualityRating' | 'messagingLimitTier' | 'currentConversationsInitiated24h' | 'accountRestrictions'>>): Promise<WhatsAppAccount | null>
findNextAvailableForSending(criteria: { category: EMessageCategory, requiredTier?: EWhatsAppMessagingTier }): Promise<WhatsAppAccount | null> (Implementa la heurística de selección para el tenant actual).
Símbolo WHATSAPP_ACCOUNT_REPOSITORY_PORT.
libs/core/src/anti-ban/ports/rate-limiter.port.ts:
Interfaz IRateLimiterPort.
Métodos (Ahora deben ser explícitamente conscientes del tenant y del accountId para la clave):
export interface IRateLimiterPort {
consumeToken(tenantId: string, accountId: string, cost?: number): Promise<{ allowed: boolean; remainingPoints?: number; msBeforeNext?: number }>;
checkAllowance(tenantId: string, accountId: string, cost?: number): Promise<{ allowed: boolean; remainingPoints?: number }>;
configureLimits(tenantId: string, accountId: string, points: number, durationSeconds: number): Promise<void>;
resetLimit(tenantId: string, accountId: string): Promise<void>; // Para resetear al cambiar de día o tier
}
export const RATE_LIMITER_PORT = Symbol('IRateLimiterPort');

libs/core/src/anti-ban/services/anti-ban-decision.service.ts:
Clase AntiBanDecisionService (no necesita Port si es solo un servicio de dominio).
Constructor: Inyecta IWhatsAppAccountRepositoryPort, IRateLimiterPort. (La validación de plantilla se hará en el Caso de Uso de Aplicación antes de llamar a este servicio).
Método determineSendAction(tenantId: string, messageCategory: EMessageCategory, riskLevel: ESendingRiskLevel, requestedAccountId?: string): Promise<TAntiBanDecision>:
Ahora recibe tenantId.
Llama a accountRepo.findNextAvailableForSending({ category: messageCategory }) (el repo ya está en contexto del tenant).
Llama a rateLimiterPort.consumeToken(tenantId, selectedAccount.phoneNumberId, cost).
Lógica de selección, costo, warm-up/cool-down como se detalló en la Sección 6.3 y 6.5 del Blueprint v1.2 (Parte 3), pero operando sobre los números del tenant.
libs/core/src/anti-ban/types/anti-ban.types.ts:
TAntiBanDecision = { action: 'SEND' | 'QUEUE' | 'REJECT'; accountId?: string; reason?: string; }
ESendingRiskLevel (LOW, MEDIUM, HIGH).
II.E. Librería Core: leads-flow (libs/core/src/leads-flow/)
Propósito: Lógica de dominio para la gestión de Leads, su ciclo de vida, calificación (conceptual) e interacciones.
Acción IA Nx: Crear subdirectorio.
Estructura y Artefactos:
libs/core/src/leads-flow/index.ts
libs/core/src/leads-flow/entities/lead.entity.ts:
export class Lead {
constructor(
public readonly id: string, // UUID
public waId: string | null, // WhatsApp ID del usuario
public phoneNumber: string | null,
public email: string | null,
public name: string | null,
public status: string, // Ej: "NEW", "CONTACTED", "QUALIFIED", "NURTURING", "CONVERTED", "LOST"
public score: number | null, // 0-100
public source: string | null, // Ej: "WHATSAPP_INBOUND_CTWA", "EXCEL_IMPORT", "PORTAL_FORM"
public assignedToUserId: string | null, // ID del User (consultor) del tenant
public hasWhatsAppOptIn: boolean = false,
public optInTimestamp?: Date,
public optInSource?: string,
public optInCategories?: string[], // Ej: ["MARKETING_GLOBAL", "UTILITY_SPE_X"]
public lastInteractionAt?: Date,
public readonly createdAt: Date,
public updatedAt: Date,
// Campos para perfilamiento (pueden ser un objeto anidado o campos separados):
public budgetRange?: string,
public propertyInterestType?: string,
public locationInterest?: string,
public investmentTimeline?: string,
public notes?: string,
// ...otros campos relevantes para el negocio inmobiliario
) {}

static create(waId: string, name?: string, source?: string, associatedWabaId?: string, associatedPhoneNumberId?: string): Lead { /_ ... _/ }
public updateScore(newScore: number) { /_ ... _/ }
public changeStatus(newStatus: string) { /_ ... _/ }
public assignTo(userId: string) { /_ ... _/ }
public recordInteraction(interactionDetails: any) { this.lastInteractionAt = new Date(); /_ ... _/ }
public setWhatsAppOptIn(status: boolean, source?: string, categories?: string[]) { /_ ... _/ }
}

libs/core/src/leads-flow/entities/lead-interaction.entity.ts (Alternativa a MessageLog para interacciones más genéricas):
id, leadId, timestamp, channel ('WHATSAPP', 'EMAIL', 'CALL'), direction ('INBOUND', 'OUTBOUND'), contentSummary, waMessageId? (si es de WA), messageLogId? (si se quiere vincular a MessageLog), userId? (consultor que interactuó).
libs/core/src/leads-flow/ports/lead-repository.port.ts: ILeadRepositoryPort con CRUD, findByWaId, findByStatus, etc.
libs/core/src/leads-flow/ports/lead-interaction-repository.port.ts: Para LeadInteraction.
Servicios de Dominio (Ejemplos):
LeadQualificationRulesService: Contendría reglas de negocio (no IA) para una calificación inicial o ajuste de score.
LeadNurturingLogicService: Lógica para determinar cuándo y qué enviar en un flujo de nurturing.
II.F. Librería Core: users-roles (libs/core/src/users-roles/)
Propósito: Lógica de dominio para Usuarios (consultores, supervisores DENTRO de un tenant) y sus Roles/Permisos.
Acción IA Nx: Crear subdirectorio.
Estructura y Artefactos:
libs/core/src/users-roles/entities/user.entity.ts:
export enum ETenantUserRole {
TENANT_ADMIN = 'TENANT_ADMIN',
SUPERVISOR = 'SUPERVISOR',
CONSULTANT = 'CONSULTANT',
}
export class User { // Usuario del Tenant
constructor(
public readonly id: string, // UUID
public email: string,
public name: string,
public role: ETenantUserRole,
public isActive: boolean,
public hashedPassword?: string, // Solo en backend, no se expone
// ... otros campos como teamId, etc.
) {}
// ... métodos ...
}

libs/core/src/users-roles/entities/platform-admin.entity.ts (Podría estar en core/tenancy):
Representa a los administradores de dfs-invest-suite.
libs/core/src/users-roles/ports/user-repository.port.ts: IUserRepositoryPort.
libs/core/src/users-roles/services/AuthenticationService.ts (Dominio): Lógica de validación de contraseña, generación de hash (si no se delega completamente a una librería de auth).
libs/core/src/users-roles/services/AuthorizationService.ts (Dominio): Lógica para verificar si un User con un Role tiene permiso para una acción.
II.G. Librería Core: aiper-assistance (libs/core/src/aiper-assistance/)
Propósito: Definir las interfaces y lógica de dominio para la interacción con motores de IA.
Acción IA Nx: Crear subdirectorio.
Estructura y Artefactos:
libs/core/src/aiper-assistance/ports/conversation-analyzer.port.ts:
export interface IConversationAnalysisInput {
text: string;
previousContext?: any; // Historial de conversación, perfil del lead
language?: string; // ej. 'pt-BR'
}
export interface IConversationAnalysisResult {
intent?: string;
sentiment?: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
entities?: Array<{ type: string; value: string }>;
summary?: string;
suggestedReply?: string;
leadQualificationHints?: any; // ej. { budgetMentioned: 500000, timeline: '3_MONTHS' }
}
export interface IConversationAnalyzerPort {
analyze(input: IConversationAnalysisInput): Promise<IConversationAnalysisResult>;
}
export const CONVERSATION_ANALYZER_PORT = Symbol('IConversationAnalyzerPort');

libs/core/src/aiper-assistance/ports/prompt-manager.port.ts:
getPrompt(promptName: string, variables: Record<string, any>): Promise<string> (Para construir prompts dinámicamente desde una biblioteca).
(Entidades/VOs como PromptTemplate, AnalysisResult si se vuelven complejos).
II.H. Otros Dominios Core (properties-spe, analytics-core, notifications-core):
Se crearán sus estructuras de directorios (entities, ports, services) a medida que se definan sus requisitos.
analytics-core: Podría definir cómo se calculan ciertos KPIs antes de ser almacenados o visualizados.
notifications-core: Lógica para determinar a quién notificar sobre qué, independientemente del canal (el canal es infraestructura).
(Continuará con la Parte III: DISEÑO DETALLADO DE LA CAPA DE APLICACIÓN (LIBS/APPLICATION/), mostrando cómo los Casos de Uso y Listeners de Eventos utilizan estos puertos de dominio y el TenantContextService en el próximo prompt).
Esta estructura de dominio, ahora explícitamente consciente del modelo SaaS multi-tenant con aislamiento de DB, establece una fundación sólida. La clave es que los repositorios de infraestructura siempre operarán sobre la base de datos del tenant activo. ¿Continuamos con la Capa de Aplicación?

---

PARTE II: DISEÑO DETALLADO DEL DOMINIO (LIBS/CORE/) (Continuación)
II.D. Librería Core: anti-ban (libs/core/src/anti-ban/) - REVISADO PARA SAAS
Propósito: Contiene la lógica de negocio pura para proteger las WABAs de los tenants contra suspensiones, gestionando la salud de sus números, límites y patrones de envío. Opera en el contexto de un tenant específico.
Estructura y Artefactos:
libs/core/src/anti-ban/index.ts
libs/core/src/anti-ban/entities/whatsapp-account.entity.ts:
Definición: Como se detalló en la Sección 3.1 del Blueprint v1.2 (Parte 3) y refinado en la Sección 3.1 de la Parte 4 (Blueprint v3.3, prompt sobre Dominios).
Clave SaaS: Esta entidad NO contiene tenantId ni wabaId. Representa un número de teléfono dentro de la base de datos del tenant. El phoneNumberId es su identificador único dentro del contexto de la WABA del tenant.
Atributos Reafirmados: phoneNumberId (ID), phoneNumberDisplay, verifiedName, nameStatus (Enum de @dfs-suite/shared), qualityRating (Enum de @dfs-suite/shared), messagingLimitTier (Enum de @dfs-suite/shared), currentConversationsInitiated24h, canCommunicate, isOfficiallyVerified, status (Enum EInternalAccountStatus de @dfs-suite/shared), operationalStatus (Enum EInternalOperationalStatus de @dfs-suite/shared), healthScore, lastSentMessageTimestamp, lastQualityUpdateTimestamp, lastLimitUpdateTimestamp, lastRestrictionTimestamp, accountRestrictionsJson?: string (para almacenar TAccountRestriction[]), tags?: string[], notes?: string, createdAt, updatedAt.
Métodos: static create(...), updateFromMetaWebhook(...), setQualityRating(...), setMessagingLimitTier(...), addRestrictionFromJson(...), clearRestrictions(), incrementConversationsInitiated(), canInitiateConversation(): boolean, calculateInternalHealthScore(): number, determineAppropriateStatus().
libs/core/src/anti-ban/ports/whatsapp-account-repository.port.ts:
Interfaz IWhatsAppAccountRepositoryPort.
Métodos (Operan en la DB del tenant actual): findById(phoneNumberId), findByDisplayPhoneNumber(displayPhoneNumber), getAll(), getAllActive(), save(account), updateSpecificFields(phoneNumberId, updates: Partial<WhatsAppAccount>), findNextAvailableForSending(criteria: { category: EMessageCategory, requiredTier?: EWhatsAppMessagingTier }): Promise<WhatsAppAccount | null>.
Símbolo WHATSAPP_ACCOUNT_REPOSITORY_PORT.
libs/core/src/anti-ban/ports/rate-limiter.port.ts:
Interfaz IRateLimiterPort.
Métodos (Con tenantId y accountId): consumeToken(tenantId, accountId, cost?), checkAllowance(tenantId, accountId, cost?), configureLimits(tenantId, accountId, points, durationSeconds), resetLimit(tenantId, accountId).
Símbolo RATE_LIMITER_PORT.
libs/core/src/anti-ban/services/anti-ban-decision.service.ts:
Clase AntiBanDecisionService.
Constructor: Inyecta IWhatsAppAccountRepositoryPort, IRateLimiterPort.
Método determineSendAction(tenantId: string, messageCategory: EMessageCategory, riskLevel: ESendingRiskLevel, templateValidationResult: {isSendable: boolean; reason?: string}, requestedAccountId?: string): Promise<TAntiBanDecision>:
Recibe tenantId.
NUEVO: Recibe templateValidationResult del Caso de Uso que ya validó la plantilla. Si !isSendable, retorna REJECT inmediatamente.
Llama a accountRepo.findNextAvailableForSending({ category: messageCategory }) (repo opera en DB del tenant).
Llama a rateLimiterPort.consumeToken(tenantId, selectedAccount.phoneNumberId, cost).
Lógica de selección, costo, warm-up/cool-down como se detalló antes, operando sobre los números del tenant.
libs/core/src/anti-ban/types/anti-ban.types.ts: TAntiBanDecision, ESendingRiskLevel.
II.E. Librería Core: leads-flow (libs/core/src/leads-flow/)
Propósito: Lógica de dominio para Leads.
Estructura y Artefactos:
entities/lead.entity.ts: Clase Lead (sin tenantId). Atributos: id, waId, phoneNumber, email, name, statusLead (enum propio), score, source, assignedToUserId, hasWhatsAppOptIn, optInTimestamp, optInSource, optInCategories, lastInteractionAt, createdAt, updatedAt, y campos de perfilamiento. Métodos de comportamiento.
entities/lead-interaction.entity.ts: Clase LeadInteraction.
ports/lead-repository.port.ts: ILeadRepositoryPort (CRUD, findByWaId, etc.).
ports/lead-interaction-repository.port.ts: ILeadInteractionRepositoryPort.
services/lead-qualification-rules.service.ts (Opcional para reglas no IA).
II.F. Librería Core: users-roles (libs/core/src/users-roles/)
Propósito: Usuarios (de tenant) y RBAC.
Estructura y Artefactos:
entities/user.entity.ts: Clase User (del tenant) con id, email, name, role: ETenantUserRole (enum TENANT_ADMIN, SUPERVISOR, CONSULTANT), isActive, hashedPassword.
ports/user-repository.port.ts: IUserRepositoryPort.
services/UserAuthenticationDomainService.ts: Lógica de validación de contraseña, etc.
services/UserAuthorizationDomainService.ts: Lógica para canAccess(user, resource, action).
II.G. Librería Core: aiper-assistance (libs/core/src/aiper-assistance/)
Propósito: Interfaces para IA.
Estructura y Artefactos:
ports/conversation-analyzer.port.ts: IConversationAnalyzerPort con IConversationAnalysisInput y IConversationAnalysisResult.
ports/prompt-manager.port.ts: IPromptManagerPort con getPrompt(promptName, variables).
II.H. Librería Core: message-template-record (libs/core/src/message-template-record/) (NUEVO Dominio)
Propósito: Representa una copia local/cacheada de las plantillas de mensajes de un tenant, sincronizada desde Meta.
Estructura y Artefactos:
entities/message-template-record.entity.ts: Clase MessageTemplateRecord con id (Meta HSM ID), name, language, category (EMessageCategory), statusMeta (string), statusInternal (enum), qualityRatingMeta (EWhatsAppQualityRating), componentsJson (string), exampleJson (string), lastSyncedWithMetaAt.
ports/message-template-record-repository.port.ts: IMessageTemplateRecordRepositoryPort (CRUD, findByNameAndLanguage).
II.I. Librería Core: billing (libs/core/src/billing/) (NUEVO Dominio)
Propósito: Entidades y puertos para el seguimiento de costos y tarifas.
Estructura y Artefactos:
entities/whatsapp-pricing-rate.entity.ts: Clase WhatsAppPricingRate.
entities/billed-usage.entity.ts: Clase BilledUsage (o BilledWhatsAppMessage/BilledWhatsAppConversation).
ports/whatsapp-pricing-rates-repository.port.ts: IWhatsAppPricingRatesRepositoryPort.
ports/billed-usage-repository.port.ts: IBilledUsageRepositoryPort.
PARTE III: DISEÑO DETALLADO DE LA CAPA DE APLICACIÓN (LIBS/APPLICATION/)
La Capa de Aplicación orquesta los casos de uso, utilizando los puertos de dominio y siendo consciente del tenantId actual.
III.A. Gestión del Contexto del Tenant (Reafirmado)
El TenantContextService es inyectado o el tenantId es pasado a través de los payloads de eventos a los Listeners y Casos de Uso.
III.B. Submódulo: tenancy (libs/application/src/tenancy/)
Casos de Uso:
CreateTenantUseCase: Orquesta la creación de Tenant, provisioning de DB (IDatabaseProvisioningServicePort - infra), y creación del primer usuario admin del tenant.
SetTenantWhatsAppConfigUseCase: Guarda credenciales WA del tenant (ITenantConfigRepositoryPort) y suscribe la App Meta a la WABA del tenant (IWhatsAppAdminPort).
(Otros: GetTenantDetailsUseCase, UpdateTenantPlanUseCase).
III.C. Submódulo: whatsapp (libs/application/src/whatsapp/)
Casos de Uso:
SendWhatsAppMessageUseCase:
Implementación como se detalló en la Sección 11.1 (Blueprint v3.3, Parte 4), ahora usando IMessageTemplateRecordRepositoryPort para la validación de plantilla pre-envío (en lugar de llamar directamente a IWhatsAppAdminPort para esto, usando la data local sincronizada). Si la plantilla no está en el repo local o está desactualizada, entonces sí podría llamar a IWhatsAppAdminPort para obtenerla y sincronizarla.
ManageWhatsAppTemplateUseCase:
create(input: { tenantId, creationData }): Valida, llama a IWhatsAppAdminPort.createMessageTemplate. Si éxito, llama a IMessageTemplateRecordRepository.saveOrUpdateFromApi(templateFromApi).
syncAllForTenant(tenantId, wabaId): Llama a IWhatsAppAdminPort.listMessageTemplates. Para cada una, templateRecordRepo.saveOrUpdateFromApi().
SyncWhatsAppAssetsUseCase:
execute(input: { tenantId }):
Llama a adminApiAdapter.listPhoneNumbers(tenantWabaId, ...) y para cada número, llama a accountHealthManagerService.syncPhoneNumberStateFromApi(...).
Llama a this.manageWhatsAppTemplateUseCase.syncAllForTenant(tenantId, tenantWabaId).
Listeners de Eventos:
IncomingMessageApplicationListener:
Lógica como en Sección 11.2 (Blueprint v3.3, Parte 4).
Después de registrar MessageLog y (opcional) ConversationAnalysis, emite LeadIncomingMessageProcessedEvent({ tenantId, leadId, messageLogId, ... }).
MessageStatusApplicationListener:
Lógica como en Sección 11.2. Llama a ICostCalculationServicePort.recordUsage({ tenantId, statusDetails }) y IAccountHealthManagerServicePort.processMessageFailure({ tenantId, ... }).
AssetUpdateApplicationListener:
Lógica como en Sección 11.2. Llama a los métodos correspondientes de IAccountHealthManagerServicePort (pasando tenantId) y actualiza IMessageTemplateRecordRepository (que ya opera en la DB del tenant).
III.D. Submódulo: anti-ban (libs/application/src/anti-ban/)
Servicio: AccountHealthManagerService (Implementando IAccountHealthManagerServicePort)
Su implementación detallada y métodos (todos tenant-aware) como en la Sección 6.4 (Blueprint v3.3 Parte 3) y refinado en la Parte 4.
Contiene toda la lógica de reacción a webhooks de calidad/restricciones/capacidades y fallos de mensajes, actualizando IWhatsAppAccountRepository y reconfigurando IRateLimiterPort para el tenant específico.
III.E. Submódulo: leads-flow (libs/application/src/leads-flow/)
Casos de Uso:
ImportLeadsUseCase: Recibe tenantId, fileBuffer. Parsea, valida, crea Leads en la DB del tenant.
QualifyLeadUseCase: Recibe tenantId, leadId, analysisResult. Aplica reglas (potencialmente configurables por tenant en el futuro) y actualiza Lead.score y Lead.statusLead en la DB del tenant.
AssignLeadUseCase: Recibe tenantId, leadId. Lógica de asignación (simple o Roleta) a Users (consultores) del tenant.
III.F. Submódulo: billing (libs/application/src/billing/)
Servicio: CostCalculationService (Implementando ICostCalculationServicePort)
Método recordUsage(input: { tenantId: string, statusDetails: TMessageStatusObject }).
Usa IWhatsAppPricingRatesRepository (accede a tabla global de tarifas) y IBilledUsageRepository (guarda en DB del tenant).
Caso de Uso: GetTenantCostReportUseCase:
Recibe tenantId, dateRange. Consulta IBilledUsageRepository (de la DB del tenant) y genera reporte.
III.G. Submódulo: aiper-assistance (libs/application/src/aiper-assistance/)
Caso de Uso: AnalyzeConversationTextUseCase:
Recibe tenantId, textToAnalyze.
Obtiene la configuración de IA del tenant (ej. qué modelo usar, API key si es del tenant) desde ITenantConfigRepositoryPort.
Llama a IConversationAnalyzerPort.analyze(text, tenantAiConfig).

**PARTE III: DISEÑO DETALLADO DE LA CAPA DE APLICACIÓN (LIBS/APPLICATION/)**
La Capa de Aplicación contiene los Casos de Uso (o Servicios de Aplicación) que dirigen los flujos de trabajo. Utilizan los Puertos definidos en el Dominio (Core) para interactuar con la lógica de negocio y la infraestructura. Todos los artefactos en esta capa deben ser Tenant-Aware, ya sea recibiendo tenantId como parámetro o accediéndolo a través del TenantContextService.
III.A. Gestión del Contexto del Tenant (Reafirmado para la Capa de Aplicación)
TenantContextService: Inyectado en Casos de Uso y Listeners que lo necesiten (especialmente si son de Scope.REQUEST o si el tenantId no viene directamente en el payload del evento que los dispara).
Eventos con tenantId: Los Listeners de Eventos que se suscriben a eventos emitidos por el WhatsappWebhookProcessor recibirán el tenantId como parte del payload del evento. Estos listeners establecerán el contexto para cualquier Caso de Uso que invoquen.
III.B. Submódulo: tenancy (libs/application/src/tenancy/)
Propósito: Casos de uso relacionados con la gestión y el ciclo de vida de los Tenants.
Artefactos:
use-cases/create-tenant.use-case.ts:
Interfaz ICreateTenantUseCase: Input: { name: string, planId: string, ownerEmail: string }, Output: Promise<Tenant>.
Implementación CreateTenantUseCaseImpl:
Dependencias: ITenantRepositoryPort, ITenantConfigRepositoryPort, IUserManagementServicePort (para crear el primer admin del tenant), IDatabaseProvisioningServicePort (infraestructura, para crear la DB/schema del tenant), EventEmitter2.
Lógica:
Validar que el nombre del tenant no exista.
Crear instancia de Tenant.create(...).
Llamar a tenantRepo.save(tenant).
Llamar a dbProvisioningService.provisionTenantDatabase(tenant.id).
Crear el primer usuario administrador para este tenant.
Emitir TenantCreatedEvent({ tenantId: tenant.id, ownerEmail }).
use-cases/set-tenant-whatsapp-config.use-case.ts:
Interfaz ISetTenantWhatsAppConfigUseCase: Input: { tenantId: string, wabaId: string, apiToken: string, phoneNumbers: Array<{id, displayNumber, isDefault?}> }, Output: Promise<void>.
Implementación:
Dependencias: ITenantConfigRepositoryPort, IWhatsAppAdminPort (para suscribir la app a la WABA del tenant), ITenantRepositoryPort.
Lógica:
Validar tenantId.
Encriptar apiToken antes de guardarlo.
Llamar a tenantConfigRepo.setWhatsAppApiCredentials(...).
Llamar a adminApiAdapter.subscribeAppToWabaEvents(tenantId, wabaId, apiToken) (este método en el adaptador usaría el token del tenant para POST a /{tenant*waba_id}/subscribed_apps).
Actualizar Tenant.status a ACTIVE si es el último paso del onboarding.
(Otros casos de uso: SuspendTenantUseCase, ChangeTenantPlanUseCase, etc.)
III.C. Submódulo: whatsapp (libs/application/src/whatsapp/)
Propósito: Casos de uso y listeners para la funcionalidad principal de WhatsApp.
Artefactos:
use-cases/send-whatsapp-message.use-case.ts:
SendWhatsAppMessageUseCaseImpl: Ya detallado en la Sección 11.1 (Blueprint v1.2 Parte 3) y refinado para ser tenant-aware (recibe tenantId y lo usa para obtener config WA y para el AntiBanDecisionService).
listeners/incoming-message.listener.ts:
IncomingMessageApplicationListener: Ya detallado en la Sección 11.2 (Blueprint v1.2 Parte 3), ahora recibe tenantId en el evento y lo usa para establecer contexto. Llama a ILeadRepository, IMessageLogRepository, IConversationAnalyzerPort (todos contextualizados al tenant).
listeners/message-status.listener.ts:
MessageStatusApplicationListener: Ya detallado, recibe tenantId en el evento. Llama a IMessageLogRepository (contextualizado), ICostCalculationServicePort (pasando tenantId), IAccountHealthManagerServicePort (pasando tenantId).
listeners/asset-update.listener.ts:
AssetUpdateApplicationListener: Ya detallado, recibe tenantId en el evento. Llama a IAccountHealthManagerServicePort (pasando tenantId) y IMessageTemplateRecordRepository (contextualizado).
listeners/user-preference.listener.ts:
UserPreferenceApplicationListener:
Evento: @OnEvent(WhatsAppUserMarketingPreferenceChangedEvent.eventName)
Dependencias: ILeadRepository, ILoggerPort.
Lógica: Usa event.tenantId y event.preferenceDetails.wa_id para buscar el Lead. Actualiza lead.marketingOptIn o lead.optInCategories. Guarda el lead.
use-cases/manage-whatsapp-template.use-case.ts:
ManageWhatsAppTemplateUseCaseImpl:
create(input: { tenantId, wabaIdToUse, creationData: WhatsAppTemplateCreationApiRequest }): Establece contexto, obtiene token del tenant, llama a IWhatsAppAdminPort.createMessageTemplate. Guarda en IMessageTemplateRecordRepository (DB del tenant).
getById(input: { tenantId, templateId }): Obtiene token, llama a IWhatsAppAdminPort.
list(input: { tenantId, wabaIdToUse, filters? }): Obtiene token, llama a IWhatsAppAdminPort.
use-cases/sync-whatsapp-assets.use-case.ts:
SyncWhatsAppAssetsUseCaseImpl: Lógica como se describió, pero ahora execute(input: { tenantId, syncNumbers?, syncTemplates? }). Todas las llamadas a IWhatsAppAdminPort y repositorios son contextualizadas.
III.D. Submódulo: anti-ban (libs/application/src/anti-ban/)
Propósito: Casos de uso y servicios de aplicación que orquestan la lógica de Anti-Ban del dominio.
Artefactos:
services/account-health-manager.service.ts:
Interfaz IAccountHealthManagerServicePort:
updatePhoneNumberStateFromWebhook(tenantId: string, phoneNumberId: string, qualityUpdate: TWebhookPhoneNumberQualityValue): Promise<void>
updatePhoneNumberCapabilitiesFromWebhook(tenantId: string, phoneNumberId: string, capabilityUpdate: any /* TWebhookCapabilityUpdateValue _/): Promise<void>
processAccountViolation(tenantId: string, wabaId: string, violationInfo: any /_ TViolationInfoValue \_/, phoneNumberInViolation?: string): Promise<void>
processAccountRestriction(tenantId: string, wabaId: string, restrictionInfo: TAccountRestriction[], phoneNumberInViolation?: string): Promise<void>
processMessageFailure(tenantId: string, senderPhoneNumberId: string, errors: TWebhookErrorObject[]): Promise<void>
syncPhoneNumberStateFromApi(tenantId: string, wabaId: string, numberDetailsFromApi: WabaPhoneNumberDetailsFromApi): Promise<void>
triggerWarmUp(tenantId: string, phoneNumberId: string): Promise<void>
triggerCoolDown(tenantId: string, phoneNumberId: string, reason: string): Promise<void>
setManualOperationalStatus(tenantId: string, phoneNumberId: string, newStatus: EInternalOperationalStatus): Promise<void>
Implementación AccountHealthManagerServiceImpl:
Inyecta IWhatsAppAccountRepositoryPort, IRateLimiterPort, ILoggerPort, ITenantConfigRepositoryPort.
Implementa la lógica para cada método del puerto, siempre operando sobre el tenantId proporcionado.
Ej: updatePhoneNumberStateFromWebhook obtiene la entidad WhatsAppAccount del repo (que ya está en contexto del tenant), llama a sus métodos de actualización (setQualityRating, calculateInternalHealthScore, determineAppropriateStatus), la guarda, y luego llama a rateLimiterPort.configureLimits(tenantId, phoneNumberId, ...) si es necesario.

**III.E. Submódulo: leads-flow (libs/application/src/leads-flow/)**
Propósito: Casos de uso para la gestión del ciclo de vida de los leads.
Artefactos:
use-cases/import-leads.use-case.ts:
Input: { tenantId, fileBuffer: Buffer, mapping: any }, Output: Promise<{ successCount, errorCount, errors: any[] }>.
Lógica: Parsea el archivo, valida datos, crea/actualiza entidades Lead (con hasWhatsAppOptIn del archivo) usando ILeadRepository (contextualizado).
use-cases/qualify-lead.use-case.ts:
Input: { tenantId, leadId, analysisResult?: IConversationAnalysisResult, interactionContext?: any }.
Lógica: Usa analysisResult de aiper-assistance y reglas de negocio del tenant (¿configurables?) para actualizar Lead.score y Lead.status.
use-cases/assign-lead.use-case.ts:
Input: { tenantId, leadId, consultantUserId?: string, useRoleta?: boolean }.
Lógica: Si useRoleta, implementa lógica de "Roleta Inteligente" (considerando expertise del consultor, carga de trabajo - post-MVP). Actualiza Lead.assignedToUserId.
(Otros como NurtureLeadUseCase, ScheduleFollowUpUseCase).
III.F. Submódulo: billing (libs/application/src/billing/)
Propósito: Casos de uso y servicios relacionados con la facturación de WhatsApp para el tenant.
Artefactos:
services/cost-calculation.service.ts:
CostCalculationServiceImpl implementando ICostCalculationServicePort:
El listener @OnEvent(WhatsAppMessageStatusUpdatedEvent.eventName) es el punto de entrada.
Usa event.tenantId para obtener las tarifas (que podrían ser globales o específicas si un tenant tiene un acuerdo especial) y para registrar el BilledUsage en la DB del tenant.
use-cases/get-tenant-cost-report.use-case.ts:
Input: { tenantId, dateRange, groupBy? }.
Lógica: Consulta IBilledUsageRepository (contextualizado) y agrega datos para el reporte.
III.G. Submódulo: aiper-assistance (libs/application/src/aiper-assistance/)
Propósito: Casos de uso que orquestan la interacción con la IA.
Artefactos:
use-cases/analyze-conversation-text.use-case.ts:
AnalyzeConversationTextUseCaseImpl implementando IAnalyzeConversationTextUseCase:
Input: { tenantId, textToAnalyze, context? }.
Establece TenantContext.
(Post-MVP) Podría llamar a IPromptManagerPort para obtener un prompt optimizado para el tenantId y el caso de uso.
Llama a IConversationAnalyzerPort.analyze(...).
Devuelve IConversationAnalysisResult.
(Otros como GenerateReplySuggestionUseCase, SummarizeConversationUseCase).
Consideraciones Generales para la Capa de Aplicación SaaS:
Validación de Input: Cada Caso de Uso debe validar rigurosamente sus DTOs de entrada (usando class-validator o schemas Valibot/Zod).
Manejo de Errores: Lanzar excepciones de aplicación específicas (ej. TenantNotFoundError, LeadNotFoundError, OperationNotPermittedError) que la API (api-main) pueda atrapar y traducir a respuestas HTTP adecuadas.
Transaccionalidad: Para Casos de Uso que modifican múltiples entidades de dominio o repositorios, asegurar la atomicidad (ej. usando transacciones Prisma si todas las operaciones son en la misma DB del tenant, o sagas/compensaciones si involucran múltiples sistemas o la DB de plataforma).
Emisión de Eventos: Los Casos de Uso pueden emitir eventos de aplicación para desacoplar flujos secundarios.
(Continuará con la Parte IV: DISEÑO DETALLADO DE LA CAPA DE INFRAESTRUCTURA, enfocándonos en los adaptadores (Persistencia, Cache, Colas, APIs Externas como WhatsApp y AI) y cómo implementan los puertos siendo tenant-aware, en el próximo prompt).
Esta capa de aplicación, diseñada con Casos de Uso y Listeners conscientes del tenant, es la que realmente da vida a la lógica de negocio dentro de nuestra arquitectura SaaS. ¿Continuamos con la capa de Infraestructura?

---

PARTE IV: DISEÑO DETALLADO DE LA CAPA DE INFRAESTRUCTURA (LIBS/INFRASTRUCTURE/) (Reafirmación y Refinamientos Clave para IA Experta en Nx)
Esta capa es donde los conceptos abstractos de los puertos del Dominio y la Aplicación se materializan en código que interactúa con tecnologías concretas. La clave aquí es la implementación correcta del TenantContext para la selección dinámica de bases de datos y credenciales.
IV.A. Submódulo: tenancy-persistence (libs/infrastructure/src/tenancy-persistence/)
Instrucción IA NX: Generar esta librería. El PrismaClient aquí se conectará a la base de datos de plataforma centralizada (donde reside la tabla Tenant y TenantConfig).
repositories/prisma-tenant.repository.ts: Implementación de ITenantRepositoryPort.
repositories/secure-tenant-config.repository.ts: Implementación de ITenantConfigRepositoryPort.
Lógica de Encriptación/Desencriptación: Utilizar el IEncryptionServicePort (cuya implementación concreta, ej. AesEncryptionService, residirá en libs/infrastructure/src/security/). Las claves de API de WhatsApp de los tenants y las connection strings de sus DBs DEBEN estar encriptadas en reposo en la DB de plataforma. La clave maestra de encriptación de la plataforma es un secreto de máximo nivel.
IV.B. Submódulo: persistence (libs/infrastructure/src/persistence/)
Instrucción IA NX: Generar esta librería.
prisma/prisma.service.ts (o prisma-client.factory.ts): ¡IMPLEMENTACIÓN CRÍTICA!
Diseño: Debe ser un servicio NestJS con Scope.REQUEST O un factory que pueda ser inyectado y usado por los repositorios para obtener un PrismaClient configurado para el tenantId actual.
Lógica:
Inyectar TenantContextService (para obtener tenantId del request/job actual) y ITenantConfigRepositoryPort (para obtener la dbConnectionString del tenant).
Método getClient(): PrismaClient (o el constructor si es Scope.REQUEST):
const tenantId = this.tenantContextService.getTenantId();
if (!tenantId) throw new Error('Tenant ID no encontrado en el contexto');
const dbConnectionString = await this.tenantConfigRepo.getDbConnectionString(tenantId);
if (!dbConnectionString) throw new Error(\DB connection string no encontrada para tenant ${tenantId}`);`
Retornar new PrismaClient({ datasources: { db: { url: dbConnectionString } } });
Manejo de Pool de Conexiones (Importante para Performance): En lugar de crear un new PrismaClient() en cada request, implementar un sistema de cacheo/pooling de instancias de PrismaClient por tenantId para reutilizarlas. Un Map<string, PrismaClient> simple podría funcionar, con lógica para crear la instancia si no existe. Considerar la gestión del ciclo de vida de estas instancias (cuándo desconectarlas). NestJS maneja el onModuleDestroy para servicios con Scope.DEFAULT, pero para Scope.REQUEST o un factory, esto debe ser gestionado.
Acción IA NX: Generar este servicio/factory.
Repositorios (ej. prisma-whatsapp-account.repository.ts):
Inyectan el PrismaService (o el factory).
En cada método, obtienen el PrismaClient contextualizado: const prisma = this.prismaService.getClient(); (o await this.prismaClientFactory.getClientForTenant(this.tenantContext.getTenantId())).
Importante: Las queries Prisma NO necesitan incluir where: { tenantId: ... } porque el PrismaClient ya está apuntando a la base de datos correcta.
Acción IA NX: Generar la estructura de los repositorios que implementan los puertos de libs/core/.
IV.C. Submódulo: cache (libs/infrastructure/src/cache/)
Instrucción IA NX: Generar esta librería.
redis.provider.ts: Configurar para conectarse a la instancia global de Redis.
adapters/redis-rate-limiter.adapter.ts:
RedisRateLimiterAdapter:
Claves de Redis: Usar siempre un prefijo que incluya tenantId Y accountId (Phone Number ID). Ej: rate_limit:${tenantId}:${accountId} para el contador principal, y rl_config:${tenantId}:${accountId} para almacenar { points, duration }.
configureLimits(tenantId, accountId, points, duration): Escribe en rl_config:${tenantId}:${accountId}.
consumeToken(tenantId, accountId, cost):
Lee la configuración de rl_config:${tenantId}:${accountId}. Si no existe, usa defaults conservadores y loggea advertencia.
Usa RateLimiterRedis con la clave rl_token:${tenantId}:${accountId} y la configuración obtenida.
Acción IA NX: Implementar la lógica de configureLimits y la obtención dinámica de config en consumeToken.
IV.D. Submódulo: queue (libs/infrastructure/src/queue/)
Instrucción IA NX: Generar esta librería. Configurar BullModule en queue.module.ts.
processors/whatsapp-outbound.processor.ts y whatsapp-webhook.processor.ts:
Lógica de Contexto de Tenant:
El job data DEBE contener tenantId.
Al inicio del método process(job):
const { tenantId, ...actualPayload } = job.data;
if (!tenantId) {
  this.logger.error(`[Job:${job.id}] Falta tenantId en el job data.`);
throw new Error('Missing tenantId for job processing'); // Hace que el job falle
}
// Establecer el contexto del tenant para esta ejecución del job
// Esto dependerá de la implementación del TenantContextService (ej. si usa AsyncLocalStorage)
// this.tenantContextService.runWithinContext(tenantId, async () => { /_ ...lógica del job... _/ });
// O si es un servicio request-scoped que se puede resolver con el tenantId:
// const scopedUseCase = await this.moduleRef.resolve(SEND_WHATSAPP_MESSAGE_USE_CASE, contextIdConTenant);

TypeScript
Acción IA NX: Implementar la lógica para establecer el contexto del tenant. La forma exacta dependerá de cómo se implemente TenantContextService y la inyección de dependencias para workers BullMQ en NestJS. Una opción es resolver dependencias con scope de request dentro del procesador si BullMQ lo permite o pasar el tenantId explícitamente a cada servicio/caso de uso llamado. La propagación explícita del tenantId a los casos de uso es más simple y robusta para workers de cola.
IV.E. Submódulos: whatsapp-cloud-api y whatsapp-admin-api (Adaptadores)
Instrucción IA NX: Generar estas librerías o subdirectorios dentro de una lib external-apis.
Adaptadores (WhatsappOfficialApiAdapter, WhatsAppAdminApiAdapter):
Constructor: Inyectar HttpService, ConfigService (para URLs base de API Meta, versión), ILoggerPort, EventEmitter2 (si emiten eventos), TenantContextService, ITenantConfigRepositoryPort.
En cada método que llama a Meta API (ej. sendMessage, createMessageTemplate):
const tenantId = this.tenantContextService.getTenantId(); (o recibido como parámetro).
const waCredentials = await this.tenantConfigRepo.getWhatsAppApiCredentials(tenantId);
if (!waCredentials?.apiToken) throw new InfrastructureError('WhatsApp API token no configurado para el tenant.');
Usar waCredentials.apiToken en la cabecera Authorization.
Usar waCredentials.wabaId o el accountIdToSendFrom (que es un Phone_Number_ID del tenant) en la URL del endpoint.
Circuit Breakers: Las claves para el Map de breakers deben ser tenantId:${accountId}.
Acción IA NX: Implementar esta lógica de obtención dinámica de credenciales.
IV.F. Submódulo: ai-providers (libs/infrastructure/src/ai-providers/)
Instrucción IA NX: Generar esta librería.
Adaptadores (ej. GoogleGeminiAdapter):
Implementa IConversationAnalyzerPort.
Similar a los adaptadores de WA, podría necesitar el tenantId para obtener una API Key de IA específica del tenant (si los tenants traen sus propias keys) o para pasarla como metadato a la API de IA para facturación/logging por tenant.
Inyectar TenantContextService y ITenantConfigRepositoryPort si las API Keys de IA son por tenant.
IV.G. Submódulos: security y observability (libs/infrastructure/)
security/services/aes-encryption.service.ts: Implementación de IEncryptionServicePort usando crypto de Node.js y una clave maestra de plataforma gestionada como secreto.
observability/logger/nest-logger.adapter.ts:
Inyecta TenantContextService (opcionalmente, para añadir tenantId automáticamente a todos los logs si es posible y deseado).
Configura Pino para salida JSON estructurada.
Conclusión para la Capa de Infraestructura:
La clave es la gestión dinámica de la conexión a la base de datos del tenant y el uso de las credenciales de API externas del tenant. El TenantContextService y el ITenantConfigRepositoryPort son fundamentales para esto. Los adaptadores deben ser "tontos" respecto a la lógica multi-tenant y simplemente operar con el contexto que se les proporciona.

---

**PARTE V: DISEÑO DETALLADO DE LAS APLICACIONES (APPS/)**
Las aplicaciones son los ejecutables que los usuarios finales (clientes de tenants, supervisores, consultores, administradores de plataforma) y otros sistemas consumen. Se construyen sobre las librerías core, application, infrastructure y shared.
V.A. Aplicación: api-main (API Gateway Principal Multi-Tenant)
Ubicación: apps/api-main/
Tecnología: NestJS (v10+), GraphQL (Apollo Server), REST (para Webhooks y algunas integraciones), WebSockets (Socket.io).
Propósito Principal:
Exponer la funcionalidad de la suite a las PWAs (pwa-supervisor, pwa-consultant, admin-platform) y potencialmente a APIs de terceros (clientes de los tenants o integraciones).
Gestionar la autenticación y autorización de usuarios de tenants y administradores de plataforma.
Recibir y validar webhooks de WhatsApp (y otros servicios externos).
Establecer y gestionar el contexto del tenant para cada solicitud.
Estructura y Artefactos Clave:
main.ts:
Bootstrap de la aplicación NestJS.
Configuración de bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf; } }) para obtener rawBody para la validación de firma de webhooks.
Configuración de CORS.
Prefijo global de API (ej. /api).
Pipes globales de validación (ValidationPipe).
Filtros de excepción globales para estandarizar respuestas de error.
Configuración del Logger (NestLoggerAdapter de nuestra lib observability).
Configuración de Apollo Server para GraphQL.
Configuración de SocketIoAdapter para WebSockets.
app.module.ts (Módulo Raíz):
Importa ConfigModule.forRoot({ isGlobal: true, ... }).
Importa GraphQLModule.forRootAsync(...) (configuración de Apollo, autoSchemaFile, context).
Importa EventEmitterModule.forRoot().
Importa módulos de dominio/feature (ej. LeadsApiModule, WhatsAppApiModule, TenancyApiModule, UsersRolesApiModule, AuthApiModule).
Middleware/Guard Global de Contexto de Tenant: Se registra un middleware o guard global que se ejecuta en cada solicitud HTTP/GraphQL.
Lógica: Extrae el tenantId del token JWT (para usuarios autenticados de tenants). Para ciertas rutas (ej. admin-platform o resolución de webhook por WABA ID), el tenantId podría obtenerse de otra forma.
Establece el tenantId en el TenantContextService.
Módulos de Dominio/Feature (ej. apps/api-main/src/domains/leads/):
leads.module.ts: Importa los Casos de Uso (ISendWhatsAppMessageUseCase, etc.) y Puertos de Repositorio necesarios de @dfs-suite/application y @dfs-suite/core. Provee las implementaciones de infraestructura (ej. PrismaLeadRepository) que son contextualizadas por el PrismaService dinámico.
resolvers/leads.resolver.ts: Resolvers GraphQL para queries y mutations de Leads. Inyectan los Casos de Uso de Aplicación. Usan DTOs (de @dfs-suite/shared o locales) y class-validator.
controllers/leads.controller.ts: (Si hay endpoints REST para Leads).
apps/api-main/src/webhooks/controllers/whatsapp-webhook.controller.ts:
Como se detalló en la Sección 6.1. Ahora, adicionalmente, después de validar la firma y antes de encolar:
Extrae WABA_ID de entry[0].id.
Llama a ITenantConfigRepositoryPort.findTenantByWabaId(wabaId) (este repo opera sobre la DB de plataforma) para obtener el tenantId.
Si no se encuentra tenantId, loggea error y retorna 200 OK (no encolar).
Encola { payloadWebhook, tenantId }.
apps/api-main/src/auth/ (Módulo de Autenticación):
Estrategias Passport (JWT para usuarios de tenant, quizás otra para admins de plataforma).
Controladores/Resolvers para login, registro (del primer admin de tenant), refresh token.
AuthGuards para proteger rutas/queries/mutations.
apps/api-main/src/realtime/ (Módulo de WebSockets):
notifications.gateway.ts: Gateway de Socket.io.
Escucha eventos de aplicación internos (ej. LeadIncomingMessageProcessedEvent, WhatsAppAccountHealthChangedEvent) que llevan tenantId.
Emite mensajes WebSocket a los clientes frontend conectados (PWAs) del tenantId correspondiente. Los clientes se unirían a "rooms" de Socket.io basadas en su tenantId.
V.B. Aplicación: pwa-supervisor (Portal para Supervisores/Administradores de Tenant)
Ubicación: apps/pwa-supervisor/
Tecnología: Next.js (App Router), React, Tailwind CSS, Shadcn/UI, TanStack Query, Zustand.
Propósito: Interfaz principal para que los administradores y supervisores de un TENANT gestionen leads, consultores, la configuración de WhatsApp de su tenant, vean analíticas y costos.
Autenticación: Flujo de login que llama a api-main y almacena el JWT (con tenantId) de forma segura (ej. HttpOnly cookie o LocalStorage con precauciones). Todas las llamadas a api-main usan este JWT.
Estructura y Componentes Clave:
Layout Principal: Navegación, header con info del usuario/tenant.
Dashboard (KPIs): Como se definió en Sección 13.1 (Salud WA, Límites, Costos del tenant). Consume queries GraphQL de api-main.
Gestión de Leads (leads-flow): Vistas de lista, detalle, asignación, filtros. Consume queries/mutations de Leads.
Gestión de Números WhatsApp (del Tenant): Vista de tabla con phoneNumberDisplay, verifiedName, qualityRatingMeta, messagingLimitTierMeta, healthScoreInterno, operationalStatus. Acción para MAINTENANCE_BY_ADMIN. Consume queries/mutations.
Gestión de Plantillas WhatsApp (del Tenant - Post-MVP):
Listar plantillas del tenant.
Formulario para crear nuevas plantillas (llama a ManageWhatsAppTemplateUseCase vía API). Debe guiar al usuario con las políticas de Meta y la estructura de components y example.
Configuración del Tenant (Básica):
Ver y (si se permite) actualizar la información de su WABA y números de teléfono registrados en dfs-invest-suite.
Gestionar usuarios y roles DENTRO de su tenant.
Analíticas y Reportes (del Tenant): Costos, rendimiento de campañas, etc.
Notificaciones en Tiempo Real: Cliente Socket.io conectado a api-main (room del tenant) para recibir actualizaciones (ej. nuevo lead, cambio de estado de mensaje, alerta de calidad).
V.C. Aplicación: pwa-consultant (Portal para Consultores de Tenant)
Ubicación: apps/pwa-consultant/
Tecnología: Similar a pwa-supervisor.
Propósito: Interfaz optimizada para que los consultores de un tenant gestionen SUS leads asignados, vean el historial de interacciones, envíen mensajes (libres y plantillas), y registren actividad.
Autenticación: Similar a pwa-supervisor, JWT con tenantId y userId.
Estructura y Componentes Clave:
Dashboard del Consultor: Leads asignados, tareas pendientes, alertas.
Vista de Lista de Leads (Asignados): Priorizada por urgencia, score.
Vista de Interacción con Lead (Chat-like UI):
Historial de mensajes WhatsApp (obtenido de MessageLog del tenant).
Capacidad de enviar mensajes de texto libre (si dentro de CSW).
Selector de Plantillas APROBADAS del tenant para enviar (con campos para variables).
(Futuro) Sugerencias de respuesta de aiper-assistance.
Notas del Lead, registro de llamadas/emails.
V.D. Aplicación: admin-platform (PWA para Administradores de dfs-invest-suite)
Ubicación: apps/admin-platform/
Tecnología: Similar a pwa-supervisor.
Propósito: Herramienta interna para que el equipo de dfs-invest-suite (MetaShark/DFS) gestione la plataforma SaaS.
Autenticación: Mecanismo separado para administradores de plataforma.
Estructura y Componentes Clave:
Gestión de Tenants:
Listar tenants, ver su estado (ACTIVE, TRIAL, SUSPENDED_BY_PLATFORM).
Formulario de Onboarding de Nuevo Tenant (dispara CreateTenantUseCase).
Ver/Editar configuración sensible de tenants (ej. connection string de DB, token WA encriptado - con permisos muy restringidos).
Gestionar planes y suscripciones.
Monitoreo Global de Plataforma:
Salud agregada de la infraestructura (API, DBs, Colas, Redis).
Uso de recursos globales.
Métricas de adopción y uso por tenants (anonimizadas si es necesario).
Gestión de Plantillas Globales (Opcional): Si dfs-invest-suite ofrece plantillas pre-aprobadas que los tenants puedan clonar.
Herramientas de Soporte: Ver logs de un tenant específico (con su permiso), diagnosticar problemas.
V.E. Futuras Aplicaciones (portal-public-template, app-native-aggregator)
portal-public-template: Un template base Next.js que los tenants podrían usar (o nosotros hostear para ellos) para su portal público de propiedades, integrado con api-main para capturar leads directamente a su instancia de dfs-invest-suite.
app-native-aggregator: La app móvil nativa (React Native o nativo puro) para consultores, como se describió, que consolida la comunicación de WhatsApp.
(Continuará con la Sección 16: Configuración de Entorno y Despliegue - REVISADA FINAL, Sección 17: Roadmap - REVISADO FINAL y Sección 18: Glosario Técnico Detallado de Artefactos - COMPLETADO en el próximo prompt).
Esta descripción de las aplicaciones establece sus roles y cómo interactúan con el backend y entre ellas, siempre bajo el paraguas multi-tenant. La separación clara de responsabilidades entre las PWAs de tenant y la PWA de administración de plataforma es clave. ¿Continuamos con las secciones finales?

---

PARTE VI: CONSIDERACIONES CROSS-CUTTING AVANZADAS (Resumen)
Aunque no se detallarán exhaustivamente en este prompt, es crucial tener en mente estos aspectos transversales que deben ser considerados e implementados progresivamente:
Seguridad Avanzada:
Protección contra OWASP Top 10 para api-main y todas las PWAs.
Endurecimiento de la configuración de servidores y bases de datos.
Políticas de retención de datos y backups seguras.
Auditorías de seguridad periódicas.
Observabilidad Detallada:
Logging: JSON estructurado con tenantId, userId, traceId en todos los servicios.
Métricas: Métricas de negocio (leads, conversiones por tenant), métricas de rendimiento de API/DB/colas, métricas de salud de WhatsApp (calidad, límites, errores).
Tracing Distribuido: (OpenTelemetry) Para seguir una solicitud a través de api-main, colas, y servicios de aplicación.
Alertas: Sobre errores críticos, degradación de performance, umbrales de Anti-Ban, problemas de facturación de tenants.
Performance y Escalabilidad:
Optimización de queries de base de datos (Prisma + análisis de query plans).
Estrategias de caching avanzadas (Redis) para datos frecuentemente accedidos.
Escalado horizontal de api-main y workers BullMQ (Kubernetes HPA o similar).
Optimización de bundles frontend (Next.js).
Gestión de Errores y Resiliencia:
Patrones de Circuit Breaker para todas las llamadas a APIs externas críticas (WhatsApp, IA, etc.).
Manejo de fallos en colas (DLQs, reintentos con backoff).
Estrategias de fallback si un servicio externo (ej. IA) no está disponible.
Feature Flags: Para desplegar nuevas funcionalidades de forma gradual o para tenants específicos.
PARTE VII: ROADMAP DE IMPLEMENTACIÓN HIPERGRANULAR (CONSOLIDADO Y FINAL)
Este roadmap integra la visión SaaS Multi-Tenant desde el inicio, enfocándose en construir la funcionalidad para el "Tenant Semilla" (DFS Investimentos Imobiliários) de forma que la arquitectura ya soporte la expansión a más tenants.
Dependencia CRÍTICA Transversal: Obtención de la documentación técnica faltante de Meta:
POST /{waba-id}/message_templates: Estructura JSON de components.example para TODAS las variables y tipos de botones complejos (OTP, FLOW, MPM, CATALOG) al crear la plantilla.
Webhooks de Gestión: Payloads JSON de value para account_update (todos los event), message_template_quality_update, phone_number_quality_update.
API Admin GET /{phone-number-id}: Campo oficial y estructura para messaging_limits (Tier) y throughput.
Fase 0: Fundación del Proyecto y Setup SaaS Básico (Ya debería estar en curso/completada por la IA NX)
Sprints 0.1-0.3 (Estimado 2-3 semanas):
Creación del workspace Nx (dfs-invest-suite).
Configuración de herramientas base (TypeScript, ESLint, Prettier, Jest, Husky, Yarn Berry).
Generación de estructura inicial de apps/ (api-main, pwa-supervisor) y libs/ (core, application, infrastructure, shared, ui-shared).
Setup de Docker Compose para DB de plataforma y DB del Tenant Semilla (PostgreSQL), y Redis.
Dominio tenancy (Core) v0.1: Entidad Tenant, ITenantRepositoryPort, ITenantConfigRepositoryPort.
Infraestructura tenancy-persistence y tenancy-config v0.1: Implementaciones Prisma y de encriptación básica para Tenant y su configuración (DB conn string, mock de token WA).
TenantContextService v0.1 (Infra/Shared): Implementación inicial (ej. con AsyncLocalStorage).
PrismaService Dinámico v0.1 (Infra/Persistence): Capaz de conectar a la DB del tenant (hardcodeado al Tenant Semilla para MVP).
CI/CD pipeline básico (lint, test, build).
Fase ST-1: Conectividad WhatsApp, Mensajería Básica y Webhooks messages (Tenant-Aware)
Sprint ST-1.0: Configuración y Verificación WA para Tenant Semilla (Adaptación WA-0) (~3-5 días):
Tareas de WA-0 (config App Meta, WABA, Número Semilla, Token, verificación endpoint webhook) AHORA para el Tenant Semilla, almacenando sus creds WA de forma segura vía ITenantConfigRepositoryPort.
WhatsappWebhookController resuelve tenantId por WABA_ID y lo encola.
Sprint ST-1.1: Envío de Mensajes (Texto y Plantilla Simple) Tenant-Aware (Adaptación WA-1.1) (~8-10 días):
WhatsappOfficialApiAdapter v1.0 (tenant-aware, usa token del tenant).
MessageLog y PrismaMessageLogRepository (en DB del tenant).
SendWhatsAppMessageUseCase v0.1 (tenant-aware, Anti-Ban simplificado).
WhatsappOutboundProcessor v0.1 (tenant-aware).
Sprint ST-1.2: Recepción de Webhooks messages Tenant-Aware (Adaptación WA-1.2) (~8-10 días):
WhatsappWebhookController con validación de firma finalizada.
WhatsappWebhookProcessor v1.0 (tenant-aware, emite eventos con tenantId para field: "messages").
IncomingMessageApplicationListener v0.1 y MessageStatusApplicationListener v0.1 (tenant-aware, lógica básica de persistencia).
Fase ST-2: Núcleo Anti-Ban v1.0 y Gestión de Salud (Tenant-Aware)
Sprint ST-2.1: Monitoreo Básico de Salud de Números (Adaptación WA-2.1) (~8-10 días):
WhatsAppAdminApiAdapter v1.1 (tenant-aware para getPhoneNumberDetails, listPhoneNumbers).
Actualización de WhatsAppAccount (DB del tenant) con quality_rating, messaging_limit_tier de Meta.
WhatsappWebhookProcessor v1.1 procesa webhooks phone_number_quality_update, business_capability_update (con tenantId).
AccountHealthManagerService v0.1 (listeners básicos para estos webhooks, actualiza DB del tenant).
GAP: Depende de payloads de webhook de gestión y respuesta de API Admin de números.
Sprint ST-2.2: Anti-Ban v1.0 (Decisión Multi-Número Tenant-Aware) (Adaptación WA-2.2) (~8-10 días):
RedisRateLimiterAdapter v2.0 con configureLimits dinámico (clave tenantId:phoneNumberId).
PrismaWhatsAppAccountRepository v1.2 con findNextAvailableForSending (para el tenant).
AntiBanDecisionService v1.0 (tenant-aware, lógica de selección y costo de token).
AccountHealthManagerService v0.2 con Warm-up/Cool-down básico para números del tenant.
Sprint ST-2.3: Manejo de Restricciones y Plantillas Problemáticas (Tenant-Aware) (Adaptación WA-2.3) (~5-7 días):
WhatsappWebhookProcessor v1.2 procesa ACCOUNT_VIOLATION, ACCOUNT_RESTRICTION, message_template_status_update (REJECTED, PAUSED, DISABLED) (con tenantId).
AccountHealthManagerService v1.1 reacciona a estos eventos críticos para el tenant.
SendWhatsAppMessageUseCase v1.1 valida plantillas (del tenant) pre-envío.
GAP: Depende de payloads de webhook de gestión.
Fase ST-3: Gestión Avanzada de Plantillas, Costos, UI Admin MVP (Tenant-Aware)
Sprint ST-3.1: Creación de Plantillas API (Tenant-Aware) (Adaptación WA-3.1) (~10-12 días):
WhatsAppAdminApiAdapter v2.0 con createMessageTemplate (tenant-aware).
ManageWhatsAppTemplateUseCase v1.0 (tenant-aware).
MessageTemplateRecord en DB del tenant.
GAP CRÍTICO: Estructura JSON completa para POST /{waba-id}/message_templates (todos los components.example).
Sprint ST-3.2: Cálculo de Costos (Tenant-Aware) (Adaptación WA-3.2) (~8-10 días):
CostCalculationService v1.0 (registra costos en DB del tenant, usa tarifas globales).
WhatsAppPricingRate (tabla global o en DB de plataforma), BilledUsage (en DB del tenant).
GAP: Tarjetas de Tarifas oficiales CBP y PMP.
Sprint ST-3.3: pwa-supervisor MVP - Salud WA y Costos (Tenant-Aware) (Adaptación WA-3.3) (~10-12 días):
Desarrollo de los widgets y páginas en pwa-supervisor que consumen los datos del tenant autenticado desde api-main.
Fase ST-4: Funcionalidades Avanzadas (Iterativo, Post-MVP)
Sprints ST-4.x:
Envío/Recepción de todos los tipos de Mensajes Interactivos y Flows (si es prioritario).
Implementación completa de la estrategia "DFS-Educa".
Refinamiento avanzado de AntiBanDecisionService (IA predictiva, rotación compleja).
Desarrollo de pwa-consultant MVP.
Desarrollo de admin-platform MVP (onboarding de tenants, gestión básica).
Fase ST-5: Optimización Continua y Escalado de Plataforma (Continuo)
Monitoreo de performance global y por tenant.
Optimización de costos de infraestructura.
Adaptación a cambios de API Meta.
Desarrollo de nuevas funcionalidades de la suite (portal-public-template, smart-contracts-flow, etc.).
PARTE VIII: GLOSARIO TÉCNICO DE ARTEFACTOS (Versión Final Consolidada)
(Aquí se incluiría la lista completa de artefactos de libs/core/, libs/application/, libs/infrastructure/, y apps/ con su ubicación, función principal, construcción/lógica clave, cuidados, relación con otros, y cualquier consideración SaaS/multi-tenant específica, siguiendo el formato del ejemplo detallado que hicimos para WhatsappOfficialApiAdapter.)
Puntos Clave para la IA Experta en NX:
Al generar librerías, usar --importPath para los alias (ej. @dfs-suite/core).
Usar --tags para la gobernanza de dependencias de Nx (ej. scope:core, scope:application, scope:infrastructure, type:util, type:feature, type:ui).
Configurar project.json de cada lib/app para que los targetDefaults (build, lint, test) se apliquen correctamente.
Asegurar que la configuración de PrismaService permita la instanciación dinámica de PrismaClient por tenantId.
La lógica dentro de los servicios y casos de uso en libs/application y libs/core no debe tener conocimiento directo de NestJS o Next.js, excepto por los decoradores de inyección para sus dependencias (puertos).
Este Blueprint Maestro v3.3 ahora está estructurado para guiar el desarrollo de una plataforma SaaS multi-tenant compleja, con un fuerte énfasis en el núcleo de WhatsApp y el sistema Anti-Ban. La granularidad del roadmap y la claridad en las responsabilidades de cada componente deberían facilitar el trabajo de la IA experta en Nx.
El éxito de la implementación temprana sigue dependiendo críticamente de obtener la información técnica oficial de Meta para los GAPs identificados.
