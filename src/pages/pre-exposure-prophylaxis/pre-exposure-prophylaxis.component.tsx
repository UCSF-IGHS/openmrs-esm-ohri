import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyStateComingSoon from '../../components/empty-state/empty-state-comingsoon.component';

interface PreExposureProphylaxisListProps {
  patientUuid: string;
}

const PreExposureProphylaxisList: React.FC<PreExposureProphylaxisListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('preExposureProphylaxis', 'Pre-exposure Prophylaxis');
  const displayText = t('preExposureProphylaxis', 'Pre-exposure Prophylaxis (PrEP)');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default PreExposureProphylaxisList;
