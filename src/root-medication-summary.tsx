import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { defineConfigSchema } from '@openmrs/esm-config';
import openmrsRootDecorator from '@openmrs/react-root-decorator';
import MedicationsSummary from './medications-summary/medications-summary.component';
import styles from './root.scss';
import { Provider } from 'unistore/react';
import { orderBasketStore } from './order-basket-store';

defineConfigSchema('@openmrs/esm-drugorder-app', {});

export interface RootMedicationSummaryProps {
  patientUuid: string;
}

function RootMedicationSummary({ patientUuid }: RootMedicationSummaryProps) {
  return (
    <div className={styles.resetPatientChartWidgetContainer}>
      <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
        <Switch>
          <Route exact path="/patient/:patientUuid/chart/orders">
            <Provider store={orderBasketStore}>
              <MedicationsSummary patientUuid={patientUuid} />
            </Provider>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default openmrsRootDecorator({
  featureName: 'drugorder',
  moduleName: '@openmrs/esm-drugorder-app',
})(RootMedicationSummary);
