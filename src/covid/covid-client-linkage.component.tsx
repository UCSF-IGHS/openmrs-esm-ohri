import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import EmptyState from '../../components/empty-state/empty-state.component';
import EmptyState from '../components/empty-state/empty-state.component';

interface CovidOverviewListProps {
  patientUuid: string;
}

const CovidClientLinkage: React.FC<CovidOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = 'Covid Client Linkages';

  const launchHTSForm = (form?: any) => {};

  return (
    <>
      <EmptyState
        displayText={t('covidClientLinkages', 'covid client linkages')}
        headerTitle={headerTitle}
        launchForm={launchHTSForm}
      />
    </>
  );
};

export default CovidClientLinkage;
