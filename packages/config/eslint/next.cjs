module.exports = {
  ...require('./base.cjs'),
  extends: [
    ...require('./base.cjs').extends,
    'next/core-web-vitals',
  ],
  rules: {
    ...require('./base.cjs').rules,
    '@next/next/no-html-link-for-pages': 'off',
  },
}
