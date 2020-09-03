import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { defineConfigSchema } from '@openmrs/esm-module-config';
import openmrsRootDecorator from '@openmrs/react-root-decorator';

defineConfigSchema('@openmrs/esm-drugorder-app', {});

function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route path="/drugorder" component={() => <p>Hello World!</p>} />
    </BrowserRouter>
  );
}

export default openmrsRootDecorator({
  featureName: 'drugorder',
  moduleName: '@openmrs/esm-drugorder-app',
})(Root);
