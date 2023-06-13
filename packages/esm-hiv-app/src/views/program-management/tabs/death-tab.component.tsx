import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  causeOFDeath_UUID,
  deathFormEncounterType_UUID,
  deathSpecific_UUID,
  hivDeathDate_UUID,
} from '../../../constants';
import { moduleName } from '../../../index';

interface DeathTabListProps {
  patientUuid: string;
}

const DeathTabList: React.FC<DeathTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'deathDate',
        header: t('deathDate', 'Death Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, hivDeathDate_UUID, true);
        },
      },
      {
        key: 'deathCause',
        header: t('deathCause', 'Cause of Death'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, causeOFDeath_UUID);
        },
      },
      {
        key: 'specificDeathCause',
        header: t('specificDeathCause', 'Specific cause of Death'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, deathSpecific_UUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'death_form', package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'death_form', package: 'hiv' },
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
  const headerTitle = t('death', 'Death');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={deathFormEncounterType_UUID}
      formList={[{ name: 'Death Form' }]}
      columns={columnsLab}
      description={headerTitle}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: t('add', 'Add'),
        moduleName: moduleName,
      }}
    />
  );
};

export default DeathTabList;
