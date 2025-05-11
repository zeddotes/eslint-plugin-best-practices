import { Linter } from 'eslint';

type Config = Linter.Config;

const baseConfig = {
  plugins: {
    'best-practices': {}
  }
} satisfies Config;

export default {
  configs: {
    // Basic configuration that only includes the plugin
    recommended: baseConfig
  }
};
