// RUTA: libs/shared/shutils/jest.config.ts
// TODO: [LIA Legacy - Aplicar jest.config.ts para shutils] - ¡REALIZADO!
// Propósito: Configuración Jest para la librería shutils.
// Relacionado con Casos de Uso: Pruebas unitarias de las utilidades.

export default {
  displayName: 'shutils',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/shared/shutils',
  moduleNameMapper: {
    // <rootDir> para shutils es libs/shared/shutils/
    // Paths a librerías hermanas en libs/shared/
    '^@dfs-suite/shtypes$': '<rootDir>/../shtypes/src/index.ts',
    '^@dfs-suite/sherrors$': '<rootDir>/../sherrors/src/index.ts',
    '^@dfs-suite/shvalidationschemas$':
      '<rootDir>/../shvalidationschemas/src/index.ts',
    '^@dfs-suite/shconstants$': '<rootDir>/../shconstants/src/index.ts',
  },
  // passWithNoTests: false, // Esta librería DEBE tener tests (ej. para UuidUtils, Guard)
};
// RUTA: libs/shared/shutils/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "`moduleNameMapper` con paths relativos correctos a librerías hermanas.", "justificacion": "Asegura que Jest pueda resolver los imports a `@dfs-suite/shtypes`, `@dfs-suite/sherrors`, etc., desde los tests de `shutils`.", "impacto": "Permite la ejecución correcta de los tests." },
  { "mejora": "Opción `passWithNoTests` ausente (default a `false`).", "justificacion": "La librería `shutils` contiene lógica que debe ser probada, por lo que los tests deben ejecutarse y fallar si no hay casos de prueba o si estos fallan.", "impacto": "Fomenta la cobertura de pruebas." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
