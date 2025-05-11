/* eslint-env jest */
import { RuleTester } from '../../test-utils.js';
import { fileNamingConvention } from '../file-naming-convention.js';
import tsParser from '@typescript-eslint/parser';
import path from 'path';

// Set default config for all tests
RuleTester.setDefaultConfig({
  plugins: {
    'test-plugin': {
      rules: {
        'file-naming-convention': fileNamingConvention,
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
 * Tests for the file-naming-convention rule.
 *
 * This rule enforces consistent file naming patterns across different
 * types of files in the project. It helps maintain a clean and organized
 * codebase by ensuring files follow the project's naming conventions.
 */
describe('file-naming-convention', () => {
  const ruleTester = new RuleTester();

  ruleTester.run('file-naming-convention', fileNamingConvention, {
    valid: [
      {
        code: 'export const Button = () => {}',
        filename: 'src/components/button.tsx',
        options: [{
          patterns: [
            {
              pattern: '^[a-z][a-zA-Z0-9]*$',
              folders: ['src/components'],
            },
          ],
        }],
      },
      {
        code: 'export const Home = () => {}',
        filename: 'src/pages/Home.tsx',
        options: [{
          patterns: [
            {
              pattern: '^[A-Z][a-zA-Z0-9]*$',
              folders: ['src/pages'],
            },
          ],
        }],
      },
      {
        code: 'export const formatString = () => {}',
        filename: 'src/utils/string-utils.ts',
        options: [{
          patterns: [
            {
              pattern: '^[a-z][a-z0-9-]*$',
              folders: ['src/utils'],
            },
          ],
        }],
      },
    ],
    invalid: [
      {
        code: 'export const button = () => {}',
        filename: 'src/components/Button.tsx',
        options: [{
          patterns: [
            {
              pattern: '^[a-z][a-zA-Z0-9]*$',
              folders: ['src/components'],
            },
          ],
        }],
        errors: [{ messageId: 'invalidFileName', data: { pattern: '^[a-z][a-zA-Z0-9]*$' } }],
      },
      {
        code: 'export const home = () => {}',
        filename: 'src/pages/home.tsx',
        options: [{
          patterns: [
            {
              pattern: '^[A-Z][a-zA-Z0-9]*$',
              folders: ['src/pages'],
            },
          ],
        }],
        errors: [{ messageId: 'invalidFileName', data: { pattern: '^[A-Z][a-zA-Z0-9]*$' } }],
      },
      {
        code: 'export const formatString = () => {}',
        filename: 'src/utils/stringUtils.ts',
        options: [{
          patterns: [
            {
              pattern: '^[a-z][a-z0-9-]*$',
              folders: ['src/utils'],
            },
          ],
        }],
        errors: [{ messageId: 'invalidFileName', data: { pattern: '^[a-z][a-z0-9-]*$' } }],
      },
      {
        code: 'export const something = () => {}',
        filename: 'src/components/nested/Button.tsx',
        options: [{
          patterns: [
            {
              pattern: '^[a-z][a-zA-Z0-9]*$',
              folders: ['src/components'],
            },
          ],
        }],
        errors: [{ messageId: 'invalidFileName', data: { pattern: '^[a-z][a-zA-Z0-9]*$' } }],
      },
    ],
  });
});
