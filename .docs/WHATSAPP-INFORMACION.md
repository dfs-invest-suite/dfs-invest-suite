https://aistudio.google.com/app/prompts/15hDKywdfm0FtOjqbVhpvTHzavRg2WSrb iamdfsinvestimentos.dev3

Índice de Capacidades de Desarrollo WhatsApp Business Platform (Basado en Información Oficial de Meta Procesada)
Jerarquía:
I. Configuración y Gestión de la Cuenta/Activos (API de Administración y Portal Meta)
II. Envío de Mensajes (API de Nube - POST /{Phone-Number-ID}/messages)
III. Recepción de Mensajes y Eventos (Webhooks - objeto whatsapp_business_account)
IV. Funcionalidades Avanzadas y Específicas
I. Configuración y Gestión de la Cuenta/Activos
**A. Gestión de Cuentas de WhatsApp Business (WABA)**
    1.  Creación de WABA de Prueba:
        *   **Cubierto:** Se crea automáticamente al añadir producto WA a App Meta. (Fuente: "Empezar", "Get Started as a Solution Partner")
    2.  Creación de WABA Real (vía Panel de Apps):
        *   **Cubierto:** Al agregar un número de teléfono real desde "Configuración de la API". (Fuente: "Empezar (Cloud API) - Paso 5")
    3.  Obtener Detalles de la WABA (ej. `message_template_namespace`, `health_status`):
        *   Endpoint: `GET /{WABA_ID}?fields=...`
        *   **Cubierto Parcialmente:** Se conoce el endpoint para `health_status` y `message_template_namespace`. Faltan otros `fields` relevantes para la WABA.
    4.  Suscripción de App a Webhooks de WABA:
        *   Endpoint: `POST /{WABA_ID}/subscribed_apps`
        *   **Cubierto:** Documentado con request/response. (Fuente: "Webhooks for WhatsApp Business Accounts")

**B. Gestión de Números de Teléfono de Empresa**
    1.  Listar Números de Teléfono de una WABA:
        *   Endpoint: `GET /{WABA_ID}/phone_numbers`
        *   **Cubierto:** Devuelve `id`, `verified_name`, `display_phone_number`, `quality_rating`. Se puede ordenar y filtrar (beta). (Fuente: "Recuperar números de teléfono")
    2.  Obtener Detalles de un Número de Teléfono Específico:
        *   Endpoint: `GET /{PHONE_NUMBER_ID}?fields=...`
        *   **Cubierto:** Devuelve `code_verification_status`, `display_phone_number`, `id`, `quality_rating`, `verified_name`, `name_status`.
        *   **GAP:** Nombre exacto del `field` y estructura de respuesta para `messaging_limits` (Tier) y `throughput` (MPS).
    3.  Verificación de Propiedad de Número de Teléfono:
        *   `POST /{PHONE_NUMBER_ID}/request_code` (Params: `code_method`, `language/locale`).
        *   `POST /{PHONE_NUMBER_ID}/verify_code` (Param: `code`).
        *   **Cubierto:** Proceso y endpoints detallados.
    4.  Registro de Número para Uso con Cloud API:
        *   Endpoint: `POST /{PHONE_NUMBER_ID}/register`
        *   **Cubierto:** Params: `messaging_product: "whatsapp"`, `pin` (2FA), `data_localization_region?`. Lógica para migración desde On-Prem con `backup` object.
    5.  Anular Registro de Número de Cloud API:
        *   Endpoint: `POST /{PHONE_NUMBER_ID}/deregister`
        *   **Cubierto.**
    6.  Gestión de Perfil de Empresa del Número:
        *   `GET /{PHONE_NUMBER_ID}/whatsapp_business_profile?fields=...`
        *   `POST /{PHONE_NUMBER_ID}/whatsapp_business_profile` (Params: `about`, `address`, `description`, `email`, `websites`, `vertical`, `profile_picture_handle`).
        *   **Cubierto:** Endpoints y parámetros.
    7.  Configuración de Verificación en Dos Pasos (PIN):
        *   `POST /{PHONE_NUMBER_ID}` con body `{ pin: "..." }`.
        *   **Cubierto.**
    8.  Habilitar/Deshabilitar Comprobación de Cambio de Identidad:
        *   `POST /{PHONE_NUMBER_ID}/settings` con `user_identity_change: { enable_identity_key_check: true/false }`.
        *   **Cubierto.**

**C. Gestión de Plantillas de Mensajes (API de Administración)**
    1.  **Crear Plantilla de Mensaje:**
        *   Endpoint: `POST /{WABA_ID}/message_templates`
        *   `request body`: `name`, `language`, `category`, `components` (array de objetos).
        *   **Cubierto Parcialmente (GAP CRÍTICO PERSISTE):**
            *   **CUBIERTO:** Estructura general. `components` para `HEADER` tipo `TEXT` (con `example.header_text`), `BODY` (con `example.body_text`), `FOOTER` (texto simple), `BUTTONS` de tipo `QUICK_REPLY` y `URL` (con `example` para variable en URL).
            *   **CUBIERTO (Inferencia Fuerte de Ejemplos):** `components` para `HEADER` tipo `IMAGE` usa `example: { header_handle: ["ID_MEDIA_EJEMPLO"] }`.
            *   **GAP:** La estructura JSON exacta y oficial dentro de `components` (y sus `example`) al *crear* para:
                *   `HEADER` con `format: "VIDEO" | "DOCUMENT" | "LOCATION"`.
                *   `BUTTONS` de tipo `OTP`, `FLOW`, `MPM`, `CATALOG`, `COPY_CODE`.
    2.  Listar Plantillas de una WABA:
        *   Endpoint: `GET /{WABA_ID}/message_templates`
        *   **Cubierto:** Con filtros (`category`, `status`, `name`, etc.) y paginación. Respuesta incluye `components`.
    3.  Leer una Plantilla Específica:
        *   Endpoint: `GET /{WHATSAPP_MESSAGE_TEMPLATE_ID}`
        *   **Cubierto:** Devuelve todos los campos, incluyendo `components`, `status`, `quality_score`.
    4.  Actualizar una Plantilla:
        *   Endpoint: `POST /{WHATSAPP_MESSAGE_TEMPLATE_ID}`
        *   **Cubierto:** Se puede actualizar `category` (si no aprobada), `components`, `message_send_ttl_seconds`, `parameter_format`.
    5.  Eliminar una Plantilla:
        *   Endpoint: `DELETE /{WABA_ID}/message_templates` (con `name` o `hsm_id`+`name`).
        *   **Cubierto.**
    6.  Crear Plantillas desde la Biblioteca de Meta:
        *   `GET /message_template_library` (para buscar).
        *   `POST /{WABA_ID}/message_templates` (con `library_template_name`, `library_template_button_inputs`).
        *   **Cubierto.**

**D. Gestión de Media (API de Nube)**
    1.  Subir Media: `POST /{Phone-Number-ID}/media` (Params: `file`, `type`, `messaging_product`). **Cubierto.**
    2.  Obtener URL de Media: `GET /{Media-ID}`. **Cubierto.**
    3.  Eliminar Media: `DELETE /{Media-ID}`. **Cubierto.**
    4.  Descargar Media: `GET /{Media-URL}` (con token). **Cubierto.**
Use code with caution.
II. Envío de Mensajes (API de Nube - POST /{Phone-Number-ID}/messages)
* Payload Base: { messaging_product: "whatsapp", to, recipient_type?, type, context?, ... }. Cubierto.
* A. Mensajes de Texto:
* text: { preview_url?, body }. Cubierto.
* B. Mensajes Multimedia (Imagen, Audio, Video, Documento, Sticker):
* image|audio|...: { id?, link?, caption?, filename? }. Cubierto.
* C. Mensajes de Contacto:
* contacts: [{ name: {}, phones: [{}], emails: [{}], ... }]. Cubierto.
* D. Mensajes de Ubicación:
* location: { latitude, longitude, name?, address? }. Cubierto.
* E. Mensajes Interactivos (No de Plantilla):
* Botones de Respuesta: interactive: { type: "button", header?, body, footer?, action: { buttons: [{ type: "reply", reply: { id, title } }] } }. Cubierto.
* Listas: interactive: { type: "list", header?, body, footer?, action: { button: "...", sections: [{ title?, rows: [{id, title, description?}] }] } }. Cubierto.
* Botones de URL (CTA URL): interactive: { type: "cta_url", ..., action: { name: "cta_url", parameters: { display_text, url } } }. Cubierto.
* Solicitud de Ubicación: interactive: { type: "location_request_message", body, action: { name: "send_location" } }. Cubierto.
* Flows: interactive: { type: "flow", ..., action: { name: "flow", parameters: { flow_id|flow_name, ...} } }. Cubierto.
* Mensajes de Producto Único/Múltiple/Catálogo:
* interactive: { type: "product", body?, footer?, action: { catalog_id, product_retailer_id } }.
* interactive: { type: "product_list", header, body, footer?, action: { catalog_id, sections: [{title?, product_items: [{product_retailer_id}] }] } }.
* interactive: { type: "catalog_message", body, action: { name: "catalog_message", parameters: { thumbnail_product_retailer_id } } }.
* Cubierto.
* F. Mensajes de Plantilla:
* template: { name, language: { code }, components?: [...] }.
* components: Array de objetos para pasar los VALORES de las variables:
* type: "header" | "body" | "footer" | "button".
* parameters: [{ type: "text"|"currency"|"date_time"|"image"|"video"|"document"|"location"|"payload"|"action", ... }].
* sub_type e index para type: "button".
* Cubierto en gran medida (Texto, Media Header, QR, URL simple, Localización Header, OTP, MPM, Carrusel, Oferta Limitada, Catálogo).
* GAP Menor: Confirmación para botones URL con múltiples variables en la URL o variables en el text del botón.
* G. Mensajes de Reacción:
* reaction: { message_id, emoji }. Cubierto.
* H. Marcar Mensajes como Leídos:
* status: "read", message_id. Cubierto.
* I. Indicadores de Escritura:
* status: "read", message_id, typing_indicator: { type: "text" }. Cubierto.
III. Recepción de Mensajes y Eventos (Webhooks - objeto whatsapp_business_account)
* Estructura General del Webhook: Confirmada.
* Validación de Firma: Técnica entendida (usar rawBody y App Secret). GAP Menor: Ejemplo oficial Node.js.
* A. field: "messages" (Payloads de value):
* Mensajes Entrantes: Texto, Reacción, Multimedia (Imagen, Sticker), Desconocido, Ubicación, Contacto, Respuesta Botón QR Plantilla, Respuesta Lista, Respuesta Botón Interactivo, CTWA, Consulta Producto, Pedido, Sistema (Cambio Número).
* Cubierto en Detalle: Los ejemplos son exhaustivos.
* Actualizaciones de Estado Mensajes Salientes: sent, delivered, read, failed (con errors, conversation, pricing).
* Cubierto en Detalle.
* B. field de Gestión (Payloads de value):
* message_template_status_update: (Ejemplo de pywa, necesita oficial).
* message_template_quality_update: (Ejemplo de pywa, necesita oficial).
* phone_number_name_update: (Ejemplo oficial provisto). Cubierto.
* phone_number_quality_update: (Ejemplo de pywa, necesita oficial).
* account_update: (Ejemplos de ACCOUNT_VIOLATION y ACCOUNT_RESTRICTION provistos, ejemplo pywa para CapabilityUpdate). GAP: Estructura oficial completa para todos los event (ej. BUSINESS_CAPABILITY_UPDATE).
* account_review_update: (Ejemplo de pywa, necesita oficial).
* user_preferences: (Ejemplo oficial provisto). Cubierto.
* account_alerts: (Listado como campo, payload desconocido). GAP.
* flows (para estado/rendimiento de Flows): Cubierto en Detalle.
IV. Funcionalidades Avanzadas y Específicas
*   **A. WhatsApp Flows (Gestión y Envío):**
    *   API de Administración para CRUD de Flows (`flow_json`). **Cubierto.**
    *   Envío de Flows (como mensaje interactivo o botón de plantilla). **Cubierto.**
    *   Recepción de respuestas de Flow (webhook `nfm_reply`). **Cubierto.**
    *   Webhooks de estado/rendimiento de Flows (`field: "flows"`). **Cubierto.**
    *   Seguridad de Endpoint de Flow (cifrado payload, validación firma). **Cubierto (con ejemplos de código).**
