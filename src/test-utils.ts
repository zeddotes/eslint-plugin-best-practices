import { ESLint } from 'eslint';
import path from 'path';
import { fileURLToPath } from 'url';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import tseslintImport from '@typescript-eslint/eslint-plugin';
import bestPracticesPluginImport from './index.js';
import parser from '@typescript-eslint/parser';
const tseslint = tseslintImport as unknown as any;
const bestPracticesPlugin = bestPracticesPluginImport as unknown as any;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Base ESLint configuration for testing rules.
 * This configuration is optimized for testing by:
 * 1. Disabling TypeScript project validation to improve performance
 * 2. Disabling rules that aren't relevant for testing
 * 3. Using a minimal set of plugins and configurations
 */
const baseConfig = {
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: null, // Disable TypeScript project validation for tests
    },
  },
  plugins: {
    '@typescript-eslint': tseslint,
    'best-practices': bestPracticesPlugin,
  },
  rules: {
    // Disable rules that aren't relevant for testing plugin functionality
    '@typescript-eslint/no-unused-vars': 'off',
    'prettier/prettier': 'off',
    'prettier/*': 'off',
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
export function createTestESLint(ruleConfig: Record<string, unknown> = {}) {
  return new ESLint({
    overrideConfig: {
      ...baseConfig,
      rules: {
        ...baseConfig.rules,
        ...ruleConfig,
      },
    } as any,
    ignore: false, // Ensure all files are linted
  });
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