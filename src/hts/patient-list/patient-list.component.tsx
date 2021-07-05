import React, { useState } from 'react';

import styles from './patient-list.scss';
import { paginate } from './pagination';
import Button from 'carbon-components-react/es/components/Button';
import { Add16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import OTable from '../../components/data-table/o-table.component';
import { attach, openmrsFetch, switchTo, age, navigate } from '@openmrs/esm-framework';
import { DataTableSkeleton, Pagination } from 'carbon-components-react';
import EmptyState from '../../components/empty-state/empty-state.component';
import moment from 'moment';
import { capitalize } from 'lodash';
import dayjs from 'dayjs';

interface HtsOverviewListProps {
  patientUuid: string;
}

const PatientList: React.FC<HtsOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const rowCount = 5;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentMedicationPage] = paginate(tableRows, page, pageSize);

  const forceComponentUpdate = () => setCounter(counter + 1);
  const addNewPatient = () => navigate({ to: '${openmrsSpaBase}/patient-registration' });

  const tableHeaders = [
    { key: 'name', header: 'Name', isSortable: true },
    { key: 'gender', header: 'Gender' },
    { key: 'age', header: 'Age' },
    { key: 'last_visit', header: 'Last Visit' },
  ];

  function getPatients() {
    return openmrsFetch(`/ws/fhir2/R4/Patient`).then(({ data }) => {
      let rows = [];
      data.entry.forEach(patient => {
        rows.push({
          id: patient.resource.id,
          name: `${patient.resource.name[0].given.join(' ')} ${patient.resource.name[0].family}`,
          gender: capitalize(patient.resource.gender),
          age: age(patient.resource.birthDate),
          // last_visit: moment(patient.encounterDatetime).format('DD-MMM-YYYY'),
          last_visit: '--',
        });
      });

      setTableRows(rows);
      setIsLoading(false);
    });
  }
  React.useEffect(() => {
    getPatients();
  }, [counter]);

  const headerTitle = 'Patient List';

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : tableRows.length > 0 ? (
        <div className={styles.widgetContainer}>
          <div className={styles.widgetHeaderContainer}>
            <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
            <div className={styles.toggleButtons}>
              <Button
                kind="ghost"
                renderIcon={Add16}
                iconDescription="New"
                onClick={e => {
                  e.preventDefault();
                  addNewPatient();
                }}>
                {t('add', 'New')}
              </Button>
            </div>
          </div>
          <OTable tableHeaders={tableHeaders} tableRows={tableRows} />
          <div style={{ width: '800px' }}>
            <Pagination
              page={page}
              pageSize={pageSize}
              pageSizes={[10, 20, 30, 40, 50]}
              totalItems={tableRows.length}
              onChange={({ page, pageSize }) => {
                setPage(page);
                setPageSize(pageSize);
              }}
            />
          </div>
        </div>
      ) : (
        <EmptyState
          displayText={t('patientList', 'patient list')}
          headerTitle={headerTitle}
          launchForm={addNewPatient}
        />
      )}
    </>
  );
};

export default PatientList;
