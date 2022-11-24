import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface MaternalSummaryListProps {
  patientUuid: string;
}

const MaternalSummaryList: React.FC<MaternalSummaryListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('maternalSummary', 'Maternal Summary');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default MaternalSummaryList;
