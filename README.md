# eslint-plugin-best-practices

An ESLint plugin that enforces best practices in JavaScript/TypeScript codebases. This plugin helps maintain code quality and consistency by enforcing common best practices and patterns.

## Installation

```bash
npm install --save-dev eslint-plugin-best-practices
```

## Requirements

- ESLint >= 8.0.0
- Node.js >= 16.0.0

## Usage

### Basic Configuration

Add `best-practices` to the plugins section of your ESLint configuration file:

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['best-practices'],
  rules: {
    // Configure your rules here
  }
};
```

### Flat Config (ESLint 8.21.0+)

If you're using the new flat config format:

```javascript
// eslint.config.js
import bestPracticesPlugin from 'eslint-plugin-best-practices';

export default [
  {
    plugins: {
      'best-practices': bestPracticesPlugin,
    },
    rules: {
      // Configure your rules here
    },
  },
];
```

## Configuration

Configure the rules according to your project's needs. Here are some examples:

### file-naming-convention

Enforces consistent file naming patterns across your codebase. By default, it ensures files follow camelCase naming, but you can specify any pattern for any folder.

**Example Configuration:**

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['best-practices'],
  rules: {
    'best-practices/file-naming-convention': ['error', {
      patterns: [
        // Components: camelCase
        { pattern: '^[a-z][a-zA-Z0-9]*$', folders: ['src/components'] },
        // Pages: PascalCase
        { pattern: '^[A-Z][a-zA-Z0-9]*$', folders: ['src/pages'] },
        // Utils: kebab-case
        { pattern: '^[a-z][a-z0-9-]*$', folders: ['src/utils'] },
        // API: snake_case
        { pattern: '^[a-z][a-z0-9_]*$', folders: ['src/api'] },
        // Special: must start with "special-"
        { pattern: '^special-[a-z0-9-]+$', folders: ['src/special'] },
        // Fallback: camelCase for all other files
        { pattern: '^[a-z][a-zA-Z0-9]*$', folders: ['.'] }
      ]
    }]
  }
};
```

This rule:
- Allows you to specify different naming conventions for different folders
- Supports fallback/default patterns
- Works with any valid regex pattern
- Helps maintain a consistent naming convention across your project

**Examples of valid/invalid files:**
- **Components**: `src/components/button.tsx` → valid, `src/components/Button.tsx` → invalid
- **Pages**: `src/pages/Home.tsx` → valid, `src/pages/home.tsx` → invalid
- **Utils**: `src/utils/string-utils.ts` → valid, `src/utils/stringUtils.ts` → invalid
- **Special**: `src/special/special-feature.ts` → valid, `src/special/feature.ts` → invalid
- **Fallback**: `src/other/fileName.ts` → valid

### Require Exports

```json
{
  "rules": {
    "best-practices/require-exports": ["error", { 
      "exports": ["metadata", "config"] 
    }]
  }
}
```

This rule:
- Enforces the presence of specific exports in files
- Helps maintain consistent module interfaces
- Useful for ensuring configuration files have required exports
- Supports both variable and function exports

## Rules

### file-naming-convention

Enforces consistent file naming patterns across your codebase. By default, it ensures files follow camelCase naming, but you can specify any pattern for any folder.

**Flexible Examples:**

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'best-practices/file-naming-convention': ['error', {
      patterns: [
        { pattern: '^[a-z][a-zA-Z0-9]*$', folders: ['src/components'] }, // camelCase
        { pattern: '^[A-Z][a-zA-Z0-9]*$', folders: ['src/pages'] },      // PascalCase
        { pattern: '^[a-z][a-z0-9-]*$', folders: ['src/utils'] },        // kebab-case
        { pattern: '^special-[a-z0-9-]+$', folders: ['src/special'] },   // special prefix
        { pattern: '^[a-z][a-zA-Z0-9]*$', folders: ['.'] }              // fallback
      ]
    }]
  }
};
```

This rule:
- Allows you to specify different naming conventions for different folders
- Supports fallback/default patterns
- Works with any valid regex pattern
- Helps maintain a consistent naming convention across your project

### require-exports

Ensures that specified named exports are present in specific files. This is useful for maintaining consistent module interfaces across your codebase.

```javascript
// In your ESLint config
module.exports = {
  rules: {
    'best-practices/require-exports': ['error', {
      exports: ['metadata', 'config'] // Specify required exports
    }]
  }
};
```

This rule:
- Enforces the presence of specific exports in files
- Helps maintain consistent module interfaces
- Useful for ensuring configuration files have required exports
- Supports both variable and function exports

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`npm install`)
4. Make your changes
5. Run tests (`npm test`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint

# Build the project
npm run build
```

### Adding New Rules

1. Create a new file in `src/rules/` for your rule
2. Export your rule following the pattern in existing rules
3. Add your rule to `src/index.ts`
4. Add tests in `src/rules/__tests__/`
5. Update this README with documentation for your rule

## Author

[Zain](https://github.com/zeddotes) ([@zeddotes](https://github.com/zeddotes))

## License

ISC 