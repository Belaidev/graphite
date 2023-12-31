module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.node.json']
	},
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	plugins: ['@typescript-eslint', 'import', 'solid', 'jsx-a11y'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:solid/typescript',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended'
	],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx']
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true
			}
		}
	},
	rules: {
		'linebreak-style': ['error', 'unix'],
		'no-restricted-imports': [
			'error',
			{
				patterns: ['./**', 'src/**', 'lib/*/**', 'common/*/**', 'features/*/**', 'app/*/**']
			}
		],
		'no-unused-vars': 'off',

		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/no-confusing-void-expression': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-unused-vars': 'off',

		'import/no-absolute-path': 'error',

		'prettier/prettier': ['error', {}, { usePrettierrc: true }]
	}
};
