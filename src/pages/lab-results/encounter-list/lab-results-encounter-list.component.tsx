import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyStateComingSoon from '../../../components/empty-state/empty-state-comingsoon.component';

interface OverviewListProps {
  patientUuid: string;
}

const LabResultsOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('labResults', 'Viral Load');
  const displayText = t('labResults', 'Viral Load');

  return (
    <>
      <EmptyStateComingSoon headerTitle={headerTitle} displayText={displayText} />
    </>
  );
};

export default LabResultsOverviewList;
