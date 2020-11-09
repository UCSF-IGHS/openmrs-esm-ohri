import React from 'react';
import { defineConfigSchema } from '@openmrs/esm-config';
import openmrsRootDecorator from '@openmrs/react-root-decorator';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'unistore/react';
import { orderBasketStore } from './order-basket-store';
import OrderBasket from './order-basket/order-basket.component';
import { switchTo } from '@openmrs/esm-extensions';
import { useCurrentPatient } from '@openmrs/esm-api';

defineConfigSchema('@openmrs/esm-drugorder-app', {});

export interface RootOrderBasketProps {
  patientUuid?: string;
  closeWorkspace?: () => void;
}

function RootOrderBasket({ patientUuid, closeWorkspace: closeWorkspace }: RootOrderBasketProps) {
  const [, , fallbackPatientUuid] = useCurrentPatient();
  patientUuid = patientUuid ?? fallbackPatientUuid;
  closeWorkspace = closeWorkspace ?? (() => switchTo('link', ''));

  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Provider store={orderBasketStore}>
        <OrderBasket patientUuid={patientUuid} closeWorkspace={closeWorkspace} />
      </Provider>
    </BrowserRouter>
  );
}

export default openmrsRootDecorator({
  featureName: 'drugorder',
  moduleName: '@openmrs/esm-drugorder-app',
})(RootOrderBasket);
