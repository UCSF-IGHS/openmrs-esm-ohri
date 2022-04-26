import { age, attach, detach, ExtensionSlot } from '@openmrs/esm-framework';
import { capitalize } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchPatientCovidOutcome } from '../../../api/api';
import {
  covidEncounterDateTime_UUID,
  covidOutcome,
  covidOutcomeUUID,
  covidPresentSymptonsConcept_UUID,
} from '../../../constants';

import { getObsFromEncounter, filterFHIRPatientsByName } from 'openmrs-esm-ohri-commons-lib';
import { basePath } from 'openmrs-esm-ohri-commons-lib/src/constants';

export const columns = [
  {
    key: 'name',
    header: 'Name',
    getValue: patient => {
      return `${patient.name[0].given.join(' ')} ${patient.name[0].family}`;
    },
    link: {
      getUrl: patient => `${basePath}${patient.id}/chart`,
    },
  },
  {
    key: 'gender',
    header: 'Sex',
    getValue: patient => {
      return capitalize(patient.gender);
    },
  },
  {
    key: 'age',
    header: 'Age',
    getValue: patient => {
      return age(patient.birthDate);
    },
  },
  {
    key: 'assessmentDate',
    header: 'Assessment Date',
    getValue: ({ latestEncounter }) => {
      return getObsFromEncounter(latestEncounter, covidEncounterDateTime_UUID, true);
    },
  },
  {
    key: 'presentation',
    header: 'Presentation',
    getValue: ({ latestEncounter }) => {
      return getObsFromEncounter(latestEncounter, covidPresentSymptonsConcept_UUID, false, true);
    },
  },
  {
    key: 'outcome',
    header: 'Outcome',
    getValue: ({ latestEncounter }) => {
      return getObsFromEncounter(latestEncounter, covidOutcomeUUID);
    },
  },
  {
    key: 'outcomeDate',
    header: 'Outcome Date',
    getValue: ({ latestEncounter }) => {
      return getObsFromEncounter(latestEncounter, covidOutcome);
    },
  },
];
export const Outcomes: React.FC<{}> = () => {
  const [patients, setPatients] = useState([]);
  const [totalPatientCount, setTotalPatientCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState(null);
  const [counter, setCounter] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredResultsCounts, setFilteredResultsCounts] = useState(0);

  useEffect(() => {
    fetchPatientCovidOutcome().then((response: Array<any>) => {
      setPatients(response.map(pat => pat.data));
      setTotalPatientCount(response.length);
      setIsLoading(false);
    });
  }, [pageSize, currentPage]);

  useEffect(() => {
    attach('outcomes-table-slot', 'patient-table');
    return () => detach('outcomes-table-slot', 'patient-table');
  }, []);

  const pagination = useMemo(() => {
    return {
      usePagination: false,
      currentPage: currentPage,
      onChange: props => {
        setCurrentPage(props.page);
        setPageSize(props.pageSize);
      },
      pageSize: pageSize,
      totalItems: searchTerm ? filteredResultsCounts : totalPatientCount,
    };
  }, [currentPage, filteredResultsCounts, pageSize, totalPatientCount, searchTerm]);

  const handleSearch = useCallback(
    searchTerm => {
      setSearchTerm(searchTerm);
      if (searchTerm) {
        const filtrate = filterFHIRPatientsByName(searchTerm, patients);
        setFilteredResults(filtrate);
        setFilteredResultsCounts(filtrate.length);
      }
    },
    [patients],
  );

  const state = useMemo(
    () => ({
      patients: searchTerm ? filteredResults : patients,
      columns,
      search: { placeHolder: 'Search client list', onSearch: handleSearch, currentSearchTerm: searchTerm },
      pagination,
      isLoading,
      autoFocus: true,
    }),
    [searchTerm, filteredResults, patients, handleSearch, pagination, isLoading],
  );

  useEffect(() => {
    setCounter(counter + 1);
  }, [state]);

  return (
    <div style={{ width: '100%', marginBottom: '2rem' }}>
      {!isLoading && !patients.length ? (
        <TableEmptyState tableHeaders={columns} message="There are no patients in this list." />
      ) : (
        <ExtensionSlot extensionSlotName="outcomes-table-slot" state={state} key={counter} />
      )}
    </div>
  );
};
