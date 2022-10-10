import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EmptyState,
  EncounterListColumn,
  findObs,
  getObsFromEncounter,
  EncounterList,
} from '@ohri/openmrs-esm-ohri-commons-lib';

import {
  receivingFacility_UUID,
  TransferOutDate_UUID,
  transferOutEncounterType_UUID,
  verified_UUID,
  visitDate_UUID,
} from '../../../constants';

interface TransferOutTabListProps {
  patientUuid: string;
}

const columnsLab: EncounterListColumn[] = [
  {
    key: 'visitDate',
    header: 'Visit Date',
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, visitDate_UUID, true);
    },
  },
  {
    key: 'reasonsForTesting',
    header: 'Receiving Facility',
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, receivingFacility_UUID);
    },
  },
  {
    key: 'tranferOutDate',
    header: 'Transfer-Out Date',
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, TransferOutDate_UUID, true);
    },
  },
  {
    key: 'verified',
    header: 'Verified',
    getValue: (encounter) => {
      const obs = findObs(encounter, verified_UUID);
      return obs?.value?.name?.name === 'FALSE' ? 'No' : obs?.value?.name?.name;
    },
  },

  {
    key: 'actions',
    header: 'Actions',
    getValue: (encounter) => {
      const baseActions = [
        {
          form: { name: 'transfer_out', package: 'hiv' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'transfer_out', package: 'hiv' },
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

const TransferOutTabList: React.FC<TransferOutTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('transferOut', 'Transfer Out');
  const displayText = t('transferOut', 'Transfer Out');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={transferOutEncounterType_UUID}
      form={{ package: 'hiv', name: 'transfer_out' }}
      columns={columnsLab}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default TransferOutTabList;
