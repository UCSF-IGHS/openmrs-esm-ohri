import { attach, detach, ExtensionSlot, navigate } from '@openmrs/esm-framework';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  fetchPatientLastEncounter,
  fetchPatientsFinalHIVStatus,
  getCohort,
  getReportingCohortMembers,
} from '../../api/api';
import moment from 'moment';
import { TableEmptyState } from '../empty-state/table-empty-state.component';
import { OverflowMenu, OverflowMenuItem, InlineLoading, DataTableSkeleton } from '@carbon/react';
import { AddPatientToListOverflowMenuItem } from '../modals/patient-list/add-patient-to-list-modal.component';
import { basePath } from '../../constants';
import { launchForm, launchFormInEditMode } from '../../utils/ohri-forms-commons';
import { getForm, applyFormIntent } from '@ohri/openmrs-ohri-form-engine-lib';
import styles from './patient-list-cohort.scss';
import { changeWorkspaceContext } from '@openmrs/esm-patient-common-lib';
import { useTranslation } from 'react-i18next';

export interface PatientListColumn {
  key: string;
  header: string;
  getValue: (patient: any) => string;
  link?: any;
  index?: number;
}

interface CohortPatientListProps {
  cohortId: string;
  cohortSlotName: string;
  isReportingCohort?: boolean;
  otherColumns?: Array<PatientListColumn>;
  excludeColumns?: Array<string>;
  queryParams?: Array<string>;
  associatedEncounterType?: string;
  addPatientToListOptions?: { isEnabled: boolean; excludeCohorts?: Array<string> };
  launchableForm?: {
    package: string;
    name: string;
    intent: string;
    actionText: string;
    // if true, the form will be opened in edit mode if an encounter is found
    editLatestEncounter?: boolean;
    // if provided, the latest encounter of this type will be edited
    // if value is not provided and `editLatestEncounter` is true, the `associatedEncounterType` will be used
    encounterType?: string;
    editActionText?: string;
    targetDashboard?: string;
  };
  extraAssociatedEncounterTypes?: Array<string>;
}

