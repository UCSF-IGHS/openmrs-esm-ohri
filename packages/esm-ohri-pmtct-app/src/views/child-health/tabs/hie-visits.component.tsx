import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface HieVisitsListProps {
  patientUuid: string;
}

const HieVisitsList: React.FC<HieVisitsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('hie_visits_header', 'HIE Visits');
  const displayText = t('hie_visits_display', 'HIE Visits');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default HieVisitsList;
