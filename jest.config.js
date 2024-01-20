const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

// Custom `moduleNameMapper` configuration
const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
});

/** @type {import('ts-jest').JestConfigWithTsJest} */
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
    '!**/utils/testing.ts',
    '!**/utils/index.ts',
    '!**/useVisibility.ts',
    '!**/Header.tsx',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    ...paths,
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/cypress/'],
};

module.exports = createJestConfig(customJestConfig);
