import React, { useEffect, useState, useMemo, useCallback } from 'react';

import styles from './patient-list.scss';
import { useTranslation } from 'react-i18next';
import { age, navigate, openmrsFetch } from '@openmrs/esm-framework';
import { DataTableSkeleton, OverflowMenu, Pagination, Search } from 'carbon-components-react';
import { capitalize } from 'lodash';
import {
  EmptyState,
  OTable,
  fetchPatientList,
  encounterRepresentation,
  getObsFromEncounter,
  fetchLastVisit,
} from 'openmrs-esm-ohri-commons-lib';
import {
  ViralLoadResultDate_UUID,
  ViralLoadResultsEncounter_UUID,
  ViralLoadResult_UUID,
} from '../../../../../constants';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { filterPatientsByName } from './cd4-results.component';
import { LabresultsFormViewer } from '../lab-results-form-viewer';

interface ViralLoadResultsListProps {
  patientUuid: string;
}

const ViralLoadResultsList: React.FC<ViralLoadResultsListProps> = () => {
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);
  const [patientToViralLoadMap, setPatientToViralLoadMap] = useState([]);
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
  const tableHeaders = [
    { key: 'name', header: 'Patient Name', isSortable: true },
    { key: 'gender', header: 'Sex' },
    { key: 'age', header: 'Age' },
    { key: 'viralLoadResult', header: 'Recent VL' },
    { key: 'viralLoadResultDate', header: 'Recent VL Date' },
    { key: 'actions', header: 'Actions' },
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
      const lastviralLoadResult = patientToViralLoadMap.find(entry => entry.patientId === patient.resource.id)
        ?.viralLoadResult;
      const lastviralLoadResultDate = patientToViralLoadMap.find(entry => entry.patientId === patient.resource.id)
        ?.viralLoadResultDate;
      const lastViralLoadEncounterUuid = patientToViralLoadMap.find(entry => entry.patientId === patient.resource.id)
        ?.viralEncounterUuid;
      const patientActions = (
        <LabresultsFormViewer
          form={{ package: 'hiv', name: 'viral_load_results' }}
          patientUuid={patient.resource.id}
          encounterUuid={lastViralLoadEncounterUuid}
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
        viralLoadResult: lastviralLoadResult ? lastviralLoadResult : '--',
        viralLoadResultDate: lastviralLoadResultDate ? lastviralLoadResultDate : '--',
        actions: patientActions,
        patientSearchName: `${patient.resource.name[0].given.join(' ')} ${patient.resource.name[0].family}`,
      });
    }
    setAllRows(rows);
  }, [patients, patientToViralLoadMap]);

  useEffect(() => {
    const patientToviralLoadResultsPromises = patients.map(patient =>
      fetchPatientLastViralEncounters(patient.resource.id),
    );
    Promise.all(patientToviralLoadResultsPromises).then(values => {
      setPatientToViralLoadMap(
        values.map((value, index) => ({
          viralLoadResult: value.result,
          viralLoadResultDate: value.date,
          patientId: patients[index].resource.id,
          viralEncounterUuid: value.encounterUuid,
        })),
      );
    });
  }, [patients]);

  const handleSearch = useCallback(
    searchTerm => {
      setSearchTerm(searchTerm);
      const filtrate = filterPatientsByName(searchTerm, allRows);
      setFilteredResults(filtrate);
      return true;
    },
    [searchTerm],
  );

  const addNewPatient = () => navigate({ to: '${openmrsSpaBase}/patient-registration' });
  const getPatientURL = patientUuid => `/openmrs/spa/patient/${patientUuid}/chart/hts-summary`;

  async function fetchPatientLastViralEncounters(patientUuid: string) {
    let latestViralEncounter = {
      result: '--',
      date: '--',
      encounterUuid: '',
    };
    const query = `encounterType=${ViralLoadResultsEncounter_UUID}&patient=${patientUuid}`;
    const viralResults = await openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`);
    if (viralResults.data.results?.length > 0) {
      const sortedEncounters = viralResults.data.results.sort(
        (firstEncounter, secondEncounter) =>
          new Date(secondEncounter.encounterDatetime).getTime() - new Date(firstEncounter.encounterDatetime).getTime(),
      );
      const lastEncounter = sortedEncounters[0];

      latestViralEncounter.result = getObsFromEncounter(lastEncounter, ViralLoadResult_UUID);
      latestViralEncounter.date = getObsFromEncounter(lastEncounter, ViralLoadResultDate_UUID, true);
      latestViralEncounter.encounterUuid = lastEncounter.uuid;
    }
    return latestViralEncounter;
  }

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : allRows.length > 0 ? (
        <div className={styles.widgetContainer}>
          <div className={styles.searchBox}>
            <Search
              className={styles.searchField}
              labelText="Search"
              placeHolderText="Search client list"
              size="sm"
              light
              onKeyDown={({ target }) => handleSearch(target['value'])}
            />
          </div>
          {/* <Search className={styles.searchField}
          labelText="Search" placeHolderText="Search client list" size='sm' onKeyDown={e => handleSearch((e.target as HTMLInputElement).value)} /> */}
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

export default ViralLoadResultsList;
