import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';
import EncounterList, { EncounterListColumn } from '../../../components/encounter-list/encounter-list.component';

interface ServiceDeliveryTabListProps {
  patientUuid: string;
}

const columnsLab: EncounterListColumn[] = [
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
      return null;
    },
  },

  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      const baseActions = [
        {
          form: { name: '', package: '' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: '', package: '' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'Edit',
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
      encounterUuid={''}
      form={{ package: 'hiv', name: 'death_form' }}
      columns={columnsLab}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default ServiceDeliveryTabList;
