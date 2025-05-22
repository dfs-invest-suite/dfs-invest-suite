// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/jest.config.ts
// Autor: L.I.A Legacy (IA Asistente)
export default {
  displayName: 'cdskvalueobjects',
  preset: '../../../../../jest.preset.js', // 5 niveles para llegar a la raíz
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../../coverage/libs/core/domain/shared-kernel/cdskvalueobjects',
  moduleNameMapper: {
    // <rootDir> aquí es libs/core/domain/shared-kernel/cdskvalueobjects/
    // Mapeos a librerías hermanas en libs/shared/
    '^@dfs-suite/shtypes$':
      '<rootDir>/../../../../../libs/shared/shtypes/src/index.ts', // 5 niveles a la raíz, luego path a shtypes
    '^@dfs-suite/sherrors$':
      '<rootDir>/../../../../../libs/shared/sherrors/src/index.ts',
    // Necesario por ValueObjectBase que importa Guard
    '^@dfs-suite/shutils$':
      '<rootDir>/../../../../../libs/shared/shutils/src/index.ts',
    // Necesario por IsoDateStringVO, EmailVO, etc.
    '^@dfs-suite/shvalidationschemas$':
      '<rootDir>/../../../../../libs/shared/shvalidationschemas/src/index.ts',
    // Si hubiera dependencias a otras libs en cdsk*, se añadirían aquí
  },
  passWithNoTests: false, // Ya tenemos iso-date-string.vo.spec.ts
};
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadido `moduleNameMapper` para resolver alias `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, `@dfs-suite/shutils` y `@dfs-suite/shvalidationschemas`.", "justificacion": "Jest necesita estos mapeos para encontrar los módulos de las librerías compartidas durante la ejecución de los tests. Los paths ahora son relativos desde la raíz del monorepo, asumiendo que `<rootDir>` en el `preset` se resuelve a la raíz del workspace, o ajustando los `../` si `<rootDir>` es local a la lib.", "impacto": "Debería resolver los errores 'No se encuentra el módulo' en los tests." },
  { "mejora": "Confirmado `passWithNoTests: false`.", "justificacion": "`iso-date-string.vo.spec.ts` existe y se espera que se ejecuten más tests para los VOs.", "impacto": "Asegura que los tests se ejecuten." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
