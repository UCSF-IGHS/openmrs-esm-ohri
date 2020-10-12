import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { defineConfigSchema } from '@openmrs/esm-config';
import openmrsRootDecorator from '@openmrs/react-root-decorator';
import './root.css';
import MedicationsOverview from './widgets/medications/medications-overview.component';
import MedicationsDetailedSummary from './widgets/medications/medications-detailed-summary.component';
import MedicationRecord from './widgets/medications/medication-record.component';

defineConfigSchema('@openmrs/esm-drugorder-app', {});

function Root() {
  return (
    <div className="resetPatientChartWidgetContainer">
      <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
        <Switch>
          <Route exact path="/patient/:patientUuid/chart/orders/overview">
            <MedicationsOverview />
          </Route>
          <Route exact path="/patient/:patientUuid/chart/orders/medication-orders">
            <MedicationsDetailedSummary />
          </Route>
          <Route exact path="/patient/:patientUuid/chart/orders/medication-orders/:medicationUuid">
            <MedicationRecord />
          </Route>
          <Route path="/">
            <MedicationsOverview />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default openmrsRootDecorator({
  featureName: 'drugorder',
  moduleName: '@openmrs/esm-drugorder-app',
})(Root);
