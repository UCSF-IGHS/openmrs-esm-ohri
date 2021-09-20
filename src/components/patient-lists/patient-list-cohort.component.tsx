import { attach, detach, ExtensionSlot, navigate } from '@openmrs/esm-framework';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  fetchPatientLastHtsEncounter,
  fetchPatientsFinalHIVStatus,
  getCohort,
  getReportingCohortMembers,
} from '../../api/api';
import moment from 'moment';
import TableEmptyState from '../empty-state/table-empty-state.component';

import { OverflowMenu, OverflowMenuItem, InlineLoading, ContentSwitcher, Switch } from 'carbon-components-react';
import AddPatientToListOverflowMenuItem from '../modals/patient-list/add-patient-to-list-modal.component';
import { basePath } from '../../constants';
import { launchFormInEditMode } from '../../utils/ohri-forms-commons';
import { getForm, filterFormByIntent } from '../../utils/forms-loader';
import styles from './patient-list-cohort.scss';

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

interface CohortPatientListProps {
  cohortId: string;
  cohortSlotName: string;
  isReportingCohort?: boolean;
  otherColumns?: Array<PatientListColumn>;
  excludeColumns?: Array<string>;
  queryParams?: Array<string>;
  launchableForm?: {
    package: string;
    name: string;
    intent: string;
    actionText: string;
  };
}

const PatientActionOverflowMenuItem = ({ patientUuid, launchableActionText, form }) => {
  const [actionText, setActionText] = useState(launchableActionText);
  const [encounterUuid, setEncounterUuid] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const continueEncounterActionTex = 'Countinue encounter';

  useEffect(() => {
    // Avoiding multiple requests for same data
    if (!encounterUuid) {
      setIsLoading(true);
      fetchPatientLastHtsEncounter(patientUuid).then(lastHtsEncounter => {
        if (lastHtsEncounter) {
          setActionText(continueEncounterActionTex);
          setEncounterUuid(lastHtsEncounter.uuid);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <InlineLoading style={{ margin: '0 auto', width: '16px' }} />
      ) : (
        <OverflowMenuItem
          itemText={actionText}
          onClick={() => {
            launchFormInEditMode(form, encounterUuid);
            navigate({ to: `${basePath}${patientUuid}/chart/hts-summary` });
          }}
        />
      )}
    </>
  );
};

const CohortPatientList: React.FC<CohortPatientListProps> = ({
  cohortId,
  cohortSlotName,
  isReportingCohort,
  otherColumns,
  excludeColumns,
  queryParams,
  launchableForm,
}) => {
  const [patients, setPatients] = useState([]);
  const [fullPatientList, setFullPatientList] = useState([]);
  const [todayPatientList, setTodayPatientList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [patientsCount, setPatientsCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(null);
  const [counter, setCounter] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const columnAtLastIndex = 'actions';
  const form = launchableForm && getForm(launchableForm.package, launchableForm.name);
  const dateFilterableTabSlots = ['waiting-for-hiv-testing-slot', 'post-test-counseling-slot'];

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

  const setListMeta = (patientWithMeta, location) => {
    const patientUuid = !isReportingCohort ? patientWithMeta.patient.uuid : patientWithMeta.person.uuid;

    return {
      timeAddedToList: !isReportingCohort ? moment(patientWithMeta.startDate).format('LL') : null,
      waitingTime: !isReportingCohort ? moment(patientWithMeta.startDate).fromNow() : null,
      location: location && location.name,
      phoneNumber: '0700xxxxxx',
      hivResult: 'None',
      actions: (
        <OverflowMenu flipped>
          {form ? (
            <PatientActionOverflowMenuItem
              patientUuid={patientUuid}
              launchableActionText={launchableForm.actionText}
              form={filterFormByIntent(launchableForm.intent, form)}
              key={patientUuid}
            />
          ) : (
            <></>
          )}

          <AddPatientToListOverflowMenuItem patientUuid={patientUuid} displayText="Move to list" />
        </OverflowMenu>
      ),
    };
  };

  useEffect(() => {
    if (launchableForm) {
    }
    if (!isReportingCohort) {
      getCohort(cohortId, 'full').then(results => {
        const patients = results.cohortMembers.map(member => ({
          ...constructPatient(member),
          ...setListMeta(member, results.location),
        }));

        if (dateFilterableTabSlots.includes(cohortSlotName)) {
          // TODO: Make sure this is the correct logic for today's patients
          const todaysPatients = patients.filter(patient => moment().diff(moment(patient.timeAddedToList), 'days') < 1);

          setTodayPatientList(todaysPatients);
          setFullPatientList(patients);

          // By default, display today's patient list
          setPatients(todayPatientList);
          setPatientsCount(todayPatientList.length);
        } else {
          setPatients(patients);
          setPatientsCount(patients.length);
        }
        setIsLoading(false);
      });
    } else {
      getReportingCohortMembers(cohortId, queryParams).then(results => {
        const patients = results.map(({ data }) => {
          return {
            ...constructPatient(data),
            ...setListMeta(data, null),
          };
        });

        if (dateFilterableTabSlots.includes(cohortSlotName)) {
          const todaysPatients = patients.filter(patient => moment().diff(moment(patient.timeAddedToList), 'days') < 1);

          setTodayPatientList(todaysPatients);
          setFullPatientList(patients);

          // By default, display today's patient list
          setPatients(todayPatientList);
          setPatientsCount(todayPatientList.length);
        } else {
          setPatients(patients);
          setPatientsCount(patients.length);
        }
        setIsLoading(false);
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

  const handleEncounterDateGroupChange = newSelection => {
    setIsLoading(true);

    if (newSelection.name === 'today') {
      setPatients(todayPatientList);
      setPatientsCount(todayPatientList.length);
    } else {
      setPatients(fullPatientList);
      setPatientsCount(fullPatientList.length);
    }

    setIsLoading(false);
  };

  return (
    <div>
      {dateFilterableTabSlots.includes(cohortSlotName) && (
        <div className={styles.contentSwitcherWrapper}>
          <ContentSwitcher onChange={handleEncounterDateGroupChange}>
            <Switch name="today" text="Today" />
            <Switch name="all" text="All" />
          </ContentSwitcher>
        </div>
      )}
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
