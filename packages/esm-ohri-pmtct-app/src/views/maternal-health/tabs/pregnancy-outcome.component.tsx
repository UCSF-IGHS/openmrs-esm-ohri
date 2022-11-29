import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface PregnancyOutcomeListProps {
  patientUuid: string;
}

const PregnancyOutcomeList: React.FC<PregnancyOutcomeListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('pregnancyOutcome', 'Pregnancy Outcome');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default PregnancyOutcomeList;
