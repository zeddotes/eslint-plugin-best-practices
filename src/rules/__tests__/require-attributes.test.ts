/* eslint-env jest */
import { RuleTester } from '../../test-utils.js';
import { requireAttributes } from '../require-attributes.js';
import tsParser from '@typescript-eslint/parser';

// Set default config for all tests
RuleTester.setDefaultConfig({
  plugins: {
    'test-plugin': {
      rules: {
        'require-attributes': requireAttributes,
      },
    },
  },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: undefined,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

describe('require-attributes', () => {
  const ruleTester = new RuleTester();

  ruleTester.run('require-attributes', requireAttributes, {
    valid: [
      {
        code: '<form noValidate>content</form>',
        options: [
          {
            elements: [
              {
                tag: 'form',
                attributes: [{ name: 'noValidate', required: true }],
              },
            ],
          },
        ],
      },
      {
        code: '<input type="checkbox" checked={false} />',
        options: [
          {
            elements: [
              {
                tag: 'input',
                attributes: [
                  { name: 'type', value: 'checkbox' },
                  { name: 'checked', value: false },
                ],
              },
            ],
          },
        ],
      },
      {
        code: '<div>content</div>',
        options: [
          {
            elements: [
              {
                tag: 'form',
                attributes: [{ name: 'noValidate', required: true }],
              },
            ],
          },
        ],
      },
    ],
    invalid: [
      {
        code: '<form>content</form>',
        options: [
          {
            elements: [
              {
                tag: 'form',
                attributes: [{ name: 'noValidate', required: true }],
              },
            ],
          },
        ],
        errors: [
          {
            messageId: 'missingRequiredAttribute',
            data: {
              tag: 'form',
              attribute: 'noValidate',
            },
          },
        ],
      },
      {
        code: '<input type="text" checked={true} />',
        options: [
          {
            elements: [
              {
                tag: 'input',
                attributes: [
                  { name: 'type', value: 'checkbox' },
                  { name: 'checked', value: false },
                ],
              },
            ],
          },
        ],
        errors: [
          {
            messageId: 'invalidAttributeValue',
            data: {
              tag: 'input',
              attribute: 'type',
              expectedValue: 'checkbox',
            },
          },
          {
            messageId: 'invalidAttributeValue',
            data: {
              tag: 'input',
              attribute: 'checked',
              expectedValue: 'false',
            },
          },
        ],
      },
    ],
  });
});
