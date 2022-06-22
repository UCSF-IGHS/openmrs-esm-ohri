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
  const [patients, setPatients] = useState([]);
  const [patientToCd4Map, setPatientToCd4Map] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;
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
      const lastCd4Result = patientToCd4Map.find(entry => entry.patientId === patient.resource.id)?.cd4Result;
      const lastCd4ResultDate = patientToCd4Map.find(entry => entry.patientId === patient.resource.id)?.cd4ResultDate;

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
        cd4Result: lastCd4Result ? lastCd4Result : '--',
        cd4ResultDate: lastCd4ResultDate ? lastCd4ResultDate : '--',
      });
    }
    setAllRows(rows);
  }, [patients, patientToCd4Map]);

  useEffect(() => {
    const patientToCd4ResultsPromises = patients.map(patient => fetchPatientLastCd4Encounters(patient.resource.id));
    Promise.all(patientToCd4ResultsPromises).then(values => {
      setPatientToCd4Map(
        values.map((value, index) => ({
          cd4Result: value.result,
          cd4ResultDate: value.date,
          patientId: patients[index].resource.id,
        })),
      );
    });
  }, [patients]);

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

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : allRows.length > 0 ? (
        <div className={styles.widgetContainer}>
          <div className={styles.widgetHeaderContainer}>
            <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
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
    </>
  );
};

export default CD4ResultsList;