*   **B. Comprobación de Cambio de Identidad del Usuario:**
    *   Habilitación y uso. **Cubierto.**
*   **C. Métricas y Analíticas (API de Administración):**
    *   `analytics` (mensajes), `conversation_analytics` (conversaciones - obsoleto futuro), `template_analytics`, `pricing_analytics`.
    *   **Cubierto (a nivel de qué se puede obtener).**
Use code with caution.
Conclusión de la Revisión:
Hemos cubierto una gran cantidad de funcionalidades y sus detalles técnicos para interactuar con la API de WhatsApp.
GAPs CRÍTICOS que AÚN NECESITAN INFORMACIÓN OFICIAL DETALLADA de Meta:
API DE ADMINISTRACIÓN - CREACIÓN DE PLANTILLAS (POST /{waba-id}/message_templates):
La estructura JSON EXACTA para el array components al DEFINIR la plantilla, cubriendo TODOS los tipos de HEADER (especialmente VIDEO, DOCUMENT, LOCATION y sus example.header_handle/url/location_data) y TODOS los tipos de BUTTONS (especialmente OTP, FLOW, MPM, CATALOG y cómo se definen sus parameters o action y los example para variables).
Ejemplo de lo que se busca para un botón OTP en la creación:
// DENTRO DE components[type="BUTTONS"].buttons[]
{
  "type": "OTP", // ¿O es "URL" con un formato especial?
  "text": "Copiar Código {{1}}", // Texto del botón
  "otp_type": "COPY_CODE", // o "ONE_TAP_AUTOFIL"
  // ¿"url": "ALGUNA_URL_PREDEFINIDA_O_PLACEHOLDER_PARA_OTP?",
  // ¿"autofill_text_content": "{{1}}" o algo así para el placeholder del OTP?
  "example": ["123456"] // Ejemplo para el OTP
}
Use code with caution.
Json
WEBHOOKS - PAYLOADS JSON COMPLETOS (objeto value) PARA CAMPOS DE GESTIÓN NO messages NI flows:
account_update: Necesito la estructura de value para el event: "BUSINESS_CAPABILITY_UPDATE" (cómo se ven los nuevos límites). Y confirmación oficial de la estructura completa para violation_info y restriction_info.
message_template_quality_update: Estructura oficial de value (ej. new_quality_score es string "GREEN" o un objeto?).
phone_number_quality_update: Estructura oficial de value.
account_review_update, account_alerts.
API DE ADMINISTRACIÓN - CONSULTA DE NÚMEROS (GET /{phone-number-id}):
El nombre oficial del field para solicitar los messaging_limits (Tier) y el throughput (MPS), y la estructura JSON de su respuesta.
Ejemplo de lo que se busca para throughput: {"throughput": {"level": "HIGH", "messages_per_second": 80}} (esto es una suposición).

