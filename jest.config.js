const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');
const nextJest = require('next/jest');

/** @type {import('ts-jest').InitialOptionsTsJest} */
const customJestConfig = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json-summary', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'config/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'layouts/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/build/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/public/**',
    '!**/useVisibility.ts',
    '!**/Header.tsx',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

const createJestConfig = nextJest({
  dir: './',
})(customJestConfig);

module.exports = async () => {
  // Create Next.js jest configuration presets
  const jestConfig = await createJestConfig();

  // Custom `moduleNameMapper` configuration
  const paths = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  });
  const moduleNameMapper = {
    ...jestConfig.moduleNameMapper,
    ...paths,
  };

  // Custom `transformIgnorePatterns` configuration
  const transformIgnorePatterns = [
    // Transform ESM-only modules in `node_modules`.
    '/node_modules/(?!next-mdx-remote|@mdx-js|@react-hook)',
    ...jestConfig.transformIgnorePatterns.filter(
      pattern => pattern !== '/node_modules/'
    ),
  ];

  return { ...jestConfig, moduleNameMapper, transformIgnorePatterns };
};
