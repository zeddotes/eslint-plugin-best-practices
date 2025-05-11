import { TSESLint, TSESTree } from '@typescript-eslint/utils';

/**
 * Rule to enforce consistent file naming conventions.
 * 
 * This rule ensures that file names follow a specified pattern, which helps maintain
 * consistency across the codebase. The pattern is configurable through the rule options.
 * 
 * @example
 * ```json
 * {
 *   "rules": {
 *     "best-practices/file-naming-convention": ["error", { "pattern": "^[a-z][a-zA-Z0-9]*$" }]
 *   }
 * }
 * ```
 * 
 * This configuration would enforce:
 * - File names must start with a lowercase letter
 * - Can contain letters and numbers
 * - No special characters or hyphens allowed
 */
export const fileNamingConvention: TSESLint.RuleModule<'invalidFileName', [{ pattern: string }]> = {
  defaultOptions: [{ pattern: '^[a-z][a-zA-Z0-9]*$' }],
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce consistent file naming conventions',
    },
    messages: {
      invalidFileName: 'File name does not match the required pattern: {{pattern}}',
    },
    schema: [
      {
        type: 'object',
        properties: {
          pattern: {
            type: 'string',
            description: 'Regular expression pattern that file names must match',
          },
        },
        required: ['pattern'],
        additionalProperties: false,
      },
    ],
  },
  create(context: TSESLint.RuleContext<'invalidFileName', [{ pattern: string }]>) {
    // Get the file path and extract the base name without extension
    const filePath = context.getFilename();
    const baseName = filePath.split('/').pop()?.split('.')[0] ?? '';

    // Create the regex pattern once during rule initialization
    const pattern = new RegExp(context.options[0].pattern);

    return {
      // Check the file name at the start of the file
      Program(node: TSESTree.Program) {
        if (!pattern.test(baseName)) {
          context.report({
            node,
            messageId: 'invalidFileName',
            data: {
              pattern: context.options[0].pattern,
            },
          });
        }
      },
    };
  },
}; 