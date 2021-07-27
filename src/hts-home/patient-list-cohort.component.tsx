import { age, attach, detach, ExtensionSlot } from '@openmrs/esm-framework';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchPatientsFinalHIVStatus, getCohort } from '../api/api';
import EmptyState from '../components/empty-state/empty-state.component';
import moment from 'moment';
import { basePath } from '../constants';

export const columns = [
  {
    key: 'name',
    header: 'Name',
    getValue: patient => {
      return patient.name;
    },
    link: {
      getUrl: patient => `${basePath}${patient.uuid}/chart`,
    },
  },
  {
    key: 'timeAddedToList',
    header: 'Time Added To List',
    getValue: patient => {
      return patient.timeAddedToList;
    },
  },
  {
    key: 'waitingTime',
    header: 'Waiting Time',
    getValue: patient => {
      return patient.waitingTime;
    },
  },
  {
    key: 'timeAddedToList',
    header: 'Time Added To List',
    getValue: patient => {
      return '--';
    },
  },
  {
    key: 'waitingTime',
    header: 'Waiting Time',
    getValue: patient => {
      return '--';
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
    key: 'location', // exclude from pretest
    header: 'Location',
    getValue: patient => {
<<<<<<< HEAD
      return patient.location;
=======
      return '--';
>>>>>>> upstream/working
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
    key: 'phoneNumber',
    header: 'Phone Number',
    getValue: patient => {
<<<<<<< HEAD
      return patient.phoneNumber;
=======
      return '--';
>>>>>>> upstream/working
    },
  },
  {
    key: 'hivResult', // only post test counselling
    header: 'HIV Result',
    getValue: patient => {
<<<<<<< HEAD
      return patient.hivResult;
=======
      return '--';
>>>>>>> upstream/working
    },
  },
];

const filterPatientsByName = (searchTerm: string, patients: Array<any>) => {
  return patients.filter(patient => patient.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1);
};

const CohortPatientList: React.FC<{ cohortId: string; cohortSlotName: string }> = ({ cohortId, cohortSlotName }) => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [patientsCount, setPatientsCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(null);
  const [counter, setCounter] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    getCohort(cohortId, 'full').then(({ data }) => {
=======
    getCohort({ cohortId: cohortId }, 'full').then(({ data }) => {
>>>>>>> upstream/working
      const patients = data.cohortMembers.map(member => ({
        uuid: member.patient.uuid,
        id: member.patient.identifiers[0].identifier,
        age: member.patient.person.age,
        name: member.patient.person.display,
        gender: member.patient.person.gender == 'M' ? 'Male' : 'Female',
        birthday: member.patient.person.birthdate,
        timeAddedToList: moment(member.startDate).format('LL'),
        waitingTime: moment(member.startDate).fromNow(),
        location: data.location.name,
        phoneNumber: '0700xxxxxx',
        hivResult: '',
      }));
      setPatients(patients);
      setIsLoading(false);
      setPatientsCount(patients.length);
    });
  }, [cohortId]);
<<<<<<< HEAD

  useEffect(() => {
    (async function() {
      patients.map(async patient => {
        const hivResult = await fetchPatientsFinalHIVStatus(patient.uuid);
        return (patient['hivResult'] = hivResult);
      });
    })();
  }, [patients]);
=======
>>>>>>> upstream/working

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

  useEffect(() => {
    attach(cohortSlotName, 'patient-table');
    return () => {
      detach(cohortSlotName, 'patient-table');
    };
  });

  const state = useMemo(
    () => ({
      patients: searchTerm ? filteredResults : patients,
      columns,
      search: { placeHolder: 'Search client list', onSearch: handleSearch, currentSearchTerm: searchTerm },
      pagination: pagination,
      autoFocus: true,
    }),
    [searchTerm, filteredResults, patients, handleSearch, pagination],
  );

  useEffect(() => {
    setCounter(counter + 1);
  }, [state]);

  return (
    <div style={{ width: '100%', marginBottom: '2rem' }}>
      {!isLoading && !patients.length ? (
        <EmptyState headerTitle="Test client list" displayText="patients" />
      ) : (
        <ExtensionSlot extensionSlotName={cohortSlotName} state={state} key={counter} />
      )}
    </div>
  );
};

export default CohortPatientList;
