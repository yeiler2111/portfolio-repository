const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  /**
   * Rutas absolutas: el router usa history mode, así que una ruta profunda
   * como /contactme debe poder resolver /js/app.js. Con "./" el navegador
   * buscaría /contactme/js/app.js y fallaría.
   */
  publicPath: "/",
  filenameHashing: true,

  /**
   * Los source maps exponían todo el código fuente original en producción
   * (vendors.js.map pesaba 2.8 MB y era descargable por cualquiera).
   */
  productionSourceMap: false,

  devServer: {
    hot: false,
  },

  configureWebpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      })
    );

    /**
     * IMPORTANTE: hay que *mezclar* dentro de config.optimization, no
     * reasignarlo. Vue CLI registra ahí `minimizer` con TerserPlugin y
     * CssMinimizerPlugin; al sobrescribir el objeto completo se perdía el
     * minificador de CSS y app.css se publicaba sin minificar (145 KB con
     * comentarios y saltos de línea intactos).
     */
    config.optimization = config.optimization || {};
    config.optimization.splitChunks = {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
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
