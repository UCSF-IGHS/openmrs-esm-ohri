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
import { columns, consolidatatePatientMeta, filterPatientsByName, type PatientListColumn } from './helpers';

import styles from './cohort-patient-list.scss';
import { useCohortData, usePatientsLastEncounters } from '../../hooks/useCohortList';
import { useFormsJson } from '../../hooks/useFormsJson';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [paginatedPatients, setPaginatedPatients] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [patientsCount, setPatientsCount] = useState(0);
  const [counter, setCounter] = useState(0);
  const { t } = useTranslation();

  // Fetch cohort data and forms JSON using your existing hooks
  const { data: cohortData, error: cohortError } = useCohortData(cohortId, isReportingCohort, queryParams);

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
    [isReportingCohort, launchableForm?.targetDashboard]
  );

  const updatePatientTable = useCallback((fullDataset, start, itemCount) => {
    setPaginatedPatients(fullDataset.slice(start, start + itemCount));
  }, []);

  useEffect(() => {
    if (cohortData && formsJson) {
      const patients = cohortData.members.map((member) => {
        const patient = constructPatient(member);
        member['patientUrl'] = patient.url;
        return {
          ...patient,
          ...consolidatatePatientMeta(member, formsJson[0], {
            isDynamicCohort: isReportingCohort,
            location: cohortData.location,
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
    }
  }, [cohortData, formsJson, pageSize, constructPatient]);

  // Use the custom SWR hook to fetch patient last encounters
  const { data: patientsWithEncounters, isLoading: isLoadingEncounters, isError: encountersError } = usePatientsLastEncounters(allPatients, associatedEncounterType, excludeColumns);

  useEffect(() => {
    if (patientsWithEncounters && !isLoadingEncounters) {
      setAllPatients(patientsWithEncounters);
    }
  }, [patientsWithEncounters, isLoadingEncounters]);

  useEffect(() => {
    setPatientsCount(allPatients.length);
  }, [allPatients]);

  const handleSearch = useCallback(
    (searchTerm) => {
      setSearchTerm(searchTerm);
      const filtrate = filterPatientsByName(searchTerm, allPatients);
      setFilteredResults(filtrate);
    },
    [allPatients]
  );

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
    const index = filteredColumns.findIndex((column) => column.key == 'actions');
    if (index) {
      const column = filteredColumns[index];
      filteredColumns.splice(index, 1);
      filteredColumns.push(column);
    }

    return {
      patients: searchTerm ? filteredResults : paginatedPatients,
      columns: filteredColumns,
      isLoading: !cohortData || !formsJson || isLoadingEncounters,
      search: {
        placeHolder: t('searchClientList', 'Search client list'),
        onSearch: (searchTerm) => {
          if (!searchTerm) {
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
      pagination: {
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
      },
      autoFocus: true,
    };
  }, [
    searchTerm,
    filteredResults,
    paginatedPatients,
    handleSearch,
    currentPage,
    pageSize,
    patientsCount,
    cohortData,
    formsJson,
    isLoadingEncounters,
    t,
    excludeColumns,
    otherColumns,
  ]);

  return (
    <div className={styles.table1}>
      {!paginatedPatients.length ? (
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
