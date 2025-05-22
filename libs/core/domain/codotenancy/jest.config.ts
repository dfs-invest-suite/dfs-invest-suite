// RUTA: libs/core/domain/codotenancy/jest.config.ts
// Autor: L.I.A Legacy (IA Asistente) - VERSIÓN REAFIRMADA
import path from 'node:path';

// libs/core/domain/codotenancy/ -> subir 4 niveles
const monorepoRoot = path.resolve(__dirname, '../../../../');

export default {
  displayName: 'codotenancy',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/core/domain/codotenancy',
  moduleNameMapper: {
    '^@dfs-suite/shtypes$': path.join(
      monorepoRoot,
      'libs/shared/shtypes/src/index.ts'
    ),
    '^@dfs-suite/shutils$': path.join(
      monorepoRoot,
      'libs/shared/shutils/src/index.ts'
    ),
    '^@dfs-suite/sherrors$': path.join(
      monorepoRoot,
      'libs/shared/sherrors/src/index.ts'
    ),
    '^@dfs-suite/shresult$': path.join(
      monorepoRoot,
      'libs/shared/shresult/src/index.ts'
    ),
    // ^@dfs-suite/shconstants$ (Revisar si codotenancy o sus tests lo usan directamente)
    // ^@dfs-suite/shvalidationschemas$ (Revisar si codotenancy o sus tests lo usan directamente)

    '^@dfs-suite/cdskentities$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskentities/src/index.ts'
    ),
    '^@dfs-suite/cdskvalueobjects$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskvalueobjects/src/index.ts'
    ),
    '^@dfs-suite/cdskevents$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskevents/src/index.ts'
    ),
  },
  passWithNoTests: false,
};
// RUTA: libs/core/domain/codotenancy/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Reafirmada la estrategia de `moduleNameMapper` con paths absolutos calculados desde `monorepoRoot`, asegurando que `monorepoRoot` se calcule con 4 niveles `../` desde `codotenancy`.", "justificacion": "Esta estrategia fue exitosa para `cdskcommandsqueries` y es la más robusta para la resolución de módulos en Jest dentro de un monorepo Nx cuando los presets pueden tener comportamientos variables con `<rootDir>`.", "impacto": "Máxima probabilidad de resolver los errores 'Cannot find module' para los tests de `codotenancy` una vez que los cambios en los tipos base (`AggregateId`, genéricos en `Entity`/`AggregateRoot`, `IDomainEvent.aggregateId`) sean aplicados." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
