const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        inject: true,
        preload: ['css/app.css', 'css/chunk-vendors.css'].map(href => ({
          rel: 'preload',
          as: 'style',
          href,
        })),
      })
    ]
  },
  publicPath: './',
};
