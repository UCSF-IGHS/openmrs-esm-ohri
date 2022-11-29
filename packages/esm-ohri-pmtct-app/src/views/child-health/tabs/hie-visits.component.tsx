import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface HieVisitsListProps {
  patientUuid: string;
}

const HieVisitsList: React.FC<HieVisitsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('hieVisits', 'HIE Visits');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default HieVisitsList;
