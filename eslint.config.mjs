import eslintConfig from '@dg-scripts/eslint-config'

export default eslintConfig
  .append({
    rules: {
      'node/prefer-global/process': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
      'react-refresh/only-export-components': 'off',
      'security/detect-object-injection': 'off',
    },
  })
  .append({
    files: ['src/components/ui/*.tsx'],
    rules: {
      'react/no-children-map': 'off',
      'react/no-clone-element': 'off',
    },
  })
  .append({
    files: ['__tests__/**/*.test.tsx'],
    rules: {
      'security/detect-non-literal-regexp': 'off',
    },
  })
  .append({
    files: ['e2e/**/*.spec.ts'],
    rules: {
      'testing-library/prefer-screen-queries': 'off',
    },
  })
  .append({
    files: ['__tests__/README.md/**/*.{ts,tsx}'],
    rules: {
      'testing-library/no-container': 'off',
      'testing-library/no-debugging-utils': 'off',
    },
  })
