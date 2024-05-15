import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, findObs, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface HIVEnrolmentTabListProps {
  patientUuid: string;
}

const HIVEnrolmentTabList: React.FC<HIVEnrolmentTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames } = useConfig();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'date',
        header: t('enrollmentDate', 'Enrollment/Re-enrollment Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.re_enrolmentDateConcept, true) !== '--'
            ? getObsFromEncounter(encounter, obsConcepts.re_enrolmentDateConcept, true)
            : getObsFromEncounter(encounter, obsConcepts.enrolmentDate, true);
        },
      },
      {
        key: 'clientDescription',
        header: t('patientType', 'Patient Type at Enrollment'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.patientTypeEnrollmentConcept);
        },
      },
      {
        key: 'dateConfirmedPositive',
        header: t('dateConfirmedPositive', 'Date Confirmed HIV+'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.dateOfHIVDiagnosisConcept, true);
        },
      },
      {
        key: 'entryPoint',
        header: t('entryPoint', 'Entry Point'),
        getValue: (encounter) => {
          const obs = findObs(encounter, obsConcepts.entryPointConcept);
          if (typeof obs !== undefined && obs) {
            if (typeof obs.value === 'object') {
              if (obs !== undefined) {
                const EntryPoint =
                  obs.value.names?.find((conceptName) => conceptName.conceptNameType === 'SHORT')?.name ||
                  obs.value.name.name;
                if (EntryPoint === 'Other non-coded') {
                  return getObsFromEncounter(encounter, obsConcepts.freeTextCommentConcept);
                }
              }
            }
          }
          return getObsFromEncounter(encounter, obsConcepts.entryPointConcept);
        },
      },
      {
        key: 'populationCategory',
        header: t('populationCategory', 'Population Category'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.populationCategoryConcept);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: formNames.ServiceEnrolmentFormName, package: 'hiv' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: formNames.ServiceEnrolmentFormName, package: 'hiv' },
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

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={encounterTypes.careAndTreatmentEncounterType}
      formList={[{ name: formNames.ServiceEnrolmentFormName }]}
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
