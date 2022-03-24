import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
} from '../../../components/encounter-list/encounter-list.component';
import { deathFormEncounterType_UUID } from '../../../constants';

interface PartnerNotificationListProps {
  patientUuid: string;
}

const columnsLab: EncounterListColumn[] = [
  {
    key: 'Date',
    header: 'Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, true);
    },
  },
  {
    key: 'relationshipToIndex',
    header: 'Relationship to Index',
    getValue: encounter => {
      return getObsFromEncounter(encounter, true);
    },
  },
  {
    key: 'indexType',
    header: 'Index Type',
    getValue: encounter => {
      return getObsFromEncounter(encounter, true);
    },
  },
  {
    key: 'contactMethod',
    header: 'Contact Method',
    getValue: encounter => {
      return getObsFromEncounter(encounter, true);
    },
  },
  {
    key: 'contactOutcome',
    header: 'Contact Outcome',
    getValue: encounter => {
      return getObsFromEncounter(encounter, true);
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
          label: 'Edit Details',
          mode: 'edit',
        },
      ];
      return baseActions;
    },
  },
];

const PartnerNotificationList: React.FC<PartnerNotificationListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('partnerNotification', 'Partner Notification');
  const displayText = t('partnerNotification', 'Partner Notification');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={deathFormEncounterType_UUID}
      form={{ package: 'hiv', name: 'patient_tracing' }}
      columns={columnsLab}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default PartnerNotificationList;
