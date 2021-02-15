const CracoLessPlugin = require('craco-less');
const CracoAlias = require("craco-alias");
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  paths: [path.resolve(__dirname, "node_modules")],
                },
              },
            },
          ],
        },
      ],
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#ff5100',
              '@link-color': '#ff5100'
            },
            javascriptEnabled: true,
          },
        },
      }
    },
    {
      plugin: CracoAlias,
      options: {
         source: "tsconfig",
         baseUrl: "./src",
         tsConfigPath: "./tsconfig.paths.json"
      }
   }
  ],
};