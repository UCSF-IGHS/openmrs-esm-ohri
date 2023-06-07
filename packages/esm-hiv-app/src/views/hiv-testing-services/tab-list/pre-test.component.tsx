import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  PreTestApproachConceptUUID,
  PreTestConceptUUID,
  PreTestEligibleForTestingConceptUUID,
  PreTestHIVTestDoneConceptUUID,
  PreTestPopulationConceptUUID,
  ServiceDeliveryEncounterType_UUID,
} from '../../../constants';
import { moduleName } from '../../../index';

interface ServiceDeliveryTabListProps {
  patientUuid: string;
}

const ServiceDeliveryTabList: React.FC<ServiceDeliveryTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'vlDate',
        header: t('PreTestEncDate', 'Encounter Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PreTestHIVTestDoneConceptUUID, true);
        },
      },
      {
        key: 'dsdstatus',
        header: t('PreTestSetting', 'Setting'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PreTestConceptUUID);
        },
      },
      {
        key: 'dsdModel',
        header: t('PreTestApproach', 'Approach'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PreTestApproachConceptUUID);
        },
      },
      {
        key: 'dsdModel',
        header: t('PreTestPltn', 'Population Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PreTestPopulationConceptUUID);
        },
      },
      {
        key: 'dsdModel',
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
              form: { name: 'hts', package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'hts', package: 'hiv' },
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

  const headerTitle = t('htsPreTest', 'HIV Testing');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={ServiceDeliveryEncounterType_UUID}
      form={{ package: 'hiv', name: 'hts' }}
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

export default ServiceDeliveryTabList;
