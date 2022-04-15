import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyStateComingSoon from '../../components/empty-state/empty-state-comingsoon.component';

interface CacxSummaryListProps {
  patientUuid: string;
}

const CacxSummaryList: React.FC<CacxSummaryListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cacx', 'CaCx Summary');
  const displayText = t('cacx', 'CaCx Summary');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default CacxSummaryList;
