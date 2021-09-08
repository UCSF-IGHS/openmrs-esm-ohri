import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../components/empty-state/empty-state.component';

interface CovidOverviewListProps {
  patientUuid: string;
}

const CovidOverviewList: React.FC<CovidOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = 'Covid Sessions';

  const launchHTSForm = (form?: any) => {};

  return (
    <>
      <EmptyState
        displayText={t('covidEncounters', 'covid encounters')}
        headerTitle={headerTitle}
        launchForm={launchHTSForm}
      />
    </>
  );
};

export default CovidOverviewList;