---
Índice Detallado y Granular de Contenidos de la Plataforma WhatsApp Business para el Desarrollo de dfs-invest-suite (Basado en Información Oficial de Meta Procesada)
1. Fundamentos de la Plataforma WhatsApp Business (PWB) para dfs-invest-suite
1.1. Ecosistema de Productos WhatsApp: App Consumidor, App Business, Plataforma Business (PWB).
1.2. PWB: Propósito y Arquitectura para Empresas (Comunicación a escala).
1.3. Componentes Centrales de la PWB y su Uso en dfs-invest-suite:
1.3.1. API de Nube (Cloud API): Alojada por Meta.
* Protocolo HTTP (API Graph).
* Control de Versiones API Graph.
* Volumen y Rendimiento (MPS, Límites de Frecuencia de Emparejamiento).
* Escalabilidad y Fiabilidad (gestionada por Meta).
* Seguridad y Cifrado (Protocolo Signal, NO E2E con Cloud API).
1.3.2. API de Administración de WhatsApp Business (WABA Management API):
* Integrada en API Graph.
* Propósito: Gestión de WABAs, Números, Plantillas, Perfiles.
1.3.3. (API Local On-Premises: Obsoleta - EOL Oct 2025. No aplica a dfs-invest-suite).
1.3.4. (API Marketing Messages Lite: Mencionada, pero dfs-invest-suite usará Cloud API estándar para todos los tipos).
2. Gestión de Activos y Configuración Inicial por Tenant
2.1. Meta Business Manager (MBM) del Tenant:
* Rol del tenant en la gestión de su MBM.
* Vinculación de la App Meta de dfs-invest-suite (para permisos y webhooks).
2.2. Cuenta de WhatsApp Business (WABA) del Tenant:
* Proceso de creación/vinculación por el tenant.
* Almacenamiento del WABA_ID del tenant en dfs-invest-suite.
* Tipos de Cuenta: Empresarial (default) vs. Oficial (OBA - con checkmark azul).
* Requisitos para OBA: Verificación Empresa, Notabilidad, 2FA. Proceso de solicitud.
* Verificación de la Empresa (Business Verification) del Tenant:
* Proceso e importancia para escalar límites y habilitar funciones.
* Compartir WABA (Modelo de Intercambio, no OBO).
* Administrador de WhatsApp (WAM): Uso por el tenant para gestión manual y visualización.
* Limitaciones de WABA (plantillas, números por WABA - hasta 20 WABAs por BM).
2.3. Tokens de Acceso (Específicos del Tenant):
* Tipo Requerido: Token de Acceso de Usuario del Sistema (System User Access Token).
* Generación por el tenant en su MBM, vinculado a la App Meta de dfs-invest-suite.
* Permisos Necesarios: whatsapp_business_management y whatsapp_business_messaging (con Acceso Avanzado post App Review).
* Almacenamiento seguro y encriptado en dfs-invest-suite (asociado al tenantId).
* Uso en cabeceras Authorization: Bearer <TOKEN> para todas las llamadas API.
2.4. Configuración Inicial del Producto WhatsApp en la App Meta de dfs-invest-suite:
* Creación de App Meta de tipo "Empresa".
* Adición del producto WhatsApp.
* Generación automática de WABA de prueba y Número de teléfono de prueba (para desarrollo/testing de dfs-invest-suite).
* Obtención del App Secret de la App Meta (para validación de firma de webhooks).
* Configuración del Endpoint de Webhook global de dfs-invest-suite.
3. Gestión de Números de Teléfono de Empresa (por Tenant)
3.1. Requisitos del Número de Teléfono del Tenant: Propiedad, código país/área, capacidad SMS/voz, no en uso en App personal/Business.
3.2. Obtención de IDs de Números de Teléfono:
* Endpoint API Admin: GET /{WABA_ID_TENANT}/phone_numbers
* Respuesta: id (Phone Number ID), verified_name, display_phone_number, quality_rating.
3.3. Verificación de Propiedad de Números (vía API Admin):
* Endpoint: POST /{PHONE_NUMBER_ID_TENANT}/request_code (Params: code_method, language).
* Endpoint: POST /{PHONE_NUMBER_ID_TENANT}/verify_code (Param: code).
3.4. Registro de Número para Cloud API (vía Cloud API):
* Endpoint: POST /{PHONE_NUMBER_ID_TENANT}/register
* Params: messaging_product: "whatsapp", pin (2FA), data_localization_region?.
* Lógica de migración desde On-Prem con objeto backup.
3.5. Anular Registro de Número de Cloud API (vía Cloud API):
* Endpoint: POST /{PHONE_NUMBER_ID_TENANT}/deregister.
3.6. Gestión del Nombre para Mostrar (display_name):
* Configuración por el tenant (WAM o Panel de Apps).
* Proceso de revisión y aprobación por Meta (post Verificación Empresa).
* Estados name_status: APPROVED, PENDING_REVIEW, DECLINED, NONE, AVAILABLE_WITHOUT_REVIEW.
* Notificación de cambios vía webhook phone_number_name_update.
3.7. Calificación de Calidad del Número (quality_rating):
* Valores: "GREEN", "YELLOW", "RED", "NA", "UNKNOWN".
* Basada en feedback de usuarios (bloqueos, reportes).
* Visualización: WAM del tenant, o GET /{PHONE_NUMBER_ID_TENANT} (campo quality_rating).
* Impacto: En límites de mensajes y estado del número ("Conectado", "Marcado", "Restringido").
* Supervisión: Webhook phone_number_quality_update.
3.8. Límites de Mensajes (Messaging Tiers):
* Definición: Máximo de conversaciones iniciadas por empresa/24h.
* Niveles: TIER_0 (250 sin Verificación Empresa, o 1K con Verificación Empresa inicial), TIER_1 (1K), TIER_2 (10K), TIER_3 (100K), TIER_4 (Ilimitado).
* Aumento a 1K: Vía Verificación Empresa o volumen/calidad.
* Aumento Automático (post-1K): Basado en estado conectado, calidad Media/Alta, y volumen de envío (mitad del límite actual en 7 días). Aumento toma 24h.
* Reducción: Inmediata si calidad baja ("Marcado") en últimos 7 días.
* Supervisión: WAM Insights del tenant, Webhook business_capability_update (dentro de account_update).
* Consulta API Admin: GAP - Campo exacto en GET /{PHONE_NUMBER_ID} para obtener Tier/límite.
3.9. Gestión de Perfil de Empresa del Número (API Admin):
* GET /{PHONE_NUMBER_ID_TENANT}/whatsapp_business_profile?fields=...
* POST /{PHONE_NUMBER_ID_TENANT}/whatsapp_business_profile (Params: about, address, etc.).
3.10. Comprobación de Cambio de Identidad (Cloud API):
* Habilitar: POST /{PHONE_NUMBER_ID_TENANT}/settings con user_identity_change.
* Envío con recipient_identity_key_hash. Webhook de error 137000.
4. Plantillas de Mensajes (Gestión por Tenant)
4.1. Definición y Uso: Para iniciar conversaciones o post-24h. Requieren aprobación Meta.
4.2. Creación de Plantillas (vía API Admin - POST /{WABA_ID_TENANT}/message_templates):
* request body Detallado:
* name, language, category (MARKETING, UTILITY, AUTHENTICATION).
* components: Array de objetos.
* type: "HEADER" | "BODY" | "FOOTER" | "BUTTONS".
* Para HEADER: format (TEXT, IMAGE, VIDEO, DOCUMENT, LOCATION), text (con {{n}}), example: { header_text: ["..."] } O example: { header_handle: ["MEDIA_ID_EJEMPLO"] } (para media). GAP: example para VIDEO, DOCUMENT, LOCATION en header.
* Para BODY: text (con {{n}}), example: { body_text: [["var1_ej1", "var2_ej1"], ...] }.
* Para FOOTER: text.
* Para BUTTONS: buttons: [{ type: "QUICK_REPLY", text }, { type: "URL", text, url("...{{1}}..."), example: ["var_url_ej"] }, { type: "PHONE_NUMBER", text, phone_number }].
* GAP: Estructura JSON exacta en buttons para type: "OTP", type: "FLOW", type: "MPM", type: "CATALOG", type: "COPY_CODE" durante la CREACIÓN.
* parameter_format (NAMED o POSITIONAL).
* message_send_ttl_seconds.
4.3. Proceso de Aprobación: Hasta 24h. Notificación vía WAM, email, webhook message_template_status_update.
4.4. Estados de Plantilla: APPROVED, PENDING, REJECTED, PAUSED, DISABLED, etc.
4.5. Calificación de Calidad de Plantilla: GREEN, YELLOW, RED, UNKNOWN. Supervisión vía WAM o webhook message_template_quality_update.
4.6. Frecuencia de Plantillas (Throttling): Aplica a Mkt/Util nuevas o de baja calidad.
4.7. Listar/Leer/Actualizar/Eliminar Plantillas (vía API Admin): Endpoints y parámetros detallados.
4.8. Creación desde Biblioteca de Meta (vía API Admin): Uso de library_template_name.
5. Envío de Mensajes (API de Nube - POST /{PHONE_NUMBER_ID_TENANT}/messages)
5.1. Payload Base: messaging_product, to, type, context?, recipient_identity_key_hash?.
5.2. Payloads Específicos por type (Texto, Multimedia, Contacto, Ubicación, Reacción, Interactivos, Plantilla):
* Cobertura: Muy alta gracias a la documentación y ejemplos. Estructuras para cada tipo de mensaje y sus objetos internos (text, image, template.components.parameters, interactive.action, etc.) están bien definidas.
5.3. Respuesta Síncrona de la API: { messages:[{id: "WAMID", message_status?}] }.
5.4. Manejo de Errores Síncronos: Códigos de error API Graph (lista provista).
5.5. Indicadores de Escritura y Marcar como Leído: Payloads específicos.
6. Webhooks (Recepción y Procesamiento por Tenant)
6.1. Configuración del Endpoint Global y Verificación GET: Cubierto.
6.2. Validación de Firma POST (HMAC-SHA256): Técnica entendida, ejemplos Node.js vistos.
6.3. Procesamiento del field: "messages" (para el Tenant identificado):
* Mensajes Entrantes: Todos los tipos (text, image, reaction, interactive con button_reply/list_reply/nfm_reply, system, etc.). Payloads detallados.
* Actualizaciones de Estado: sent, delivered, read, failed. Payloads detallados (incluyendo conversation, pricing, errors).
6.4. Procesamiento de field de Gestión (para el Tenant identificado):
* message_template_status_update: (Payload value necesita detalle oficial).
* message_template_quality_update: (Payload value necesita detalle oficial).
* phone_number_name_update: (Payload value oficial provisto).
* phone_number_quality_update: (Payload value necesita detalle oficial).
* account_update: (Payload value para cada event necesita detalle oficial, esp. BUSINESS_CAPABILITY_UPDATE).
* user_preferences: (Payload value oficial provisto).
* flows (estado/rendimiento de Flows): (Payloads value detallados provistos).
* GAP CRÍTICO: Payloads JSON oficiales para el objeto value de estos campos.
7. Modelo de Precios (CBP y Transición a PMP)
7.1. Entendimiento de CBP, categorías de conversación, ventana de servicio, puntos de acceso gratuitos.
7.2. Entendimiento de PMP, cobro por mensaje de plantilla, gratuidad de utilidad en CSW.
7.3. Cambios en Webhook pricing object (pricing_model: "PMP", nuevo campo type).
7.4. GAP: Tarjetas de Tarifas oficiales completas para Cloud API estándar (CBP y PMP).
8. Políticas y Cumplimiento (Aplicación Práctica por Tenant)
8.1. Gestión de Opt-In (responsabilidad del Tenant, facilitado por la suite).
8.2. Cumplimiento de contenido y comercio (plantillas, no pedir datos sensibles).
8.3. Detección de infracciones por Meta (basada en reportes, perfil, patrones).
9. Funcionalidades Avanzadas (Potencial para dfs-invest-suite)
9.1. WhatsApp Flows (Gestión y Envío):
* API de Admin para CRUD de Flows (flow_json).
* Seguridad de Endpoint de Flow (cifrado, validación firma).
9.2. Componentes Conversacionales (WAM o API POST /{phone-number-id}/conversational_automation):
* Mensajes de Bienvenida (request_welcome webhook).
* Disparadores de Conversación (texto de usuario en webhook).
* Comandos (texto de usuario en webhook).
9.3. Bloqueo de Usuarios (API Admin /{phone-number-id}/block_users).
Este índice granular, basado en la información oficial de Meta, nos da una hoja de ruta clara para el desarrollo de la funcionalidad de WhatsApp y Anti-Ban en dfs-invest-suite. Los GAPs identificados son ahora muy específicos y se centran en obtener las especificaciones JSON finales para la creación de todos los tipos de componentes de plantillas y los payloads de los webhooks de gestión no cubiertos.
---
Este será un manual de desarrollo conceptual para la IA experta en Nx, explicando qué artefactos crear, qué lógica implementar y cómo se relaciona con la información oficial de Meta, enfocándonos en establecer las bases para la interacción con WhatsApp y el sistema Anti-Ban dentro de la arquitectura SaaS multi-tenant.
Blueprint Maestro v3.3: DFS-Invest-Suite - Guía de Implementación Hipergranular para IA Experta en Nx
PARTE II: DISEÑO DETALLADO DEL DOMINIO, APLICACIÓN E INFRAESTRUCTURA (Continuación)
(Reinicio de la numeración para claridad del manual de desarrollo por sección del Índice)
SECCIÓN 1: FUNDAMENTOS DE LA PLATAFORMA WHATSAPP BUSINESS (PWB) Y CONFIGURACIÓN INICIAL PARA dfs-invest-suite
Objetivo de esta Sección: Establecer la comprensión fundamental de la PWB y configurar los elementos básicos en dfs-invest-suite para permitir la interacción inicial con las APIs de Meta en un contexto multi-tenant. Esta sección sienta las bases para todos los desarrollos posteriores de WhatsApp y Anti-Ban.
Punto 1.1 del Índice: Ecosistema de Productos WhatsApp
Concepto Meta: WhatsApp ofrece WhatsApp Messenger (consumidor), Aplicación WhatsApp Business (pequeña empresa), y la Plataforma WhatsApp Business (PWB) (medianas/grandes empresas vía API).
Acción IA Nx (Documentación Interna):
Crear una sección en docs/guides/whatsapp-platform-overview.md que resuma brevemente estos tres productos, destacando por qué dfs-invest-suite se enfoca exclusivamente en la PWB.
Justificación: Para que cualquier desarrollador que se incorpore al proyecto entienda el contexto y el porqué de la elección tecnológica.
Punto 1.2 del Índice: PWB - Propósito y Arquitectura para Empresas
Concepto Meta: La PWB está diseñada para comunicación a escala, programática, permitiendo la integración con sistemas empresariales (CRM, Marketing, etc.) y el uso de automatización.
Acción IA Nx (Documentación Interna):
Expandir docs/guides/whatsapp-platform-overview.md para incluir los casos de uso típicos de la PWB (notificaciones, atención al cliente, marketing conversacional) y cómo dfs-invest-suite pretende aprovecharlos para sus tenants.
Incluir un diagrama de alto nivel de cómo dfs-invest-suite actúa como intermediario entre los tenants y la PWB.
Punto 1.3 del Índice: Componentes Centrales de la PWB y su Uso en dfs-invest-suite
**1.3.1. API de Nube (Cloud API): Alojada por Meta**
    *   **Concepto Meta:** API basada en HTTP (API Graph) para enviar y recibir mensajes, alojada y escalada por Meta. Es la opción preferida y la que `dfs-invest-suite` utilizará.
    *   **Protocolo HTTP y API Graph:** Todas las interacciones con la Cloud API son requests HTTP (GET, POST, DELETE) a endpoints de `graph.facebook.com`. Se requiere un `Authorization: Bearer <ACCESS_TOKEN>` en las cabeceras. Los cuerpos de solicitud y respuesta son JSON.
    *   **Control de Versiones:** Las URLs de la API incluyen un número de versión (ej. `v19.0`). `dfs-invest-suite` debe usar una variable de entorno (`WHATSAPP_API_VERSION`) para esto, facilitando actualizaciones.
    *   **Volumen y Rendimiento:** Meta especifica límites de mensajes por segundo (MPS) por número y límites de frecuencia de emparejamiento (mensajes al mismo destinatario). El diseño de `AntiBanDecisionService` y `RedisRateLimiterAdapter` debe considerar estos límites.
    *   **Seguridad y Cifrado:** Aunque los mensajes usan el protocolo Signal en tránsito, Meta declara que la Cloud API **no es E2E en el sentido tradicional** ya que Meta (como host de la API) necesita acceso a las claves para procesar los mensajes en nombre de la empresa. Nuestro sistema debe proteger los tokens de acceso y el App Secret.
    *   **Acción IA Nx (Diseño/Documentación):**
        *   En `libs/infrastructure/whatsapp-cloud-api/README.md`, documentar estos principios.
        *   Asegurar que el `WhatsappOfficialApiAdapter` utilice la URL base y la versión de API desde `ConfigService`.

