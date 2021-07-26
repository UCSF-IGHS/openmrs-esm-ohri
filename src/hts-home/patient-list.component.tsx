import { age, ExtensionSlot } from '@openmrs/esm-framework';
import { capitalize } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getPatients } from '../api/api';
import EmptyState from '../components/empty-state/empty-state.component';

const basePath = '${openmrsSpaBase}/patient/';
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
    key: 'lastVisit',
    header: 'Last Visit',
    getValue: patient => {
      return 'TODO';
    },
  },
  {
    key: 'id',
    header: 'Patient ID',
    getValue: patient => {
      return patient.identifier[0].value;
    },
  },
];

export const filterFHIRPatientsByName = (searchTerm: string, patients: Array<any>) => {
  return patients.filter(
    patient =>
      `${patient.name[0].given.join(' ')} ${patient.name[0].family}`.toLowerCase().search(searchTerm.toLowerCase()) !==
      -1,
  );
};

const TestPatientList: React.FC<{}> = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [patientsCount, setPatientsCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(null);
  const [counter, setCounter] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredResultsCounts, setFilteredResultsCounts] = useState(0);
  const [offSet, setOffSet] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getPatients(null, offSet, pageSize).then(({ data }) => {
      setPatients(data.entry.map(pat => pat.resource));
      setPatientsCount(data.total);
      setIsLoading(false);
    });
  }, [pageSize, currentPage]);

  const pagination = useMemo(() => {
    return {
      usePagination: true,
      currentPage: currentPage,
      onChange: props => {
        if (props.pageSize != pageSize) {
          // reset
          setCurrentPage(1);
        } else {
          setOffSet(currentPage * pageSize + 1);
          setCurrentPage(props.page);
        }
        setPageSize(props.pageSize);
        return null;
      },
      pageSize: pageSize,
      totalItems: searchTerm ? filteredResultsCounts : patientsCount,
    };
  }, [currentPage, filteredResultsCounts, pageSize, patientsCount, searchTerm]);

  const handleSearch = useCallback(
    searchTerm => {
      setSearchTerm(searchTerm);
      if (searchTerm) {
        const filtrate = filterFHIRPatientsByName(searchTerm, patients);
        setFilteredResults(filtrate);
        setFilteredResultsCounts(filtrate.length);
        // fetch other patients against search term in background
        getPatients(searchTerm).then(({ data }) => {
          let results = data.entry ? data.entry.map(pat => pat.resource) : [];
          if (filtrate.length && results.length) {
            // filter out existing result
            results = results.filter(pat => filtrate.findIndex(i => pat.id === i.id) === -1);
          }
          setFilteredResults([...filtrate, ...results]);
          setFilteredResultsCounts(data.total);
        });
      }
      return true;
    },
    [patients],
  );

  const state = useMemo(
    () => ({
      patients: searchTerm ? filteredResults : patients,
      columns,
      search: { placeHolder: 'Search patient list', onSearch: handleSearch, currentSearchTerm: searchTerm },
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
    <div style={{ width: '40rem', marginBottom: '2rem' }}>
      {!isLoading && !patients.length ? (
        <EmptyState headerTitle="Test Patient List" displayText="patients" />
      ) : (
        <ExtensionSlot extensionSlotName="patient-table-slot" state={state} key={counter} />
      )}
    </div>
  );
};

export default TestPatientList;
