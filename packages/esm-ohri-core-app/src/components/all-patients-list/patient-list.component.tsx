/* eslint-disable no-debugger, no-console */
import React, { useEffect, useState, useMemo, useCallback } from 'react';

import styles from './patient-list.scss';
import Button from 'carbon-components-react/es/components/Button';
import { Add16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import { age, navigate } from '@openmrs/esm-framework';
import { DataTableSkeleton, Pagination, OverflowMenu } from 'carbon-components-react';
import { capitalize } from 'lodash';
import moment from 'moment';
import {
  AddPatientToListOverflowMenuItem,
  EmptyState,
  OTable,
  fetchLastVisit,
  fetchPatientList,
} from 'openmrs-esm-ohri-commons-lib';
import { BrowserRouter as Router, Link } from 'react-router-dom';

interface PatientListProps {
  patientUuid: string;
}

const PatientList: React.FC<PatientListProps> = () => {
  const { t } = useTranslation();
  const [patients, setAllRows] = useState([]);
  const [tablePatients, setTableRows] = useState([]);
  const [counter, setCounter] = useState(0);
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
    { key: 'actions', header: '' },
  ];

  useEffect(() => {
    setIsLoading(true);
    loadPatientsTest(nextOffSet, pageSize);
  }, [page]);

  const addNewPatient = () => navigate({ to: '${openmrsSpaBase}/patient-registration' });
  const getPatientURL = patientUuid => `/openmrs/spa/patient/${patientUuid}/chart`;

  const loadPatientsTest = useCallback(async (offSet: number, pageSize: number) => {
    let rows = [];
    let extraFetch = pageSize * 2;
    //Check whether offset is not greater than patient total count
    //check if page size is not greater than patient total count - offset
    const { data: patients } = await fetchPatientList(offSet, pageSize);
    console.log(patients.entry.length);

    setPatientCount(patients.total);
    if (patients.entry.length > 0) {
      for (let patient of patients.entry) {
        let lastVisit = '';
        fetchLastVisit(patient.resource.id).then(({ data }) => {
          lastVisit = data?.entry?.length ? data?.entry[0]?.resource?.period?.start : '';
          console.log(lastVisit);
        });
        // const { data } = await fetchLastVisit(patient.resource.id);
        // const lastVisit = data?.entry?.length ? data?.entry[0]?.resource?.period?.start : '';
        //const lastVisit = '';

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
          last_visit: lastVisit ? moment(lastVisit).format('DD-MMM-YYYY') : '__',
          actions: patientActions,
        });
      }
      setAllRows(rows);
      //updateTable(rows, 0, pageSize);
    } else {
      setAllRows([page]);
    }

    setIsLoading(false);
  }, []);

  const updateTable = (fullDataset, start, itemCount) => {
    let currentRows = [];
    for (let i = start; i < start + itemCount; i++) {
      if (i < fullDataset.length) {
        currentRows.push(fullDataset[i]);
      }
    }
    setTableRows(currentRows);
  };

  /*const constructPatientList = async (patients) => {
    let rows = [];

    setPatientCount(patients.total);
    if (patients.entry.length > 0) {
      for (let patient of patients.entry) {
        const { data } = await fetchLastVisit(patient.resource.id);
        const lastVisit = data?.entry?.length ? data?.entry[0]?.resource?.period?.start : '';

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
          last_visit: lastVisit ? moment(lastVisit).format('DD-MMM-YYYY') : '__',
          actions: patientActions,
        });
      }
      return rows;
  }*/

  const backgroundPatientsFetch = async (offSet: number, pageSize: number) => {
    let rows = [];
    const { data: patients } = await fetchPatientList(offSet, pageSize);

    if (patients.entry.length > 0) {
      for (let patient of patients.entry) {
        // const { data } = await fetchLastVisit(patient.resource.id);
        // const lastVisit = data?.entry?.length ? data?.entry[0]?.resource?.period?.start : '';
        const lastVisit = '';

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
          last_visit: lastVisit ? moment(lastVisit).format('DD-MMM-YYYY') : '__',
          actions: patientActions,
        });
      }
      setAllRows([...patients, ...rows]);
      console.log(`Total after bg fetch ->${patients.length}`);
    }
  };

  async function loadPatients(offSet: number, pageSize: number) {
    let rows = [];
    const { data: patients } = await fetchPatientList(offSet, pageSize);

    setPatientCount(patients.total);
    if (patients.entry.length > 0) {
      for (let patient of patients.entry) {
        const { data } = await fetchLastVisit(patient.resource.id);
        const lastVisit = data?.entry?.length ? data?.entry[0]?.resource?.period?.start : '';

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
          last_visit: lastVisit ? moment(lastVisit).format('DD-MMM-YYYY') : '__',
          actions: patientActions,
        });
      }
      setAllRows(rows);
      updateTable(rows, 0, pageSize);
    } else {
      setAllRows([]);
    }

    setIsLoading(false);
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
                {t('add', 'Add')}
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
                let startOffset = (page - 1) * pageSize;
                //updateTable(patients, startOffset, pageSize);
                setNextOffSet(page * pageSize + 1);
                setPage(page);
                setPageSize(pageSize);
                // let nextFetch = nextOffSet + pageSize;
                // console.log(`next fetch -> ${nextFetch}`);
                // console.log(`next offset -> ${nextOffSet}`);
                // console.log(`page -> ${page}`);
                // if (nextFetch <= totalPatientCount) {
                //   backgroundPatientsFetch(nextOffSet, pageSize);
                // }
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
