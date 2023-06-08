import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  PreTestApproachConceptUUID,
  PreTestConceptUUID,
  PreTestEligibleForTestingConceptUUID,
  PreTestEncounterTypeConceptUUID,
  PreTestHIVTestDoneConceptUUID,
  PreTestPopulationConceptUUID,
} from '../../../constants';
import { moduleName } from '../../../index';

interface HIVPreTestTabListProps {
  patientUuid: string;
}

const HIVPreTestTabList: React.FC<HIVPreTestTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'PreTestEncDate',
        header: t('encounterDate', 'Encounter Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PreTestHIVTestDoneConceptUUID, true);
        },
      },
      {
        key: 'PreTestSetting',
        header: t('PreTestSetting', 'Setting'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PreTestConceptUUID);
        },
      },
      {
        key: 'PreTestApproach',
        header: t('PreTestApproach', 'Approach'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PreTestApproachConceptUUID);
        },
      },
      {
        key: 'PreTestPltn',
        header: t('PreTestPltn', 'Population Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PreTestPopulationConceptUUID);
        },
      },
      {
        key: 'PreTestEFT',
        header: t('PreTestEFT', 'Eliglble for Testing'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PreTestEligibleForTestingConceptUUID);
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'hts_who', package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'hts_who', package: 'hiv' },
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

  const headerTitle = t('htsPreTest', 'Pre Test');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={PreTestEncounterTypeConceptUUID}
      form={{ package: 'hiv', name: 'hts_who' }}
      forms={[{ package: 'hiv', name: 'hts_who', excludedIntents: [] }]}
      columns={columns}
      description={headerTitle}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: t('add', 'Add'),
        moduleName: moduleName,
      }}
    />
  );
};

export default HIVPreTestTabList;
