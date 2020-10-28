import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { defineConfigSchema } from '@openmrs/esm-config';
import openmrsRootDecorator from '@openmrs/react-root-decorator';
import MedicationsSummary from './medications-summary/medications-summary.component';
import styles from './root.scss';
import { Provider } from 'unistore/react';
import { orderBasketStore } from './order-basket-store';

defineConfigSchema('@openmrs/esm-drugorder-app', {});

function ExtensionRoot() {
  return (
    <div className={styles.resetPatientChartWidgetContainer}>
      <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
        <Switch>
          <Route exact path="/patient/:patientUuid/chart/orders/medication-orders">
            <Provider store={orderBasketStore}>
              <MedicationsSummary />
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
})(ExtensionRoot);
