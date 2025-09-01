const webpack = require("webpack");

module.exports = function (context, options) {
  return {
    name: "webpack-config",
    configureWebpack(config, isServer, utils) {
      // Fix React JSX runtime resolution for React 17
      config.resolve.alias = {
        ...config.resolve.alias,
        "react/jsx-runtime": require.resolve("react/jsx-runtime.js"),
        "react/jsx-dev-runtime": require.resolve("react/jsx-dev-runtime.js"),
      };

      // Add polyfills for Node.js core modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve("buffer"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util"),
        crypto: require.resolve("crypto-browserify"),
        fs: false,
        path: false,
        os: false,
      };

      // Add buffer polyfill to plugins
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        })
      );

      return config;
    },
  };
};