export const columns: PatientListColumn[] = [
  {
    key: 'name',
    header: 'Name',
    getValue: (patient) => {
      return patient.name;
    },
    link: {
      getUrl: (patient) => patient.url,
    },
  },
  {
    key: 'timeAddedToList',
    header: 'Time Added To List',
    getValue: (patient) => {
      return patient.timeAddedToList;
    },
  },
  {
    key: 'waitingTime',
    header: 'Waiting Time',
    getValue: (patient) => {
      return patient.waitingTime;
    },
  },
  {
    key: 'gender',
    header: 'Sex',
    getValue: (patient) => {
      return patient.gender;
    },
  },
  {
    key: 'location',
    header: 'Location',
    getValue: (patient) => {
      return patient.location;
    },
  },
  {
    key: 'age',
    header: 'Age',
    getValue: (patient) => {
      return patient.age;
    },
  },
  {
    key: 'phoneNumber',
    header: 'Phone Number',
    getValue: (patient) => {
      return patient.phoneNumber;
    },
  },
  {
    key: 'hivResult',
    header: 'HIV Result',
    getValue: (patient) => {
      return patient.hivResult;
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: (patient) => {
      return patient.actions;
    },
  },
];

const filterPatientsByName = (searchTerm: string, patients: Array<any>) => {
  return patients.filter((patient) => patient.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1);
};

const LaunchableFormMenuItem = ({ patientUuid, launchableForm, form, encounterType, patientUrl }) => {
  const [actionText, setActionText] = useState(launchableForm.actionText);
  const [encounterUuid, setEncounterUuid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const continueEncounterActionText = launchableForm.actionText || 'Continue encounter ';

  useEffect(() => {
    if (launchableForm.editLatestEncounter && encounterType && !encounterUuid) {
      setIsLoading(true);
      fetchPatientLastEncounter(patientUuid, encounterType).then((lastHtsEncounter) => {
        if (lastHtsEncounter) {
          setActionText(continueEncounterActionText);
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
            if (encounterUuid) {
              changeWorkspaceContext(patientUuid);
              launchFormInEditMode(form, encounterUuid, null, null, 'ohri-forms');
            } else {
              changeWorkspaceContext(patientUuid);
              launchForm(form, null, null, 'ohri-forms');
            }
            navigate({ to: patientUrl });
          }}
        />
      )}
    </>
  );
};

export const CohortPatientList: React.FC<CohortPatientListProps> = ({
  cohortId,
  cohortSlotName,
  isReportingCohort,
  otherColumns,
  excludeColumns,
  queryParams,
  associatedEncounterType,
  launchableForm,
  addPatientToListOptions,
  extraAssociatedEncounterTypes,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPatients, setLoadedPatients] = useState(false);
  const [loadedEncounters, setLoadedEncounters] = useState(false);
  const [loadedHIVStatuses, setLoadedHIVStatuses] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [patientsCount, setPatientsCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(null);
  const [counter, setCounter] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loadedExtraEncounters, setLoadedExtraEncounters] = useState(false);
  const [extraEncounters, setExtraEncounters] = useState([]);

  const [paginatedPatients, setPaginatedPatients] = useState([]);
  const [allPatients, setAllPatients] = useState([]);

  const columnAtLastIndex = 'actions';
  const form = launchableForm && getForm(launchableForm.package, launchableForm.name);

  const constructPatient = (rawPatient) => {
    const patientUuid = isReportingCohort ? rawPatient.person.uuid : rawPatient.patient.uuid;
    const dashboard = launchableForm?.targetDashboard ? `/${launchableForm?.targetDashboard}` : '';
    return {
      uuid: patientUuid,
      id: isReportingCohort ? rawPatient.identifiers[0].identifier : rawPatient.patient.identifiers[0].identifier,
      age: isReportingCohort ? rawPatient.person.age : rawPatient.patient.person.age,
      name: isReportingCohort ? rawPatient.person.display : rawPatient.patient.person.display,
      birthdate: isReportingCohort
        ? moment(rawPatient.person.birthdate).format('DD-MMM-YYYY')
        : moment(rawPatient.patient.person.birthdate).format('DD-MMM-YYYY'),
      gender: isReportingCohort
        ? rawPatient.person.gender == 'M'
          ? 'Male'
          : 'Female'
        : rawPatient.patient.person.gender == 'M'
        ? 'Male'
        : 'Female',
      birthday: isReportingCohort ? rawPatient.person.birthdate : rawPatient.patient.person.birthdate,
      url: `${basePath}${patientUuid}/chart${dashboard}`,
    };
  };
  const { t } = useTranslation();

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
            <LaunchableFormMenuItem
              patientUuid={patientUuid}
              launchableForm={launchableForm}
              form={applyFormIntent(launchableForm.intent, form)}
              encounterType={launchableForm.encounterType || associatedEncounterType}
              key={patientUuid}
              patientUrl={patientWithMeta.patientUrl}
            />
          ) : (
            <></>
          )}
          {addPatientToListOptions?.isEnabled && (
            <AddPatientToListOverflowMenuItem
              patientUuid={patientUuid}
              displayText={t('moveToListSideNav', 'Move to list')}
              excludeCohorts={addPatientToListOptions?.excludeCohorts || []}
            />
          )}
        </OverflowMenu>
      ),
    };
  };

  const updatePatientTable = (fullDataset, start, itemCount) => {
    let currentRows = [];

    for (let i = start; i < start + itemCount; i++) {
      if (i < fullDataset.length) {
        currentRows.push(fullDataset[i]);
      }
    }
    setPaginatedPatients(currentRows);
  };

  useEffect(() => {
    if (!isReportingCohort) {
      getCohort(cohortId, 'full').then((results) => {
        const patients = results.cohortMembers.map((member) => {
          let patient = constructPatient(member);
          member['patientUrl'] = patient.url;
          return {
            ...patient,
            ...setListMeta(member, results.location),
          };
        });
        setAllPatients(patients);
        updatePatientTable(patients, 0, pageSize);
        setLoadedPatients(true);
        setIsLoading(patients.length > 0);
      });
    } else {
      getReportingCohortMembers(cohortId, queryParams).then((results) => {
        const patients = results.map(({ data }) => {
          let patient = constructPatient(data);
          data['patientUrl'] = patient.url;
          return {
            ...patient,
            ...setListMeta(data, null),
          };
        });

        setAllPatients(patients);
        updatePatientTable(patients, 0, pageSize);
        setLoadedPatients(true);
        setIsLoading(patients.length > 0);
      });
    }
  }, [cohortId]);

  useEffect(() => {
    if (loadedPatients && allPatients.length) {
      Promise.all(allPatients.map((patient) => fetchPatientLastEncounter(patient.uuid, associatedEncounterType))).then(
        (results) => {
          results.forEach((encounter, index) => {
            allPatients[index].latestEncounter = encounter;
            if (index == allPatients.length - 1) {
              setAllPatients([...allPatients]);
              setLoadedEncounters(true);
              setIsLoading(false);
            }
          });
        },
      );
    }
    setPatientsCount(allPatients.length);
  }, [loadedPatients]);

  useEffect(() => {
    const fetchHivResults = excludeColumns ? !excludeColumns.includes('hivResult') : true;
    if ((loadedEncounters || !associatedEncounterType) && !loadedHIVStatuses && fetchHivResults) {
      Promise.all(allPatients.map((patient) => fetchPatientsFinalHIVStatus(patient.uuid))).then((results) => {
        results.forEach((hivResult, index) => {
          allPatients[index].hivResult = hivResult;
          if (index == allPatients.length - 1) {
            setAllPatients([...allPatients]);
            setLoadedHIVStatuses(true);
          }
        });
      });
    }
  }, [allPatients, loadedEncounters]);

  const pagination = useMemo(() => {
    return {
      usePagination: true,
      currentPage: currentPage,
      onChange: ({ pageSize, page }) => {
        let startOffset = (page - 1) * pageSize;
        updatePatientTable(allPatients, startOffset, pageSize);

        setCurrentPage(page);
        setPageSize(pageSize);
        return null;
      },
      pageSize: pageSize,
      totalItems: patientsCount,
    };
  }, [currentPage, pageSize, patientsCount, loadedEncounters]);

  const handleSearch = useCallback(
    (searchTerm) => {
      setSearchTerm(searchTerm);
      const filtrate = filterPatientsByName(searchTerm, paginatedPatients);
      setFilteredResults(filtrate);
      return true;
    },
    [paginatedPatients],
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
      filteredColumns = columns.filter((c) => !excludeColumns.includes(c.key));
    }
    if (otherColumns) {
      otherColumns.forEach((column) => {
        if (column.index) {
          filteredColumns.splice(column.index, 0, column);
        } else {
          filteredColumns.push(column);
        }
      });
    }
    // position column designated to be at the last index
    const index = filteredColumns.findIndex((column) => column.key == columnAtLastIndex);
    if (index) {
      const column = filteredColumns[index];
      filteredColumns.splice(index, 1);
      filteredColumns.push(column);
    }

    return {
      patients: searchTerm ? filteredResults : paginatedPatients,
      columns: filteredColumns,
      isLoading,
      search: {
        placeHolder: t('searchClientList', 'Search client list'),
        onSearch: (searchTerm) => {
          if (!searchTerm) {
            // clear value
            setSearchTerm('');
          }
        },
        currentSearchTerm: searchTerm,
        otherSearchProps: {
          onKeyDown: (e) => {
            if (e.keyCode == 13) {
              handleSearch(e.target.value);
            }
          },
          autoFocus: true,
        },
      },
      pagination: pagination,
      autoFocus: true,
    };
  }, [
    searchTerm,
    filteredResults,
    paginatedPatients,
    handleSearch,
    pagination,
    isLoading,
    t,
    excludeColumns,
    otherColumns,
  ]);

  useEffect(() => {
    setCounter(counter + 1);
  }, [state]);

  useEffect(() => {
    if (allPatients.length && extraAssociatedEncounterTypes && !loadedExtraEncounters) {
      allPatients.forEach((patient) => {
        extraAssociatedEncounterTypes.forEach((encType) => {
          extraEncounters.push(fetchPatientLastEncounter(patient.uuid, encType));
        });
      });

      Promise.all(extraEncounters).then((results) => {
        results.forEach((encounter, index) => {
          const idx = allPatients.findIndex((patient) => patient.uuid === encounter?.patient.uuid);
          if (idx !== -1) {
            allPatients[idx].latestExtraEncounters = allPatients[idx].latestExtraEncounters?.concat(encounter) ?? [
              encounter,
            ];
          }
        });
        setLoadedExtraEncounters(true);
      });
    }
  }, [loadedPatients]);

  return (
    <div className={styles.table1}>
      {isLoading ? (
        <DataTableSkeleton rowCount={5} />
      ) : !paginatedPatients.length ? (
        <TableEmptyState
          tableHeaders={state.columns}
          message={t('noPatientSidenav', 'There are no patients in this list.')}
        />
      ) : (
        <ExtensionSlot extensionSlotName={cohortSlotName} state={state} key={counter} />
      )}
    </div>
  );
};
