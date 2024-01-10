import React, { useEffect, useState, useCallback } from 'react';
import styles from './patient-list.scss';
import { useTranslation } from 'react-i18next';
import {
  EmptyState,
  encounterRepresentation,
  fetchPatientList,
  getObsFromEncounter,
  OTable,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { age, navigate, openmrsFetch, useConfig } from '@openmrs/esm-framework';
import { DataTableSkeleton, Pagination, Search } from '@carbon/react';
import { capitalize } from 'lodash-es';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { LabresultsFormViewer } from '../lab-results-form-viewer';

interface CD4ResultsListProps {
  patientUuid: string;
}

export const filterPatientsByName = (searchTerm: string, patients: Array<any>) => {
  return patients.filter((patient) => patient.patientSearchName.toLowerCase().includes(searchTerm.toLowerCase()));
};

const CD4ResultsList: React.FC<CD4ResultsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);
  const [patientToCd4Map, setPatientToCd4Map] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPatientCount, setPatientCount] = useState(0);
  const [nextOffSet, setNextOffSet] = useState(0);
  const headerTitle = '';
  const { obsConcepts, encounterTypes } = useConfig();

  const tableHeaders = [
    { key: 'name', header: t('patientName', 'Patient Name'), isSortable: true },
    { key: 'gender', header: t('sex', 'Sex') },
    { key: 'age', header: t('age', 'Age') },
    { key: 'cd4Result', header: t('recentCd4', 'Recent CD4') },
    { key: 'cd4ResultDate', header: t('recentCd4Date', 'Recent CD4 Date') },
    { key: 'actions', header: t('actions', 'Actions') },
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
      const lastCd4Result = patientToCd4Map.find((entry) => entry.patientId === patient.resource.id)?.cd4Result;
      const lastCd4ResultDate = patientToCd4Map.find((entry) => entry.patientId === patient.resource.id)?.cd4ResultDate;
      const lastCd4EncounterUuid = patientToCd4Map.find(
        (entry) => entry.patientId === patient.resource.id,
      )?.cd4EncounterUuid;
      const patientActions = (
        <LabresultsFormViewer
          form={{ package: 'hiv', name: 'cd4_lab_results' }}
          patientUuid={patient.resource.id}
          encounterUuid={lastCd4EncounterUuid}
          patientUrl={getPatientURL(patient.resource.id)}></LabresultsFormViewer>
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
        cd4Result: lastCd4Result ? lastCd4Result : '--',
        cd4ResultDate: lastCd4ResultDate ? lastCd4ResultDate : '--',
        actions: patientActions,
        patientSearchName: `${patient.resource.name[0].given.join(' ')} ${patient.resource.name[0].family}`,
      });
    }
    setAllRows(rows);
  }, [patients, patientToCd4Map]);

  useEffect(() => {
    const patientToCd4ResultsPromises = patients.map((patient) => fetchPatientLastCd4Encounters(patient.resource.id));
    Promise.all(patientToCd4ResultsPromises).then((values) => {
      setPatientToCd4Map(
        values.map((value, index) => ({
          cd4Result: value.result,
          cd4ResultDate: value.date,
          patientId: patients[index].resource.id,
          cd4EncounterUuid: value.encounterUuid,
        })),
      );
    });
  }, [patients]);

  const handleSearch = useCallback(
    (searchTerm) => {
      setSearchTerm(searchTerm);
      const filtrate = filterPatientsByName(searchTerm, allRows);
      setFilteredResults(filtrate);
      return true;
    },
    [searchTerm],
  );

  const addNewPatient = () => navigate({ to: '${openmrsSpaBase}/patient-registration' });
  const getPatientURL = (patientUuid) => `/openmrs/spa/patient/${patientUuid}/chart/hts-summary`;

  async function fetchPatientLastCd4Encounters(patientUuid: string) {
    let latestCd4Encounter = {
      result: '--',
      date: '--',
      encounterUuid: '',
    };
    const query = `encounterType=${encounterTypes.CD4LabResultsEncounter_UUID}&patient=${patientUuid}`;
    const viralResults = await openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`);
    if (viralResults.data.results?.length > 0) {
      const sortedEncounters = viralResults.data.results.sort(
        (firstEncounter, secondEncounter) =>
          new Date(secondEncounter.encounterDatetime).getTime() - new Date(firstEncounter.encounterDatetime).getTime(),
      );
      const lastEncounter = sortedEncounters[0];

      latestCd4Encounter.result = getObsFromEncounter(lastEncounter, obsConcepts.hivCD4Count_UUID);
      latestCd4Encounter.date = getObsFromEncounter(lastEncounter, obsConcepts.Cd4LabResultDate_UUID, true);
      latestCd4Encounter.encounterUuid = lastEncounter.uuid;
    }
    return latestCd4Encounter;
  }

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : allRows.length > 0 ? (
        <>
          <div className={styles.searchBox}>
            <Search
              className={styles.searchField}
              labelText="Search"
              placeHolderText="Search Client list"
              size="sm"
              light
              onKeyDown={({ target }) => handleSearch(target['value'])}
            />
          </div>
          <div className={styles.widgetContainer}>
            <OTable tableHeaders={tableHeaders} tableRows={searchTerm ? filteredResults : allRows} />
            <div style={{ width: '800px' }}>
              <Pagination
                page={page}
                pageSize={pageSize}
                pageSizes={[10, 20, 30, 40, 50]}
                totalItems={totalPatientCount}
                onChange={({ page, pageSize }) => {
                  setSearchTerm(null);
                  setPage(page);
                  setNextOffSet((page - 1) * pageSize);
                  setPageSize(pageSize);
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <EmptyState displayText={t('cd4Results', 'CD4 Results')} headerTitle={headerTitle} />
      )}
    </>
  );
};

export default CD4ResultsList;
