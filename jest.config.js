module.exports = {
  collectCoverage: true,
  coverageReporters: ['json-summary', 'lcov'],
  collectCoverageFrom: ['./src/components/**', '!./src/components/**/*.snap'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(s?css)$': 'identity-obj-proxy',
    '^@carbon/icons-react/es/(.*)$': '@carbon/icons-react/lib/$1',
    '^carbon-components-react/es/(.*)$': 'carbon-components-react/lib/$1',
    '@openmrs/esm-framework': '<rootDir>/__mocks__/openmrs-esm-framework.mock.tsx',
    'react-i18next': '<rootDir>/__mocks__/react-i18next.js',
    'lodash-es': 'lodash',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
