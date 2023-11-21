import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface MdrTbListProps {
  patientUuid: string;
}

const MdrTbList: React.FC<MdrTbListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('MdrTbEnrolment', 'TB/MDR TB Enrolment');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default MdrTbList;
