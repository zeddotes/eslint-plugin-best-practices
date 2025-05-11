import { createTestESLint, lintCode } from '../../test-utils'

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
  const lint = createTestESLint({
    'best-practices/file-naming-convention': [2, {
      patterns: [
        {
          pattern: '^[a-z][a-zA-Z0-9]*$',
          folders: ['src/components']
        },
        {
          pattern: '^[A-Z][a-zA-Z0-9]*$',
          folders: ['src/pages']
        },
        {
          pattern: '^[a-z][a-z0-9-]*$',
          folders: ['src/utils']
        }
      ]
    }]
  });

  it('should allow valid component file names', async () => {
    const result = await lintCode('export const Button = () => {}', 'src/components/button.tsx', lint);
    expect(result[0].errorCount).toBe(0);
  });

  it('should allow valid page file names', async () => {
    const result = await lintCode('export const Home = () => {}', 'src/pages/Home.tsx', lint);
    expect(result[0].errorCount).toBe(0);
  });

  it('should allow valid utility file names', async () => {
    const result = await lintCode('export const formatString = () => {}', 'src/utils/string-utils.ts', lint);
    expect(result[0].errorCount).toBe(0);
  });

  it('should reject invalid component file names', async () => {
    const result = await lintCode('export const Button = () => {}', 'src/components/Button.tsx', lint);
    expect(result[0].errorCount).toBe(1);
    expect(result[0].messages[0].message).toContain('does not match the required pattern for this folder');
  });

  it('should reject invalid page file names', async () => {
    const result = await lintCode('export const Home = () => {}', 'src/pages/home.tsx', lint);
    expect(result[0].errorCount).toBe(1);
    expect(result[0].messages[0].message).toContain('does not match the required pattern for this folder');
  });

  it('should reject invalid utility file names', async () => {
    const result = await lintCode('export const formatString = () => {}', 'src/utils/stringUtils.ts', lint);
    expect(result[0].errorCount).toBe(1);
    expect(result[0].messages[0].message).toContain('does not match the required pattern for this folder');
  });

  it('should handle nested folders correctly', async () => {
    const result = await lintCode('export const InputField = () => {}', 'src/components/forms/input-field.tsx', lint);
    expect(result[0].errorCount).toBe(1);
    expect(result[0].messages[0].message).toContain('does not match the required pattern for this folder');
  });

  it('should handle files in unspecified folders', async () => {
    const result = await lintCode('export const something = () => {}', 'src/other/file.ts', lint);
    expect(result[0].errorCount).toBe(0);
  });
}); 