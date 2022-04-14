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
    "eslint:recommended",
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:effector/recommended',
    'plugin:effector/scope',
  ],
  parserOptions: {
    project: ["./tsconfig.json"]
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/extensions': 'off',
    'no-console': 1,
    'prettier/prettier': 0,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error"
  }
};
