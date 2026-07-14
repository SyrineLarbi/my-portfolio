// ESLint 9 flat config (the legacy .eslintrc.cjs from Phase 1.3 is incompatible).
// Kept local to apps/api for now — packages/config will get the shared flat-config
// migration when Phase 3 adds apps/web.

const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const prettierConfig = require('eslint-config-prettier')

module.exports = [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'openapi.json',
      'prisma/migrations/**',
      'eslint.config.js',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { sourceType: 'module', ecmaVersion: 2022 },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // consistent-type-imports is hostile to Nest DI: constructor param types must be value imports
      // (Reflect.getMetadata('design:paramtypes', ...) relies on emitted runtime metadata).
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  prettierConfig,
]
