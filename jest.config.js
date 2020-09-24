module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '@openmrs/esm-api': '<rootDir>/__mocks__/openmrs-esm-api.mock.tsx',
    '@openmrs/esm-module-config': '<rootDir>/__mocks__/openmrs-esm-module-config.mock.tsx',
    '@openmrs/esm-error-handling': '<rootDir>/__mocks__/openmrs-esm-error-handling.mock.tsx',
    '@openmrs/esm-styleguide': '<rootDir>/__mocks__/openmrs-esm-styleguide.mock.tsx',
    'react-i18next': '<rootDir>/__mocks__/react-i18next.js',
    'lodash-es': 'lodash',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
