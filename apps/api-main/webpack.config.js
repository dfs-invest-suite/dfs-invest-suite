// RUTA: apps/api-main/webpack.config.js
const { composePlugins, withNx } = require('@nx/webpack');
// const { withReact } = require('@nx/react'); // No necesario para una API NestJS pura

// La configuración base es manejada por withNx() y las opciones en project.json.
// Este archivo es para *personalizaciones adicionales* de Webpack si fueran necesarias.
module.exports = composePlugins(withNx(), (config, { options, context }) => {
  // options: opciones del target 'build' en project.json
  // context: contexto de Nx (root, projectName, targetName, configurationName)

  // Ejemplo de personalización:
  // if (options.configuration === 'production') {
  //   config.plugins.push(new MiPluginDeProduccionPersonalizado());
  // }

  // Ejemplo para añadir un loader específico:
  // config.module.rules.push({
  //   test: /\.node$/,
  //   use: 'node-loader',
  // });

  // IMPORTANTE: Las configuraciones principales como entry (main), tsConfig, outputPath,
  // assets, optimization, outputHashing, generatePackageJson
  // se definen en el `project.json` y son pasadas a `@nx/webpack:webpack`.
  // Este archivo solo debe usarse para extender o sobrescribir
  // la configuración base de Webpack que Nx proporciona.

  return config;
});
// FIN DEL ARCHIVO: apps/api-main/webpack.config.js
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Simplificación del `webpack.config.js` y clarificación de su propósito.",
    "justificacion": "Dado que la mayoría de las opciones de build ahora se gestionan en `project.json` a través del ejecutor `@nx/webpack:webpack`, este archivo se reduce a ser un punto de extensión para personalizaciones avanzadas de Webpack, si son necesarias. Se eliminó `withReact()` ya que `api-main` es NestJS.",
    "impacto": "Configuración más limpia y alineada con la forma en que Nx gestiona los builds con Webpack."
  },
  {
    "mejora": "Acceso a `options` y `context` en la función de composición.",
    "justificacion": "Permite que las personalizaciones de Webpack sean condicionales según la configuración del build (ej. `production`, `development`) o el contexto de Nx.",
    "impacto": "Mayor flexibilidad para personalizaciones avanzadas."
  }
]
*/

/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Eliminar `webpack.config.js` si no se necesitan personalizaciones.",
    "justificacion": "Si la configuración de Webpack por defecto de `@nx/webpack:webpack` (controlada por `project.json`) es suficiente, este archivo puede ser eliminado, y la opción `webpackConfig` del `project.json` también.",
    "impacto": "Mayor simplificación. Requiere probar el build sin este archivo."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
