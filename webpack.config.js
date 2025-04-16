const { DefinePlugin } = require('webpack');

module.exports = {
  // ...
  plugins: [
    new DefinePlugin({
      __VUE_OPTIONS_API__: true, // o false si no usas Options API
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // <--- esta es la que pide
    }),
  ],
};
