# Ver información general del workspace
yarn nx report

# Ver la lista de todos los proyectos (apps y libs)
yarn nx show projects

# Obtener información detallada de un proyecto específico
yarn nx show project api-main --web

# Ver las variables globales disponibles
yarn nx show environment-variables

# Ver los targets (tareas) disponibles en todo el workspace
yarn nx show targets

# Generar y abrir un gráfico de dependencias visual
yarn nx graph

# Verificar dependencias de un proyecto específico
yarn nx dep-graph --file=dep-graph.html --focus=api-main

# Listar todas las dependencias de un proyecto específico
yarn nx affected:dep-graph --base=main --head=HEAD --file=affected-graph.html

# Validar la configuración de límites de módulo
yarn nx lint --verbose
# Ejecutar lint en todos los proyectos
yarn nx run-many --target=lint --all

# Verificar errores de TypeScript en todo el workspace
yarn nx run-many --target=type-check --all

# Ejecutar tests unitarios en todo el workspace
yarn nx run-many --target=test --all

# Ejecutar tests e2e si existen
yarn nx run-many --target=e2e --all

# Verificar si el build es exitoso para todas las apps
yarn nx run-many --target=build --all --configuration=production
# Verificar el estado del caché de Nx
yarn nx print-affected --select=projects

# Limpiar el caché si es necesario
yarn nx reset

# Probar el modo "affected" para verificar qué proyectos son afectados por cambios recientes
yarn nx affected --target=lint --base=main --head=HEAD

# Verificar la configuración de caché
yarn nx report --web

# Analizar el tiempo de build
yarn nx run-many --target=build --all --parallel --maxParallel=3 --verbose

# Generar un perfil de rendimiento para builds
yarn nx run api-main:build --profile=profile.json

# Ver estadísticas de los tiempos de ejecución de tareas
yarn nx print-affected --select=tasks

# Verifica la integración con NestJS (si api-main es una app NestJS)
yarn nx serve api-main

# Verifica la integración con Next.js (si tienes apps Next.js)
yarn nx serve pwa-supervisor

# Probar servicios dependientes (si tienes docker-compose)
yarn nx run api-main:serve-with-deps
# Ver qué paquetes Nx pueden ser actualizados
yarn nx migrate latest --interactive=false

# Verificar inconsistencias en el workspace
yarn nx workspace-lint

# Formatear todos los archivos según las reglas de estilo
yarn nx format:write --all
# Verificar dependencias problemáticas
yarn why <nombre-paquete>

# Verificar duplicados en las dependencias
yarn dedupe

# Verificar vulnerabilidades en las dependencias
yarn audit

# Limpiar caché de Yarn si hay problemas
yarn cache clean