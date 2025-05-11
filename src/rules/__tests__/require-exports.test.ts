import { createTestESLint, lintCode } from '../../test-utils.js';

/**
 * Tests for the require-exports rule.
 * 
 * This rule ensures that specified exports are present in a file.
 * It's useful for enforcing a consistent module structure, particularly
 * for files that should export specific interfaces or configurations.
 * 
 * In this test suite, we verify that files must export both 'metadata'
 * and 'config' objects.
 */
describe('require-exports', () => {
  const eslint = createTestESLint({
    'best-practices/require-exports': ['error', { exports: ['metadata', 'config'] }],
  });

  it('should pass when all required exports are present as variable declarations', async () => {
    const result = await lintCode(
      `export const metadata = {};
       export const config = {};`,
      'test.ts',
      eslint
    );
    expect(result[0].messages).toHaveLength(0);
  });

  it('should pass when all required exports are present as function declarations', async () => {
    const result = await lintCode(
      `export function metadata() {}
       export function config() {}`,
      'test.ts',
      eslint
    );
    expect(result[0].messages).toHaveLength(0);
  });

  it('should pass when all required exports are present as named exports', async () => {
    const result = await lintCode(
      `const metadata = {};
       const config = {};
       export { metadata, config };`,
      'test.ts',
      eslint
    );
    expect(result[0].messages).toHaveLength(0);
  });

  it('should pass when exports have different names than declarations', async () => {
    const result = await lintCode(
      `const myMetadata = {};
       const myConfig = {};
       export { myMetadata as metadata, myConfig as config };`,
      'test.ts',
      eslint
    );
    expect(result[0].messages).toHaveLength(0);
  });

  it('should pass with multiple exports in a single declaration', async () => {
    const result = await lintCode(
      `export const metadata = {}, config = {};`,
      'test.ts',
      eslint
    );
    expect(result[0].messages).toHaveLength(0);
  });

  it('should fail when one required export is missing', async () => {
    const result = await lintCode(
      'export const metadata = {};',
      'test.ts',
      eslint
    );
    expect(result[0].messages).toHaveLength(1);
    expect(result[0].messages[0].message).toContain('Missing required export: config');
  });

  it('should fail when all required exports are missing', async () => {
    const result = await lintCode(
      'const x = 1;',
      'test.ts',
      eslint
    );
    expect(result[0].messages).toHaveLength(2);
    expect(result[0].messages[0].message).toContain('Missing required export: metadata');
    expect(result[0].messages[1].message).toContain('Missing required export: config');
  });

  it('should fail when exports are present but with wrong names', async () => {
    const result = await lintCode(
      `export const myMetadata = {};
       export const myConfig = {};`,
      'test.ts',
      eslint
    );
    expect(result[0].messages).toHaveLength(2);
    expect(result[0].messages[0].message).toContain('Missing required export: metadata');
    expect(result[0].messages[1].message).toContain('Missing required export: config');
  });
}); 