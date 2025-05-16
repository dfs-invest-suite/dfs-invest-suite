const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you use Next.js App Router, which is the default starting in Nx 16.5.0.
    // See https://nx.dev/recipes/next/custom-server
    svgr: false, // Mantener esto según lo generado por Nx
  },
  output: 'standalone', // <--- AÑADIR ESTA LÍNEA
  // Si en el futuro se necesitan variables de entorno en el cliente:
  // env: {
  //   NEXT_PUBLIC_MY_VARIABLE: process.env.MY_VARIABLE_FROM_HOST,
  // },
  // experimental: {
  //   esmExternals: 'loose', // A veces ayuda con módulos CommonJS en monorepos
  // },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
