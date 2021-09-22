import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../common.scss';
import { DataTableSkeleton } from 'carbon-components-react';
import EmptyState from '../../components/empty-state/empty-state.component';
import OTable from '../../components/data-table/o-table.component';

interface OverviewListProps {
  patientUuid: string;
}

const CovidLabResultsList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;

  const tableHeaders = [
    { key: 'encounterDate', header: 'Encounter Date', isSortable: true },
    { key: 'cov2TestType', header: 'SARS-Cov2 test type' },
    { key: 'lastTestDate', header: 'Date of last test' },
    { key: 'lastTestResult', header: 'Result' },
    { key: 'reasonsForTesting', header: 'Reasons for testing' },
    { key: 'vaccinationStatus', header: 'Vaccination Status' },
    { key: 'patientStatus', header: 'Patient status' },
  ];

  const headerTitle = t('covidLabResults', 'Lab Results');
  const displayText = t('covidLabResults', 'Lab Results');

  const launchCovidForm = (form?: any) => {};

  useEffect(() => {
    setTimeout(() => {
      tableRows.push({});
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : tableRows.length > 0 ? (
        <>
          <div className={styles.widgetContainer}>
            <div className={styles.widgetHeaderContainer}>
              <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
            </div>
            <OTable tableHeaders={tableHeaders} tableRows={tableRows} />
          </div>
        </>
      ) : (
        <EmptyState displayText={displayText} headerTitle={headerTitle} launchForm={launchCovidForm} />
      )}
    </>
  );
};

export default CovidLabResultsList;
