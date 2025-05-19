// RUTA: apps/aiper-assistance/next.config.js
const { composePlugins, withNx } = require('@nx/next');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} **/
const nextConfig = {
  nx: { svgr: false },
  // output: 'standalone', // MANTENER COMENTADO POR AHORA
  transpilePackages: [
    '@dfs-suite/ui-shared', // CRUCIAL
    '@dfs-suite/shared-types', // Si los usas en cliente
    '@dfs-suite/shared-utils', // Si los usas en cliente
    // Añade aquí CUALQUIER OTRA librería @dfs-suite/* que necesites
  ],
  webpack: (config, { isServer }) => {
    // Simplificado el { buildId, dev, ... } por ahora
    config.resolve = config.resolve || {};
    config.resolve.plugins = config.resolve.plugins || [];

    // Asegura que el configFile apunta al tsconfig.base.json RAÍZ
    // donde están definidos los paths de las LIBRERÍAS (@dfs-suite/*)
    const tsconfigBasePath = path.resolve(
      __dirname,
      '../../tsconfig.base.json'
    );

    // Quitar cualquier TsconfigPathsPlugin existente para evitar duplicados o configuraciones incorrectas
    config.resolve.plugins = config.resolve.plugins.filter(
      (plugin) => plugin.constructor.name !== 'TsconfigPathsPlugin'
    );

    // Añadir una instancia limpia de TsconfigPathsPlugin apuntando al tsconfig.base.json
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: tsconfigBasePath,
        extensions: ['.ts', '.tsx', '.js', '.jsx'], // Asegurar que estas extensiones se consideren
        // mainFields: ['module', 'main'], // A veces ayuda con la resolución de paquetes
        // logLevel: 'debug', // Descomentar para MÁXIMO detalle
      })
    );

    // Log para depuración
    if (isServer) {
      // Loguear solo una vez para no saturar
      console.log(
        `[AIPER_WEBPACK_CONFIG SERVER] tsconfig.base.json path for TsconfigPathsPlugin: ${tsconfigBasePath}`
      );
      console.log(
        `[AIPER_WEBPACK_CONFIG SERVER] Final resolve.plugins:`,
        config.resolve.plugins.map((p) => p.constructor.name)
      );
    }

    return config;
  },
};

const plugins = [withNx]; // withNx maneja la integración con el workspace Nx
module.exports = composePlugins(...plugins)(nextConfig);
