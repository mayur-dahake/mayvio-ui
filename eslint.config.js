// eslint.config.js — ESLint v9 flat config using legacy .eslintrc.json via compat
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.config({
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    env: { browser: true, es2022: true, node: true },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-nocheck': true, 'ts-expect-error': 'allow-with-description' },
      ],
    },
    overrides: [
      {
        files: ['packages/react/**/*.{ts,tsx}'],
        plugins: ['react', 'react-hooks'],
        extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
        parserOptions: { ecmaFeatures: { jsx: true } },
        settings: { react: { version: 'detect' } },
        rules: { 'react/react-in-jsx-scope': 'off' },
      },
    ],
  }),
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      'eslint.config.js',
    ],
  },
];
