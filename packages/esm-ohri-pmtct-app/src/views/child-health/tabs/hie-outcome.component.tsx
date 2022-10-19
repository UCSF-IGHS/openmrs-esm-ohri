import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface HieOutcomesListProps {
  patientUuid: string;
}

const HieOutcomesList: React.FC<HieOutcomesListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('hie_outcomes_header', 'HIE Outcomes');
  const displayText = t('hie_outcomes_display', 'HIE Outcomes');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default HieOutcomesList;
