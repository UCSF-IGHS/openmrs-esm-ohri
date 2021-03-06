import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from 'openmrs-esm-ohri-commons-lib';

interface CacxScreeningListProps {
  patientUuid: string;
}

const CacxScreeningList: React.FC<CacxScreeningListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cacx screening', 'CaCx Screening');
  const displayText = t('cacx screening', 'CaCx Screening');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default CacxScreeningList;
