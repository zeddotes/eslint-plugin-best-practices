/* eslint-env jest */
import { RuleTester } from '../../test-utils.js';
import { requireExports } from '../require-exports.js';
import tsParser from '@typescript-eslint/parser';
import path from 'path';

// Set default config for all tests
RuleTester.setDefaultConfig({
  plugins: {
    'test-plugin': {
      rules: {
        'require-exports': requireExports,
      },
    },
  },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: undefined,
    },
  },
});

/**
 * Tests for the require-exports rule.
 *
 * This rule ensures that specified exports are present in a file.
 * It's useful for enforcing a consistent module structure, particularly
 * for files that should export specific interfaces or configurations.
 *
 * In this test suite, we verify that files must export both 'metadata'
 * and 'config' objects.
 */
describe('require-exports', () => {
  const ruleTester = new RuleTester();

  ruleTester.run('require-exports', requireExports, {
    valid: [
      {
        code: `export const metadata = {};
                export const config = {};`,
        filename: 'test.ts',
        options: [{ exports: ['metadata', 'config'] }],
      },
      {
        code: `export function metadata() {}
                export function config() {}`,
        filename: 'test.ts',
        options: [{ exports: ['metadata', 'config'] }],
      },
      {
        code: `const metadata = {};
                const config = {};
                export { metadata, config };`,
        filename: 'test.ts',
        options: [{ exports: ['metadata', 'config'] }],
      },
      {
        code: `const myMetadata = {};
                const myConfig = {};
                export { myMetadata as metadata, myConfig as config };`,
        filename: 'test.ts',
        options: [{ exports: ['metadata', 'config'] }],
      },
      {
        code: `export const metadata = {}, config = {};`,
        filename: 'test.ts',
        options: [{ exports: ['metadata', 'config'] }],
      },
    ],
    invalid: [
      {
        code: 'export const metadata = {};',
        filename: 'test.ts',
        options: [{ exports: ['metadata', 'config'] }],
        errors: [{ messageId: 'missingExport', data: { name: 'config' } }],
      },
      {
        code: 'const x = 1;',
        filename: 'test.ts',
        options: [{ exports: ['metadata', 'config'] }],
        errors: [
          { messageId: 'missingExport', data: { name: 'metadata' } },
          { messageId: 'missingExport', data: { name: 'config' } },
        ],
      },
      {
        code: `export const myMetadata = {};
                export const myConfig = {};`,
        filename: 'test.ts',
        options: [{ exports: ['metadata', 'config'] }],
        errors: [
          { messageId: 'missingExport', data: { name: 'metadata' } },
          { messageId: 'missingExport', data: { name: 'config' } },
        ],
      },
    ],
  });
});
