module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'quasar',
        libraryDirectory: 'src/components',
        camel2DashComponentName: false
      },
      'quasar'
    ]
  ]
}
