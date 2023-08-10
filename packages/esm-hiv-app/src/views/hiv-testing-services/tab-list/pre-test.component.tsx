import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  HTSPreTestFormName,
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
        header: t('setting', 'Setting'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PreTestConceptUUID);
        },
      },
      {
        key: 'PreTestApproach',
        header: t('approach', 'Approach'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PreTestApproachConceptUUID);
        },
      },
      {
        key: 'PreTestPltn',
        header: t('populationType', 'Population Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PreTestPopulationConceptUUID);
        },
      },
      {
        key: 'PreTestEFT',
        header: t('eligibleForTesting', 'Eliglble for Testing'),
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
              form: { name: HTSPreTestFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: HTSPreTestFormName, package: 'hiv' },
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

  const htsPretestFilter = (encounter) => {
    return encounter?.form?.name === HTSPreTestFormName;
  };

  return (
    <EncounterList
      patientUuid={patientUuid}
      filter={htsPretestFilter}
      encounterType={PreTestEncounterTypeConceptUUID}
      formList={[{ name: HTSPreTestFormName, excludedIntents: [] }]}
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
