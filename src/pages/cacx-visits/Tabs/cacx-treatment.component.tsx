import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyStateComingSoon from '../../../components/empty-state/empty-state-comingsoon.component';

interface CacxTreatmentListProps {
  patientUuid: string;
}

const CacxTreatmentList: React.FC<CacxTreatmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cacx treatment', 'CaCx Treatment');
  const displayText = t('cacx treatment', 'CaCx Treatment');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default CacxTreatmentList;
