import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface CacxRegistrationProps {
  patientUuid: string;
}

export const CacxRegistration: React.FC<CacxRegistrationProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const config = useConfig();

  const { cervicalCancerScreeningDateConcept, eligibleForScreeningConcept, previouslyScreenedConcept } =
    config.obsConcepts;

  const { cacxRegistrationEncounterType_UUID } = config.encounterTypes;

  const { cervicalCancerRegistrationForm } = config.formNames;

  const { cervicalCancerRegistrationFormUuid } = config.formUuids;

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'screeningDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, cervicalCancerScreeningDateConcept, true);
        },
      },
      {
        key: 'previouslyScreened',
        header: t('previouslyScreened', 'Previously Screened for CaCx'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, previouslyScreenedConcept);
        },
      },
      {
        key: 'eligibleforScreening',
        header: t('eligibleforScreening', 'Eligible for CaCx Screening'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, eligibleForScreeningConcept);
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: cervicalCancerRegistrationForm, package: 'cacx' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: cervicalCancerRegistrationForm, package: 'cacx' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('editForm', 'Edit Form'),
              mode: 'edit',
            },
          ];
          return baseActions;
        },
      },
    ],
    [],
  );

  const headerTitle = t('cacxRegistration', 'CaCx Registration');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={cacxRegistrationEncounterType_UUID}
      formList={[{ name: cervicalCancerRegistrationForm, uuid: cervicalCancerRegistrationFormUuid }]}
      columns={columnsLab}
      description={headerTitle}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};
