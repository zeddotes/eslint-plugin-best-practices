import { fileNamingConvention } from './rules/file-naming-convention.js';
import { requireExports } from './rules/require-exports.js';

const plugin = {
  rules: {
    'require-exports': requireExports,
    'file-naming-convention': fileNamingConvention,
  },
  configs: {
    recommended: {
      plugins: ['best-practices'],
      rules: {
        'best-practices/require-exports': ['error', { exports: ['metadata', 'config'] }],
        'best-practices/file-naming-convention': ['warn', { pattern: '^[a-z][a-zA-Z0-9]*$' }],
      },
    },
  },
};

export default plugin;
