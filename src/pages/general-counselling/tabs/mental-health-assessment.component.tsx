import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface MentalHealthAssessmentListProps {
  patientUuid: string;
}

const MentalHealthAssessmentList: React.FC<MentalHealthAssessmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('mentalHealthAssessment', 'Mental Health Assessment');
  const displayText = t('mentalHealthAssessment', 'Mental Health Assessment');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default MentalHealthAssessmentList;
