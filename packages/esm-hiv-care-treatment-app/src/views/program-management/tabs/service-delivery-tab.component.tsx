import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';

import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface ServiceDeliveryTabListProps {
  patientUuid: string;
}

const ServiceDeliveryTabList: React.FC<ServiceDeliveryTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames, formUuids } = useConfig();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'vlDate',
        header: t('vlDate', 'Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.dateOfEventConcept, true);
        },
      },
      {
        key: 'dsdstatus',
        header: t('dsdstatus', 'Status'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.DSDStatus_UUID);
        },
      },
      {
        key: 'dsdModel',
        header: t('dsdModel', 'SD Model'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.CommunityDSDModel_UUID);
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: formNames.ServiceDeliveryFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: formNames.ServiceDeliveryFormName, package: 'hiv' },
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

  const headerTitle = t('serviceDeliveryModel', 'Service Delivery Model');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={encounterTypes.ServiceDeliveryEncounterType_UUID}
      formList={[{ name: formNames.ServiceDeliveryFormName, uuid: formUuids.serviceDeliveryFormUuid }]}
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
