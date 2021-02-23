import React from 'react';
import { ConfigMock } from './chart-widgets-config.mock';

export function defineConfigSchema() {}

export const validators = {
  isBoolean: jest.fn(),
  isString: jest.fn(),
  isUuid: jest.fn(),
  isObject: jest.fn(),
};

export function useConfig() {
  return ConfigMock;
}

export const ComponentContext = React.createContext({
  moduleName: 'fake-module-config',
});
