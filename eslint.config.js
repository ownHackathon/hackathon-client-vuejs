import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/src/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/public/**'],
  },


  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    name: 'app/custom-rules',
    rules: {
      'no-unused-vars': ['error', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        // DIESE ZEILE IST ENTSCHEIDEND FÜR catch (__)
        'caughtErrorsIgnorePattern': '^_'
      }],
      'no-empty': ['error', { 'allowEmptyCatch': true }]
    }
  }
]
