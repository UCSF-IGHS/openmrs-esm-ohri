import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  CommunityDSDModel_UUID,
  DSDStatus_UUID,
  EnrollmentDate_UUID,
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
        header: t('vlDate', 'Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, EnrollmentDate_UUID, true);
        },
      },
      {
        key: 'dsdstatus',
        header: t('dsdstatus', 'Status'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, DSDStatus_UUID);
        },
      },
      {
        key: 'dsdModel',
        header: t('dsdModel', 'SD Model'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, CommunityDSDModel_UUID);
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'service_delivery', package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'service_delivery', package: 'hiv' },
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
      encounterType={ServiceDeliveryEncounterType_UUID}
      formList={[{ name: 'Service Delivery Model Form' }]}
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
