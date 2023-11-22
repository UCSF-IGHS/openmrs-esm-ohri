import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon, PatientChartProps } from '@ohri/openmrs-esm-ohri-commons-lib';

const MdrTbList: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('MdrTbEnrolment', 'TB/MDR TB Enrolment');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default MdrTbList;
