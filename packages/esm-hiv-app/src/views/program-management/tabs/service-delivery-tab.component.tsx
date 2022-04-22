import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from 'openmrs-esm-ohri-commons-lib';
import { CommunityDSDModel_UUID, ServiceDeliveryEncounterType_UUID } from '../../../constants';

interface ServiceDeliveryTabListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'mostRecentVLResults',
    header: 'Most recent VL results ',
    getValue: encounter => {
      return null;
    },
  },
  {
    key: 'vlDate',
    header: 'Date VL done',
    getValue: encounter => {
      return null;
    },
  },
  {
    key: 'currentRegimenDuration',
    header: 'Duration of current Regimen',
    getValue: encounter => {
      return null;
    },
  },
  {
    key: 'adherenceLevel',
    header: 'Good Adherence in the Last 6 months',
    getValue: encounter => {
      return null;
    },
  },
  {
    key: 'dsdModel',
    header: 'DSD Model',
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
