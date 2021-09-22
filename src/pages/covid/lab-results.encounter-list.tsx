import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../common.scss';
import { DataTableSkeleton } from 'carbon-components-react';
import EmptyState from '../../components/empty-state/empty-state.component';
import OTable from '../../components/data-table/o-table.component';
import { OHRIFormLauncherWithIntent } from '../../components/ohri-form-launcher/ohri-form-laucher.componet';
import { getForm } from '../../utils/forms-loader';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
interface OverviewListProps {
  patientUuid: string;
}

const CovidLabResultsList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;
  const [counter, setCounter] = useState(0);
  const [covidLabTestForm, setCovidLabTestForm] = useState(getForm('covid', 'lab_test'));

  const tableHeaders = [
    { key: 'encounterDate', header: 'Encounter Date', isSortable: true },
    { key: 'reasonsForTesting', header: 'Reason for testing' },
    { key: 'cov2TestType', header: 'Type of Test' },
    { key: 'lastTestDate', header: 'Test Date' },
    { key: 'lastTestResult', header: 'Test Result' },
    { key: 'testStatus', header: 'Test status' },
  ];

  const headerTitle = t('covidLabResults', 'Covid Lab Results');
  const displayText = t('covidLabResults', 'Covid Lab Results');

  const launchLabTestForm = (form?: any) => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: covidLabTestForm?.name,
      state: { updateParent: forceComponentUpdate, formJson: form || covidLabTestForm },
    });
  };

  const forceComponentUpdate = () => setCounter(counter + 1);

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
              <OHRIFormLauncherWithIntent
                formJson={covidLabTestForm}
                launchForm={launchLabTestForm}
                onChangeIntent={setCovidLabTestForm}
              />
            </div>
            <OTable tableHeaders={tableHeaders} tableRows={tableRows} />
          </div>
        </>
      ) : (
        <EmptyState
          displayText={displayText}
          headerTitle={headerTitle}
          launchFormComponent={
            <OHRIFormLauncherWithIntent
              formJson={covidLabTestForm}
              launchForm={launchLabTestForm}
              onChangeIntent={setCovidLabTestForm}
            />
          }
        />
      )}
    </>
  );
};

export default CovidLabResultsList;
