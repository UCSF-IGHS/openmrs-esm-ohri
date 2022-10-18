import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface LabsListProps {
  patientUuid: string;
}

const LabsList: React.FC<LabsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('labs_header', 'Labs');
  const displayText = t('labs_display', 'Labs');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default LabsList;
