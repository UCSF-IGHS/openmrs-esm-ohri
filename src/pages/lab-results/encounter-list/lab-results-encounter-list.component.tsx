import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';
import EmptyStateComingSoon from '../../../components/empty-state/empty-state-comingsoon.component';

interface OverviewListProps {
  patientUuid: string;
}

const LabResultsOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('labResults', 'Lab Results');
  const displayText = t('labResults', 'Lab Results');

  return (
    <>
      <EmptyStateComingSoon headerTitle={headerTitle} displayText={displayText} />
    </>
  );
};

export default LabResultsOverviewList;
