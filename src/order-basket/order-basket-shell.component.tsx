import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header, HeaderGlobalAction, HeaderGlobalBar, HeaderName } from 'carbon-components-react';
import { Close32 } from '@carbon/icons-react';
import { Link } from 'react-router-dom';
import { useCurrentPatient } from '@openmrs/esm-api';
import OrderBasket from './order-basket.component';

export default function OrderBasketShell() {
  const { t } = useTranslation();
  const [, , patientUuid] = useCurrentPatient();

  return (
    <>
      <Header aria-label={t('orderBasket', 'Order Basket')} style={{ position: 'sticky' }}>
        <HeaderName prefix="">{t('orderBasket', 'Order Basket')}</HeaderName>
        <HeaderGlobalBar>
          <Link to={`/patient/${patientUuid}/chart/orders`}>
            <HeaderGlobalAction aria-label={t('close', 'Close')} title={t('close', 'Close')}>
              <Close32 />
            </HeaderGlobalAction>
          </Link>
        </HeaderGlobalBar>
      </Header>
      <OrderBasket />
    </>
  );
}
