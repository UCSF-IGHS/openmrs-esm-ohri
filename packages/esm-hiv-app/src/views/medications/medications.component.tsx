import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from 'openmrs-esm-ohri-commons-lib';

interface MedicationsListProps {
  patientUuid: string;
}

const MedicationsList: React.FC<MedicationsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('medications', 'Medications');
  const displayText = t('medications', 'Medications');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default MedicationsList;
