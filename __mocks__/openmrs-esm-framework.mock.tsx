import React from 'react';
import { of, never } from 'rxjs';
import { ConfigMock } from './chart-widgets-config.mock';

export function openmrsFetch() {
  return new Promise(() => {});
}

export function openmrsObservableFetch() {
  return of({ data: { entry: [] } });
}

export function UserHasAccessReact(props: any) {
  return props.children;
}

export function createErrorHandler() {
  return jest.fn().mockReturnValue(never());
}

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

export const showToast = jest.fn();
