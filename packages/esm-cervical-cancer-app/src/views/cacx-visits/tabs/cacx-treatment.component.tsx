import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterList,
  EncounterListColumn,
  getMultipleObsFromEncounter,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface CacxTreatmentProps {
  patientUuid: string;
}

export const CacxTreatment: React.FC<CacxTreatmentProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();

  const {
    cacxEncounterDateConcept,
    screeningMethodConcept,
    cacxTreatmentConcept,
    colopsyResultsConcept,
    humanPapilomaVirusResultsConcept,
    papanicolaouSmearResultsConcept,
    VIAProcedureResultsConcept,
  } = config.obsConcepts;

  const { cacxTreatmentEncounterType_UUID } = config.encounterTypes;

  const { screeningAndCancerTreatmentForm } = config.formNames;

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'encounterDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, cacxEncounterDateConcept, true);
        },
      },
      {
        key: 'screeningMethod',
        header: t('screeningMethod', 'Screening Method'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, screeningMethodConcept);
        },
      },
      {
        key: 'screeningResult',
        header: t('screeningResult', 'Screening Results'),
        getValue: (encounter) => {
          return getMultipleObsFromEncounter(encounter, [
            colopsyResultsConcept,
            humanPapilomaVirusResultsConcept,
            papanicolaouSmearResultsConcept,
            VIAProcedureResultsConcept,
          ]);
        },
      },
      {
        key: 'cacxTreatment',
        header: t('cacxTreatment', 'Cacx Treatment'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, cacxTreatmentConcept);
        },
      },

      {
        key: 'actions',
        header: 'Actions',
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: screeningAndCancerTreatmentForm, package: 'cacx' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: screeningAndCancerTreatmentForm, package: 'cacx' },
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

  const headerTitle = t('cacxTreatment', 'CaCx Treatment');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={cacxTreatmentEncounterType_UUID}
      formList={[{ name: screeningAndCancerTreatmentForm }]}
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
