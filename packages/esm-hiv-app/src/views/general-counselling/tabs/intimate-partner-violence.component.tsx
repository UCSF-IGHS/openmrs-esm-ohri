import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, EncounterList, findObs, getObsFromEncounter } from 'openmrs-esm-ohri-commons-lib';
import {
  EmotionalAbuse_UUID,
  IntimatePartnerEncounterType_UUID,
  PhysicalAbuse_UUID,
  SexualAbuse_UUID,
} from '../../../constants';

interface IntimatePartnerViolenceListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'physicalAbuse',
    header: 'Physical Abuse',
    getValue: encounter => {
      const obs = findObs(encounter, PhysicalAbuse_UUID);
      if (!obs) {
        return '--';
      }
      if (obs.value.uuid == 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3') {
        return 'Yes';
      } else {
        return 'No';
      }
    },
  },
  {
    key: 'EmotionalAbuse',
    header: 'Emotional Abuse',
    getValue: encounter => {
      const obs = findObs(encounter, EmotionalAbuse_UUID);
      if (!obs) {
        return '--';
      }
      if (obs.value.uuid == 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3') {
        return 'Yes';
      } else {
        return 'No';
      }
    },
  },
  {
    key: 'sexualAbuse',
    header: 'Sexual Abuse',
    getValue: encounter => {
      const obs = findObs(encounter, SexualAbuse_UUID);
      if (!obs) {
        return '--';
      }
      if (obs.value.uuid == 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3') {
        return 'Yes';
      } else {
        return 'No';
      }
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => [
      {
        form: { name: 'intimate_partner', package: 'hiv' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'View Details',
        mode: 'view',
      },
      {
        form: { name: 'intimate_partner', package: 'hiv' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Edit Form',
        mode: 'edit',
      },
    ],
  },
];

const IntimatePartnerViolenceList: React.FC<IntimatePartnerViolenceListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('intimatePartnerViolence', 'Intimate Partner Violence');
  const displayText = t('intimatePartnerViolence', 'Intimate Partner Violence');
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={IntimatePartnerEncounterType_UUID}
      form={{ package: 'hiv', name: 'intimate_partner' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default IntimatePartnerViolenceList;
