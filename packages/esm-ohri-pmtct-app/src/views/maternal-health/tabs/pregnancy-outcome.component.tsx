import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface PregnancyOutcomeListProps {
  patientUuid: string;
}

const PregnancyOutcomeList: React.FC<PregnancyOutcomeListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('pregnancy_outcome_header', 'Pregnancy Outcome');
  const displayText = t('pregnancy_outcome_display', 'Pregnancy Outcome');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default PregnancyOutcomeList;