**1.3.2. API de Administración de WhatsApp Business (WABA Management API)**
    *   **Concepto Meta:** Conjunto de endpoints de la API Graph para gestionar programáticamente los activos de una WABA (Números, Plantillas, Perfil de Empresa, Webhooks).
    *   **Acción IA Nx (Diseño/Documentación):**
        *   En `libs/infrastructure/whatsapp-admin-api/README.md`, documentar su propósito.
        *   El `WhatsAppAdminApiAdapter` será el principal consumidor de estos endpoints.

**1.3.3. (API Local On-Premises):**
    *   **Acción IA Nx (Documentación Interna):** Mencionar brevemente en `docs/guides/whatsapp-platform-overview.md` que está obsoleta (EOL Oct 2025) y por qué `dfs-invest-suite` NO la utiliza.

**1.3.4. (API Marketing Messages Lite):**
    *   **Acción IA Nx (Documentación Interna):** Mencionar como un producto de Meta para marketing específico, pero aclarar que `dfs-invest-suite` se centrará en la Cloud API estándar para unificar todos los tipos de comunicación (Mkt, Util, Auth). Guardar la tabla de precios de MM Lite como referencia comparativa.
Use code with caution.
(Continuará con el Punto 2 del Índice: Gestión de Activos y Configuración Inicial por Tenant en el próximo prompt).
---
SECCIÓN 2: GESTIÓN DE ACTIVOS Y CONFIGURACIÓN INICIAL POR TENANT (Plataforma WhatsApp Business)
Objetivo de esta Sección: Definir cómo dfs-invest-suite gestionará y se integrará con los activos de WhatsApp Business específicos de cada tenant, y cómo se realizará la configuración inicial para habilitar la comunicación vía WhatsApp para un nuevo tenant. Esta sección es fundamental para la arquitectura SaaS multi-tenant.
Punto 2.1 del Índice: Activos Comerciales Requeridos del Tenant y Rol de dfs-invest-suite
Concepto Meta: Para usar la PWB, cada empresa (nuestro tenant) necesita un Meta Business Manager (MBM), una Cuenta de WhatsApp Business (WABA) dentro de ese MBM, y al menos un Número de Teléfono de Empresa verificado y registrado para la Cloud API.
Rol de dfs-invest-suite: Nuestra plataforma NO crea ni gestiona directamente el MBM del tenant. El tenant es dueño y responsable de su MBM y WABA. dfs-invest-suite actúa como una aplicación que el tenant autoriza para operar sobre su WABA mediante un Token de Usuario del Sistema.
Acción IA Nx (Dominio tenancy y Aplicación tenancy):
Entidad Tenant (libs/core/src/tenancy/entities/tenant.entity.ts): Debe tener campos para almacenar los identificadores clave del tenant relacionados con WhatsApp, que serán proporcionados por el tenant durante el onboarding:
wabaId: string | null (ID de su Cuenta de WhatsApp Business).
whatsappApiTokenEncrypted: string | null (El Token de Usuario del Sistema que el tenant genera y nos provee, encriptado en nuestra DB de plataforma).
defaultPhoneNumberIdForSending: string | null (El Phone Number ID que el tenant designa como predeterminado, opcional).
isWhatsAppConfigured: boolean (Flag que indica si el tenant ha completado la configuración de WA en la suite).
Puerto ITenantConfigRepositoryPort (libs/core/src/tenancy/ports/):
Método getWhatsAppApiCredentials(tenantId: string): Promise<{ wabaId: string; apiToken: string; defaultPhoneNumberId?: string } | null> (devuelve token desencriptado).
Método setWhatsAppApiCredentials(tenantId: string, creds: { wabaId: string; apiToken: string; defaultPhoneNumberId?: string }): Promise<void> (encripta token antes de guardar).
Caso de Uso SetTenantWhatsAppConfigUseCase (libs/application/src/tenancy/use-cases/):
Input: { tenantId, wabaId, apiToken, defaultPhoneNumberId?, phoneNumbersToRegisterInSuite?: Array<{id: string, displayNumber: string}> }.
Lógica:
Valida tenantId, wabaId, apiToken.
Llama a tenantConfigRepo.setWhatsAppApiCredentials(...) para guardar el token encriptado.
Para cada phoneNumberId en phoneNumbersToRegisterInSuite:
Verifica si ya existe una entidad WhatsAppAccount para este phoneNumberId en la DB del tenant (vía IWhatsAppAccountRepositoryPort contextualizado).
Si no existe, crea una nueva WhatsAppAccount con operationalStatus: PENDING_SETUP o IN_WARMUP.
Llama a IWhatsAppAdminPort.subscribeAppToWabaEvents(tenantId, wabaId, apiToken) para asegurar que nuestro endpoint de webhook global reciba eventos de la WABA de este tenant.
Actualiza Tenant.isWhatsAppConfigured = true.
UI (apps/pwa-supervisor o apps/admin-platform - para el admin del tenant): Interfaz para que el administrador del tenant ingrese su WABA_ID, su Token de Usuario del Sistema de WA, y los PHONE_NUMBER_IDs que quiere usar con la suite. Esta UI llamará al SetTenantWhatsAppConfigUseCase.
Punto 2.2 del Índice: Meta Business Manager (MBM) del Tenant
Acción IA Nx (Documentación para Tenants):
Crear una guía en docs/tenant-onboarding/whatsapp-setup.md que explique al tenant:
La necesidad de tener un MBM.
Cómo realizar la Verificación de su Empresa (Business Verification) en su MBM (enlazando a la ayuda de Meta).
Cómo crear/acceder a su WABA.
Crucial: Cómo generar un Token de Usuario del Sistema de larga duración, asignándole NUESTRA App Meta (la que tiene el endpoint de webhook) y los permisos whatsapp_business_management y whatsapp_business_messaging. (Este es el token que ingresarán en dfs-invest-suite).
Punto 2.3 del Índice: Cuenta de WhatsApp Business (WABA) del Tenant
Tipos de Cuenta:
Empresarial (Default).
Empresarial Oficial (OBA - con checkmark azul): El tenant debe solicitarla en su WAM si cumple los requisitos (Verificación Empresa, Notabilidad, 2FA).
dfs-invest-suite y OBA: Nuestra plataforma funcionará igual con ambos tipos. Si el tenant obtiene OBA, el nombre verificado y el checkmark aparecerán automáticamente.
Acción IA Nx (Dominio anti-ban y Aplicación anti-ban):
Entidad WhatsAppAccount (libs/core/src/anti-ban/entities/): Añadir campo isOfficiallyVerified: boolean.
AccountHealthManagerService o SyncWhatsAppAssetsUseCase (libs/application/src/anti-ban/): Al sincronizar datos del número (GET /{PHONE_NUMBER_ID}?fields=is_official_business_account), actualizar este flag.
Administrador de WhatsApp (WAM):
Los tenants seguirán teniendo acceso a su WAM para gestión manual. dfs-invest-suite busca automatizar y optimizar, pero no reemplazar completamente el WAM para todas las funciones (ej. apelaciones de plantillas complejas).
Punto 2.4 del Índice: Tokens de Acceso (Específicos del Tenant) - Implementación Segura
Generación: Como se describió, por el tenant en su MBM.
Almacenamiento en dfs-invest-suite:
En la base de datos de plataforma (tabla TenantConfigs o campos en Tenant), el campo whatsappApiTokenEncrypted DEBE almacenar el token encriptado.
IEncryptionServicePort y su implementación AesEncryptionService (libs/infrastructure/security/):
Usará una Clave Maestra de Encriptación de Plataforma (PMEK). Esta PMEK es un secreto de máximo nivel para dfs-invest-suite, gestionado de forma segura (ej. variable de entorno inyectada solo en el servicio de encriptación, o desde un Vault).
Métodos: encrypt(plaintext): Promise<string> (devuelve texto cifrado, ej. base64), decrypt(ciphertext): Promise<string>.
Uso:
Cuando WhatsAppOfficialApiAdapter o WhatsAppAdminApiAdapter necesitan el token para un tenant:
Obtienen tenantId del TenantContextService.
Llaman a ITenantConfigRepositoryPort.getWhatsAppApiCredentials(tenantId).
El SecureTenantConfigRepository lee el token encriptado de la DB de plataforma y llama a IEncryptionServicePort.decrypt() para obtener el token en claro.
El token en claro se usa para la llamada API y no se persiste en claro en ningún otro lugar ni se loggea (excepto quizás en modo DEBUG muy controlado).
Acción IA Nx:
Definir IEncryptionServicePort en libs/core/security/ports/.
Implementar AesEncryptionService en libs/infrastructure/security/services/.
Asegurar que SecureTenantConfigRepository use este servicio.
Configurar una variable de entorno PLATFORM_MASTER_ENCRYPTION_KEY en .env.example.
Punto 2.5 del Índice: Configuración Inicial del Producto WhatsApp en la App Meta de dfs-invest-suite
App Meta Global de dfs-invest-suite: Es la app que nosotros (MetaShark/DFS) creamos y gestionamos en el portal de Meta for Developers.
Tipo: "Empresa".
Producto WhatsApp Añadido: Esto crea una WABA de prueba y un Número de Teléfono de prueba asociados a NUESTRA App Meta. Estos son útiles para nuestro desarrollo y pruebas internas de la plataforma, pero no son los que usarán los tenants.
App ID y App Secret: El App Secret de NUESTRA App Meta se usa para la validación de firma de TODOS los webhooks que llegan a nuestro endpoint global, independientemente del tenant que originó el evento (ya que Meta firma con el secret de la app a la que está suscrito el webhook).
Webhook Endpoint: Configurar la URL de nuestro WhatsappWebhookController global aquí.
Permisos: Nuestra App Meta debe tener aprobados los permisos whatsapp_business_management y whatsapp_business_messaging con Acceso Avanzado.
Suscripción a WABAs de Tenants:
Cuando un nuevo tenant se da de alta y provee su WABA_ID y su System User Access Token, nuestro backend (SetTenantWhatsAppConfigUseCase vía IWhatsAppAdminPort) debe llamar a:
POST https://graph.facebook.com/vXX.X/{TENANT_WABA_ID}/subscribed_apps
con el access_token del tenant.
Esto le dice a Meta que envíe los eventos de la WABA de ESE tenant a la URL de webhook configurada en NUESTRA App Meta.
Acción IA Nx:
Asegurar que el App Secret de nuestra plataforma se cargue vía ConfigService en el WhatsappWebhookController para la validación de firma.
Implementar el método subscribeAppToWabaEvents(tenantWabaId, platformAppId, tenantAccessToken) en WhatsAppAdminApiAdapter.
(Continuará con la Sección 3: Gestión de Números de Teléfono de Empresa (por Tenant), detallando los endpoints API, el rol de dfs-invest-suite en su gestión y la interacción con el Anti-Ban, en el próximo prompt).
---
SECCIÓN 3: GESTIÓN DE NÚMEROS DE TELÉFONO DE EMPRESA (POR TENANT)
Cada tenant de dfs-invest-suite operará con sus propios números de teléfono, vinculados a su WABA. Nuestra plataforma debe poder listar estos números, obtener sus detalles (especialmente calidad y límites), y facilitar ciertos procesos de gestión, siempre actuando en nombre del tenant y con sus credenciales.
Punto 3.1 del Índice: Requisitos del Número de Teléfono del Tenant
Concepto Meta: Los números deben ser propiedad del tenant, tener código de país/área, poder recibir SMS/llamada para verificación, y no estar activos en la app personal/Business.
Acción IA Nx (Documentación para Tenants):
Expandir docs/tenant-onboarding/whatsapp-setup.md con estos requisitos, enlazando a la documentación oficial de Meta sobre "Números de teléfono del negocio".
Indicar que los números prohibidos por WhatsApp no se pueden registrar.
Punto 3.2 del Índice: Obtención de IDs y Listado de Números de Teléfono del Tenant (vía API Admin)
Rol de dfs-invest-suite: Proveer al tenant (vía pwa-supervisor) la capacidad de ver los números asociados a su WABA y seleccionar cuáles quiere usar con la suite. El sistema también necesita esta información para el Anti-Ban.
Artefacto de Infraestructura: WhatsAppAdminApiAdapter (implementando IWhatsAppAdminPort).
Método listPhoneNumbers(tenantId: string, wabaId: string, fields?: string[]): Promise<WabaPhoneNumberDetailsFromApi[]>:
Endpoint Meta: GET /{wabaId}/phone_numbers
Lógica del Adaptador:
Obtener apiToken del tenant usando tenantId (vía ITenantConfigRepositoryPort).
Construir URL con wabaId y fields (ej. id,verified_name,display_phone_number,quality_rating,name_status y el campo para límites).
Realizar llamada GET con el apiToken del tenant.
Mapear el array data de la respuesta a WabaPhoneNumberDetailsFromApi[].
Caso de Uso de Aplicación (SyncWhatsAppAssetsUseCase o ListTenantPhoneNumbersUseCase):
Llama a adminApiAdapter.listPhoneNumbers.
Para cada número devuelto, crea/actualiza la entidad WhatsAppAccount en la DB del tenant (vía IWhatsAppAccountRepository y AccountHealthManagerService.syncPhoneNumberStateFromApi).
UI (pwa-supervisor del Tenant):
Permitir al admin del tenant ver la lista de sus números obtenidos de Meta.
Permitir seleccionar/deseleccionar números para ser "gestionados" por dfs-invest-suite (esto podría actualizar un flag isManagedBySuite en la entidad WhatsAppAccount).
Punto 3.3 del Índice: Verificación de Propiedad de Nuevos Números del Tenant (vía API Admin)
Rol de dfs-invest-suite: Facilitar (si el tenant así lo desea y si nuestra UI lo implementa) el proceso de verificación de un nuevo número que el tenant quiera añadir a su WABA para usar con la suite. El tenant podría hacer esto en su WBM, pero ofrecerlo en pwa-supervisor es un plus.
Métodos en WhatsAppAdminApiAdapter:
async requestPhoneNumberVerificationCode(tenantId: string, phoneNumberIdToVerify: string, method: 'SMS' | 'VOICE', languageLocale: string): Promise<{ success: boolean }>
Obtener apiToken del tenant.
Endpoint Meta: POST /{phoneNumberIdToVerify}/request_code
Body: code_method: method, locale: languageLocale (o language).
Realizar llamada POST. Retornar { success: true } si la API de Meta responde éxito.
async verifyPhoneNumberCode(tenantId: string, phoneNumberIdToVerify: string, code: string): Promise<{ success: boolean }>
Obtener apiToken del tenant.
Endpoint Meta: POST /{phoneNumberIdToVerify}/verify_code
Body: code: code.
Realizar llamada POST. Retornar { success: true } si la API de Meta responde éxito.
UI (pwa-supervisor del Tenant - Funcionalidad Avanzada/Post-MVP):
Formulario para ingresar un phoneNumberId (que el tenant obtuvo de su WBM al añadir el número) o permitirle seleccionar un número no verificado de la lista.
Solicitar método y locale. Llamar al requestPhoneNumberVerificationCode.
Campo para ingresar el código recibido. Llamar al verifyPhoneNumberCode.
Punto 3.4 del Índice: Registro de Número del Tenant para Cloud API (vía Cloud API Endpoint)
Concepto Meta: Un número, aunque esté en la WABA y verificado, necesita ser explícitamente "registrado" para ser usado con la Cloud API y para configurar su PIN de 2FA.
Rol de dfs-invest-suite: Después de que el tenant añade un número a dfs-invest-suite (y está verificado), se debe llamar a este endpoint.
Método en WhatsAppAdminApiAdapter (Aunque es endpoint de Cloud API, se gestiona como admin task):
async registerPhoneNumberForCloudApi(tenantId: string, phoneNumberIdToRegister: string, pin: string, dataLocalizationRegion?: string): Promise<{ success: boolean }>
Obtener apiToken del tenant.
Endpoint Meta: POST /{phoneNumberIdToRegister}/register
Body: { messaging_product: "whatsapp", pin: pin, data_localization_region?: dataLocalizationRegion }.
Realizar llamada POST.
Caso de Uso de Aplicación (CompletePhoneNumberSetupUseCase o similar):
Llamado después de que un número es verificado o añadido por el tenant en pwa-supervisor.
Pide al tenant que establezca un PIN de 6 dígitos para ese número (si es la primera vez o si quiere cambiarlo).
Llama a adminApiAdapter.registerPhoneNumberForCloudApi.
Si éxito, actualiza WhatsAppAccount.operationalStatus a IN_WARMUP (o ACTIVE si el número ya tenía historial y buen tier/calidad).
Limitación Meta: 10 solicitudes de registro / 72h por número. El sistema debe manejar/prevenir esto.
Punto 3.5 del Índice: Anular Registro de Número de Cloud API (vía Cloud API Endpoint)
Rol de dfs-invest-suite: Permitir al tenant "desconectar" un número de la Cloud API a través de nuestra plataforma.
Método en WhatsAppAdminApiAdapter:
async deregisterPhoneNumberFromCloudApi(tenantId: string, phoneNumberIdToDeregister: string): Promise<{ success: boolean }>
Obtener apiToken del tenant.
Endpoint Meta: POST /{phoneNumberIdToDeregister}/deregister
Realizar llamada POST.
Caso de Uso de Aplicación (DisablePhoneNumberUseCase):
Actualiza WhatsAppAccount.operationalStatus a MAINTENANCE_BY_ADMIN o PENDING_DELETION.
Llama a adminApiAdapter.deregisterPhoneNumberFromCloudApi.
Punto 3.6 del Índice: Gestión del Nombre para Mostrar (display_name) del Tenant
Concepto Meta: El nombre visible a los usuarios. Requiere Verificación de Empresa del tenant y aprobación de Meta.
Supervisión por dfs-invest-suite:
Webhook phone_number_name_update (procesado por WhatsappWebhookProcessor, emite WhatsAppPhoneNumberNameUpdatedEvent({ tenantId, ... })).
AssetUpdateApplicationListener escucha este evento y llama a AccountHealthManagerService.updatePhoneNumberNameStatus(tenantId, phoneNumberId, newNameStatus, verifiedName).
AccountHealthManagerService actualiza WhatsAppAccount.verifiedName y WhatsAppAccount.nameStatus.
SyncWhatsAppAssetsUseCase también puede sincronizar este estado usando GET /{PHONE_NUMBER_ID}?fields=name_status,verified_name.
UI (pwa-supervisor del Tenant): Mostrar el verified_name y name_status actual. Si DECLINED, sugerir al tenant revisar políticas y apelar en WBM.
Punto 3.7 del Índice: Calificación de Calidad del Número (quality_rating) y Límites de Mensajes (Tiers) del Tenant - ¡CORAZÓN DEL ANTI-BAN!
Fuente de Datos:
Webhooks (Tiempo Real):
phone_number_quality_update: Para quality_rating (GREEN, YELLOW, RED).
account_update con event: "BUSINESS_CAPABILITY_UPDATE": Para cambios en messagingLimitTier.
GAP: Necesitamos los payloads JSON oficiales de estos webhooks.
API de Administración (Consulta y Sincronización):
GET /{PHONE_NUMBER_ID_TENANT}?fields=quality_rating,CAMPO_DE_LIMITES
GAP: Nombre y estructura del CAMPO_DE_LIMITES (Tier y límite numérico).
Procesamiento en dfs-invest-suite (por Tenant):
WhatsappWebhookProcessor emite eventos tipados (ej. WhatsAppPhoneNumberQualityUpdatedEvent, WhatsAppAccountCapabilityUpdatedEvent) con tenantId.
AccountHealthManagerService (tenant-aware):
Escucha estos eventos.
Actualiza los campos qualityRating, messagingLimitTier, currentConversationsInitiated24h (resetear si el tier sube y da más capacidad), status, operationalStatus y healthScore en la entidad WhatsAppAccount del tenant (vía IWhatsAppAccountRepository).
Si messagingLimitTier cambia, llama a IRateLimiterPort.configureLimits(tenantId, phoneNumberId, newPoints, newDuration) para actualizar la configuración del rate limiter de Redis.
Si qualityRating cambia a YELLOW o RED, o si hay ACCOUNT_RESTRICTION, implementa la lógica de COOLING_DOWN o SUSPENDED_BY_META_CONFIRMED y alerta al tenant.
AntiBanDecisionService (tenant-aware):
Utiliza la qualityRating y messagingLimitTier actualizadas de las WhatsAppAccounts del tenant para su lógica de selección de números y cálculo de "costo" de token.
UI (pwa-supervisor del Tenant): Mostrar estos KPIs en tiempo real.
Punto 3.8 del Índice: Gestión del Perfil de Empresa y 2FA del Tenant (Menor Prioridad MVP)
Perfil: getBusinessProfile y updateBusinessProfile en IWhatsAppAdminPort. La UI en pwa-supervisor podría permitir al tenant editar algunos campos si es deseable.
2FA PIN: setTwoStepVerificationPin en IWhatsAppAdminPort. La UI de onboarding del tenant (cuando registra números) debe pedir el PIN. El cambio de PIN se haría preferentemente en WAM por el tenant.
(Continuará con la Sección 4: Plantillas de Mensajes (Gestión por Tenant), detallando la implementación de la creación, lectura y monitoreo de plantillas vía API, en el contexto SaaS, en el próximo prompt).
---
SECCIÓN 4: PLANTILLAS DE MENSAJES (GESTIÓN Y USO POR TENANT)
Las plantillas de mensajes son el único medio para iniciar conversaciones o responder después de la ventana de 24 horas. dfs-invest-suite debe facilitar a los tenants la gestión y el uso efectivo y conforme de estas plantillas.
Punto 4.1 del Índice: Definición, Uso y Tipos de Plantillas
Concepto Meta: Formatos de mensaje predefinidos, revisados y aprobados por Meta. Categorías: MARKETING, UTILITY, AUTHENTICATION.
Acción IA Nx (Documentación para Tenants en pwa-supervisor):
Proveer una sección de ayuda/FAQ en la pwa-supervisor del tenant explicando qué son las plantillas, por qué son necesarias, las diferencias entre categorías, y el proceso de aprobación de Meta.
Enlazar a las políticas oficiales de Meta sobre plantillas.
Punto 4.2 del Índice: Creación y Edición de Plantillas por Tenant (vía API Admin)
Rol de dfs-invest-suite: Permitir a los tenants crear y proponer plantillas para aprobación de Meta directamente desde la pwa-supervisor.
WhatsAppAdminApiAdapter (Método createMessageTemplate):
Implementación: Como se detalló en la Parte 4 del Blueprint (prompt anterior), este método en el adaptador tomará el tenantId y un objeto WhatsAppTemplateCreationApiRequest.
WhatsAppTemplateCreationApiRequest (Tipo en libs/core/whatsapp/types/):
Esta interfaz DEBE definir la estructura JSON exacta que espera el endpoint POST /{WABA_ID_TENANT}/message_templates.
Campos: name (único por WABA y idioma), language (ej. "pt_BR"), category (enum), components (array).
components Array (¡EL GAP CRÍTICO A RESOLVER CON DOC OFICIAL "COMPONENTES DE PLANTILLAS"!):
type: "HEADER", format: "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT" | "LOCATION".
Si format: "TEXT", text: "Texto con {{1}}", example: { header_text: ["Ejemplo Variable Header"] }.
Si format es media, example: { header_handle: ["ID_MEDIA_SUBIDA_EJEMPLO"] }. Confirmar si header_url es aceptado en example para creación.
GAP: Estructura de example para HEADER con format: "LOCATION".
type: "BODY", text: "Cuerpo con {{1}} y {{nombre_var}}.", example: { body_text: [["ValorEj1Var1", "ValorEj1VarNombre"], ["ValorEj2Var1", "ValorEj2VarNombre"]] }. (Soporte para parameter_format: "POSITIONAL" o "NAMED" debe reflejarse aquí).
type: "FOOTER", text: "Pie de página.".
type: "BUTTONS", buttons: [...]. Cada objeto botón:
type: "QUICK_REPLY", text: "Texto Botón".
type: "URL", text: "Texto Botón", url: "https://dominio.com/{{1}}", `example: ["¡Absolutamente! Continuamos con el Blueprint Maestro v3.3, detallando la Sección 4: Plantillas de Mensajes (Gestión por Tenant). Esta sección es crucial para la funcionalidad de comunicación proactiva y la estrategia "DFS-Educa".
Blueprint Maestro v3.3: DFS-Invest-Suite - Guía de Implementación Hipergranular para IA Experta en Nx (Continuación)
(Secciones 1-3 como antes)
SECCIÓN 4: PLANTILLAS DE MENSAJES (GESTIÓN POR TENANT)
Las plantillas de mensajes son la única forma de iniciar conversaciones con usuarios o responder después de la ventana de 24 horas. dfs-invest-suite debe facilitar su gestión (idealmente vía UI para el tenant) y asegurar su uso conforme y optimizado. Cada tenant gestiona su propio conjunto de plantillas dentro de su WABA.
Punto 4.1 del Índice: Definición, Uso y Categorías de Plantillas
Concepto Meta: Formatos de mensaje pre-aprobados por Meta. Categorías: MARKETING, UTILITY, AUTHENTICATION. La categoría impacta el precio y las políticas de contenido.
Acción IA Nx (Documentación/UI para Tenants):
En pwa-supervisor (del tenant), al crear/gestionar plantillas, mostrar claramente la definición y las directrices de Meta para cada categoría.
Enlazar a la documentación oficial de Meta sobre "Categorización de plantillas".
Punto 4.2 del Índice: Creación y Edición de Plantillas (vía API Admin y UI del Tenant)
**Rolej_var_url"]. (Confirmar si eltextdel botón URL también puede tener variables y cómo se define suexample). *type: "PHONE_NUMBER",text: "Llamar",phone_number: "+...". * **GAP:** Estructura JSON oficial para definir botones de tipoOTP(conotp_type,autofill_text,package_name,signature_hash,code_expiration_minutessi aplica en creación),FLOW(conflow_id),MPM/CATALOG(conthumbnail_product_retailer_id,sections) DENTRO del arraycomponentsal *crear* la plantilla. *message_send_ttl_seconds`: Opcional.
Respuesta de la API de Meta: { id: "HSM_ID", status: "ESTADO_INICIAL_META", category: "CATEGORIA_META" }.
WhatsAppAdminApiAdapter (Método updateMessageTemplateComponents / updateMessageTemplateCategory):
Implementar POST /{TEMPLATE_ID_HSM} con los campos permitidos para actualización.
ManageWhatsAppTemplateUseCase (Aplicación, Tenant-Aware):
createTemplate(input: { tenantId, wabaIdToUse, creationData: WhatsAppTemplateCreationApiRequest }):
Validación Interna (L.I.A Legacy - Post-MVP): Analizar creationData.components para detectar posibles violaciones de política de contenido o formato antes de enviar a Meta. Sugerir categoría correcta.
Llamar a adminApiAdapter.createMessageTemplate(...) usando credenciales del tenant.
Si éxito (status: "PENDING" o APPROVED), guardar/actualizar en MessageTemplateRecordRepository (DB del tenant) con el HSM_ID devuelto por Meta.
UI (pwa-supervisor del Tenant):
Formulario intuitivo para crear plantillas:
Seleccionar categoría.
Escribir nombre y seleccionar idioma.
Añadir componentes HEADER, BODY, FOOTER:
Permitir ingresar texto y marcar placeholders (ej. {{1}}, {{nombre}}).
Para cada placeholder, solicitar el texto de EJEMPLO (example).
Para HEADER multimedia, permitir subir una imagen/video/doc de EJEMPLO (que dfs-invest-suite subirá vía IWhatsAppAdminPort.uploadMedia para obtener el header_handle).
Añadir BOTONES:
Seleccionar tipo de botón (QR, URL, Teléfono; y los complejos OTP, FLOW, etc. una vez tengamos su spec).
Ingresar texto del botón.
Para URL, ingresar URL base y si es dinámica, el placeholder. Ingresar EJEMPLO para el placeholder de la URL.
Para Teléfono, ingresar número.
Botón "Enviar a Revisión de WhatsApp".
Punto 4.3 del Índice: Proceso de Aprobación de Plantillas (Meta)
Concepto Meta: Revisión por Meta (hasta 24h). Estados: PENDING, APPROVED, REJECTED, PAUSED, DISABLED.
Supervisión por dfs-invest-suite:
Webhook message_template_status_update: Es de dfs-invest-suite:** Permitir a los tenants (idealmente a través de pwa-supervisor) crear, enviar a aprobación y editar sus plantillas.
Artefactos Clave:
Dominio whatsapp - WhatsAppTemplateCreationApiRequest:
Tipo que define el payload JSON para POST /{WABA_ID_TENANT}/message_templates.
GAP CRÍTICO (AÚN): Necesita la estructura JSON oficial y completa para el array components y sus example para TODOS los tipos de HEADER (media), y TODOS los tipos de BUTTONS (OTP, FLOW, MPM, CATALOG, URL con variables) durante la CREACIÓN. Los ejemplos que tenemos cubren mucho, pero la especificación oficial completa es necesaria para robustez.
Aplicación - ManageWhatsAppTemplateUseCase:
Método createTemplate(input: { tenantId, wabaIdToUse, creationData: WhatsAppTemplateCreationApiRequest }):
Establece TenantContext.
(Opcional) Validación Pre-Meta por aiper-assistance: Antes de enviar a Meta, el creationData.components[type="BODY" o "HEADER"].text podría ser analizado por una IA para detectar posibles violaciones de política o sugerir mejoras/categoría.
Obtiene apiToken del tenant.
Llama a IWhatsAppAdminPort.createMessageTemplate(input.wabaIdToUse, input.creationData, tenantApiToken).
Si Meta devuelve éxito (plantilla creada con un ID y estado inicial, ej. PENDING):
Guarda la nueva plantilla (con el ID de Meta, estado, etc.) en IMessageTemplateRecordRepository (DB del tenant).
Devuelve la plantilla creada o un indicador de éxito/error.
Método updateTemplate(input: { tenantId, templateIdFromMeta, updateData: WhatsAppTemplateApiUpdateRequest }):
Llama a IWhatsAppAdminPort.updateMessageTemplateComponents o updateMessageTemplateCategory.
Actualiza IMessageTemplateRecordRepository.
**Infraestructura - la fuente primaria y en tiempo real.
GAP: Necesitamos el payload JSON oficial de value para este webhook.
WhatsappWebhookProcessor emite WhatsAppTemplateStatusChangedEvent({ tenantId, ... }).
AssetUpdateApplicationListener (Aplicación) o directamente AccountHealthManagerService (Aplicación):
Escucha el evento.
Actualiza el statusMeta y statusInternal en MessageTemplateRecordRepository (DB del tenant).
Si REJECTED, PAUSED, DISABLED, notifica al admin del tenant (vía UI pwa-supervisor, email).
Si APPROVED, notifica al admin del tenant y la plantilla está lista para usarse.
UI (pwa-supervisor del Tenant): Mostrar el estado de cada plantilla. Si REJECTED, mostrar el reason de Meta.
Punto 4.4 del Índice: Motivos Comunes de Rechazo y Políticas
Concepto Meta: Formato de {{1}}, contenido que viola Política de Comercio/Business (datos sensibles, spam), duplicación.
Acción IA Nx (UI y Documentación para Tenants):
En la UI de creación de plantillas (pwa-supervisor), mostrar estos motivos comunes como "consejos" o validaciones en tiempo real (si es posible).
Incluir en la guía docs/tenant-onboarding/whatsapp-template-guide.md un resumen de estos motivos y cómo evitarlos.
Punto 4.5 del Índice: Categorización de Plantillas (Impacto en Precios y Políticas)
Concepto Meta: MARKETING, UTILITY, AUTHENTICATION. La empresa propone, Meta valida. Contenido mixto usualmente se considera MARKETING.
dfs-invest-suite:
La UI de creación de plantillas DEBE permitir al tenant seleccionar la categoría.
Si Meta recategoriza (notificado vía webhook o al leer la plantilla), el MessageTemplateRecord se actualiza.
Estrategia "DFS-Educa": La IA (L.I.A Legacy) ayuda a diseñar plantillas UTILITY que aporten valor real y cuyos CTAs sean contextualmente apropiados, para maximizar la probabilidad de que Meta las apruebe como UTILITY.
Punto 4.6 del Índice: Calificación de Calidad de Plantilla (Post-Aprobación)
Concepto Meta: Calificación dinámica (GREEN, YELLOW, RED, UNKNOWN) basada en feedback de usuarios. Baja calidad -> PAUSA.
Supervisión por dfs-invest-suite:
Webhook message_template_quality_update:
GAP: Necesitamos el payload JSON oficial de value.
WhatsappWebhookProcessor emite WhatsAppTemplateQualityChangedEvent({ tenantId, ... }).
AccountHealthManagerService actualiza qualityRatingMeta en MessageTemplateRecordRepository.
Si baja a RED, se debe notificar al admin del tenant y el sistema debería considerar no usar esa plantilla hasta que mejore (o es pausada por Meta).
Punto 4.7 del Índice: Frecuencia de Plantillas (Throttling)
Concepto Meta: Plantillas nuevas/reactivadas/baja calidad (Mkt/Util) pueden ser enviadas con frecuencia limitada inicialmente hasta que se establezca una buena calidad. Mensajes pueden ser held_for_quality_assessment.
Impacto en dfs-invest-suite:
La respuesta síncrona de POST /messages puede devolver message_status: "held_for_quality_assessment". El WhatsappOfficialApiAdapter debe capturar esto y loggearlo.
Si una plantilla está sujeta a throttling, el AntiBanDecisionService podría necesitar una lógica para espaciar más los envíos con esa plantilla o rotar a otras.
Los webhooks de estado (sent, delivered, failed) se recibirán cuando Meta tome una decisión final sobre los mensajes retenidos.
Punto 4.8 del Índice: Pausa/Reactivación de Plantillas
Pausa Automática por Meta: Si calidad baja mucho (3h -> 6h -> Desactivada).
Reactivación:
Automática tras periodo de pausa.
Manual (vía API POST /{template-id}/unpause o WAM) si la pausa fue por "Frecuencia" y Meta lo permite.
WhatsAppAdminApiAdapter: Implementar método unpauseTemplate(tenantId, templateId).
UI (pwa-supervisor): Mostrar opción de reactivar si aplica.
Punto 4.9 del Índice: Apelaciones de Plantillas
Concepto Meta: Se pueden apelar rechazos o cambios de categoría (vía WAM).
dfs-invest-suite: No automatizará apelaciones. La UI (pwa-supervisor) informará al tenant del rechazo/razón y le guiará a su WAM para apelar.
(Continuará con la Sección 5: Envío de Mensajes - REFINADA, y luego las secciones restantes del Blueprint, asegurando que la implementación de cada artefacto sea consistente con la arquitectura SaaS y los detalles de la API de Meta, en el próximo prompt).
La gestión de plantillas es un ciclo de vida complejo. Nuestro sistema debe proveer las herramientas para que los tenants lo manejen eficientemente y de forma informada, siempre dentro de las políticas. El principal GAP restante aquí es la estructura JSON exacta para la creación de TODOS los tipos de botones complejos en una plantilla vía API.
---
Guía para la IA Experta en Nx: Creación de un Nuevo Módulo Funcional (campaigns) en dfs-invest-suite
Objetivo: Añadir la capacidad de crear, gestionar, ejecutar y analizar campañas de envío masivo de plantillas de marketing por WhatsApp para los tenants.
I. Impacto y Creación en libs/core/ (Dominio)
Nuevo Subdominio: campaigns
Acción IA Nx: Crear directorio libs/core/src/campaigns/.
Propósito: Contener la lógica de negocio pura y las definiciones del dominio de Campañas.
Artefactos dentro de libs/core/src/campaigns/:
index.ts: Exportaciones públicas del dominio.
entities/campaign.entity.ts:
import { EMessageCategory } from '@dfs-suite/shared'; // Asumiendo que está en shared

