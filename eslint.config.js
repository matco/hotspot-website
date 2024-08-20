import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import globals from 'globals';

export default tseslint.config(
	{
		files: ['**/*.ts'],
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
			...angular.configs.tsRecommended,
		],
		processor: angular.processInlineTemplates,
		languageOptions: {
			globals: {
				...globals.browser,
			}
		},
		rules: {
			'array-callback-return': 'error',
			'consistent-return': 'error',
			'curly': 'error',
			'eol-last': 'error',
			'eqeqeq': 'error',
			'key-spacing': 'error',
			'linebreak-style': [
				'error',
				'unix'
			],
			'no-console': 'off',
			'no-multi-spaces': 'error',
			'no-multiple-empty-lines': 'error',
			'no-new-wrappers': 'error',
			'no-proto': 'error',
			'no-prototype-builtins': 'off',
			'no-undef': 'error',
			'no-var': 'error',
			'no-with': 'error',
			'prefer-const': 'error',
			'prefer-template': 'error',
			'quotes': [
				'error',
				'single'
			],
			'semi': [
				'error',
				'always'
			],
			'spaced-comment': [
				'error',
				'never'
			],
			'template-curly-spacing': [
				'error',
				'never'
			],
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-class-suffix': [
				'error',
				{
					suffixes: ['Component', 'Dialog']
				}
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			]
		}
	},
	{
		files: ['**/*.html'],
		extends: [
			...angular.configs.templateRecommended,
		]
	}
);
