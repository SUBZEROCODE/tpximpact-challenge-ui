import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';

export default [
  // ESLint core rules
  js.configs.recommended,

  // TypeScript + Angular component linting
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser, // ✅ pass the parser object directly
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: true, // ✅ explicitly allow console
        expect: true,
        it: true,
        describe: true,
        beforeEach: true,
        HTMLElement: true,
        spyOn: true,
        afterEach: true,
        fdescribe: true,
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@angular-eslint': angularPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...angularPlugin.configs.recommended.rules,
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' }
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' }
      ],

    }
  },

  // Angular template linting
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: (await import('@angular-eslint/template-parser')).default // ✅ dynamic import for template parser
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
      '@angular-eslint/template/no-negated-async': 'error'
    }
  }
];
