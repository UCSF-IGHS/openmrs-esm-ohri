import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface CacxScreeningListProps {
  patientUuid: string;
}

const CacxScreeningList: React.FC<CacxScreeningListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('cacxScreening', 'CaCx Screening');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default CacxScreeningList;