export enum ECampaignStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  RUNNING = 'RUNNING',
  PAUSED_BY_SYSTEM = 'PAUSED_BY_SYSTEM', // Ej. por Anti-Ban
  PAUSED_BY_USER = 'PAUSED_BY_USER',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  ARCHIVED = 'ARCHIVED',
}

export interface CampaignTargetAudience { // Podría ser más complejo
  segmentId?: string; // ID de un segmento de leads predefinido
  leadIds?: string[];   // Lista explícita de Lead IDs (de la DB del tenant)
  filterCriteria?: any; // Criterios para seleccionar leads dinámicamente
}

export class Campaign {
  public readonly id: string; // UUID
  // public readonly tenantId: string; // NO AQUÍ, la entidad vive en DB del tenant
  public name: string;
  public status: ECampaignStatus;
  public messageTemplateId: string; // ID de una MessageTemplateRecord del tenant
  public messageTemplateName: string; // Para referencia
  public messageTemplateCategory: EMessageCategory; // Debería ser MARKETING
  public targetAudience: CampaignTargetAudience;
  public scheduleAt?: Date;
  public startedAt?: Date;
  public completedAt?: Date;
  public totalLeadsToProcess?: number;
  public leadsProcessedCount: number = 0;
  public leadsSentSuccessCount: number = 0;
  public leadsSentFailedCount: number = 0;
  public configuration: any; // Ej. variables de plantilla, config de envío
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(/* ... */) { /* ... */ }

