// craco.config.js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Modify public path if needed
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: 'auto'
      }
      //webpackConfig.output.publicPath = 'auto';

      // Adding Webpack Module Federation plugin
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'cart',
          filename: 'remoteEntry.js',
          remotes: {
            host: 'host@http://localhost:3000/remoteEntry.js',
            product: "product@http://localhost:3001/remoteEntry.js",
          },
          exposes: {
            './App': './src/App.js',
          },
          shared: {
            react: { singleton: true, eager:true },
            'react-dom': { singleton: true, eager:true },
          },
        })
      );

      // You can return the modified Webpack config
      return webpackConfig;
    },
  },
};
