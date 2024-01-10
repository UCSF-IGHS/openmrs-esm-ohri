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
  const config = useConfig();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'date',
        header: t('enrollmentDate', 'Enrollment/Re-enrollment Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.re_enrolmentDateConcept, true) !== '--'
            ? getObsFromEncounter(encounter, config.obsConcepts.re_enrolmentDateConcept, true)
            : getObsFromEncounter(encounter, config.obsConcepts.dateOfServiceEnrollmentConcept, true);
        },
      },
      {
        key: 'clientDescription',
        header: t('patientType', 'Patient Type at Enrollment'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.patientTypeEnrollmentConcept);
        },
      },
      {
        key: 'dateConfirmedPositive',
        header: t('dateConfirmedPositive', 'Date Confirmed HIV+'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.dateOfHIVDiagnosisConcept, true);
        },
      },
      {
        key: 'entryPoint',
        header: t('entryPoint', 'Entry Point'),
        getValue: (encounter) => {
          const obs = findObs(encounter, config.obsConcepts.entryPointConcept);
          if (typeof obs !== undefined && obs) {
            if (typeof obs.value === 'object') {
              if (obs !== undefined) {
                const EntryPoint =
                  obs.value.names?.find((conceptName) => conceptName.conceptNameType === 'SHORT')?.name ||
                  obs.value.name.name;
                if (EntryPoint === 'Other non-coded') {
                  return getObsFromEncounter(encounter, config.obsConcepts.otherEntryPoint);
                }
              }
            }
          }
          return getObsFromEncounter(encounter, config.obsConcepts.entryPointConcept);
        },
      },
      {
        key: 'populationCategory',
        header: t('populationCategory', 'Population Category'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.populationCategoryConcept);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: config.formNames.ServiceEnrolmentFormName, package: 'hiv' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: config.formNames.ServiceEnrolmentFormName, package: 'hiv' },
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
      encounterType={config.encounterTypes.careAndTreatmentEncounterType}
      formList={[{ name: config.formNames.ServiceEnrolmentFormName }]}
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
