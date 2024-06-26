import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface MedicationsListProps {
  patientUuid: string;
}

const MedicationsList: React.FC<MedicationsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('medications_header', 'Medications');
  const displayText = t('medications_display', 'Medications');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default MedicationsList;
