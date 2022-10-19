import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface LabourDeliveryListProps {
  patientUuid: string;
}

const LabourDeliveryList: React.FC<LabourDeliveryListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('labour_delivery_header', 'Labour and Deliver');
  const displayText = t('labour_delivery_display', 'Labour and Deliver');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default LabourDeliveryList;
