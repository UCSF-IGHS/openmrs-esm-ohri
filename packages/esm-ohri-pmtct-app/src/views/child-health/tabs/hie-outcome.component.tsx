import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface HieOutcomesListProps {
  patientUuid: string;
}

const HieOutcomesList: React.FC<HieOutcomesListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('hieOutcomes', 'HIE Outcomes');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default HieOutcomesList;
