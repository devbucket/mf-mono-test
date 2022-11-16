require('dotenv').config();
const getHostConfig = require('./packages/common/scripts/getHostConfig');

const HOST_CONFIG = getHostConfig();

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    JSX: true,
    clock: 'readonly',
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'max-len': 0,
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'import/no-unresolved': ['error', { ignore: [HOST_CONFIG.ignored] }],
    'import/order': ['error', {
      alphabetize: { order: 'asc', caseInsensitive: true },
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
      ],
      'newlines-between': 'always-and-inside-groups',
      pathGroups: [
        {
          pattern: 'react*',
          group: 'builtin',
          position: 'before',
        },
        {
          pattern: '@mui/**',
          group: 'external',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
    }],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/ignore': [HOST_CONFIG.ignored],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
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
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 'error',
      },
    },
  ],
};
