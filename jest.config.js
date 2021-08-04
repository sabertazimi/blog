const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
});

module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json-summary', 'lcov', 'text', 'clover'],
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
    '<rootDir>.*/public',
    '<rootDir>.*/build',
    '<rootDir>.*/dist',
    '<rootDir>.*/coverage',
  ],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.env.setup.js'],
};
