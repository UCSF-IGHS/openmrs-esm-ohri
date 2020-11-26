import React from 'react';
import { defineConfigSchema } from '@openmrs/esm-config';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'unistore/react';
import { orderBasketStore } from './order-basket-store';
import OrderBasket from './order-basket/order-basket.component';
import { switchTo } from '@openmrs/esm-extensions';
import { useCurrentPatient } from '@openmrs/esm-react-utils';

defineConfigSchema('@openmrs/esm-drugorder-app', {});

export interface RootOrderBasketProps {
  patientUuid?: string;
  closeWorkspace?: () => void;
}

export default function RootOrderBasket({ patientUuid, closeWorkspace: closeWorkspace }: RootOrderBasketProps) {
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
