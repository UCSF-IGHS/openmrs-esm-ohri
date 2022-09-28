import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface OverviewListProps {
  patientUuid: string;
}

const DrugOrdersOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const launchHTSForm = (form?: any) => {};
  const headerTitle = t('serviceSummaryTitle', 'Drug Orders');
  const displayText = t('serviceSummaryDisplay', 'Drug Orders');

  return (
    <>
      <EmptyStateComingSoon headerTitle={headerTitle} displayText={displayText} />
    </>
  );
};

export default DrugOrdersOverviewList;
