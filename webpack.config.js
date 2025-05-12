const { DefinePlugin } = require("webpack");

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: false, // 🔥 No inyecta scripts automáticamente
      scriptLoading: "defer",
      minify: false,
      templateParameters: (compilation, assets) => ({
        cssPreload: (assets.css || [])
          .map(
            (href) =>
              `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">`
          )
          .join("\n"),
        jsPreload: (assets.js || [])
          .map(
            (href) =>
              `<link rel="preload" as="script" href="${href}" crossorigin="anonymous">`
          )
          .join("\n"),
        jsScripts: (assets.js || [])
          .map(
            (href) =>
              `<script src="${href}" defer crossorigin="anonymous"></script>`
          )
          .join("\n"),
      }),
    }),

    new DefinePlugin({
      __VUE_OPTIONS_API__: true, // o false si no usas Options API
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // <--- esta es la que pide
    }),
  ],
};
