# Arquitectura Hexagonal en Monorepos NX - Mejores Prácticas 2025

## Resumen Ejecutivo

Este informe técnico proporciona un análisis comprensivo de las mejores prácticas para implementar arquitectura hexagonal (también conocida como Ports and Adapters) en monorepos gestionados con NX. La arquitectura hexagonal promueve una clara separación entre la lógica de negocio (dominio) y los detalles técnicos (infraestructura), permitiendo la creación de sistemas más mantenibles, testables y adaptables. Al combinar estos principios con las capacidades de gestión de monorepos de NX, podemos crear proyectos altamente modulares y escalables.

## 1. Fundamentos de Arquitectura Hexagonal

### 1.1 Principios Clave

La arquitectura hexagonal, introducida por Alistair Cockburn en 2005, se basa en los siguientes principios fundamentales:

- **Aislamiento del dominio**: Separación estricta de la lógica de negocio (el núcleo de la aplicación) de los componentes técnicos y externos.
- **Independencia de tecnologías**: El dominio no debe depender de frameworks, bases de datos, u otras tecnologías específicas.
- **Puertos y adaptadores**: Comunicación a través de interfaces bien definidas (puertos) implementadas por adaptadores específicos.
- **Dirección de dependencias**: Las dependencias siempre apuntan hacia adentro, desde la infraestructura hacia el dominio, nunca al revés.

### 1.2 Capas Principales

La arquitectura hexagonal típicamente consta de tres capas principales:

1. **Dominio**: Contiene entidades, reglas de negocio, servicios de dominio y puertos (interfaces).
2. **Aplicación**: Orquesta los casos de uso coordinando los servicios de dominio.
3. **Infraestructura**: Implementa los adaptadores que conectan con sistemas externos (bases de datos, APIs, UI, etc.).

## 2. Estructura Óptima de un Monorepo NX con Arquitectura Hexagonal

### 2.1 Principios de Organización

En un monorepo NX, la estructura debe reflejar la arquitectura hexagonal mientras aprovecha las capacidades de NX para gestionar dependencias y reutilización de código:

1. **Organización basada en dominios**: Estructurar las bibliotecas por dominios de negocio en lugar de por capas técnicas.
2. **Visibilidad controlada**: Usar etiquetas y restricciones de NX para controlar qué librerías pueden depender de otras.
3. **API pública limitada**: Cada librería debe exponer únicamente lo que otras librerías necesitan a través de ficheros barrel (index.ts).
4. **Aplicaciones ligeras**: Las aplicaciones (en /apps) deben ser principalmente orquestadores que componen librerías.

### 2.2 Estructura de Carpetas Recomendada

```
monorepo/
├── apps/                              # Aplicaciones deployables
│   ├── api/                           # Backend API
│   └── web/                           # Frontend web
├── libs/                              # Librerías (80% del código)
│   ├── domain/                        # Dominio compartido
│   │   ├── core/                      # Entidades, value objects, etc.
│   │   ├── features/                  # Features específicos del dominio
│   │   └── ports/                     # Interfaces/puertos
│   ├── shared/                        # Código compartido entre dominios
│   │   ├── utils/                     # Utilidades generales
│   │   ├── ui/                        # Componentes UI reutilizables (frontend)
│   │   └── config/                    # Configuraciones compartidas
│   ├── feature-a/                     # Organización por feature/dominio
│   │   ├── domain/                    # Lógica de dominio específica
│   │   ├── application/               # Casos de uso, servicios de aplicación
│   │   └── infrastructure/            # Implementaciones específicas
│   └── feature-b/
│       ├── domain/
│       ├── application/
│       └── infrastructure/
```

## 3. Organización de Librerías en Arquitectura Hexagonal

### 3.1 Librerías de Dominio

Las librerías de dominio contienen la lógica de negocio y son independientes de tecnologías específicas.

#### Características Clave:

- No dependen de ninguna otra capa
- Contienen entidades, value objects, servicios de dominio, y definiciones de puertos (interfaces)
- No incluyen implementaciones concretas de bases de datos, APIs externas, etc.
- Generalmente no requieren dependencias de paquetes externos complejos

#### Estructura Interna Recomendada:

```
domain/
├── entities/        # Objetos con identidad
├── value-objects/   # Objetos inmutables sin identidad
├── services/        # Lógica de negocio que opera sobre múltiples entidades
├── ports/           # Definición de interfaces para comunicación externa
│   ├── input/       # Puertos para interacción entrante (casos de uso, etc.)
│   └── output/      # Puertos para interacción saliente (repositorios, etc.)
├── events/          # Eventos de dominio
└── exceptions/      # Excepciones específicas del dominio
```

### 3.2 Librerías de Aplicación

Orquestan los casos de uso de la aplicación utilizando la lógica del dominio.

#### Características Clave:

