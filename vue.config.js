const HtmlWebpackPlugin = require("html-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  publicPath: "./",
  filenameHashing: true,

  devServer: {
    hot: false,
  },

  configureWebpack: (config) => {
    
    config.plugins = config.plugins.filter(
      (plugin) => !(plugin instanceof HtmlWebpackPlugin)
    );

    config.plugins.push(
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
        inject: true,
        scriptLoading: "defer",
      }),

      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      })
    );

    
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    };
  },

  chainWebpack: (config) => {
    
    config.plugin("preload").use(PreloadWebpackPlugin, [
      {
        rel: "preload",
        include: "initial",
        as: (entry) => {
          if (/\.css$/.test(entry)) return "style";
          if (/\.js$/.test(entry)) return "script";
          if (/\.(woff2?|eot|ttf|otf)$/.test(entry)) return "font";
          return "fetch";
        },
      },
    ]);
  },
};
