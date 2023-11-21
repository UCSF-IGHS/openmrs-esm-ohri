import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface TbPatientTracingProps {
  patientUuid: string;
}

const TbPatientTracing: React.FC<TbPatientTracingProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('PatientTracing', 'Patient Tracing');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default TbPatientTracing;
