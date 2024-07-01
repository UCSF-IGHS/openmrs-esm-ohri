import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  fetchPatientsFinalHIVStatus,
  getCohortList,
} from '../../api.resource';
import dayjs from 'dayjs';
import { TableEmptyState } from '../empty-state/table-empty-state.component';
import { DataTableSkeleton } from '@carbon/react';
import { basePath } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useFormsJson } from '../../hooks/useFormsJson';
import { columns, consolidatatePatientMeta, type PatientListColumn } from './helpers';
import styles from './cohort-patient-list.scss';
import { PatientTable } from '../patient-table/patient-table.component';

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
  const [loadedHIVStatuses, setLoadedHIVStatuses] = useState(false);
  const [allPatients, setAllPatients] = useState([]);
  const columnAtLastIndex = 'actions';
  const forms = useMemo(() => [launchableForm.name], [launchableForm]);
  const { formsJson, isLoading: isLoadingFormsJson } = useFormsJson(forms);
  
  useEffect(() => {
    getCohortList(cohortId, queryParams, isReportingCohort, associatedEncounterType)
    .then((data) => {
      if(data) {
        const mappedPatients = data.filter((patient) => patient !== null)
        .map((mappedData) => {
          const patient = constructPatient(mappedData?.patient);
          patient.url = `${window.spaBase}/patient/${patient?.uuid}/chart/`;
          return {
            ...patient,
            encounter: mappedData,
            ...consolidatatePatientMeta(mappedData, formsJson[0], {
              isDynamicCohort: isReportingCohort,
              location: mappedData.location,
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
        })
        setAllPatients(mappedPatients);
        setIsLoading(false);
      }
    }).catch((error) => {
      console.error('Error fetching cohort data:', error);
      setIsLoading(false);
    })
  }, []);

  useEffect(() => {
    const fetchHivResults = excludeColumns ? !excludeColumns.includes('hivResult') : true;
    if ((!isLoading || !associatedEncounterType) && !loadedHIVStatuses && fetchHivResults) {
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
  }, [allPatients, associatedEncounterType, excludeColumns, isLoading, loadedHIVStatuses]);

  const constructPatient = useCallback(
    (rawPatient) => {
      const patientUuid = isReportingCohort ? rawPatient.person.uuid : rawPatient.uuid;
      const dashboard = launchableForm?.targetDashboard ? `/${launchableForm?.targetDashboard}` : '';
      return {
        uuid: patientUuid,
        id: isReportingCohort
          ? rawPatient?.identifiers[0]?.identifier
          : rawPatient?.patient?.identifiers[0]?.identifier,
        age: isReportingCohort ? rawPatient.person.age : rawPatient.age,
        name: isReportingCohort ? rawPatient.person.display : rawPatient.person.display,
        birthdate: isReportingCohort
          ? dayjs(rawPatient?.person?.birthdate).format('DD-MMM-YYYY')
          : dayjs(rawPatient?.person?.birthdate).format('DD-MMM-YYYY'),
        gender: isReportingCohort
          ? rawPatient.person.gender == 'M'
            ? 'Male'
            : 'Female'
          : rawPatient.person.gender == 'M'
            ? 'Male'
            : 'Female',
        birthday: isReportingCohort ? rawPatient.person.birthdate : rawPatient.person.birthdate,
        url: `${basePath}${patientUuid}/chart${dashboard}`,
      };
    },
    [isReportingCohort, launchableForm?.targetDashboard],
  );

  const { t } = useTranslation();

  const finalColumns = useMemo(() => {
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

    return filteredColumns
  }, [
    excludeColumns,
    otherColumns,
    columns,
  ]);

  return (
    <div className={styles.table1}>
      {isLoading ? (
        <DataTableSkeleton rowCount={5} />
      ) : !allPatients.length ? (
        <TableEmptyState
          tableHeaders={columns}
          message={t('noPatientSidenav', 'There are no patients in this list.')}
        />
      ) : (
        <PatientTable
          columns={finalColumns}
          isFetching={isLoading}
          isLoading={isLoading}
          patients={allPatients}
        />
      )}
    </div>
  );
};
