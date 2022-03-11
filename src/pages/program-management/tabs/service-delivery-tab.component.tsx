import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface ServiceDeliveryTabListProps {
  patientUuid: string;
}

const ServiceDeliveryTabList: React.FC<ServiceDeliveryTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('serviceDelivery', 'Service Delivery');
  const displayText = t('serviceDelivery', 'Service Delivery');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default ServiceDeliveryTabList;
