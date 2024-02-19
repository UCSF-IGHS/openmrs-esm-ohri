import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface DeathTabListProps {
  patientUuid: string;
}

const DeathTabList: React.FC<DeathTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames, formUuids } = useConfig();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'deathDate',
        header: t('deathDate', 'Death Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.hivDeathDate_UUID, true);
        },
      },
      {
        key: 'deathCause',
        header: t('deathCause', 'Cause of Death'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.causeOFDeath_UUID);
        },
      },
      {
        key: 'specificDeathCause',
        header: t('specificDeathCause', 'Specific cause of Death'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.deathSpecific_UUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: formNames.deathFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: formNames.deathFormName, package: 'hiv' },
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
      encounterType={encounterTypes.hivLabResultsEncounterType_UUID}
      formList={[{ name: formNames.deathFormName, uuid: formUuids.deathFormUuid }]}
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
