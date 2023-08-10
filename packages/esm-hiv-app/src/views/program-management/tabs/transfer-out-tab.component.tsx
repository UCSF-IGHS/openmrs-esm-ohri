import React, { useEffect, useMemo, useState } from 'react';
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
  TransferOutFormName,
  verified_UUID,
  visitDate_UUID,
} from '../../../constants';
import { moduleName } from '../../../index';

interface TransferOutTabListProps {
  patientUuid: string;
}

const TransferOutTabList: React.FC<TransferOutTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'visitDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, visitDate_UUID, true);
        },
      },
      {
        key: 'reasonsForTesting',
        header: t('reasonsForTesting', 'Receiving Facility'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, receivingFacility_UUID);
        },
      },
      {
        key: 'tranferOutDate',
        header: t('tranferOutDate', 'Transfer-Out Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, TransferOutDate_UUID, true);
        },
      },
      {
        key: 'verified',
        header: t('verified', 'Verified'),
        getValue: (encounter) => {
          const obs = findObs(encounter, verified_UUID);
          return obs?.value?.name?.name === 'FALSE' ? 'No' : obs?.value?.name?.name;
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: TransferOutFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: TransferOutFormName, package: 'hiv' },
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

  const headerTitle = t('transferOut', 'Transfer Out');
  const displayText = t('transferOut', 'Transfer Out');

  const transferOutFilter = (encounter) => {
    return encounter?.form?.name === TransferOutFormName;
  };

  return (
    <EncounterList
      patientUuid={patientUuid}
      filter={transferOutFilter}
      encounterType={transferOutEncounterType_UUID}
      formList={[{ name: TransferOutFormName }]}
      columns={columnsLab}
      description={displayText}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: t('add', 'Add'),
        moduleName: moduleName,
      }}
    />
  );
};

export default TransferOutTabList;
