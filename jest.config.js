const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
});

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json-summary', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/config/**/*.{ts,tsx}',
    'src/hooks/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/build/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/public/**',
    '!**/useVisibility.ts',
    '!**/Header.tsx',
  ],
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/jest.transformer.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/jest.mock.js',
    ...paths,
  },
  testPathIgnorePatterns: [
    'node_modules',
    '\\.cache',
    '<rootDir>/public',
    '<rootDir>/build',
    '<rootDir>/dist',
    '<rootDir>/coverage',
  ],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.env.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
