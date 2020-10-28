import React from 'react';
import { defineConfigSchema } from '@openmrs/esm-config';
import openmrsRootDecorator from '@openmrs/react-root-decorator';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import OrderBasketShell from './order-basket/order-basket-shell.component';
import { Provider } from 'unistore/react';
import { orderBasketStore } from './order-basket-store';

defineConfigSchema('@openmrs/esm-drugorder-app', {});

function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Switch>
        <Route exact path="/patient/:patientUuid/drugorder/basket">
          <Provider store={orderBasketStore}>
            <OrderBasketShell />
          </Provider>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default openmrsRootDecorator({
  featureName: 'drugorder',
  moduleName: '@openmrs/esm-drugorder-app',
})(Root);
