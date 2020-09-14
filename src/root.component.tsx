import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { defineConfigSchema } from '@openmrs/esm-module-config';
import openmrsRootDecorator from '@openmrs/react-root-decorator';
import Medications from './widgets/medications/medications.component';
import WorkspaceWrapper from './workspace/workspace-wrapper.component';

defineConfigSchema('@openmrs/esm-drugorder-app', {});

function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route
        path="/drugorder"
        component={() => (
          // Note: The divs here are just temporary and only serve one purpose:
          // Make the workspace tab(s) fade in and out correctly.
          // TODO: Remove when migrating the extension slot into the patient-chart.
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1 }}>
              <Medications />
            </div>
            <WorkspaceWrapper />
          </div>
        )}
      />
    </BrowserRouter>
  );
}

export default openmrsRootDecorator({
  featureName: 'drugorder',
  moduleName: '@openmrs/esm-drugorder-app',
})(Root);
