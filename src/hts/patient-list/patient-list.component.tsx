import React, { useEffect, useState } from 'react';

import styles from './patient-list.scss';
import Button from 'carbon-components-react/es/components/Button';
import { Add16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import OTable from '../../components/data-table/o-table.component';
import { openmrsFetch, age, navigate } from '@openmrs/esm-framework';
import { DataTableSkeleton, Link, Pagination } from 'carbon-components-react';
import EmptyState from '../../components/empty-state/empty-state.component';
import { capitalize } from 'lodash';

interface HtsOverviewListProps {
  patientUuid: string;
}

const PatientList: React.FC<HtsOverviewListProps> = () => {
  const { t } = useTranslation();
  const [patients, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPatientCount, setPatientCount] = useState(0);
  const [nextOffSet, setNextOffSet] = useState(0);
  const headerTitle = 'Patient List';
  const tableHeaders = [
    { key: 'name', header: 'Name', isSortable: true },
    { key: 'gender', header: 'Gender' },
    { key: 'age', header: 'Age' },
    { key: 'last_visit', header: 'Last Visit' },
  ];

  useEffect(() => {
    setIsLoading(true);
    loadPatients(nextOffSet, pageSize);
  }, [page, pageSize]);

  const addNewPatient = () => navigate({ to: '${openmrsSpaBase}/patient-registration' });
  const navigateToPatientDB = patientUuid => navigate({ to: '${openmrsSpaBase}/patient/' + `${patientUuid}/chart` });

  function loadPatients(offSet: number, pageSize: number) {
    return openmrsFetch(`/ws/fhir2/R4/Patient?_getpagesoffset=${offSet}&_count=${pageSize}`).then(({ data }) => {
      let rows = [];
      setPatientCount(data.total);
      data.entry.forEach(patient => {
        rows.push({
          id: patient.resource.id,
          name: (
            <Link
              onClick={e => {
                e.preventDefault();
                navigateToPatientDB(patient.resource.id);
              }}>
              {`${patient.resource.name[0].given.join(' ')} ${patient.resource.name[0].family}`}
            </Link>
          ),
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
  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : patients.length > 0 ? (
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
          <OTable tableHeaders={tableHeaders} tableRows={patients} />
          <div style={{ width: '800px' }}>
            <Pagination
              page={page}
              pageSize={pageSize}
              pageSizes={[10, 20, 30, 40, 50]}
              totalItems={totalPatientCount}
              onChange={({ page, pageSize }) => {
                setNextOffSet(page * pageSize + 1);
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
