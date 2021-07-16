import { age, ExtensionSlot } from '@openmrs/esm-framework';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getCohort } from '../api/api';
import EmptyState from '../components/empty-state/empty-state.component';

export const columns = [
  {
    key: 'name',
    header: 'Name',
    getValue: patient => {
      return patient.name;
    },
  },
  {
    key: 'gender',
    header: 'Sex',
    getValue: patient => {
      return patient.gender;
    },
  },
  {
    key: 'age',
    header: 'Age',
    getValue: patient => {
      return patient.age;
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
      return patient.id;
    },
  },
];

const customRep = 'custom:(uuid,name,location:(uuid,name),cohortMembers)';
// patient:(uuid,identifiers,person:(age,display,gender,birthdate))

const filterPatientsByName = (searchTerm: string, patients: Array<any>) => {
  return patients.filter(patient => patient.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1);
};

const CohortPatientList: React.FC<{ cohortId: string }> = cohortId => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [patientsCount, setPatientsCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(null);
  const [counter, setCounter] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    getCohort('e4d801f0-e2fd-11eb-8212-7d7156e00a1f', 'full').then(({ data }) => {
      const patients = data.cohortMembers.map(member => ({
        uuid: member.patient.uuid,
        id: member.patient.identifiers[0].identifier,
        age: member.patient.person.age,
        name: member.patient.person.display,
        gender: member.patient.person.gender == 'M' ? 'Male' : 'Female',
        birthday: member.patient.person.birthdate,
      }));
      setPatients(patients);
      setIsLoading(false);
      setPatientsCount(patients.length);
    });
  }, []);

  const pagination = useMemo(() => {
    return {
      usePagination: true,
      currentPage: currentPage,
      onChange: ({ pageSize, page }) => {
        setCurrentPage(page);
        setPageSize(pageSize);
        return null;
      },
      pageSize: pageSize,
      totalItems: patientsCount,
    };
  }, [currentPage, pageSize, patientsCount]);

  const handleSearch = useCallback(
    searchTerm => {
      setSearchTerm(searchTerm);
      const filtrate = filterPatientsByName(searchTerm, patients);
      setFilteredResults(filtrate);
      return true;
    },
    [patients],
  );

  const state = useMemo(
    () => ({
      patients: searchTerm ? filteredResults : patients,
      columns,
      search: { placeHolder: 'Search patient list', onSearch: handleSearch, currentSearchTerm: searchTerm },
      pagination: pagination,
      autoFocus: true,
    }),
    [searchTerm, filteredResults, patients, handleSearch, pagination],
  );

  useEffect(() => {
    setCounter(counter + 1);
  }, [state]);

  return (
    <div style={{ width: '40rem', marginBottom: '2rem' }}>
      {!isLoading && !patients.length ? (
        <EmptyState headerTitle="Test Patient List" displayText="patients" />
      ) : (
        <ExtensionSlot extensionSlotName="patient-cohort-slot" state={state} key={counter} />
      )}
    </div>
  );
};

export default CohortPatientList;
