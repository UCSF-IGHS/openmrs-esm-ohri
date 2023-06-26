import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { DisclosureDate_UUID, DisclosureStage_UUID, PeadsDisclosureEncounterType_UUID } from '../../../constants';
import { moduleName } from '../../../index';

interface DisclosureListProps {
  patientUuid: string;
}

const DisclosureList: React.FC<DisclosureListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'disclosureDate',
        header: t('disclosureDate', 'Disclosure Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, DisclosureDate_UUID, true);
        },
      },
      {
        key: 'disclosureStage',
        header: t('disclosureStage', 'Disclosure Stage'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, DisclosureStage_UUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'Age Appropriate Disclosure Form', package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'View Details',
              mode: 'view',
            },
            {
              form: { name: 'Age Appropriate Disclosure Form', package: 'hiv' },
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

  const headerTitle = t('disclosure', 'Disclosure');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={PeadsDisclosureEncounterType_UUID}
      formList={[{ name: 'Age Appropriate Disclosure Form' }]}
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

export default DisclosureList;
