// craco.config.js
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Modify public path if needed
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: "auto",
      };
      //webpackConfig.output.publicPath = 'auto';

      // Adding Webpack Module Federation plugin
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "host",
          filename: "remoteEntry.js",
          remotes: {
            cart: "cart@http://localhost:3002/remoteEntry.js",
            product: "product@http://localhost:3001/remoteEntry.js",
          },
          exposes: {
            "./App": "./src/App.js",
            "./common": "./src/utils/commonscript.js",
            "./EventBus": "./src/utils/eventBus.js",
          },
          shared: {
            react: { singleton: true, eager: true },
            "react-dom": { singleton: true, eager: true },
          },
        })
      );

      // You can return the modified Webpack config
      return webpackConfig;
    },
  },
};
