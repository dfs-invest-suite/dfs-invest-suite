// RUTA: libs/core/domain/tenancy/jest.config.ts
export default {
  displayName: 'core-domain-tenancy',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/core/domain/tenancy',
  moduleNameMapper: {
    // Shared libs (desde la raíz del monorepo)
    // <rootDir> es libs/core/domain/tenancy/
    // ../../../../ -> lleva a la raíz del monorepo
    '^@dfs-suite/shared-types$':
      '<rootDir>/../../../../libs/shared/types/src/index.ts',
    '^@dfs-suite/shared-utils$':
      '<rootDir>/../../../../libs/shared/utils/src/index.ts',
    '^@dfs-suite/shared-errors$':
      '<rootDir>/../../../../libs/shared/errors/src/index.ts',
    '^@dfs-suite/shared-result$':
      '<rootDir>/../../../../libs/shared/result/src/index.ts',
    '^@dfs-suite/shared-constants$':
      '<rootDir>/../../../../libs/shared/constants/src/index.ts',
    '^@dfs-suite/shared-validation-schemas$':
      '<rootDir>/../../../../libs/shared/validation-schemas/src/index.ts',

    // Shared Kernel libs (desde la raíz del monorepo)
    // <rootDir> es libs/core/domain/tenancy/
    // ../../../../ -> raíz del monorepo
    // libs/core/domain/shared-kernel/... <--- Esta es la estructura correcta
    '^@dfs-suite/core-domain-shared-kernel-entities$':
      '<rootDir>/../../../../libs/core/domain/shared-kernel/entities/src/index.ts',
    '^@dfs-suite/core-domain-shared-kernel-value-objects$':
      '<rootDir>/../../../../libs/core/domain/shared-kernel/value-objects/src/index.ts',
    // <--- EL PROBLEMÁTICO
    '^@dfs-suite/core-domain-shared-kernel-events$':
      '<rootDir>/../../../../libs/core/domain/shared-kernel/events/src/index.ts',
    '^@dfs-suite/core-domain-shared-kernel-ports$':
      '<rootDir>/../../../../libs/core/domain/shared-kernel/ports/src/index.ts',
    '^@dfs-suite/core-domain-shared-kernel-commands-queries$':
      '<rootDir>/../../../../libs/core/domain/shared-kernel/commands-queries/src/index.ts',
    '^@dfs-suite/core-domain-shared-kernel-mappers$':
      '<rootDir>/../../../../libs/core/domain/shared-kernel/mappers/src/index.ts',
  },
};
// RUTA: libs/core/domain/tenancy/jest.config.ts
// RUTA: libs/core/domain/tenancy/jest.config.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Rutas de `moduleNameMapper` corregidas y verificadas",
    "justificacion": "Las rutas para las librerías `@dfs-suite/core-domain-shared-kernel-*` ahora suben cuatro niveles hasta la raíz del monorepo (`../../../../`) y luego descienden por la estructura `libs/core/domain/shared-kernel/...`. Este es el ajuste crítico que debería resolver los errores 'Cannot find module' para estas dependencias en los tests de `core-domain-tenancy`.",
    "impacto": "Resolución de errores de importación en Jest, permitiendo que los tests se ejecuten correctamente."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "La clave para `moduleNameMapper` es entender que `<rootDir>` se refiere al directorio donde reside el `jest.config.ts` (en este caso, `libs/core/domain/tenancy/`). Las rutas de mapeo deben ser relativas desde ese punto hasta el archivo `index.ts` de la librería objetivo."
  }
]
*/
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Corrección crítica de rutas en `moduleNameMapper` para `shared-kernel`",
    "justificacion": "Las rutas ahora son correctas, subiendo 4 niveles desde `libs/core/domain/tenancy/` para llegar a la raíz `libs/` y luego navegando a `core/domain/shared-kernel/...`. Esto es crucial para que Jest resuelva estos módulos.",
    "impacto": "Debería resolver los errores 'Cannot find module' para `@dfs-suite/core-domain-shared-kernel-*` en los tests de `core-domain-tenancy`."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Corrección de rutas en `moduleNameMapper` para `shared-kernel`",
    "justificacion": "Las rutas ahora incluyen el segmento `/core/domain/` faltante, apuntando correctamente a la ubicación de las librerías del shared kernel.",
    "impacto": "Debería resolver definitivamente los errores 'Cannot find module' para las dependencias `@dfs-suite/core-domain-shared-kernel-*` en los tests de `core-domain-tenancy`."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Corrección de rutas en `moduleNameMapper`",
    "justificacion": "Las rutas para las librerías `@dfs-suite/core-domain-shared-kernel-*` eran incorrectas. Se ajustaron para reflejar la estructura correcta del monorepo (subiendo 3 niveles desde `libs/core/domain/tenancy/` para llegar a `libs/core/` y luego accediendo a `domain/shared-kernel/...`).",
    "impacto": "Debería resolver los errores 'Cannot find module' para las dependencias del shared-kernel y, consecuentemente, los errores de propiedades no encontradas en `TenantEntity` dentro de los tests."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Es vital que estas rutas sean exactas. Una forma de verificar es navegar manualmente desde la carpeta `libs/core/domain/tenancy` usando las rutas relativas."
  }
]
*/
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Inclusión de `moduleNameMapper` explícito",
    "justificacion": "Garantiza que Jest resuelva correctamente los alias de paths de Nx para las dependencias de esta librería, lo cual es crucial para que los tests encuentren los módulos importados.",
    "impacto": "Debería resolver los errores 'Cannot find module' y, consecuentemente, los errores de propiedades no encontradas en `TenantEntity`."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Las rutas en `moduleNameMapper` son relativas a `<rootDir>`, que para este archivo es `libs/core/domain/tenancy/`. Es vital que estas rutas apunten correctamente a los `index.ts` de las librerías dependientes."
  },
  {
    "nota": "Se añadió un mapeo para `@dfs-suite/core-domain-shared-kernel-events` como ejemplo, ya que `TenantEntity` (un `AggregateRoot`) usa `IDomainEvent` y `addEvent` que dependen de esta librería del shared-kernel."
  }
]
*/
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Adición de `moduleNameMapper` explícito",
    "justificacion": "Para forzar la resolución de los alias de path de Nx en el entorno de Jest si el preset automático no es suficiente para esta librería. Esto es una solución común para problemas de 'Cannot find module' en monorepos complejos con Jest.",
    "impacto": "Debería resolver los errores de importación de los módulos `@dfs-suite/shared-*` y `@dfs-suite/core-domain-shared-kernel-*` en los tests."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Este `moduleNameMapper` es específico para `core-domain-tenancy`. Si otras librerías tienen problemas similares, podrían necesitar un mapeo similar o una revisión de la configuración global de Jest en `jest.preset.js`."
  }
]
*/
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Explicit `moduleNameMapper` for Jest",
    "justificacion": "Se añadió `moduleNameMapper` para asegurar que Jest pueda resolver los alias de path de Nx para las librerías compartidas y del shared-kernel. Aunque el preset de Nx debería manejar esto, a veces se necesitan mapeos explícitos, especialmente si hay configuraciones complejas o anidamiento.",
    "impacto": "Debería resolver los errores 'Cannot find module' en los tests de `core-domain-tenancy`."
  },
  {
    "mejora": "Ajuste de `displayName`",
    "justificacion": "Cambiado a `core-domain-tenancy` para mayor claridad, aunque `tenancy` también es aceptable.",
    "impacto": "Cosmético."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Si esto soluciona el problema, idealmente se investigaría por qué el `moduleNameMapper` automático del preset de Nx no funcionó para esta librería específica. Podría haber una sutil configuración en conflicto."
  },
  {
    "nota": "Las rutas en `moduleNameMapper` deben ser precisas. `<rootDir>` aquí se refiere a `libs/core/domain/tenancy/`."
  }
]
*/
