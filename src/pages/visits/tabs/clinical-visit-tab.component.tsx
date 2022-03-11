import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface ClinicalVisitListProps {
  patientUuid: string;
}

const ClinicalVisitList: React.FC<ClinicalVisitListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('clinicalVisit', 'Clinical Visit');
  const displayText = t('clinicalVisit', 'Clinical Visit');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default ClinicalVisitList;
