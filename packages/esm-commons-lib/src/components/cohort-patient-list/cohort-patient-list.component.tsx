import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { attach, detach, ExtensionSlot } from '@openmrs/esm-framework';
import {
  fetchPatientLastEncounter,
  fetchPatientsFinalHIVStatus,
  getCohort,
  getReportingCohortMembers,
} from '../../api.resource';
import dayjs from 'dayjs';
import { TableEmptyState } from '../empty-state/table-empty-state.component';
import { DataTableSkeleton } from '@carbon/react';
import { basePath } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useFormsJson } from '../../hooks/useFormsJson';
import { columns, consolidatatePatientMeta, filterPatientsByName, type PatientListColumn } from './helpers';

import styles from './cohort-patient-list.scss';

interface CohortPatientListProps {
  cohortId: string;
  cohortSlotName: string;
  isReportingCohort?: boolean;
  otherColumns?: Array<PatientListColumn>;
  excludeColumns?: Array<string>;
  queryParams?: Array<string>;
  associatedEncounterType?: string;
  viewPatientProgramSummary?: boolean;
  viewTptPatientProgramSummary?: boolean;
  addPatientToListOptions?: { isEnabled: boolean; excludeCohorts?: Array<string> };
  launchableForm?: {
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
  moduleName: string;
}

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
  moduleName,
  viewPatientProgramSummary,
  viewTptPatientProgramSummary,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedPatients, setHasLoadedPatients] = useState(false);
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
  const [rawCohortData, setRawCohortData] = useState<{ location?: any; members: any[] }>({ members: [] });
  const [isLoadingCohorts, setIsLoadingCohorts] = useState(true);
  const columnAtLastIndex = 'actions';
  const forms = useMemo(() => [launchableForm.name], [launchableForm]);
  const { formsJson, isLoading: isLoadingFormsJson } = useFormsJson(forms);

  const constructPatient = useCallback(
    (rawPatient) => {
      const patientUuid = isReportingCohort ? rawPatient.person.uuid : rawPatient.patient.uuid;
      const dashboard = launchableForm?.targetDashboard ? `/${launchableForm?.targetDashboard}` : '';
      return {
        uuid: patientUuid,
        id: isReportingCohort
          ? rawPatient?.identifiers[0]?.identifier
          : rawPatient?.patient?.identifiers[0]?.identifier,
        age: isReportingCohort ? rawPatient.person.age : rawPatient.patient.person.age,
        name: isReportingCohort ? rawPatient.person.display : rawPatient.patient.person.display,
        birthdate: isReportingCohort
          ? dayjs(rawPatient?.person?.birthdate).format('DD-MMM-YYYY')
          : dayjs(rawPatient?.patient?.person?.birthdate).format('DD-MMM-YYYY'),
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
    },
    [isReportingCohort, launchableForm?.targetDashboard],
  );

  const { t } = useTranslation();

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
        setRawCohortData({ members: results.cohortMembers, location: results.location });
        setIsLoadingCohorts(false);
      });
    } else {
      getReportingCohortMembers(cohortId, queryParams).then((results) => {
        setRawCohortData({ members: results.map((result) => result.data) });
        setIsLoadingCohorts(false);
      });
    }
  }, [cohortId, isReportingCohort, queryParams]);

  useEffect(() => {
    if (!isLoadingCohorts && !isLoadingFormsJson) {
      const patients = rawCohortData.members.map((member) => {
        const patient = constructPatient(member);
        member['patientUrl'] = patient.url;
        return {
          ...patient,
          ...consolidatatePatientMeta(member, formsJson[0], {
            isDynamicCohort: isReportingCohort,
            location: rawCohortData.location,
            encounterType: associatedEncounterType,
            moduleName,
            launchableFormProps: launchableForm,
            addPatientToListOptions: {
              ...addPatientToListOptions,
              displayText: t('moveToListSideNav', 'Move to list'),
            },
            viewTptPatientProgramSummary,
            viewPatientProgramSummary,
          }),
        };
      });
      setAllPatients(patients);
      updatePatientTable(patients, 0, pageSize);
      setHasLoadedPatients(true);
      setIsLoading(false);
    }
  }, [
    rawCohortData,
    formsJson,
    isLoadingCohorts,
    isLoadingFormsJson,
    pageSize,
    constructPatient,
    isReportingCohort,
    associatedEncounterType,
    moduleName,
    launchableForm,
    addPatientToListOptions,
    t,
    viewTptPatientProgramSummary,
    viewPatientProgramSummary,
  ]);

  useEffect(() => {
    if (hasLoadedPatients && allPatients.length) {
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
  }, [allPatients, associatedEncounterType, hasLoadedPatients]);

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
  }, [allPatients, associatedEncounterType, excludeColumns, loadedEncounters, loadedHIVStatuses]);

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
  }, [currentPage, pageSize, patientsCount, allPatients]);

  const handleSearch = useCallback(
    (searchTerm) => {
      setSearchTerm(searchTerm);
      const filtrate = filterPatientsByName(searchTerm, allPatients);
      setFilteredResults(filtrate);
      return true;
    },
    [allPatients],
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
  }, [counter, state]);

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
  }, [allPatients, extraAssociatedEncounterTypes, extraEncounters, loadedExtraEncounters]);

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
        <ExtensionSlot name={cohortSlotName} state={state} key={counter} />
      )}
    </div>
  );
};
