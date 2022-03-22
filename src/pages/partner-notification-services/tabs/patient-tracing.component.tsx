import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface PatientTracingListProps {
  patientUuid: string;
}

const PatientTracingList: React.FC<PatientTracingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('patientTracing', 'Patient Tracing');
  const displayText = t('patientTracing', 'Patient Tracing');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default PatientTracingList;
