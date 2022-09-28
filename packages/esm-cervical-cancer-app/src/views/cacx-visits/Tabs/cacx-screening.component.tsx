import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface CacxScreeningListProps {
  patientUuid: string;
}

const CacxScreeningList: React.FC<CacxScreeningListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cacx_screening_header', 'CaCx Screening');
  const displayText = t('cacx_screening_display', 'CaCx Screening');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default CacxScreeningList;
