import eslintConfig from '@dg-scripts/eslint-config'

export default eslintConfig
  .append(
    // Ignore cypress folder and cypress.config.ts
    // to avoid type violation to Jest.
    {
      ignores: ['cypress', 'cypress.config.ts'],
    },
  )
  .append({
    rules: {
      'react-refresh/only-export-components': 'off',
      'test/prefer-lowercase-title': [
        'error',
        {
          ignoreTopLevelDescribe: true,
        },
      ],
    },
  })
