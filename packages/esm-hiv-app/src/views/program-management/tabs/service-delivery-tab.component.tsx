import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  CommunityDSDModel_UUID,
  DSDStatus_UUID,
  EnrollmentDate_UUID,
  ServiceDeliveryEncounterType_UUID,
} from '../../../constants';

interface ServiceDeliveryTabListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'vlDate',
    header: 'Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, EnrollmentDate_UUID, true);
    },
  },
  {
    key: 'dsdstatus',
    header: 'Status',
    getValue: encounter => {
      return getObsFromEncounter(encounter, DSDStatus_UUID);
    },
  },
  {
    key: 'dsdModel',
    header: 'SD Model',
    getValue: encounter => {
      return getObsFromEncounter(encounter, CommunityDSDModel_UUID);
    },
  },

  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      const baseActions = [
        {
          form: { name: 'service_delivery', package: 'hiv' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'service_delivery', package: 'hiv' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'Edit Form',
          mode: 'edit',
        },
      ];
      return baseActions;
    },
  },
];

const ServiceDeliveryTabList: React.FC<ServiceDeliveryTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('serviceDelivery', 'Service Delivery Model');
  const displayText = t('serviceDelivery', 'Service Delivery Model');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={ServiceDeliveryEncounterType_UUID}
      form={{ package: 'hiv', name: 'service_delivery' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default ServiceDeliveryTabList;
