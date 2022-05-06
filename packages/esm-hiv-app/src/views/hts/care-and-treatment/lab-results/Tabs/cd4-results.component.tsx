import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from 'openmrs-esm-ohri-commons-lib';

interface CD4ResultsListProps {
  patientUuid: string;
}

const CD4ResultsList: React.FC<CD4ResultsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cd4LabResults', 'CD4 Lab Results');
  const displayText = t('cd4LabResults', 'CD4 Lab Results');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default CD4ResultsList;
