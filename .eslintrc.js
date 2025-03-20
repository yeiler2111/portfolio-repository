/* eslint-env node */

module.exports = {
  root: true,
  ignorePatterns: [      
    "**/node_modules/",
    ".git/",
    "**/dist",
    "**/cypress",
    "**/*.config.js",
    "!**/eslint.config.js",
    "vitest.config.ts",
    "**/*.spec.ts"
  ],
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],

  rules : {
    'vue/multi-word-component-names': 'off',
    'no-debugger': 'off', 
    'no-undef': 'off',
    'eslint-disable-next-line':'off'

  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
