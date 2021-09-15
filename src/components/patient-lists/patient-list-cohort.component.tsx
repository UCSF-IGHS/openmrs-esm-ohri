import { age, attach, detach, ExtensionSlot, navigate } from '@openmrs/esm-framework';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchPatientsFinalHIVStatus, getCohort, getReportingCohortMembers } from '../../api/api';
import EmptyState from '../empty-state/empty-state.component';
import moment from 'moment';
import TableEmptyState from '../empty-state/table-empty-state.component';

import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import AddPatientToListOverflowMenuItem from '../modals/patient-list/add-patient-to-list-modal.component';
import {
  basePath,
  waitingForHIVTestCohort,
  postTestCounsellingCohort,
  preTestCounsellingCohort,
} from '../../constants';
import { launchForm } from '../../utils/ohri-forms-commons';
import { getForm, filterFormByIntent } from '../../utils/forms-loader';

export interface PatientListColumn {
  key: string;
  header: string;
  getValue: (patient: any) => string;
  link?: any;
  index?: number;
}

export const columns: PatientListColumn[] = [
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
      return patient.location;
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
      return patient.phoneNumber;
    },
  },
  {
    key: 'hivResult', // only post test counselling
    header: 'HIV Result',
    getValue: patient => {
      return patient.hivResult;
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: patient => {
      return patient.actions;
    },
  },
];

const filterPatientsByName = (searchTerm: string, patients: Array<any>) => {
  return patients.filter(patient => patient.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1);
};

const CohortPatientList: React.FC<{
  cohortId: string;
  cohortSlotName: string;
  isReportingCohort?: boolean;
  otherColumns?: Array<PatientListColumn>;
  excludeColumns?: Array<string>;
  queryParams?: Array<string>;
}> = ({ cohortId, cohortSlotName, isReportingCohort, otherColumns, excludeColumns, queryParams }) => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [patientsCount, setPatientsCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(null);
  const [counter, setCounter] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const columnAtLastIndex = 'actions';
  const htsForm = getForm('hiv', 'hts');

  const constructPatient = rawPatient => {
    return {
      uuid: isReportingCohort ? rawPatient.person.uuid : rawPatient.patient.uuid,
      id: isReportingCohort ? rawPatient.identifiers[0].identifier : rawPatient.patient.identifiers[0].identifier,
      age: isReportingCohort ? rawPatient.person.age : rawPatient.patient.person.age,
      name: isReportingCohort ? rawPatient.person.display : rawPatient.patient.person.display,
      gender: isReportingCohort
        ? rawPatient.person.gender == 'M'
          ? 'Male'
          : 'Female'
        : rawPatient.patient.person.gender == 'M'
        ? 'Male'
        : 'Female',
      birthday: isReportingCohort ? rawPatient.person.birthdate : rawPatient.patient.person.birthdate,
    };
  };

  const getFormTitle = () => {
    if (cohortId === preTestCounsellingCohort) {
      return 'Pre-test Counselling';
    } else if (cohortId === waitingForHIVTestCohort) {
      return 'HIV Testing';
    } else if (cohortId === postTestCounsellingCohort) {
      return 'Post-test Counselling';
    }
  };

  let actionFormCohort = '';
  const getFormIntent = () => {
    if (cohortId === preTestCounsellingCohort) {
      actionFormCohort = 'Start Pre-test Counselling';
      //TODO: Use the proper hook to open the form  HTS_PRETEST
      return 'HTS_RETROSPECTIVE';
    } else if (cohortId === waitingForHIVTestCohort) {
      actionFormCohort = 'Start HIV Test';
      return 'HIV_TEST';
    } else if (cohortId === postTestCounsellingCohort) {
      actionFormCohort = 'Start Post-test Counselling';
      return 'HTS_POSTTEST';
    }
  };

  const patientFormTitle = getFormTitle();
  const patientFormIntent = getFormIntent();

  const setListMeta = (patientWithMeta, location) => {
    return {
      timeAddedToList: !isReportingCohort ? moment(patientWithMeta.startDate).format('LL') : null,
      waitingTime: !isReportingCohort ? moment(patientWithMeta.startDate).fromNow() : null,
      location: location && location.name,
      phoneNumber: '0700xxxxxx',
      hivResult: 'None',
      actions: (
        <OverflowMenu flipped>
          {patientFormIntent ? (
            <OverflowMenuItem
              itemText={actionFormCohort}
              onClick={() => {
                launchForm(filterFormByIntent(patientFormIntent, htsForm));
                navigate({ to: `${basePath}${patientWithMeta.patient.uuid}/chart/hts-summary` });
              }}
            />
          ) : (
            <></>
          )}

          <AddPatientToListOverflowMenuItem
            patientUuid={isReportingCohort ? patientWithMeta.person.uuid : patientWithMeta.patient.uuid}
          />
        </OverflowMenu>
      ),
    };
  };

  useEffect(() => {
    if (!isReportingCohort) {
      getCohort(cohortId, 'full').then(results => {
        const patients = results.cohortMembers.map(member => ({
          ...constructPatient(member),
          ...setListMeta(member, results.location),
        }));
        setPatients(patients);
        setIsLoading(false);
        setPatientsCount(patients.length);
      });
    } else {
      getReportingCohortMembers(cohortId, queryParams).then(results => {
        const patients = results.map(({ data }) => {
          return {
            ...constructPatient(data),
            ...setListMeta(data, null),
          };
        });
        setPatients(patients);
        setIsLoading(false);
        setPatientsCount(patients.length);
      });
    }
  }, [cohortId]);

  useEffect(() => {
    (async function() {
      patients.map(async patient => {
        const hivResult = await fetchPatientsFinalHIVStatus(patient.uuid);
        return (patient['hivResult'] = hivResult);
      });
    })();
  }, [patients]);

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

  const filterEncountersByDate = (date: string) => {
    let filteredEncounters = [];

    if (date === 'today') {
      filteredEncounters = patients.filter(patient => patient.waitingTime < 24);
      setPatients(filteredEncounters);
    }
  };

  const state = useMemo(() => {
    let filteredColumns = [...columns];
    if (excludeColumns) {
      filteredColumns = columns.filter(c => !excludeColumns.includes(c.key));
    }
    if (otherColumns) {
      otherColumns.forEach(column => {
        if (column.index) {
          filteredColumns.splice(column.index, 0, column);
        } else {
          filteredColumns.push(column);
        }
      });
    }
    // position column designated to be at the last index
    const index = filteredColumns.findIndex(column => column.key == columnAtLastIndex);
    if (index) {
      const column = filteredColumns[index];
      filteredColumns.splice(index, 1);
      filteredColumns.push(column);
    }

    return {
      patients: searchTerm ? filteredResults : patients,
      columns: filteredColumns,
      isLoading,
      search: { placeHolder: 'Search client list', onSearch: handleSearch, currentSearchTerm: searchTerm },
      pagination: pagination,
      autoFocus: true,
    };
  }, [searchTerm, filteredResults, patients, handleSearch, pagination, isLoading, excludeColumns, otherColumns]);

  useEffect(() => {
    setCounter(counter + 1);
  }, [state]);

  return (
    <div>
      {!isLoading && !patients.length ? (
        <TableEmptyState tableHeaders={state.columns} message="There are no patients in this list." />
      ) : (
        <>
          <ExtensionSlot extensionSlotName={cohortSlotName} state={state} key={counter} />
        </>
      )}
    </div>
  );
};

export default CohortPatientList;
