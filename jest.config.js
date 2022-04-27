const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');
const nextJest = require('next/jest');

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
});

const createJestConfig = nextJest({
  dir: './',
});

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
  moduleNameMapper: {
    ...paths,
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = createJestConfig(customJestConfig);
