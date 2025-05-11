import { TSESTree } from '@typescript-eslint/utils';

/**
 * Utility function to extract named exports from the AST Program node.
 */
export const getExportNames = (node: TSESTree.Program): string[] => {
  return node.body
    .filter((n): n is TSESTree.ExportNamedDeclaration => n.type === 'ExportNamedDeclaration')
    .flatMap((n) => {
      if (n.declaration && n.declaration.type === 'VariableDeclaration') {
        // If it's a variable declaration like "export const metadata = ..."
        return n.declaration.declarations.flatMap((d) =>
          d.id.type === 'Identifier' ? [d.id.name] : [],
        );
      } else if (
        n.declaration &&
        n.declaration.type === 'FunctionDeclaration' &&
        n.declaration.id?.type === 'Identifier'
      ) {
        // If it's a named function
        return [n.declaration.id.name];
      } else if (
        n.declaration &&
        n.declaration.type === 'ClassDeclaration' &&
        n.declaration.id?.type === 'Identifier'
      ) {
        // If it's a named class
        return [n.declaration.id.name];
      }
      return [];
    });
};
