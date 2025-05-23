import { Linter } from 'eslint';

type Config = Linter.Config;

const baseConfig = {
  plugins: {
    'eslint-plugin-best-practices': {},
    'eslint-plugin-quality-gates': {},
  },
} satisfies Config;

export default {
  configs: {
    // Basic configuration that only includes the plugin
    recommended: baseConfig,
  },
};
