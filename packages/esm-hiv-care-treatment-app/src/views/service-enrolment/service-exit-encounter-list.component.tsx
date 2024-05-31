import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../common.scss';
import { DataTableSkeleton } from '@carbon/react';
import { EmptyState, OTable } from '@ohri/openmrs-esm-ohri-commons-lib';

interface OverviewListProps {
  patientUuid: string;
}

const ServiceExitOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('serviceExit', 'Service Exit');
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;

  const tableHeaders = [
    { key: 'date', header: t('enrollDate', 'Date of enrollment'), isSortable: true },
    { key: 'description', header: t('clientDescription', 'Client Description') },
    { key: 'populationType', header: t('populationType', 'Population Type') },
    { key: 'diagnosisType', header: t('hivDiagnosisDate', 'HIV Diagnosis Date') },
    { key: 'status', header: t('status', 'Status') },
    { key: 'action', header: t('action', 'Action') },
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
        <EmptyState displayText={headerTitle} headerTitle={headerTitle} launchForm={launchHTSForm} />
      )}
    </>
  );
};

export default ServiceExitOverviewList;
