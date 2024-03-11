module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['@antfu'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
  },
  globals: {},
}
