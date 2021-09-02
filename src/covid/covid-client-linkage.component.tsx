import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../components/empty-state/empty-state.component';
import { Button, Tab, Tabs } from 'carbon-components-react';

interface CovidOverviewListProps {
  patientUuid: string;
}

const CovidClientLinkage: React.FC<CovidOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = 'Covid Case Linkages';

  const launchHTSForm = (form?: any) => {};

  return (
    <>
      <EmptyState
        displayText={t('covidCaseReports', 'Covid Care Reports')}
        headerTitle={headerTitle}
        launchForm={launchHTSForm}
      />
      <Button
        kind="ghost"
        displayText={t('covidCaseReports', 'service enrolments')}
        id="choose-intent"
        label="Add +"></Button>
    </>
  );
};

export default CovidClientLinkage;
