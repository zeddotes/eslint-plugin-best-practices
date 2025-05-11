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
  extends: ['plugin:best-practices/recommended'],
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
      ...bestPracticesPlugin.configs.recommended.rules,
    },
  },
];
```

## Rules

### file-naming-convention

Enforces consistent file naming patterns across your codebase. By default, it ensures files follow camelCase naming.

```javascript
// In your ESLint config
module.exports = {
  rules: {
    'best-practices/file-naming-convention': ['error', {
      pattern: '^[a-z][a-zA-Z0-9]*$' // Default pattern: camelCase
    }]
  }
};
```

This rule:
- Ensures file names start with a lowercase letter
- Allows letters and numbers
- Prohibits special characters and hyphens
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