// apps/pwa-supervisor/next.config.js
//@ts-check

const path = require('path');

const { composePlugins, withNx } = require('@nx/next');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  transpilePackages: ['@dfs-suite/ui-shared'],
  compiler: {
    // removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { isServer, webpack, buildId }) => {
    // buildId puede ser útil para logs únicos
    const monorepoRoot = path.resolve(__dirname, '../..');
    const tsconfigBasePath = path.join(monorepoRoot, 'tsconfig.base.json');
    const uiSharedPath = path.join(monorepoRoot, 'libs/ui-shared/src/index.ts'); // Ruta directa al index.ts

    console.log(
      `\n[${buildId} - ${
        isServer ? 'Server' : 'Client'
      }] Usando tsconfig.base.json desde: ${tsconfigBasePath}`
    );
    console.log(
      `[${buildId} - ${
        isServer ? 'Server' : 'Client'
      }] Path directo a ui-shared: ${uiSharedPath}`
    );
    console.log(
      `[${buildId} - ${
        isServer ? 'Server' : 'Client'
      }] Webpack config.resolve.alias ANTES:`,
      JSON.stringify(config.resolve.alias, null, 2)
    );

    // Asegurarse de que config.resolve y config.resolve.alias existan
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    // === INICIO MODIFICACIÓN: Añadir alias manualmente ===
    if (!config.resolve.alias['@dfs-suite/ui-shared']) {
      config.resolve.alias['@dfs-suite/ui-shared'] = uiSharedPath;
      console.log(
        `[${buildId} - ${
          isServer ? 'Server' : 'Client'
        }] === Alias @dfs-suite/ui-shared AÑADIDO MANUALMENTE ===`
      );
    }
    // === FIN MODIFICACIÓN ===

    if (!config.resolve.plugins) {
      config.resolve.plugins = [];
    }
    // Mantenemos TsconfigPathsPlugin por si ayuda con otros alias o tiene lógica adicional,
    // aunque ahora hemos forzado el alias para ui-shared.
    const tsconfigPluginInstance = new TsconfigPathsPlugin({
      configFile: tsconfigBasePath,
      // logLevel: "debug", // Descomentar para logs del plugin si es necesario
    });
    config.resolve.plugins.push(tsconfigPluginInstance);

    console.log(
      `[${buildId} - ${
        isServer ? 'Server' : 'Client'
      }] Webpack config.resolve.alias DESPUÉS:`,
      JSON.stringify(config.resolve.alias, null, 2)
    );

    config.resolve.extensions = [...config.resolve.extensions, '.ts', '.tsx'];

    const libsDir = path.resolve(__dirname, '../../libs');
    if (config.resolve.modules && !config.resolve.modules.includes(libsDir)) {
      config.resolve.modules.push(libsDir);
    } else if (!config.resolve.modules) {
      config.resolve.modules = [libsDir, 'node_modules'];
    }

    return config;
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
// apps/pwa-supervisor/next.config.js
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Adición manual del alias `@dfs-suite/ui-shared` a Webpack.",
    "justificacion": "Dado que `TsconfigPathsPlugin` y otras configuraciones no parecen estar aplicando el alias de forma que Webpack lo resuelva durante el build de Next.js, se añade el alias explícitamente a `config.resolve.alias`. Se apunta directamente al `index.ts` de la librería `ui-shared`.",
    "impacto": "Esta es una intervención directa en la configuración de Webpack y tiene una alta probabilidad de resolver el error `Module not found` para `@dfs-suite/ui-shared` si el path es correcto."
  },
  {
    "mejora": "Logs mejorados para `buildId` y estado del alias.",
    "justificacion": "Añadir `buildId` a los logs ayuda a diferenciar las salidas si hay múltiples compilaciones (server/client). Se loguea el estado de `config.resolve.alias` antes y después de la modificación manual, y se añade un log específico cuando se añade el alias manualmente.",
    "impacto": "Mejor depuración de la configuración de Webpack."
  },
  {
    "mejora": "Asegurar la existencia de `config.resolve` y `config.resolve.alias`.",
    "justificacion": "Antes de intentar modificar `config.resolve.alias`, es más seguro asegurarse de que estos objetos existan.",
    "impacto": "Previene errores potenciales si `config.resolve` no estuviera inicializado."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Si esto funciona, es una solución efectiva pero también indica que la integración automática de los alias de `tsconfig.base.json` por parte de `@nx/next` y/o `TsconfigPathsPlugin` no está funcionando como se esperaría en este entorno específico. Podría ser una peculiaridad de la versión de Next.js (15.x) o Nx."
  },
  {
    "nota": "Si hay muchas librerías con este problema, añadir todos los alias manualmente sería tedioso y menos mantenible que hacer funcionar `TsconfigPathsPlugin` correctamente para todos. Pero para una o dos librerías problemáticas, es una solución viable."
  }
]
*/
