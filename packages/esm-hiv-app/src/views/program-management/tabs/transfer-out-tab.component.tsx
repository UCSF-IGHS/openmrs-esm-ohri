import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EmptyState,
  EncounterListColumn,
  findObs,
  getObsFromEncounter,
  EncounterList,
} from '@ohri/openmrs-esm-ohri-commons-lib';

import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface TransferOutTabListProps {
  patientUuid: string;
}

const TransferOutTabList: React.FC<TransferOutTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'visitDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.visitDate_UUID, true);
        },
      },
      {
        key: 'reasonsForTesting',
        header: t('reasonsForTesting', 'Receiving Facility'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.receivingFacility_UUID);
        },
      },
      {
        key: 'tranferOutDate',
        header: t('tranferOutDate', 'Transfer-Out Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.TransferOutDate_UUID, true);
        },
      },
      {
        key: 'verified',
        header: t('verified', 'Verified'),
        getValue: (encounter) => {
          const obs = findObs(encounter, config.obsConcepts.verified_UUID);
          return obs?.value?.name?.name === 'FALSE' ? 'No' : obs?.value?.name?.name;
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: config.formNames.TransferOutFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: config.formNames.TransferOutFormName, package: 'hiv' },
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

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={config.encounterTypes.transferOutEncounterType_UUID}
      formList={[{ name: config.formNames.TransferOutFormName }]}
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
