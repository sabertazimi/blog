import eslintConfig from '@dg-scripts/eslint-config'

export default eslintConfig
  .append({
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  })
