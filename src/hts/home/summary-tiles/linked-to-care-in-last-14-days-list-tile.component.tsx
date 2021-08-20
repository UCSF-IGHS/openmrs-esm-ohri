import { age, attach, detach, ExtensionSlot } from '@openmrs/esm-framework';
import { capitalize } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchPatientsFromObservationCodeConcept, fetchTodayClients } from '../../../api/api';
import EmptyState from '../../../components/empty-state/empty-state.component';
import { filterFHIRPatientsByName } from '../../../hts-home/patient-list.component';
import { basePath, linkedToCareCodeConcept, linkedToCareYesValueConcept } from '../../../constants';

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
    key: 'phoneNumber',
    header: 'Phone Number',
    getValue: patient => {
      return '--';
    },
  },
  {
    key: 'dateOfEncounter',
    header: 'Date Of Encounter',
    getValue: patient => {
      return '--';
    },
  },
  {
    key: 'location',
    header: 'Location',
    getValue: patient => {
      return '--';
    },
  },
  {
    key: 'finalHivResult',
    header: 'Final HIV Result',
    getValue: patient => {
      return '--';
    },
  },
  {
    key: 'linkedToCare',
    header: 'Linked To Care',
    getValue: patient => {
      return 'Yes';
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
export const LinkedToCareInLast14Days: React.FC<{}> = () => {
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
    fetchPatientsFromObservationCodeConcept(linkedToCareCodeConcept, linkedToCareYesValueConcept, 14).then(
      (response: Array<any>) => {
        setPatients(response.map(pat => pat.data));
        setTotalPatientCount(response.length);
        setIsLoading(false);
      },
    );
  }, [pageSize, currentPage]);

  useEffect(() => {
    attach('linked-to-care-last-14-days-table-slot', 'patient-table');
    return () => {
      detach('linked-to-care-last-14-days-table-slot', 'patient-table');
    };
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
        <EmptyState headerTitle="Linked To Care in Last 14 Days" displayText="patients" showLaunchLink={false} />
      ) : (
        <ExtensionSlot extensionSlotName="linked-to-care-last-14-days-table-slot" state={state} key={counter} />
      )}
    </div>
  );
};
