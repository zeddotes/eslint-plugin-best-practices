export default {
  plugins: ['best-practices'],
  rules: {
    'best-practices/require-exports': ['error', { exports: ['metadata', 'config'] }],
  },
};
