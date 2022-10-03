import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface PreExposureProphylaxisListProps {
  patientUuid: string;
}

const PreExposureProphylaxisList: React.FC<PreExposureProphylaxisListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('preExposureProphylaxisTitle', 'Pre-exposure Prophylaxis');
  const displayText = t('preExposureProphylaxisHeader', 'Pre-exposure Prophylaxis (PrEP)');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default PreExposureProphylaxisList;
