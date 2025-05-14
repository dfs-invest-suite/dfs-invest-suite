// apps/pwa-supervisor/postcss.config.js
const { join } = require('path');

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: join(__dirname, 'tailwind.config.js'), // Apunta a su propio tailwind.config.js
    },
    autoprefixer: {},
  },
};
