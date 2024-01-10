import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';

import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface DisclosureListProps {
  patientUuid: string;
}

const DisclosureList: React.FC<DisclosureListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames } = useConfig();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'disclosureDate',
        header: t('disclosureDate', 'Disclosure Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.DisclosureDate_UUID, true);
        },
      },
      {
        key: 'disclosureStage',
        header: t('disclosureStage', 'Disclosure Stage'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.DisclosureStage_UUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: formNames.DisclosureFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'View Details',
              mode: 'view',
            },
            {
              form: { name: formNames.DisclosureFormName, package: 'hiv' },
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

  const disclosureFilter = (encounter) => {
    return encounter?.form?.name === formNames.DisclosureFormName;
  };

  return (
    <EncounterList
      patientUuid={patientUuid}
      filter={disclosureFilter}
      encounterType={encounterTypes.PeadsDisclosureEncounterType_UUID}
      formList={[{ name: formNames.DisclosureFormName }]}
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
