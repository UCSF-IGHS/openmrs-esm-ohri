import React, { useEffect, useState } from 'react';
import styles from './patient-list.scss';
import { Add } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { age, navigate } from '@openmrs/esm-framework';
import { DataTableSkeleton, Pagination, OverflowMenu, Button } from '@carbon/react';
import { capitalize } from 'lodash-es';
import moment from 'moment';
import {
  AddPatientToListOverflowMenuItem,
  EmptyState,
  OTable,
  fetchLastVisit,
  fetchPatientList,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export const PatientList = () => {
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);
  const [patientsToLastVisitMap, setPatientsToLastVisitMap] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPatientCount, setPatientCount] = useState(0);
  const [nextOffSet, setNextOffSet] = useState(0);
  const headerTitle = t('patientList', 'Patient List');
  const tableHeaders = [
    { key: 'name', header: t('name', 'Name'), isSortable: true },
    { key: 'gender', header: t('gender', 'Gender') },
    { key: 'age', header: t('age', 'Age') },
    { key: 'lastVisit', header: t('lastVisit', 'Last Visit') },
    { key: 'actions', header: '' },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetchPatientList(nextOffSet, pageSize).then(({ data }) => {
      setPatients(data.entry);
      setPatientCount(data.total);
      setIsLoading(false);
    });
  }, [page, pageSize]);

  useEffect(() => {
    let rows = [];
    for (let patient of patients) {
      const lastVisit = patientsToLastVisitMap.find((entry) => entry.patientId === patient.resource.id)?.lastVisit;
      const patientActions = (
        <OverflowMenu flipped>
          <AddPatientToListOverflowMenuItem patientUuid={patient.resource.id} excludeCohorts={[]} />
        </OverflowMenu>
      );

      rows.push({
        id: patient.resource.id,
        name: (
          <Router>
            <Link style={{ textDecoration: 'inherit' }} to={getPatientURL(patient.resource.id)}>
              {`${patient.resource.name[0].given.join(' ')} ${patient.resource.name[0].family}`}
            </Link>
          </Router>
        ),
        gender: capitalize(patient.resource.gender),
        age: age(patient.resource.birthDate),
        lastVisit: lastVisit ? moment(lastVisit).format('DD-MMM-YYYY') : '__',
        actions: patientActions,
      });
    }
    setAllRows(rows);
  }, [patients, patientsToLastVisitMap]);

  useEffect(() => {
    const patientToLastVisitPromises = patients.map((patient) => fetchLastVisit(patient.resource.id));
    Promise.all(patientToLastVisitPromises).then((values) => {
      setPatientsToLastVisitMap(
        values.map((value, index) => ({
          lastVisit: value.data?.entry?.length ? value.data?.entry[0]?.resource?.period?.start : '',
          patientId: patients[index].resource.id,
        })),
      );
    });
  }, [patients]);

  const addNewPatient = () => navigate({ to: '${openmrsSpaBase}/patient-registration' });
  const getPatientURL = (patientUuid) => `/openmrs/spa/patient/${patientUuid}/chart`;

  return (
    <div className={styles.patientListContainer}>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : allRows.length > 0 ? (
        <div className={styles.widgetContainer}>
          <div className={styles.widgetHeaderContainer}>
            <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
            <div className={styles.toggleButtons}>
              <Button
                kind="ghost"
                renderIcon={Add}
                iconDescription="New"
                onClick={(e) => {
                  e.preventDefault();
                  addNewPatient();
                }}>
                {t('add', 'Add')}
              </Button>
            </div>
          </div>
          <OTable tableHeaders={tableHeaders} tableRows={allRows} />
          <div style={{ width: '800px' }}>
            <Pagination
              page={page}
              pageSize={pageSize}
              pageSizes={[10, 20, 30, 40, 50]}
              totalItems={totalPatientCount}
              onChange={({ page, pageSize }) => {
                setPage(page);
                setNextOffSet((page - 1) * pageSize);
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
    </div>
  );
};
