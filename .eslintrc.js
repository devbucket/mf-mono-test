/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const getHostConfig = require('./packages/common/scripts/getHostConfig');

const HOST_CONFIG = getHostConfig();

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  globals: {
    JSX: true,
    clock: 'readonly',
  },
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
    'class-methods-use-this': 0,
    'max-classes-per-file': 0,
    'prefer-arrow-callback': 0,
    'import/no-unresolved': ['error', { ignore: [HOST_CONFIG.ignored] }],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': ['error', { props: false }],
    'no-use-before-define': 0,
    'react/jsx-props-no-spreading': 0,
    'max-len': 0,
    'object-curly-spacing': ['error', 'always'],
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'lines-between-class-members': 0,
    'no-useless-rename': 'error',
    'no-var': 'error',
    'prefer-template': 'error',
    'function-paren-newline': ['error', 'never'],
    'array-element-newline': ['error', 'consistent'],
    'brace-style': ['error', '1tbs'],
    'function-call-argument-newline': ['error', 'never'],
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, minProperties: 5, consistent: true },
      ObjectPattern: { multiline: true, minProperties: 5, consistent: true },
      ImportDeclaration: { multiline: true, minProperties: 5, consistent: true },
      ExportDeclaration: { multiline: true, minProperties: 5, consistent: true },
    }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'padded-blocks': ['error', 'never'],

    // A11y (JSX)
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,

    // React
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
    'react/jsx-indent': ['error', 2, { checkAttributes: true, indentLogicalExpressions: true }],
    'react/jsx-no-bind': 'warn',
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-max-props-per-line': 0,
    'react/button-has-type': 0,
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/function-component-definition': ['error', { namedComponents: 'function-declaration' }],
    'react/no-this-in-sfc': 'error',
    'react/prefer-stateless-function': 'error',
    'react/jsx-newline': ['error', { prevent: true }],
    'react/jsx-wrap-multilines': ['error', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    }],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/ignore': [HOST_CONFIG.ignored],
    'import/resolver': {
      typescript: {
        project: 'packages/*/tsconfig.json',
        alwaysTryTypes: true,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  overrides: [
    {
      files: [
        '*.{ts,tsx}',
        '*.d.{ts,tsx}',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        'react/prop-types': 0,
        'no-shadow': 0,
        '@typescript-eslint/no-shadow': 'error',
        indent: 0,
        '@typescript-eslint/indent': ['error', 2],
        'react/require-default-props': 0,
      },
    },
    // {
    //   files: ['*.graphql'],
    //   extends: 'plugin:@graphql-eslint/schema-recommended',
    //   // parserOptions: {
    //   //   schema: './schema.graphql',
    //   // },
    // },
    // {
    //   files: ['cypress/**/*'],
    //   env: {
    //     'cypress/globals': true,
    //   },
    //   extends: ['plugin:cypress/recommended'],
    //   plugins: ['cypress'],
    // },
  ],
};
