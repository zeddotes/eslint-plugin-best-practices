import { ESLint } from 'eslint';
import type { Linter } from 'eslint';
import { TSESLint } from '@typescript-eslint/utils';
import { RuleTester } from '@typescript-eslint/rule-tester';
import bestPracticesPlugin from './index.js';

/**
 * Base ESLint configuration for testing rules.
 * This configuration is optimized for testing by:
 * 1. Disabling TypeScript project validation to improve performance
 * 2. Disabling rules that aren't relevant for testing
 * 3. Using a minimal set of plugins and configurations
 */
const baseConfig = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
} as const;

/**
 * Creates an ESLint instance with the base configuration for testing.
 * This configuration mirrors the project's ESLint setup but disables
 * rules that aren't relevant for testing the plugin's functionality.
 *
 * @param ruleConfig - Additional rule configurations to merge with the base config
 * @returns An ESLint instance configured for testing
 */
export function createTestESLint(ruleConfig: Partial<Linter.RulesRecord> = {}) {
  const config: Linter.Config = {
    ...baseConfig,
    rules: ruleConfig,
  };

  return new ESLint({
    overrideConfig: config,
    ignore: false, // Ensure all files are linted
    useEslintrc: false, // Disable loading of .eslintrc files
  } as ESLint.Options);
}

/**
 * Helper function to lint a string of code with a specific file path.
 * This is useful for testing rules that depend on the file path.
 *
 * @param code - The code string to lint
 * @param filePath - The virtual file path to use for linting
 * @param eslint - The ESLint instance to use
 * @returns The linting results
 */
export async function lintCode(code: string, filePath: string, eslint: ESLint) {
  return eslint.lintText(code, { filePath });
}

export { RuleTester, bestPracticesPlugin };
