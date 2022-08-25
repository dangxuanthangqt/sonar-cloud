const path = require('path');

module.exports = {
  reactScriptsVersion: 'react-scripts',
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.module.rules.push({
        test: /\.svg$/i,
        use: ['@svgr/webpack', 'url-loader'],
      });
      return webpackConfig;
    },
  },
  babel: {
    plugins: [
      // [
      //   'babel-plugin-import',
      //   {
      //     libraryName: '@mui/material',
      //     libraryDirectory: '',
      //     camel2DashComponentName: false,
      //   },
      //   'core',
      // ],
      [
        'babel-plugin-import',
        {
          libraryName: '@mui/icons-material',
          libraryDirectory: '',
          camel2DashComponentName: false,
        },
        'icons',
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@mui/lab',
          libraryDirectory: '',
          camel2DashComponentName: false,
        },
        'lab',
      ],
    ],
  },
};
