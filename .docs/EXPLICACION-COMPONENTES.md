Visión Holística de Integración y Flujos de Datos en dfs-invest-suite (v1.0)
Imaginemos el sistema como una ciudad digital con diferentes distritos (aplicaciones y librerías) conectados por autopistas (APIs y colas de mensajes).

1. El Núcleo (Las Leyes y la Lógica de la Ciudad): libs/core/ y libs/shared/
   libs/shared/ (Fundamentos Universales): Provee el "idioma" común (tipos como TenantId, Result, IApiResponse), las "herramientas básicas" (utilidades Guard, UuidUtils), las "normas de construcción" (schemas Zod) y las "señales de tráfico" (errores ExceptionBase). Todas las demás partes de la ciudad usan estos fundamentos.
   libs/core/domain/shared-kernel/ (Principios de Diseño Avanzados): Establece los "planos arquitectónicos" para las estructuras importantes de la ciudad (clases base Entity, AggregateRoot, ValueObject, interfaces para ICommand, IQuery, IRepositoryPort).
   libs/core/domain/<bounded-context>/ (Leyes Específicas por Distrito): Aquí reside la "constitución" y las "leyes específicas" de cada área de negocio (Tenancy, Leads, WhatsApp, Aiper, Portal). Define las reglas de negocio puras, las entidades (TenantEntity, LeadEntity, WhatsAppAccount) y los contratos (puertos como ITenantRepository) que deben cumplirse. Ejemplo de flujo interno: TenantEntity.activate() cambia el TenantStatusVO y añade un TenantActivatedEvent.
   libs/core/application/<bounded-context>/ (La Administración Pública): Implementa los "servicios públicos" (Casos de Uso como CreateTenantUseCase, SendWhatsAppMessageUseCase). No crea leyes, pero las aplica y orquesta. Recibe "solicitudes" (Comandos/Queries), interactúa con las entidades del dominio para ejecutar la lógica de negocio, y usa los puertos para solicitar servicios de infraestructura (como guardar datos). Ejemplo de flujo: CreateTenantUseCase recibe un CreateTenantCommand, crea una TenantEntity, llama a IDatabaseProvisioningServicePort.provisionTenantDatabase(), y luego a ITenantRepository.insert().
2. La Infraestructura de la Ciudad: libs/infrastructure/
   Función: Son las "empresas de servicios públicos" y las "carreteras" que conectan la ciudad con el mundo exterior. Implementan los contratos (puertos) definidos en core/.
   Adaptadores de Persistencia (ej. PrismaTenantRepository): Conectan con las bases de datos (PostgreSQL). El TenantPrismaService es clave aquí, actuando como un "conmutador" que dirige las operaciones a la base de datos correcta del tenant basándose en el TenantContext.
   Adaptadores de API Externas (ej. WhatsappOfficialApiAdapter): Se comunican con servicios externos (Meta, Google AI). Obtienen credenciales específicas del tenant (del ITenantConfigRepositoryPort, que a su vez usa la DB de plataforma) para actuar en nombre del tenant.
   Adaptadores de Colas (ej. WhatsappWebhookProcessor): Gestionan el flujo de "correo" y "paquetería" asíncrona (BullMQ sobre Redis). Los procesadores reciben trabajos que incluyen tenantId y establecen el TenantContext para que los Casos de Uso que llaman operen correctamente.
   Servicios de Utilidad (ej. AesEncryptionService): Proveen servicios técnicos como encriptación.
