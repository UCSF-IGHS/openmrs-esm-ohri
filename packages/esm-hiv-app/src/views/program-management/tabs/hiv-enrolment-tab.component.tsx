import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, findObs, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  dateOfServiceEnrollmentConcept,
  dateOfHIVDiagnosisConcept,
  careAndTreatmentEncounterType,
  entryPointConcept,
  patientTypeEnrollmentConcept,
  re_enrolmentDateConcept,
  otherEntryPoint,
  populationCategoryConcept,
  ServiceEnrolmentFormName,
} from '../../../constants';
import { moduleName } from '../../../index';

interface HIVEnrolmentTabListProps {
  patientUuid: string;
}

const HIVEnrolmentTabList: React.FC<HIVEnrolmentTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'date',
        header: t('enrollmentDate', 'Enrollment/Re-enrollment Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, re_enrolmentDateConcept, true) !== '--'
            ? getObsFromEncounter(encounter, re_enrolmentDateConcept, true)
            : getObsFromEncounter(encounter, dateOfServiceEnrollmentConcept, true);
        },
      },
      {
        key: 'clientDescription',
        header: t('patientType', 'Patient Type at Enrollment'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, patientTypeEnrollmentConcept);
        },
      },
      {
        key: 'dateConfirmedPositive',
        header: t('dateConfirmedPositive', 'Date Confirmed HIV+'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, dateOfHIVDiagnosisConcept, true);
        },
      },
      {
        key: 'entryPoint',
        header: t('entryPoint', 'Entry Point'),
        getValue: (encounter) => {
          const obs = findObs(encounter, entryPointConcept);
          if (typeof obs !== undefined && obs) {
            if (typeof obs.value === 'object') {
              if (obs !== undefined) {
                const EntryPoint =
                  obs.value.names?.find((conceptName) => conceptName.conceptNameType === 'SHORT')?.name ||
                  obs.value.name.name;
                if (EntryPoint === 'Other non-coded') {
                  return getObsFromEncounter(encounter, otherEntryPoint);
                }
              }
            }
          }
          return getObsFromEncounter(encounter, entryPointConcept);
        },
      },
      {
        key: 'populationCategory',
        header: t('populationCategory', 'Population Category'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, populationCategoryConcept);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: ServiceEnrolmentFormName, package: 'hiv' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: ServiceEnrolmentFormName, package: 'hiv' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('editForm', 'Edit Form'),
            mode: 'edit',
          },
        ],
      },
    ],
    [],
  );

  const headerTitle = t('hivEnrolment', 'HIV Enrolment');
  const displayText = t('hivEnrolment', 'HIV Enrolment');

  const hivEnrolmentFilter = (encounter) => {
    return encounter?.form?.name === ServiceEnrolmentFormName;
  };

  return (
    <EncounterList
      patientUuid={patientUuid}
      filter={hivEnrolmentFilter}
      encounterType={careAndTreatmentEncounterType}
      formList={[{ name: ServiceEnrolmentFormName }]}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: t('add', 'Add'),
        moduleName: moduleName,
      }}
    />
  );
};

export default HIVEnrolmentTabList;
