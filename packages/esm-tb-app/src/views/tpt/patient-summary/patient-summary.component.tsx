import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface TptPatientSummaryProps {
  patientUuid: string;
}

const TptPatientSummary: React.FC<TptPatientSummaryProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('patientSummary', 'Patient Summary');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default TptPatientSummary;
