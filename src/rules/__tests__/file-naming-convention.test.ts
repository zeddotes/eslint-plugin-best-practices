import { createTestESLint, lintCode } from '../../test-utils.js';

/**
 * Tests for the file-naming-convention rule.
 * 
 * This rule enforces a consistent naming pattern for files:
 * - Must start with a lowercase letter
 * - Can contain letters and numbers
 * - No special characters or hyphens allowed
 * 
 * The pattern used is: ^[a-z][a-zA-Z0-9]*$
 */
describe('file-naming-convention', () => {
  const eslint = createTestESLint({
    'best-practices/file-naming-convention': ['error', { pattern: '^[a-z][a-zA-Z0-9]*$' }],
  });

  it('should pass for valid file names', async () => {
    const result = await lintCode(
      'export const metadata = {};',
      'validName.ts',
      eslint
    );
    expect(result[0].messages).toHaveLength(0);
  });

  it('should fail for file names starting with uppercase', async () => {
    const result = await lintCode(
      'export const metadata = {};',
      'InvalidName.ts',
      eslint
    );
    expect(result[0].messages).toHaveLength(1);
    expect(result[0].messages[0].message).toContain('File name does not match the required pattern');
  });

  it('should fail for file names with hyphens', async () => {
    const result = await lintCode(
      'export const metadata = {};',
      'invalid-name.ts',
      eslint
    );
    expect(result[0].messages).toHaveLength(1);
    expect(result[0].messages[0].message).toContain('File name does not match the required pattern');
  });
}); 