- Implementan puertos de entrada (input ports)
- Dependen solo del dominio
- Coordinan flujos de trabajo utilizando servicios de dominio
- Mantienen la independencia de tecnologías específicas

#### Estructura Interna Recomendada:

```
application/
├── use-cases/       # Implementación de casos de uso específicos
├── commands/        # Implementación de comandos (patrón CQRS)
├── queries/         # Implementación de consultas (patrón CQRS)
├── services/        # Servicios que orquestan múltiples casos de uso
├── mappers/         # Convertidores entre DTOs y entidades de dominio
└── dtos/            # Objetos de transferencia de datos
```

### 3.3 Librerías de Infraestructura

Contienen implementaciones concretas que conectan la aplicación con sistemas externos.

#### Características Clave:

- Implementan puertos de salida (output ports) del dominio
- Contienen adaptadores para bases de datos, APIs externas, sistemas de mensajería, etc.
- Dependen de frameworks y librerías específicas

#### Estructura Interna Recomendada:

```
infrastructure/
├── adapters/               # Implementaciones de puertos
│   ├── persistence/        # Adaptadores para bases de datos
│   ├── messaging/          # Adaptadores para sistemas de mensajería
│   ├── external-apis/      # Adaptadores para APIs externas
│   └── ui/                 # Adaptadores para interfaces de usuario
├── config/                 # Configuraciones de infraestructura
├── security/               # Implementaciones de seguridad
└── serialization/          # Serializadores/deserializadores
```

### 3.4 Librerías Compartidas (Shared)

Contienen código reutilizable en múltiples dominios.

#### Características Clave:

- Utilidades técnicas sin lógica de negocio específica
- Componentes de UI reutilizables (en aplicaciones frontend)
- Configuraciones comunes
- No deben contener lógica de dominio específica

#### Estructura Interna Recomendada:

```
shared/
├── utils/                 # Utilidades genéricas
├── ui/                    # Componentes UI reutilizables (frontend)
├── types/                 # Definiciones de tipos comunes
├── constants/             # Constantes compartidas
└── testing/               # Utilidades para testing
```

## 4. Control de Dependencias con NX

### 4.1 Enforcement de Límites con Tags

NX permite definir y hacer cumplir límites entre proyectos mediante etiquetas (tags) y reglas en el fichero `.eslintrc.json`:

```json
{
  "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "enforceBuildableLibDependency": true,
        "allow": [],
        "depConstraints": [
          {
            "sourceTag": "type:domain",
            "onlyDependOnLibsWithTags": ["type:domain"]
          },
          {
            "sourceTag": "type:application",
            "onlyDependOnLibsWithTags": ["type:domain", "type:application"]
          },
          {
            "sourceTag": "type:infrastructure",
            "onlyDependOnLibsWithTags": [
              "type:domain",
              "type:application",
              "type:infrastructure",
              "type:shared"
            ]
          },
          {
            "sourceTag": "type:shared",
            "onlyDependOnLibsWithTags": ["type:shared"]
          },
          {
            "sourceTag": "type:app",
            "onlyDependOnLibsWithTags": [
              "type:domain",
              "type:application",
              "type:infrastructure",
              "type:shared"
            ]
          }
        ]
      }
    ]
  }
}
```

### 4.2 Estrategia Multidimensional de Tagging

Se pueden combinar múltiples dimensiones de tags para un control más granular:

```json
{
  "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "depConstraints": [
          {
            "sourceTag": "scope:feature-a",
            "onlyDependOnLibsWithTags": ["scope:feature-a", "scope:shared"]
          },
          {
            "sourceTag": "scope:feature-b",
            "onlyDependOnLibsWithTags": ["scope:feature-b", "scope:shared"]
          },
          {
            "sourceTag": "type:domain",
            "onlyDependOnLibsWithTags": ["type:domain"]
          },
          {
            "sourceTag": "type:application",
            "onlyDependOnLibsWithTags": ["type:domain", "type:application"]
          },
          {
            "sourceTag": "type:infrastructure",
            "onlyDependOnLibsWithTags": [
              "type:domain",
              "type:application",
              "type:infrastructure",
              "type:shared"
            ]
          }
        ]
      }
    ]
  }
}
```

## 5. Implementación Práctica

### 5.1 Generación de Librerías con NX

Para crear las librerías con estructura hexagonal:

```bash
# Crear librería de dominio
nx generate @nx/js:library --name=domain-core --directory=domain --importPath=@myorg/domain/core --tags=type:domain,scope:shared

# Crear librería de aplicación
nx generate @nx/js:library --name=feature-a-application --directory=feature-a --importPath=@myorg/feature-a/application --tags=type:application,scope:feature-a

# Crear librería de infraestructura
nx generate @nx/js:library --name=feature-a-infrastructure --directory=feature-a --importPath=@myorg/feature-a/infrastructure --tags=type:infrastructure,scope:feature-a
```

### 5.2 Flujo de Datos Entre Capas

