const Critters = require('critters-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

module.exports = {
  publicPath: "./",
  filenameHashing: true,

  configureWebpack: (config) => {
    config.plugins = config.plugins.filter(plugin => !(plugin instanceof HtmlWebpackPlugin));

    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: true,
        scriptLoading: 'defer',
      }),
      new Critters({
        preload: 'swap',
        pruneSource: true,
        compress: true,
      })
    );

    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    };
  },

  chainWebpack: (config) => {
    config.plugin('preload')
      .use(PreloadWebpackPlugin, [{
        rel: 'preload',
        include: 'initial',
        as: (entry) => {
          if (/\.css$/.test(entry)) return 'style';
          if (/\.js$/.test(entry)) return 'script';
          if (/\.(woff2?|eot|ttf|otf)$/.test(entry)) return 'font';
          return 'fetch';
        },
      }]);
  },
};
