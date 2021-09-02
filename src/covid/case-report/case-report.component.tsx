import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../components/empty-state/empty-state.component';
import { Button, Tab, Tabs } from 'carbon-components-react';
import styles from '../covid.scss';
import { Add16 } from '@carbon/icons-react';
import OTable from '../../components/data-table/o-table.component';

interface CovidOverviewListProps {
  patientUuid: string;
}

const CovidCaseReport: React.FC<CovidOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = 'Covid Case Reports';

  const launchHTSForm = (form?: any) => {};

  const tableHeaders = [
    { key: 'date', header: 'Date of service enrolment', isSortable: true },
    { key: 'clientDescription', header: 'Description of client' },
    { key: 'populationCategory', header: 'Population category' },
    { key: 'dateConfirmedPositive', header: 'Date confirmed positive' },
    { key: 'action', header: 'Action' },
  ];

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

export default CovidCaseReport;
