# eslint-plugin-quality-gates

An ESLint plugin that enforces best practices in JavaScript/TypeScript codebases. This plugin helps maintain code quality and consistency by enforcing common best practices and patterns.

## Installation

```bash
npm install --save-dev eslint-plugin-quality-gates
```

## Requirements

- ESLint >= 8.0.0
- Node.js >= 16.0.0

## Usage

### Basic Configuration

Add `eslint-plugin-quality-gates` to the plugins section of your ESLint configuration file:

```json
{
  "plugins": [
    "eslint-plugin-quality-gates"
  ]
}
```

### Flat Config (ESLint 8.21.0+)

If you're using the new flat config format:

```javascript
// eslint.config.js
import eslintPluginQualityGates from 'eslint-plugin-quality-gates';

export default [
  {
    plugins: {
      'eslint-plugin-quality-gates': eslintPluginQualityGates,
    },
    rules: {
      // Configure your rules here
    },
  },
];
```

## Rules

### file-naming-convention

Enforces consistent file naming patterns across your codebase. By default, it ensures files follow camelCase naming, but you can specify any pattern for any folder.

**Flexible Examples:**

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'eslint-plugin-quality-gates/file-naming-convention': ['error', {
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
    'eslint-plugin-quality-gates/require-exports': ['error', {
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

### require-attributes

Enforces required attributes on HTML/JSX elements and validates their values. This is useful for ensuring consistent component interfaces and accessibility requirements.

```javascript
// In your ESLint config
module.exports = {
  rules: {
    'eslint-plugin-quality-gates/require-attributes': ['error', {
      elements: [
        {
          tag: 'form',
          attributes: [{ name: 'noValidate', required: true }]
        },
        {
          tag: 'input',
          attributes: [
            { name: 'type', value: 'checkbox' },
            { name: 'checked', value: false }
          ]
        }
      ]
    }]
  }
};
```

This rule:
- Enforces required attributes on specific HTML/JSX elements
- Validates attribute values (string, boolean, or number)
- Supports both direct literals and JSX expressions
- Helps maintain consistent component interfaces
- Useful for enforcing accessibility requirements

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