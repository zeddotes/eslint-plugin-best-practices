import bestPracticesPlugin from './dist/index.js';
import tsParser from '@typescript-eslint/parser';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

const jestGlobals = {
  describe: 'readonly',
  it: 'readonly',
  expect: 'readonly',
  beforeAll: 'readonly',
  afterAll: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
  jest: 'readonly',
};

export default [
  {
    ignores: [
      'dist/**',
      'coverage/**',
      '*.js',
      '*.json',
      '*.md',
      '*.yml',
      '*.yaml',
      '*.html',
      '*.css',
      '*.png',
      '*.info'
    ]
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: '.',
      },
    },
    plugins: {
      'eslint-plugin-best-practices': bestPracticesPlugin,
      '@typescript-eslint': tsEslintPlugin,
      'prettier': prettierPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-undef': 'error',
      'prettier/prettier': 'error'
    },
  },
  {
    files: ['**/*.test.ts', '**/__tests__/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: '.',
      },
      globals: jestGlobals,
    },
  },
];

