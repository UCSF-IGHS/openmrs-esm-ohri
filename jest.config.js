/** @type {import('jest').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const config = {
  verbose: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  coverageReporters: ['json-summary', 'lcov'],
  collectCoverageFrom: [
    '**/src/**/*.component.tsx',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/src/**/*.test.*',
    '!**/src/declarations.d.ts',
    '!**/e2e/**',
  ],
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!@openmrs)'],
  moduleDirectories: ['node_modules', '__mocks__', 'tools', __dirname],
  moduleNameMapper: {
    '\\.(s?css)$': 'identity-obj-proxy',
    '@openmrs/esm-framework': '@openmrs/esm-framework/mock',
    '^@carbon/charts-react$': path.resolve(__dirname, '__mocks__', '@carbon__charts-react.ts'),
    '^dexie$': require.resolve('dexie'),
    '^lodash-es/(.*)$': 'lodash/$1',
    '^react-i18next$': path.resolve(__dirname, '__mocks__', 'react-i18next.js'),
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    "/node_modules/",
      "/e2e/"  // Ignore the e2e directory containing Playwright tests
    ]
};

module.exports = config;
