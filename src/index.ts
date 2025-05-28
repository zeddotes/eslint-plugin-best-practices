import { fileNamingConvention } from './rules/file-naming-convention.js';
import { requireExports } from './rules/require-exports.js';
import { requireAttributes } from './rules/require-attributes.js';

const plugin = {
  rules: {
    // Short name rules (for backward compatibility)
    'require-exports': requireExports,
    'file-naming-convention': fileNamingConvention,
    'require-attributes': requireAttributes,
    // Full name rules
    'eslint-plugin-quality-gates/require-exports': requireExports,
    'eslint-plugin-quality-gates/file-naming-convention': fileNamingConvention,
    'eslint-plugin-quality-gates/require-attributes': requireAttributes,
  },
  configs: {
    recommended: {
      plugins: ['eslint-plugin-quality-gates'],
      rules: {
        'eslint-plugin-quality-gates/require-exports': [
          'error',
          { exports: ['metadata', 'config'] },
        ],
        'eslint-plugin-quality-gates/file-naming-convention': [
          'warn',
          { pattern: '^[a-z][a-zA-Z0-9]*$' },
        ],
        'eslint-plugin-quality-gates/require-attributes': [
          'error',
          {
            elements: [
              {
                tag: 'form',
                attributes: [{ name: 'noValidate', required: true }],
              },
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
    },
  },
};

export default plugin;
