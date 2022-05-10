import { Tag } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, findObs, getObsFromEncounter } from 'openmrs-esm-ohri-commons-lib';
import {
  FirstName_UUID,
  IndexHIVStatus_UUID,
  PatnerNotificationContactDate_UUID,
  PatnerNotificationEncounterType_UUID,
  Relationship_UUID,
} from '../../constants';
import styles from '../common.scss';
const statusColorMap = {
  '6378487b-584d-4422-a6a6-56c8830873ff': 'red', // positive
  '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'gray', // negative
  '1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'purple', // unknown
};

interface PartnerNotificationListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'contactDate',
    header: 'Contact Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, PatnerNotificationContactDate_UUID, true);
    },
  },
  {
    key: 'name',
    header: 'Name',
    getValue: encounter => {
      return getObsFromEncounter(encounter, FirstName_UUID);
    },
  },
  {
    key: 'relationship',
    header: 'Relationship',
    getValue: encounter => {
      return getObsFromEncounter(encounter, Relationship_UUID);
    },
  },
  {
    key: 'hivStatus',
    header: 'Status',
    getValue: encounter => {
      const hivStatus = getObsFromEncounter(encounter, IndexHIVStatus_UUID);
      const hivStatusObs = findObs(encounter, IndexHIVStatus_UUID);
      if (hivStatus == '--') {
        return '--';
      } else {
        return (
          <Tag type={statusColorMap[hivStatusObs?.value?.uuid]} title={hivStatus} className={styles.hivStatusTag}>
            {hivStatus}
          </Tag>
        );
      }
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      const baseActions = [
        {
          form: { name: 'patner_notification', package: 'hiv' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'patner_notification', package: 'hiv' },
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

const PartnerNotificationList: React.FC<PartnerNotificationListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('partnerNotification', 'Partner Notification');
  const displayText = t('partnerNotification', 'Partner Notification');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={PatnerNotificationEncounterType_UUID}
      form={{ package: 'hiv', name: 'patner_notification' }}
      columns={columns}
      description={headerTitle}
      headerTitle={displayText}
      dropdownText="Add"
    />
  );
};

export default PartnerNotificationList;
