// apps/pwa-supervisor/tsconfig.spec.json
{
"extends": "./tsconfig.json", // Hereda la configuración base de la aplicación pwa-supervisor
"compilerOptions": {
"outDir": "../../dist/out-tsc", // Directorio de salida estándar de Nx para artefactos de tests
"module": "commonjs", // Los tests con Jest generalmente se ejecutan en un entorno Node.js,
// por lo que CommonJS es el sistema de módulos apropiado aquí.
"moduleResolution": "node", // O "node10" / "bundler" si es consistente con el resto.
// "node" es una opción segura y moderna para la resolución de módulos en Node.js.
// El snapshot tenía "node10", "node" es una actualización menor pero más alineada.
"jsx": "react-jsx", // Configuración para la transformación de JSX por React 17+.
// El snapshot tenía "react", "react-jsx" es la opción moderna.
"allowJs": true, // Permite archivos JavaScript en los tests si es necesario (aunque se prefiere TS).
"esModuleInterop": true, // Habilitado para mejor interoperabilidad (heredado, pero bueno confirmarlo).
"types": ["jest", "node"], // CRUCIAL: Incluye los tipos globales para Jest y Node.js
// para que TypeScript entienda las APIs de testing (describe, it, expect)
// y las APIs de Node.js si se usan en tests.

    // --- Mejoras Futuras Potenciales (Comentadas) ---
    // "strict": true, // Ya debería ser heredado de ./tsconfig.json y tsconfig.base.json. Si no, habilítalo aquí.
                      // Justificación: Asegura la máxima seguridad de tipos también en tus tests.

    // "sourceMap": true, // Genera source maps para los archivos de test transpilados.
                         // Justificación: Facilita el debugging de los tests, permitiendo ver el código TS original
                         // en las trazas de error o al usar un debugger.

    // "noUnusedLocals": true, // Reporta locales no usados dentro de los archivos de test.
    // "noUnusedParameters": true, // Reporta parámetros no usados en funciones de test o helpers.
                               // Justificación (para ambos): Ayuda a mantener los archivos de test limpios y legibles.
                               // Pueden ser un poco ruidosos si usas parámetros placeholder en mocks.

    // "resolveJsonModule": true, // Si necesitas importar archivos .json directamente en tus tests.
                                 // Justificación: Útil para cargar fixtures de datos o configuraciones mockeadas desde JSON.
                                 // Ya está en tsconfig.base.json, por lo que se hereda.

    "skipLibCheck": true // Heredado, pero bueno saber que se aplica para acelerar el type-checking de tests.

},
"include": [
"jest.config.ts", // Incluye el archivo de configuración de Jest de la app para que sea chequeado por TS.

    // Patrones para incluir todos los archivos de test dentro del directorio src de la aplicación.
    // Cubre diferentes extensiones y convenciones de nombrado (.spec, .test).
    "src/**/*.spec.ts",
    "src/**/*.test.ts",
    "src/**/*.spec.tsx",
    "src/**/*.test.tsx",
    "src/**/*.spec.js",  // Si tienes tests en JS
    "src/**/*.test.js",
    "src/**/*.spec.jsx", // Si tienes tests en JSX
    "src/**/*.test.jsx",

    "src/**/*.d.ts",    // Incluye archivos de declaración de tipos personalizados dentro de src, si los tienes.
    "specs/**/*.spec.tsx", // Incluye los tests de la carpeta specs/ (como index.spec.tsx del snapshot)
    "specs/**/*.spec.ts",

    // --- Mejoras Futuras Potenciales para 'include' (Comentadas) ---
    // "src/test-setup.ts", // Si tienes un archivo de setup global para los tests de esta app.
                            // Justificación: Centraliza configuraciones o mocks globales para los tests de pwa-supervisor.

    // "../../../libs/ui-shared/src/**/*.spec.ts", // EJEMPLO EXTREMO: NO RECOMENDADO.
    // "../../../libs/ui-shared/src/**/*.spec.tsx", // NO HAGAS ESTO. Los tests de ui-shared deben correr con su propio tsconfig.spec.json.
                                                    // Justificación de por qué NO: Cada librería/app debe ser responsable de sus propios tests
                                                    // y configuración de tests para mantener el aislamiento y la claridad.
                                                    // Este tsconfig.spec.json es SOLO para los tests de pwa-supervisor.

],
"exclude": [
"node_modules" // Siempre excluir node_modules
// No es necesario excluir explícitamente los archivos de código fuente (no test)
// porque el 'include' ya es específico para archivos de test.
]
}
Use code with caution.
Json
Explicación de Cambios y Mejoras (respecto al snapshot y con comentarios proactivos):
"extends": "./tsconfig.json": Correcto. Hereda la configuración base de la aplicación pwa-supervisor.
"moduleResolution": "node":
El snapshot tenía "node10". Lo he actualizado a "node" que es más moderno y generalmente la opción preferida para entornos Node.js hoy en día. Si tuvieras una razón específica para "node10" (compatibilidad con alguna herramienta muy antigua), podrías revertirlo, pero "node" es más estándar.
Mejora Futura Potencial: Si todo tu ecosistema (incluyendo Jest y sus transformadores) soporta bien la resolución "bundler", podría ser una opción, pero "node" es más seguro para el entorno de tests de Jest.
"jsx": "react-jsx":
El snapshot tenía "react". "react-jsx" es la opción moderna para React 17+ que no requiere import React from 'react' en cada archivo JSX.
"allowJs": true: Mantenido del snapshot. Permite que tengas archivos de test en JavaScript si es necesario, aunque la preferencia es TypeScript.
"types": ["jest", "node"]: Correcto y crucial.
Mejora Futura: "strict": true (Comentado):
Por qué es una mejora: Aunque strict: true ya debería estar heredado de tsconfig.base.json a través de pwa-supervisor/tsconfig.json, ser explícito aquí podría ayudar si alguna vez la cadena de herencia se rompe o se modifica. Asegura que tus tests también se escriban con la máxima seguridad de tipos.
Mejora Futura: "sourceMap": true (Comentado):
Por qué es una mejora: Generar source maps para tus tests transpilados facilita enormemente el debugging. Cuando un test falla, la traza de error te llevará al código TypeScript original en lugar del JavaScript transpilado. También mejora la experiencia al usar el debugger de VS Code con puntos de interrupción en tus tests.
Mejora Futura: "noUnusedLocals": true, "noUnusedParameters": true (Comentados):
Por qué es una mejora: Ayudan a mantener tus archivos de test más limpios y legibles al señalar variables o parámetros de funciones de test que no se están utilizando. Esto puede ser útil para refactorizar tests y eliminar código muerto.
"include":
Se ha mantenido la inclusión de jest.config.ts.
Los patrones para los archivos de test (src/**/\*.spec.ts, etc.) son exhaustivos y cubren diferentes convenciones.
Añadido specs/**/_.spec.tsx y specs/\*\*/_.spec.ts para incluir explícitamente los tests de la carpeta specs/ que tenías en el snapshot (como apps/pwa-supervisor/specs/index.spec.tsx).
Mejora Futura Potencial: "src/test-setup.ts" (Comentado): Si creas un archivo de configuración global para los tests de pwa-supervisor (por ejemplo, para configurar mocks globales para Jest o polyfills), deberías incluirlo aquí.
Comentario de "NO HACER": He añadido un comentario explícito para NO incluir archivos de test de otras librerías (como ui-shared) en este tsconfig.spec.json. Cada proyecto debe manejar sus propios tests.
"exclude": Simplificado a solo node_modules, ya que el include es bastante específico.
