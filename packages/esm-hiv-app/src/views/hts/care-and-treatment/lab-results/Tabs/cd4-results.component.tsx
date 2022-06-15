/* eslint-disable no-debugger, no-console */
import React, { useEffect, useState, useCallback } from 'react';
import styles from './patient-list.scss';
import { useTranslation } from 'react-i18next';
import {
  EmptyState,
  encounterRepresentation,
  fetchLastVisit,
  fetchPatientList,
  getObsFromEncounter,
  OTable,
} from 'openmrs-esm-ohri-commons-lib';
import { age, navigate, openmrsFetch } from '@openmrs/esm-framework';
import { hivCD4Count_UUID, Cd4LabResultDate_UUID, CD4LabResultsEncounter_UUID } from '../../../../../constants';
import { DataTableSkeleton, Pagination } from 'carbon-components-react';
import { capitalize } from 'lodash';
import { Link, BrowserRouter as Router } from 'react-router-dom';

interface CD4ResultsListProps {
  patientUuid: string;
}

const CD4ResultsList: React.FC<CD4ResultsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [allRows, setAllRows] = useState([]);
  const [patients, setTableRows] = useState([]);
  const [patientsOptimized, setTableRowsOptimized] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPatientCount, setPatientCount] = useState(0);
  const [nextOffSet, setNextOffSet] = useState(0);
  const headerTitle = 'CD4 Results';
  const tableHeaders = [
    { key: 'name', header: 'Patient Name', isSortable: true },
    { key: 'age', header: 'Age' },
    { key: 'gender', header: 'Sex' },
    { key: 'cd4Result', header: 'Most Recent CD4 Count' },
    { key: 'cd4ResultDate', header: 'CD4 Results Date' },
    { key: 'actions', header: '' },
  ];

  useEffect(() => {
    if (!page) setIsLoading(true);
    loadPatients(nextOffSet, pageSize);
  }, [page, pageSize]);

  useEffect(() => {
    loadRows();
  }, [counter]);

  const addNewPatient = () => navigate({ to: '${openmrsSpaBase}/patient-registration' });
  const getPatientURL = patientUuid => `/openmrs/spa/patient/${patientUuid}/chart/hts-summary`;

  async function fetchPatientLastCd4Encounters(patientUuid: string) {
    let latestCd4Encounter = {
      result: '--',
      date: '--',
    };
    const query = `encounterType=${CD4LabResultsEncounter_UUID}&patient=${patientUuid}`;
    const viralResults = await openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`);
    if (viralResults.data.results?.length > 0) {
      const sortedEncounters = viralResults.data.results.sort(
        (firstEncounter, secondEncounter) =>
          new Date(secondEncounter.encounterDatetime).getTime() - new Date(firstEncounter.encounterDatetime).getTime(),
      );
      const lastEncounter = sortedEncounters[0];

      latestCd4Encounter.result = getObsFromEncounter(lastEncounter, hivCD4Count_UUID);
      latestCd4Encounter.date = getObsFromEncounter(lastEncounter, Cd4LabResultDate_UUID, true);
    }
    return latestCd4Encounter;
  }

  const loadRows = useCallback(() => {
    setIsLoading(true);
    fetchPatientList().then(({ data }) => {
      if (data.entry.length > 0) {
        let patientList = data.entry;
        //console.log(patientList);
        setAllRows(patientList);
        updateTable(patientList, 0, pageSize);
      } else {
        setAllRows([]);
      }
      setIsLoading(false);
    });
  }, [pageSize]);

  const updateTable = async (dataset, start, itemCount) => {
    let lastCd4Result: string;
    let lastCd4ResultDate: any;
    let currentRows = [];
    for (let i = start; i < start + itemCount; i++) {
      if (i < dataset.length) {
        currentRows.push(dataset[i]);
      }
      console.log({ currentRows });
    }
    //const rows = currentRows.map(patient => {
    // const patientLastViralEncounter = fetchPatientLastCd4Encounters(patient.resource.id);
    // lastCd4Result = patientLastViralEncounter.result;
    // lastCd4ResultDate = patientLastViralEncounter.date;
    // const row = { id: patient.resource.uuid };
    // row['name'] = patient.resource.name;
    //(
    //   <Router>
    //     <Link style={{ textDecoration: 'inherit' }} to={getPatientURL(patient.resource.id)}>
    //       {`${patient.resource.name[0].given.join(' ')} ${patient.resource.name[0].family}`}
    //     </Link>
    //   </Router>
    // );
    // row['age'] = age(patient.resource.birthDate);
    // row['gender'] = capitalize(patient.resource.gender);
    // row['cd4Result'] = lastCd4Result;
    // row['cd4ResultDate'] = lastCd4ResultDate;

    //   return row;
    // });
    let rows = [];
    for (let patient of currentRows) {
      const patientLastViralEncounter = await fetchPatientLastCd4Encounters(patient.resource.id);
      lastCd4Result = patientLastViralEncounter.result;
      lastCd4ResultDate = patientLastViralEncounter.date;

      rows.push({
        id: patient.resource.id,
        name: (
          <Router>
            <Link style={{ textDecoration: 'inherit' }} to={getPatientURL(patient.resource.id)}>
              {`${patient.resource.name[0].given.join(' ')} ${patient.resource.name[0].family}`}
            </Link>
          </Router>
        ),
        age: age(patient.resource.birthDate),
        gender: capitalize(patient.resource.gender),
        cd4Result: lastCd4Result,
        cd4ResultDate: lastCd4ResultDate,
      });
    }
    setTableRowsOptimized(rows);
  };

  async function loadPatients(offSet: number, pageSize: number) {
    let rows = [];
    const { data: patients } = await fetchPatientList(offSet, pageSize);

    setPatientCount(patients.total);
    let lastCd4Result: string;
    let lastCd4ResultDate: any;

    for (let patient of patients.entry) {
      const patientLastViralEncounter = await fetchPatientLastCd4Encounters(patient.resource.id);
      lastCd4Result = patientLastViralEncounter.result;
      lastCd4ResultDate = patientLastViralEncounter.date;

      rows.push({
        id: patient.resource.id,
        name: (
          <Router>
            <Link style={{ textDecoration: 'inherit' }} to={getPatientURL(patient.resource.id)}>
              {`${patient.resource.name[0].given.join(' ')} ${patient.resource.name[0].family}`}
            </Link>
          </Router>
        ),
        age: age(patient.resource.birthDate),
        gender: capitalize(patient.resource.gender),
        cd4Result: lastCd4Result,
        cd4ResultDate: lastCd4ResultDate,
      });
    }
    console.log(rows[0].name);
    setTableRows(rows);
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
          </div>
          <OTable tableHeaders={tableHeaders} tableRows={patientsOptimized} />
          {/* <div style={{ width: '800px' }}> */}
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
          {/* </div> */}
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

export default CD4ResultsList;
