// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/jest.config.ts
// Autor: L.I.A Legacy (IA Asistente)
import path from 'node:path'; // Asegurar que path esté importado

// Determinar la raíz del monorepo desde la ubicación de este archivo de config
// Este archivo está en libs/core/domain/shared-kernel/cdskcommandsqueries/jest.config.ts
// Necesitamos subir 5 niveles para llegar a la raíz del monorepo.
const monorepoRoot = path.resolve(__dirname, '../../../../../');

export default {
  displayName: 'cdskcommandsqueries',
  preset: '../../../../../jest.preset.js', // Correcto (5 niveles)
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../../coverage/libs/core/domain/shared-kernel/cdskcommandsqueries',
  moduleNameMapper: {
    // Mapeos absolutos desde la raíz del monorepo
    '^@dfs-suite/shtypes$': path.join(
      monorepoRoot,
      'libs/shared/shtypes/src/index.ts'
    ),
    '^@dfs-suite/shutils$': path.join(
      monorepoRoot,
      'libs/shared/shutils/src/index.ts'
    ),
    '^@dfs-suite/shresult$': path.join(
      monorepoRoot,
      'libs/shared/shresult/src/index.ts'
    ),
    '^@dfs-suite/sherrors$': path.join(
      monorepoRoot,
      'libs/shared/sherrors/src/index.ts'
    ),
    '^@dfs-suite/shconstants$': path.join(
      monorepoRoot,
      'libs/shared/shconstants/src/index.ts'
    ),
    // Si cdskcommandsqueries dependiera de otras cdsk* directamente, se añadirían aquí
    // Por ejemplo, si dependiera de cdskentities:
    // '^@dfs-suite/cdskentities$': path.join(
    //   monorepoRoot,
    //   'libs/core/domain/shared-kernel/cdskentities/src/index.ts'
    // ),
  },
  passWithNoTests: false,
};
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Uso de `path.resolve` y `path.join` para construir paths absolutos en `moduleNameMapper`.", "justificacion": "Esto elimina cualquier ambigüedad sobre cómo `<rootDir>` es interpretado por Jest o `ts-jest` en este contexto específico. Se calcula la raíz del monorepo (`monorepoRoot`) y se construyen los paths a las librerías `shared` desde allí.", "impacto": "Debería ser la solución más robusta para los errores 'No se encuentra el módulo' en los tests de esta librería." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
