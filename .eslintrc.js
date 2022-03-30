module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  plugins: [
    '@typescript-eslint',
    'effector',
    'import',
    'jsx-a11y',
    'prettier',
  ],
  env: {
    node: true,
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:effector/recommended',
    'plugin:effector/scope',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/extensions': 'off',
    'no-console': 1,
    'prettier/prettier': 0,
    'no-unused-vars': 'error',
  },
};
