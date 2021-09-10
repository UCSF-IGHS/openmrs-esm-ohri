import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../common.scss';
import EmptyState from '../../../components/empty-state/empty-state.component';
import OTable from '../../../components/data-table/o-table.component';
import { DataTableSkeleton } from 'carbon-components-react';

interface OverviewListProps {
  patientUuid: string;
}

const ServiceSummaryOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = 'HTS Service Enrolment';
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;

  const tableHeaders = [
    { key: 'date', header: 'Date of enrolment', isSortable: true },
    { key: 'description', header: 'Client Description' },
    { key: 'populationType', header: 'Population Type' },
    { key: 'diagnosisType', header: 'HIV Diagnosis Date' },
    { key: 'status', header: 'Status' },
    { key: 'action', header: 'Action' },
  ];

  const launchHTSForm = (form?: any) => {};

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
        <EmptyState displayText="HTS Service Summary" headerTitle={headerTitle} launchForm={launchHTSForm} />
      )}
    </>
  );
};

export default ServiceSummaryOverviewList;
