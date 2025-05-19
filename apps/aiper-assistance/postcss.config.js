// RUTA: apps/aiper-assistance/postcss.config.js
const { join } = require('path');

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      // O 'tailwindcss': {}, si no usas el plugin de Nx/Next
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
