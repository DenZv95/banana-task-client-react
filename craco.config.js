const path = require('path');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  // ...
  webpack: {
    alias: {
      '@': resolvePath('./src/'),
    },
  },
  // ...
  eslint: {
    enable: true /* (default value) */,
    mode: 'extends' /* (default value) */ || 'file',
    configure: {
      /* ... */
    },
    configure: (eslintConfig, { env, paths }) => {
      /* ... */
      return eslintConfig;
    },
    pluginOptions: {
      /* ... */
    },
    pluginOptions: (eslintPluginOptions, { env, paths }) => {
      /* ... */
      return eslintPluginOptions;
    },
  },
};