En un sistema con arquitectura hexagonal, el flujo de datos típico sería:

1. **Entrada desde el mundo exterior**: A través de adaptadores de entrada (controllers, interfaces gráficas)
2. **Los adaptadores de entrada**: Convierten datos externos al formato que espera la aplicación
3. **Capa de aplicación**: Orquesta los casos de uso invocando la lógica del dominio
4. **Capa de dominio**: Ejecuta la lógica de negocio, utilizando puertos de salida cuando necesita servicios externos
5. **Adaptadores de salida**: Implementan los puertos de salida y convierten formatos de dominio a formatos externos
6. **Sistemas externos**: Bases de datos, servicios externos, etc.

### 5.3 Gestión de Dependencias de Proyectos

Para asegurar que las dependencias entre librerías se mantienen correctamente:

```typescript
// En nx.json:
{
  "npmScope": "myorg",
  "projects": {
    "domain-core": {
      "tags": ["type:domain", "scope:shared"]
    },
    "feature-a-domain": {
      "tags": ["type:domain", "scope:feature-a"]
    },
    "feature-a-application": {
      "tags": ["type:application", "scope:feature-a"]
    },
    "feature-a-infrastructure": {
      "tags": ["type:infrastructure", "scope:feature-a"]
    }
  }
}
```

## 6. Ventajas y Desafíos

### 6.1 Ventajas de esta Arquitectura

- **Testabilidad**: Las capas de dominio y aplicación son altamente testables al no depender de infraestructura concreta.
- **Flexibilidad**: Facilita el cambio de tecnologías externas sin modificar la lógica de negocio.
- **Modularidad**: Clara separación de responsabilidades y código organizado en módulos cohesivos.
- **Mantenibilidad**: Código más limpio y organizado, con dependencias explícitas y controladas.
- **Paralelización**: Equipos pueden trabajar en diferentes dominios simultáneamente.
- **Reutilización**: Librerías compartidas disponibles para todos los dominios.

### 6.2 Desafíos Potenciales

- **Complejidad inicial**: Mayor número de archivos y estructura más compleja.
- **Curva de aprendizaje**: Requiere comprensión de principios arquitectónicos y herramientas.
- **Sobreestructuración**: Riesgo de crear demasiadas capas y abstracciones para proyectos pequeños.
- **Gestión de CI/CD**: Requiere configuración adecuada para optimizar tiempos de build.

## 7. Recomendaciones para Optimización

### 7.1 Optimización de Rendimiento

- **Caché Distribuido**: Utilizar NX Cloud para caché distribuido entre desarrolladores y CI.
- **Ejecución Afectada**: Usar comandos `nx affected` para ejecutar tareas solo en proyectos afectados.
- **Ejecución Paralela**: Aprovechar la ejecución en paralelo de tareas mediante `--parallel`.
- **Ejecución Distribuida**: Para monorepos grandes, considerar la ejecución distribuida.

### 7.2 Mejores Prácticas de Desarrollo

- **Archivos Barrel**: Usar archivos index.ts para controlar la API pública de cada librería.
- **Consistencia en Convenciones**: Mantener nombres y estructuras coherentes en todo el proyecto.
- **Documentación Clara**: Documentar la arquitectura y las reglas de dependencia.
- **Revisión de Código**: Verificar que las reglas arquitectónicas se respeten en las revisiones.

## 8. Conclusiones

La combinación de arquitectura hexagonal con monorepos NX proporciona una solución robusta para desarrollar sistemas complejos que son mantenibles, testables y escalables. Al organizar el código en librerías bien definidas con responsabilidades claras y límites estrictos, podemos crear sistemas que:

1. Mantienen la lógica de negocio aislada de los detalles técnicos
2. Permiten cambios tecnológicos con impacto mínimo
3. Facilitan el trabajo en equipo y la paralelización
4. Promueven la reutilización de código

Para implementar esta arquitectura con éxito, es crucial entender tanto los principios de la arquitectura hexagonal como las características y capacidades de NX. La inversión inicial en la estructuración adecuada del proyecto se traduce en beneficios significativos a medida que el sistema crece y evoluciona.

---

## Referencias

1. Nx Official Documentation: https://nx.dev/
2. Monorepo Tools: https://monorepo.tools/
3. Blog "Opinionated Guidelines for Large Nx Angular Projects": https://blog.brecht.io/opinionated-guidelines-for-large-nx-angular-projects/
4. Hexagonal Architecture Overview: https://tsh.io/blog/hexagonal-architecture/
5. Domain-Driven Hexagon Guidelines for Nx Projects: https://gaetanzanella.github.io/2024-02-24/guidelines-for-nx-domain-driven-hexagon-projects
6. Nx Architecture Guide: https://nx.dev/blog/architecting-angular-applications
7. The Ultimate Guide to Mastering Hexagonal Architecture: https://scalastic.io/en/hexagonal-architecture-domain/
