import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface MaternalHealthListProps {
  patientUuid: string;
}

const MaternalHealthList: React.FC<MaternalHealthListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('maternal_health_header', 'Maternal Health');
  const displayText = t('maternal_health_display', 'Maternal Health');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default MaternalHealthList;
