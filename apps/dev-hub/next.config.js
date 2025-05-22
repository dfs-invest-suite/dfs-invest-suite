// RUTA: apps/<app-name>/next.config.js
// @ts-check

const { composePlugins, withNx } = require('@nx/next');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin'); // Solo si se necesita explícitamente
// const path = require('path'); // Solo si se necesita explícitamente

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // output: 'standalone', // Considerar para despliegues Docker optimizados

  // Añadir transpilePackages si esta app usa directamente código TS/ESM de libs/ui-shared
  // o de otras librerías @dfs-suite que no estén pre-compiladas a CJS de forma compatible.
  // transpilePackages: ['@dfs-suite/ui-shared', '@dfs-suite/shutils'], // Ejemplo

  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production', // Opcional
  // },

  // No es necesario el webpack alias manual aquí si tsconfig.base.json y el setup de Nx
  // resuelven los paths correctamente. Solo añadir si hay problemas persistentes.
  // webpack: (config, { isServer }) => {
  //   const monorepoRoot = path.resolve(__dirname, '../..'); // Ajustar según profundidad
  //   if (!config.resolve) config.resolve = {};
  //   if (!config.resolve.alias) config.resolve.alias = {};
  //   if (!config.resolve.plugins) config.resolve.plugins = [];

  //   // Ejemplo de alias manual si fuera necesario:
  //   // config.resolve.alias['@dfs-suite/ui-shared'] = path.join(monorepoRoot, 'libs/ui-shared/src/index.ts');

  //   // TsconfigPathsPlugin generalmente es manejado por Nx, pero si se necesita:
  //   // config.resolve.plugins.push(
  //   //   new TsconfigPathsPlugin({
  //   //     configFile: path.join(monorepoRoot, 'tsconfig.base.json'),
  //   //   })
  //   // );
  //   return config;
  // },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
// RUTA: apps/<app-name>/next.config.js
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Plantilla `next.config.js` más completa y comentada.", "justificacion": "Proporciona una base más robusta para las apps Next.js, con placeholders para `transpilePackages` y `webpack` si se necesitaran ajustes de resolución de módulos avanzados.", "impacto": "Configuración más clara y preparada para futuras necesidades." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La necesidad de `transpilePackages` o de ajustes en `webpack.resolve.alias` (o `TsconfigPathsPlugin`) dependerá de cómo se compilen y exporten las librerías `@dfs-suite/*` y si Next.js las puede resolver directamente. `pwa-supervisor` y `aiper-assistance` ya tienen configuraciones para esto." },
  { "nota": "La sección `compiler.removeConsole` es útil para producción." }
]
*/
