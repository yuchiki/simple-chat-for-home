// @ts-check

import js from '@eslint/js'
import ts from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.strictTypeChecked,
  stylistic.configs['recommended-flat'],
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    ignores: ['node_modules/', 'dist/', 'eslint.config.js'],
  },
)