  static create(
    id: string, name: string, templateId: string, templateName: string,
    templateCategory: EMessageCategory, target: CampaignTargetAudience, config: any, scheduleAt?: Date
  ): Campaign {
    if (templateCategory !== EMessageCategory.MARKETING) {
      throw new DomainError('Campaigns can only use MARKETING templates for proactive sending.');
    }
    // ... lógica de creación ...
    return new Campaign(/* ... */);
  }

  public schedule(scheduleDate: Date): void { /* ... */ }
  public start(): void { /* ... */ }
  public pause(bySystem: boolean = false): void { /* ... */ }
  public resume(): void { /* ... */ }
  public complete(): void { /* ... */ }
  public fail(reason: string): void { /* ... */ }
  public archive(): void { /* ... */ }
  public incrementProcessedCount(successful: boolean): void { /* ... */ }
}
Use code with caution.
TypeScript
ports/campaign-repository.port.ts:
import type { Campaign } from '../entities/campaign.entity';
export interface ICampaignRepositoryPort {
  findById(id: string): Promise<Campaign | null>;
  save(campaign: Campaign): Promise<Campaign>;
  findScheduledAndDue(now: Date): Promise<Campaign[]>;
  findRunning(): Promise<Campaign[]>;
  // ... otros métodos: listByStatus, etc.
}
export const CAMPAIGN_REPOSITORY_PORT = Symbol('ICampaignRepositoryPort');
Use code with caution.
TypeScript
services/campaign-eligibility.service.ts (Ejemplo de Servicio de Dominio):
Podría contener lógica para verificar si una campaña puede iniciarse o continuar (ej. si la plantilla asociada sigue activa y con buena calidad, si el tenant tiene créditos/permisos para campañas).
Dependería de IMessageTemplateRecordRepositoryPort (indirectamente, vía caso de uso) y quizás ITenantSubscriptionServicePort (futuro).
events/campaign-created.event.ts, campaign-started.event.ts, campaign-completed.event.ts:
Eventos de dominio que llevan tenantId y campaignId.
II. Impacto y Creación en libs/application/ (Casos de Uso)
Nuevo Submódulo: campaigns
Acción IA Nx: Crear directorio libs/application/src/campaigns/.
Propósito: Orquestar la lógica de creación, ejecución y gestión de campañas.
Artefactos dentro de libs/application/src/campaigns/:
index.ts
use-cases/create-campaign.use-case.ts:
Interfaz ICreateCampaignUseCase: Input: { tenantId, name, messageTemplateId, targetAudience, configuration, scheduleAt? }, Output: Promise<Campaign>.
Implementación CreateCampaignUseCaseImpl:
Dependencias: ICampaignRepositoryPort, IMessageTemplateRecordRepositoryPort (para validar que la plantilla existe y es del tenant), ILeadRepositoryPort (para estimar totalLeadsToProcess si se usan filtros), ILoggerPort, EventEmitter2.
Lógica:
Establecer TenantContext con input.tenantId.
Validar que messageTemplateId existe, es del tenant, es MARKETING y está APPROVED.
(Opcional) Validar targetAudience (ej. si es segmentId, que exista).
Crear instancia de Campaign.create(...).
Llamar a campaignRepo.save(campaign).
Emitir CampaignCreatedEvent({ tenantId, campaignId: campaign.id }).
use-cases/schedule-campaign.use-case.ts: Similar, actualiza estado y scheduleAt.
use-cases/execute-campaign-batch.use-case.ts (Para Procesador de Cola):
Interfaz IExecuteCampaignBatchUseCase: Input: { tenantId, campaignId, leadIdsToProcess: string[] }.
Implementación:
Dependencias: ICampaignRepositoryPort, ILeadRepositoryPort, ISendWhatsAppMessageUseCase (de libs/application/whatsapp/), ILoggerPort.
Lógica:
Establecer TenantContext.
Obtener Campaign y MessageTemplateRecord asociados.
Para cada leadId en leadIdsToProcess:
Obtener Lead.
Construir TWhatsAppApiMessageRequest usando la plantilla de la campaña y personalizando con datos del lead y la campaign.configuration.
Llamar a sendWhatsAppMessageUseCase.execute({ tenantId, recipientPhoneNumber: lead.phoneNumber, messageData, originatingCampaignId: campaignId, internalJobId: ... }).
Actualizar campaign.leadsProcessedCount y leadsSentSuccess/FailedCount basado en el resultado.
Guardar campaign actualizada.
listeners/campaign-scheduler.listener.ts (o un Job Cron):
Periódicamente (ej. cada minuto) llama a ICampaignRepositoryPort.findScheduledAndDue().
Para cada campaña debida, la marca como RUNNING y encola jobs más pequeños en una nueva cola WHATSAPP_CAMPAIGN_LEAD_PROCESSING_QUEUE. Cada job en esta cola contendría { tenantId, campaignId, batchOfLeadIds }.
listeners/anti-ban-feedback.listener.ts:
Escucha eventos como WhatsAppAccountHealthChangedEvent o TemplateQualityLowEvent.
Si una cuenta WA usada por una campaña RUNNING se vuelve SUSPENDED o una plantilla se PAUSA, este listener podría llamar a ICampaignRepositoryPort.findById y luego campaign.pause(true) para pausar automáticamente la campaña.
III. Impacto y Creación en libs/infrastructure/ (Adaptadores)
Nuevo Submódulo: persistence (Adiciones)
Acción IA Nx:
Añadir repositories/prisma-campaign.repository.ts implementando ICampaignRepositoryPort (operando sobre la DB del tenant).
Añadir modelo Campaign al prisma/schema.prisma (plantilla de tenant).
Nuevo Submódulo: queue (Adiciones)
Acción IA Nx:
Definir WHATSAPP_CAMPAIGN_LEAD_PROCESSING_QUEUE en queue.module.ts.
Crear processors/whatsapp-campaign-lead.processor.ts:
Consume de la nueva cola.
Su job data es { tenantId, campaignId, batchOfLeadIds }.
Llama a IExecuteCampaignBatchUseCase.execute(...).
IV. Impacto y Creación en apps/
apps/api-main:
Acción IA Nx:
Crear apps/api-main/src/domains/campaigns/ con campaigns.module.ts y campaigns.resolver.ts.
Resolvers GraphQL:
Query.getCampaign(id, tenantId) (el tenantId del JWT del usuario debe coincidir o ser admin de plataforma).
Query.listCampaigns(tenantId, filters).
Mutation.createCampaign(input: CreateCampaignInput) (llama a ICreateCampaignUseCase).
Mutation.scheduleCampaign(campaignId, scheduleAt, tenantId).
Mutation.pauseCampaign(campaignId, tenantId).
Mutation.resumeCampaign(campaignId, tenantId).
apps/pwa-supervisor:
Acción IA Nx: Crear nuevas páginas/componentes para:
Listar campañas del tenant.
Crear/editar/programar una nueva campaña (seleccionando plantilla, definiendo audiencia - inicialmente por importación de IDs o filtros simples, configurando variables).
Ver el progreso y estadísticas de una campaña en ejecución.
Pausar/reanudar/archivar campañas.
apps/admin-platform:
Acción IA Nx: (Post-MVP)
Vista para ver la actividad de campañas a través de todos los tenants (agregado y anonimizado).
Herramientas para configurar límites globales de campañas si es necesario.
V. Librerías Compartidas (libs/shared, libs/ui-shared)
libs/shared:
Acción IA Nx: Añadir enums/campaign-status.enum.ts (ECampaignStatus). Añadir DTOs base para CreateCampaignInput, CampaignDto.
libs/ui-shared:
Acción IA Nx: Crear componentes reutilizables si surgen patrones comunes entre pwa-supervisor y (futuras) pwa-consultant/admin-panel para la visualización o gestión de campañas (ej. un selector de plantillas de mensajes, un visualizador de progreso de campaña).
VI. Flujo de Datos Ejemplo (Crear y Ejecutar Campaña):
Supervisor del Tenant X usa pwa-supervisor.
Navega a la sección "Campañas" y hace clic en "Crear Nueva Campaña".
Completa el formulario: Nombre, selecciona una Plantilla de Marketing Aprobada (listada desde IMessageTemplateRecordRepository del tenant), define la audiencia (ej. carga una lista de leadIds o selecciona un segmento), configura las variables de la plantilla, y programa para "Mañana a las 9 AM".
pwa-supervisor envía mutación GraphQL createCampaign a api-main.
CampaignsResolver en api-main (con tenantId="X" del JWT) llama a ICreateCampaignUseCase.execute(...).
El caso de uso valida, crea la entidad Campaign, la guarda en la DB del Tenant X (PrismaCampaignRepository), y emite CampaignCreatedEvent({ tenantId:"X", ...}).
Al día siguiente, 8:59 AM: Un job Cron (CampaignSchedulerListener en libs/application) se ejecuta.
Consulta ICampaignRepositoryPort.findScheduledAndDue(now) (para Tenant X, luego para Tenant Y, etc. o una query global si la lógica de schedule es centralizada).
Encuentra la Campaña de Tenant X. La marca como RUNNING.
Divide la targetAudience.leadIds en lotes más pequeños (ej. 100 leads por lote).
Para cada lote, encola un job en WHATSAPP_CAMPAIGN_LEAD_PROCESSING_QUEUE con { tenantId:"X", campaignId, batchOfLeadIds }.
WhatsappCampaignLeadProcessor:
Toma un job de lote. Establece TenantContext a "X".
Llama a IExecuteCampaignBatchUseCase.execute({ tenantId:"X", campaignId, batchOfLeadIds }).
ExecuteCampaignBatchUseCase:
Para cada leadId en el lote:
Construye el TWhatsAppApiMessageRequest con la plantilla y datos del lead.
Llama a ISendWhatsAppMessageUseCase.execute({ tenantId:"X", ..., messageData }).
(El flujo interno de SendWhatsAppMessageUseCase con Anti-Ban procede como ya definimos).
Actualiza contadores en la entidad Campaign.
Webhooks de estado de mensajes llegan, actualizan MessageLog y healthScore de números del Tenant X.
Si AccountHealthManagerService pausa un número del Tenant X, el AntiBanDecisionService (para Tenant X) lo sabrá y usará otros números. Si todas las plantillas/números del Tenant X se vuelven problemáticos, el CampaignSchedulerListener o el ExecuteCampaignBatchUseCase podrían pausar la campaña del Tenant X.
Este es un ejemplo de cómo se abordaría la creación de un nuevo módulo funcional (campaigns) dentro de la arquitectura dfs-invest-suite. La clave es mantener el aislamiento del tenant, reutilizar los componentes del núcleo WhatsApp/Anti-Ban (que ahora son tenant-aware), y seguir los patrones Hexagonal/DDD.
---
