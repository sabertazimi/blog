import eslintConfig from '@dg-scripts/eslint-config'

export default eslintConfig
  .append({
    rules: {
      'node/prefer-global/process': 'off',
      'react-refresh/only-export-components': 'off',
      'security/detect-object-injection': 'off',
    },
  })
  .append({
    files: ['e2e/**/*.spec.ts'],
    rules: {
      'testing-library/prefer-screen-queries': 'off',
    },
  })
