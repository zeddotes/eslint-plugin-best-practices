import { TSESLint, TSESTree } from '@typescript-eslint/utils';

type AttributeConfig = {
  name: string;
  value?: string | boolean | number;
  required?: boolean;
};

type ElementConfig = {
  tag: string;
  attributes: AttributeConfig[];
};

type RuleOptions = {
  elements: ElementConfig[];
};

/**
 * Rule to enforce required attributes on HTML/JSX elements.
 *
 * This rule allows you to specify which elements must have certain attributes
 * and optionally their expected values.
 *
 * @example
 * ```json
 * {
 *   "rules": {
 *     "eslint-plugin-quality-gates/require-attributes": ["error", {
 *       "elements": [
 *         {
 *           "tag": "form",
 *           "attributes": [
 *             { "name": "noValidate", "required": true }
 *           ]
 *         },
 *         {
 *           "tag": "input",
 *           "attributes": [
 *             { "name": "type", "value": "checkbox" },
 *             { "name": "checked", "value": false }
 *           ]
 *         }
 *       ]
 *     }]
 *   }
 * }
 * ```
 */
export const requireAttributes: TSESLint.RuleModule<
  'missingRequiredAttribute' | 'invalidAttributeValue',
  [RuleOptions]
> = {
  defaultOptions: [{ elements: [] }],
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce required attributes on HTML/JSX elements',
    },
    messages: {
      missingRequiredAttribute:
        'Element <{{tag}}> must have the required attribute "{{attribute}}"',
      invalidAttributeValue:
        'Element <{{tag}}> attribute "{{attribute}}" must have value "{{expectedValue}}"',
    },
    schema: [
      {
        type: 'object',
        properties: {
          elements: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                tag: {
                  type: 'string',
                  description: 'The HTML/JSX tag name to validate',
                },
                attributes: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        description: 'The attribute name',
                      },
                      value: {
                        oneOf: [{ type: 'string' }, { type: 'boolean' }, { type: 'number' }],
                        description: 'The expected attribute value (optional)',
                      },
                      required: {
                        type: 'boolean',
                        description: 'Whether the attribute is required',
                        default: true,
                      },
                    },
                    required: ['name'],
                    additionalProperties: false,
                  },
                },
              },
              required: ['tag', 'attributes'],
              additionalProperties: false,
            },
          },
        },
        required: ['elements'],
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options = context.options[0];

    return {
      JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
        const elementName = node.name.type === 'JSXIdentifier' ? node.name.name : null;
        if (!elementName) return;

        const elementConfig = options.elements.find((config) => config.tag === elementName);
        if (!elementConfig) return;

        const existingAttributes = new Map(
          node.attributes.map((attr) => {
            if (attr.type === 'JSXAttribute') {
              let value: string | boolean | number | undefined;
              if (attr.value?.type === 'Literal') {
                const literalValue = attr.value.value;
                if (
                  typeof literalValue === 'string' ||
                  typeof literalValue === 'boolean' ||
                  typeof literalValue === 'number'
                ) {
                  value = literalValue;
                }
              } else if (attr.value?.type === 'JSXExpressionContainer') {
                const expr = attr.value.expression;
                if (expr.type === 'Literal') {
                  const literalValue = expr.value;
                  if (
                    typeof literalValue === 'string' ||
                    typeof literalValue === 'boolean' ||
                    typeof literalValue === 'number'
                  ) {
                    value = literalValue;
                  }
                }
              }
              return [attr.name.name, value];
            }
            return [null, null];
          }),
        );

        for (const attributeConfig of elementConfig.attributes) {
          const hasAttribute = existingAttributes.has(attributeConfig.name);
          const attributeValue = existingAttributes.get(attributeConfig.name);

          // Check if required attribute is missing
          if (attributeConfig.required !== false && !hasAttribute) {
            context.report({
              node,
              messageId: 'missingRequiredAttribute',
              data: {
                tag: elementName,
                attribute: attributeConfig.name,
              },
            });
            continue;
          }

          // Check attribute value if specified
          if (hasAttribute && attributeConfig.value !== undefined) {
            const expectedValue = attributeConfig.value;
            const actualValue = attributeValue;

            if (actualValue !== expectedValue) {
              context.report({
                node,
                messageId: 'invalidAttributeValue',
                data: {
                  tag: elementName,
                  attribute: attributeConfig.name,
                  expectedValue: String(expectedValue),
                },
              });
            }
          }
        }
      },
    };
  },
};
