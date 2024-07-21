import eslintConfig from '@dg-scripts/eslint-config'

export default eslintConfig
  .append(
    // Ignore cypress folder and cypress.config.ts
    // to avoid type violation to Jest.
    {
      ignores: [
        'cypress',
        'cypress.config.ts',
        'eslint.config.mjs',
        'jest.config.js',
        'jest.setup.js',
        'next.config.mjs',
        'postcss.config.mjs',
        'sitemap.config.js',
      ],
    },
  )
  .append({
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  })
