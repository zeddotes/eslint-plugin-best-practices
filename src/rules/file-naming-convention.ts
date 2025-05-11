import { TSESLint, TSESTree } from '@typescript-eslint/utils';
import path from 'path';

/**
 * Rule to enforce consistent file naming conventions.
 * 
 * This rule ensures that file names follow specified patterns based on their location
 * in the project structure. Different patterns can be defined for different folders.
 * 
 * @example
 * ```json
 * {
 *   "rules": {
 *     "best-practices/file-naming-convention": ["error", {
 *       "patterns": [
 *         {
 *           "pattern": "^[a-z][a-zA-Z0-9]*$",
 *           "folders": ["src/components"]
 *         },
 *         {
 *           "pattern": "^[A-Z][a-zA-Z0-9]*$",
 *           "folders": ["src/pages"]
 *         },
 *         {
 *           "pattern": "^[a-z][a-z0-9-]*$",
 *           "folders": ["src/utils"]
 *         }
 *       ]
 *     }]
 *   }
 * }
 * ```
 * 
 * This configuration would enforce:
 * - Component files must be camelCase (e.g., `button.tsx`, `userProfile.tsx`)
 * - Page files must be PascalCase (e.g., `Home.tsx`, `UserProfile.tsx`)
 * - Utility files must be kebab-case (e.g., `string-utils.ts`, `date-helpers.ts`)
 */
export const fileNamingConvention: TSESLint.RuleModule<'invalidFileName', [{ patterns: Array<{ pattern: string; folders: string[] }> }]> = {
  defaultOptions: [{
    patterns: [{
      pattern: '^[a-z][a-zA-Z0-9]*$',
      folders: ['.']
    }]
  }],
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce consistent file naming conventions',
    },
    messages: {
      invalidFileName: 'File name does not match the required pattern for this folder: {{pattern}}',
    },
    schema: [
      {
        type: 'object',
        properties: {
          patterns: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                pattern: {
                  type: 'string',
                  description: 'Regular expression pattern that file names must match',
                },
                folders: {
                  type: 'array',
                  items: {
                    type: 'string',
                    description: 'Folder paths where this pattern applies (relative to project root)',
                  },
                },
              },
              required: ['pattern', 'folders'],
              additionalProperties: false,
            },
          },
        },
        required: ['patterns'],
        additionalProperties: false,
      },
    ],
  },
  create(context: TSESLint.RuleContext<'invalidFileName', [{ patterns: Array<{ pattern: string; folders: string[] }> }]>) {
    return {
      Program(node: TSESTree.Program) {
        // Get the file path and extract the base name without extension
        const filePath = context.getFilename();
        const baseName = path.basename(filePath, path.extname(filePath));
        
        // Get the directory path relative to project root
        const dirPath = path.dirname(filePath);
        const relativeDirPath = path.relative(process.cwd(), dirPath);

        // Find the matching pattern for this file's location
        const matchingPattern = context.options[0].patterns.find(({ folders }) =>
          folders.some(folder => {
            // Handle root folder case
            if (folder === '.') return true;
            // Check if the file is in or under the specified folder
            return relativeDirPath === folder || relativeDirPath.startsWith(`${folder}/`);
          })
        );

        if (!matchingPattern) {
          return; // No pattern matches this location
        }

        // Create the regex pattern once during rule initialization
        const pattern = new RegExp(matchingPattern.pattern);

        // Check the file name
        if (!pattern.test(baseName)) {
          context.report({
            node,
            messageId: 'invalidFileName',
            data: {
              pattern: matchingPattern.pattern,
            },
          });
        }
      },
    };
  },
}; 