3. Las Interfaces de la Ciudad (Puntos de Acceso): apps/
   apps/api-main/ (El Ayuntamiento Central y la Oficina de Correos Principal):
   GraphQL/REST API: Es la "ventanilla de atención al público" principal. Recibe solicitudes de las PWAs.
   TenantContextMiddleware: El "guardia de seguridad" que identifica al tenantId y al userId a partir del JWT en cada solicitud. Establece este contexto para que todas las operaciones subsiguientes (Casos de Uso, repositorios) sepan para quién están trabajando.
   Resolvers/Controllers: Los "funcionarios" que reciben las solicitudes, las validan (usando DTOs y schemas de shared-validation-schemas), las transforman en Comandos/Queries y las envían a los Casos de Uso (libs/application/) apropiados. Luego formatean la respuesta (usando IApiResponse para REST).
   Webhooks (ej. WhatsappWebhookController): "Buzones de entrada" para sistemas externos. Validan la firma global, identifican al tenantId (ej. mapeando WABA ID a tenantId desde la DB de plataforma), y encolan el trabajo para procesamiento asíncrono por los workers (que luego establecerán el contexto del tenant).
   WebSockets (ej. NotificationsGateway): "Sistema de altavoces" que emite actualizaciones en tiempo real a las PWAs. Los clientes se suscriben a "canales" específicos de su tenant (ej. tenant:${tenantId}).
   apps/pwa-supervisor/ (La Oficina del Gerente del Distrito Tenant):
   Flujo de Login: El supervisor ingresa credenciales -> PWA envía a api-main -> api-main autentica (contra la DB del tenant), genera JWT (con userId, tenantId, role) y lo devuelve.
   Interacción: El supervisor realiza acciones (ver leads, configurar WhatsApp) -> PWA envía queries/mutations GraphQL a api-main (con el JWT) -> api-main procesa en el contexto del tenant.
   Actualizaciones en Tiempo Real: PWA escucha en su canal WebSocket (ej. tenant:tenant-dfs-001) para cambios de estado de mensajes, salud de números WA, etc.
   Personalización: Lee configuraciones de branding y de identidad Aiper (vía api-main desde la DB del tenant) para adaptar su propia apariencia y el comportamiento de Aiper.
   Gestión de Contenido Portal: Las acciones del supervisor para crear/editar contenido del portal-imoveis se envían a api-main, que actualiza los datos en la DB del tenant.
   apps/pwa-consultant/ (Puestos de Trabajo de los Empleados del Distrito Tenant - Futuro):
   Similar a pwa-supervisor pero con un scope funcional más limitado a la gestión de leads asignados y comunicación.
   apps/admin-platform/ (La Alcaldía Central de la Ciudad - Futuro):
   Interactúa con endpoints/resolvers especiales en api-main que operan a nivel de plataforma (ej. CreateTenantUseCase que interactúa con la DB de plataforma y el DatabaseProvisioningService).
   apps/portal-imoveis/ (Los Escaparates Públicos de cada Distrito Tenant - Futuro):
   Cuando un visitante accede a tenant-slug.portal.dfs-invest.com, el portal (aplicación Next.js) realiza queries públicas a api-main (pasando el tenant-slug o tenantId identificado).
   api-main recupera el contenido público (perfil, propiedades, configuración de apariencia) de la DB aislada de ese tenant y lo devuelve.
   Los formularios de captación de leads en el portal envían los datos a un endpoint en api-main que ya conoce (o deduce) el tenantId para crear el lead en la DB correcta.
   Flujos de Datos Clave (Ejemplos Tenant-Aware):
   Creación de un Tenant (desde admin-platform):
   admin-platform -> api-main (mutación platformCreateTenant)
   api-main (PlatformAdminResolver) -> CreateTenantUseCase (libs/application/tenancy/)
   CreateTenantUseCase:
   Crea TenantEntity (en memoria).
   Llama a ITenantRepository.insert(tenantEntity) (implementado por PrismaTenantRepository que escribe en DB de Plataforma).
   Llama a IDatabaseProvisioningServicePort.provisionTenantDatabase(tenantId) (implementado por un servicio en libs/infrastructure/ que crea una nueva DB para el Tenant y aplica migraciones).
   Obtiene DbConnectionConfigVO del provisionamiento.
   Llama a tenantEntity.setDatabaseConfiguration(dbConfigVO).
   Llama a ITenantConfigRepositoryPort.setDbConnectionString(tenantId, encryptedConnectionString) (que escribe en DB de Plataforma).
   (Futuro) Llama a ICreateTenantUserUseCase (que escribiría el primer admin en la DB del nuevo Tenant).
   Emite TenantCreatedEvent.
   Supervisor de Tenant A (tenant-A) ve sus Leads (desde pwa-supervisor):
   pwa-supervisor (con JWT de tenant-A) -> api-main (query listLeads)
   api-main (TenantContextMiddleware setea tenantId = "tenant-A")
   api-main (LeadsResolver) -> ListLeadsUseCase (libs/application/leads-flow/)
   ListLeadsUseCase (con tenantId = "tenant-A") -> ILeadRepositoryPort.findAllPaginated(tenantId, params)
   ILeadRepositoryPort (implementado por PrismaLeadRepository en libs/infrastructure/)
   PrismaLeadRepository:
   Usa TenantPrismaService para obtener un cliente Prisma conectado a la DB de tenant-A.
   Ejecuta la query en la tabla Leads de la DB de tenant-A.
   Devuelve los leads de tenant-A.
   Resultado viaja de vuelta a pwa-supervisor.
   Webhook de Nuevo Mensaje WhatsApp para Tenant B (tenant-B):
   Meta API -> api-main (WhatsappWebhookController)
   WhatsappWebhookController:
   Valida firma global.
   Extrae wabaId del payload.
   Llama a ITenantConfigRepositoryPort.findTenantByWabaId(wabaId) (consulta la DB de Plataforma) -> obtiene tenantId = "tenant-B".
   Encola job en WHATSAPP_WEBHOOK_QUEUE con { tenantId: "tenant-B", webhookPayload }.
   WhatsappWebhookProcessor (worker, libs/infrastructure/queue/):
   Recoge job. Extrae tenantId = "tenant-B".
   Establece TenantContextService.setTenantId("tenant-B").
   Emite IncomingWhatsAppMessageReceivedEvent({ tenantId: "tenant-B", ... }).
   IncomingMessageApplicationListener (libs/application/whatsapp/):
   Recibe evento. Usa tenantId = "tenant-B".
   Llama a ILeadRepositoryPort.findOrCreateLead(tenantId, contactDetails) (opera en DB de tenant-B).
   Llama a IMessageLogRepositoryPort.save(tenantId, messageLog) (opera en DB de tenant-B).
   (Si hay un usuario conectado de tenant-B) api-main (NotificationsGateway) emite evento WebSocket al room tenant:tenant-B.
