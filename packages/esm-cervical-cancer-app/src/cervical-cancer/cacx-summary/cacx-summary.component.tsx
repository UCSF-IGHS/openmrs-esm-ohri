import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface CacxSummaryListProps {
  patientUuid: string;
}

const CacxSummaryList: React.FC<CacxSummaryListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cacxSummary', 'CaCx Summary');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default CacxSummaryList;
