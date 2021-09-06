import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../components/empty-state/empty-state.component';
import { Button, Tab, Tabs } from 'carbon-components-react';
import styles from '../covid.scss';
import { Add16 } from '@carbon/icons-react';
import DataTableSkeleton from 'carbon-components-react/lib/components/DataTableSkeleton';
import { getForm } from '../../utils/forms-loader';
import { OHRIFormLauncherEmpty } from '../../components/ohri-form-launcher/ohri-form-empty-launcher.component';
import { launchForm } from '../../utils/ohri-forms-commons';
interface CovidOverviewListProps {
  patientUuid: string;
}

const CovidCaseReport: React.FC<CovidOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = 'Covid Case Reports';
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [covidCaseReport, setCovidCaseReport] = useState(getForm('covid', 'covid_case'));

  const launchHTSForm = (form?: any) => {};

  const forceComponentUpdate = () => setCounter(counter + 1);

  const tableHeaders = [
    { key: 'date', header: 'Date of service enrolment', isSortable: true },
    { key: 'clientDescription', header: 'Description of client' },
    { key: 'populationCategory', header: 'Population category' },
    { key: 'dateConfirmedPositive', header: 'Date confirmed positive' },
    { key: 'action', header: 'Action' },
  ];

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={5} />
      ) : tableRows.length > 0 ? (
        <>
          <div>Table goes here</div>
        </>
      ) : (
        <EmptyState
          displayText={t('covidCaseReports', 'Covid Case Reports')}
          headerTitle={t('covidCaseReports', 'Covid Case Reports')}
          launchFormComponent={
            <OHRIFormLauncherEmpty launchForm={() => launchForm(covidCaseReport, forceComponentUpdate)} />
          }
        />
      )}
    </>
  );
};

export default CovidCaseReport;
