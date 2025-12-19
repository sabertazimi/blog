import { defineConfig } from '@dg-scripts/eslint-config'

export default defineConfig(
  {
    name: 'base',
    rules: {
      'node/prefer-global/process': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    name: 'ui',
    files: ['src/components/ui/*.tsx'],
    rules: {
      'react/no-children-map': 'off',
      'react/no-clone-element': 'off',
    },
  },
  {
    name: 'unit',
    files: ['__tests__/README.md/**/*.{ts,tsx}'],
    rules: {
      'testing-library/no-container': 'off',
      'testing-library/no-debugging-utils': 'off',
    },
  },
  {
    name: 'e2e',
    files: ['e2e/**/*.spec.ts'],
    rules: {
      'testing-library/prefer-screen-queries': 'off',
    },
  },
  {
    name: 'playwright',
    files: ['playwright.config.ts'],
    rules: {
      'ts/strict-boolean-expressions': 'off',
    },
  },
)
