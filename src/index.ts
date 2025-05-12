import { fileNamingConvention } from './rules/file-naming-convention.js';
import { requireExports } from './rules/require-exports.js';

const plugin = {
  rules: {
    'require-exports': requireExports,
    'file-naming-convention': fileNamingConvention,
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
      },
    },
  },
};

export default plugin;
