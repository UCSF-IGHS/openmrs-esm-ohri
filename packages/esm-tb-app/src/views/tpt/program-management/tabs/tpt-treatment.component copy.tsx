import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface TptTreatmentListProps {
  patientUuid: string;
}

const TptTreatmentList: React.FC<TptTreatmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('tptTreatment', 'TPT Treatment');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default TptTreatmentList;
