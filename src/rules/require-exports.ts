import { TSESLint, TSESTree } from '@typescript-eslint/utils';

/**
 * Rule to enforce the presence of specific exports in a file.
 *
 * This rule ensures that specified exports are present in a file, which helps maintain
 * consistency in module structure. The required exports are configurable through the rule options.
 *
 * @example
 * ```json
 * {
 *   "rules": {
 *     "best-practices/require-exports": ["error", { "exports": ["metadata", "config"] }]
 *   }
 * }
 * ```
 *
 * This configuration would enforce:
 * - The file must export a 'metadata' object
 * - The file must export a 'config' object
 */
export const requireExports: TSESLint.RuleModule<'missingExport', [{ exports: string[] }]> = {
  defaultOptions: [{ exports: ['metadata', 'config'] }],
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce the presence of specific exports in a file',
    },
    messages: {
      missingExport: 'Missing required export: {{name}}',
    },
    schema: [
      {
        type: 'object',
        properties: {
          exports: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'List of exports that must be present in the file',
          },
        },
        required: ['exports'],
        additionalProperties: false,
      },
    ],
  },
  create(context: TSESLint.RuleContext<'missingExport', [{ exports: string[] }]>) {
    const requiredExports = new Set(context.options[0].exports);
    const foundExports = new Set<string>();

    return {
      // Check each export declaration
      ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration) {
        if (node.declaration) {
          // Handle variable declarations
          if (node.declaration.type === 'VariableDeclaration') {
            node.declaration.declarations.forEach((decl) => {
              if (decl.id.type === 'Identifier' && requiredExports.has(decl.id.name)) {
                foundExports.add(decl.id.name);
              }
            });
          }
          // Handle function declarations
          else if (node.declaration.type === 'FunctionDeclaration' && node.declaration.id) {
            if (requiredExports.has(node.declaration.id.name)) {
              foundExports.add(node.declaration.id.name);
            }
          }
        } else if (node.specifiers) {
          // Handle named exports
          node.specifiers.forEach((specifier) => {
            if (specifier.type === 'ExportSpecifier' && specifier.exported.type === 'Identifier') {
              if (requiredExports.has(specifier.exported.name)) {
                foundExports.add(specifier.exported.name);
              }
            }
          });
        }
      },

      // Check for missing exports at the end of the file
      'Program:exit'(node: TSESTree.Program) {
        requiredExports.forEach((exportName) => {
          if (!foundExports.has(exportName)) {
            context.report({
              node,
              messageId: 'missingExport',
              data: {
                name: exportName,
              },
            });
          }
        });
      },
    };
  },
};
