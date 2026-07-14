module.exports = {
  ...require('./base.cjs'),
  parserOptions: {
    ...require('./base.cjs').parserOptions,
    project: './tsconfig.json',
  },
  rules: {
    ...require('./base.cjs').rules,
    '@typescript-eslint/no-explicit-any': 'warn',
  },
}
