import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterList,
  EncounterListColumn,
  getMultipleObsFromEncounter,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  cacxEncounterDateConcept,
  screeningMethodConcept,
  cacxTreatmentConcept,
  cacxTreatmentEncounterType_UUID,
  colopsyResultsConcept,
  humanPapilomaVirusResultsConcept,
  papanicolaouSmearResultsConcept,
  VIAProcedureResultsConcept,
} from '../../../constants';
import { moduleName } from '../../../index';

interface CacxTreatmentListProps {
  patientUuid: string;
}

const CacxTreatmentList: React.FC<CacxTreatmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

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
              form: { name: 'Screening and Cancer Treatment Form', package: 'cacx' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'Screening and Cancer Treatment Form', package: 'cacx' },
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
      formList={[{ name: 'Screening and Cancer Treatment Form' }]}
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

export default CacxTreatmentList;
