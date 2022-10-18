import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface ChildHealthListProps {
  patientUuid: string;
}

const ChildHealthList: React.FC<ChildHealthListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('child_health_header', 'Child Health');
  const displayText = t('child_health_display', 'Child Health');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default ChildHealthList;
