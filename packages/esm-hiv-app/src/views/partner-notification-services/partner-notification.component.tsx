import { Tag } from '@carbon/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, findObs, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import styles from '../common.scss';
import { moduleName } from '../../index';
import { useConfig } from '@openmrs/esm-framework';
const statusColorMap = {
  '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'red', // positive
  '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'gray', // negative
  '1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'purple', // unknown
};

interface PartnerNotificationListProps {
  patientUuid: string;
}

const PartnerNotificationList: React.FC<PartnerNotificationListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames, formUuids } = useConfig();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'contactDate',
        header: t('contactDate', 'Contact Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.dateOfEventConcept, true);
        },
      },
      {
        key: 'name',
        header: t('name', 'Name'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.FirstName_UUID);
        },
      },
      {
        key: 'relationship',
        header: t('relationship', 'Relationship'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.Relationship_UUID);
        },
      },
      {
        key: 'hivStatus',
        header: t('hivStatus', 'Status'),
        getValue: (encounter) => {
          const hivStatus = getObsFromEncounter(encounter, obsConcepts.IndexHIVStatus_UUID);
          const hivStatusObs = findObs(encounter, obsConcepts.IndexHIVStatus_UUID);
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
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: formNames.PartnerNotificationFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'View Details',
              mode: 'view',
            },
            {
              form: { name: formNames.PartnerNotificationFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'Edit Form',
              mode: 'edit',
            },
          ];
          return baseActions;
        },
      },
    ],
    [],
  );

  const headerTitle = t('partnerNotification', 'Partner Notification');

  const partnerNotificationFilter = (encounter) => {
    return encounter?.form?.name === formNames.PartnerNotificationFormName;
  };

  return (
    <EncounterList
      patientUuid={patientUuid}
      filter={partnerNotificationFilter}
      encounterType={encounterTypes.PatnerNotificationEncounterType_UUID}
      formList={[{ name: formNames.PartnerNotificationFormName, uuid: formUuids.partnerNotificationFormUuid }]}
      columns={columns}
      description={headerTitle}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default PartnerNotificationList;
