import eslintConfig from '@dg-scripts/eslint-config'

export default eslintConfig
  .append({
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  })
  .append({
    files: ['e2e/**/*.spec.ts'],
    rules: {
      'testing-library/prefer-screen-queries': 'off',
    },
  })
