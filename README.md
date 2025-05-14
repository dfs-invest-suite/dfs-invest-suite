// README.md
# DFS-Invest-Suite

Bienvenido al espacio de trabajo Nx para el proyecto **DFS-Invest-Suite**. Este proyecto utiliza una arquitectura monorepo gestionada por Nx para desarrollar una suite de aplicaciones robusta y escalable.

## Primeros Pasos y Comandos Clave

Asegúrate de tener [PNPM](https://pnpm.io/installation) instalado. Luego, instala las dependencias del proyecto:


pnpm install


Aplicación Principal: api-main (Backend NestJS)
Servidor de Desarrollo: Para ejecutar api-main en modo desarrollo con recarga automática:
pnpm nx serve api-main


La API estará disponible en http://localhost:3000/api (o el puerto configurado).
Build de Producción: Para compilar api-main para producción:
pnpm nx build api-main


Los artefactos se generarán en dist/apps/api-main.
Tests Unitarios: Para ejecutar los tests unitarios de api-main:
pnpm nx test api-main


Tests End-to-End (E2E): Para ejecutar los tests E2E de api-main:
pnpm nx e2e api-main-e2e


Esto requiere que api-main esté construida y (opcionalmente) sirviéndose.
Comandos Generales de Nx
Visualizar Grafo de Dependencias:
pnpm nx graph


Ver Targets de un Proyecto: Para listar todos los comandos disponibles para api-main:
pnpm nx show project api-main


Generar Componentes (Ejemplos):
Generar un nuevo módulo NestJS en api-main:
pnpm nx g @nx/nest:module mi-nuevo-modulo --project=api-main


Generar una nueva librería de utilidades (agnóstica a framework):
pnpm nx g @nx/js:lib mi-libreria-util --directory=shared


Estructura del Proyecto (Visión General Inicial)
apps/api-main/: Aplicación backend principal (NestJS).
apps/api-main-e2e/: Tests End-to-End para api-main.
libs/: Contendrá las librerías compartidas y la lógica de negocio (arquitectura hexagonal).
libs/core/domain/: Lógica de dominio pura.
libs/core/application/: Casos de uso y servicios de aplicación.
libs/infrastructure/: Adaptadores a tecnologías externas (DB, APIs, etc.).
libs/shared/: Utilidades y tipos compartidos globalmente.
(Próximamente) libs/ui-shared/: Componentes UI para las PWAs.
(Próximamente) apps/pwa-supervisor/, apps/pwa-consultant/, apps/admin-platform/: Aplicaciones frontend.

Linting y Formato
Lint:
pnpm nx lint api-main

El formateo con Prettier usualmente se integra con el IDE y/o hooks de Git.

**Herramientas y Ecosistema**
Nx Console: Extensión para VSCode/IntelliJ que facilita la interacción con Nx. Instalar Nx Console.
Nx Cloud: Para optimizar la CI con caché remoto y distribución de tareas.
Conectar el proyecto: pnpm nx connect
Generar workflow de CI: pnpm nx g ci-workflow
Enlaces Útiles (Documentación Oficial Nx)
Documentación Principal de Nx
Plugin Nx para NestJS
Plugin Nx para Node.js (para librerías genéricas)
Límites de Módulos en Nx (Module Boundaries)
Gestión de Tareas (Run Tasks)
Nx en CI
Comunidad Nx
Discord de Nx
Blog de Nx


/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
Nota estratégica 1: A medida que se desarrollen las PWAs (pwa-supervisor, pwa-consultant, admin-platform), se deberán añadir sus respectivos comandos serve, build y test a este README.
]
[
Nota estratégica 2: La sección "Estructura del Proyecto" deberá expandirse y detallarse a medida que las librerías y aplicaciones se implementen, posiblemente enlazando a documentación de arquitectura más detallada si es necesario.
]
[
Nota estratégica 3: Considerar añadir una sección sobre "Convenciones de Código y Commits" una vez que se definan formalmente.
]
[
Nota estratégica 4: Integrar un script graph en package.json ("graph": "pnpm nx graph") y mencionarlo en el README (pnpm run graph) para facilitar su ejecución.
]
*/
