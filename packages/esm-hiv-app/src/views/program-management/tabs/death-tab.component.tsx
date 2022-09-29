import { Tab } from '@carbon/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  causeOFDeath_UUID,
  deathFormEncounterType_UUID,
  deathSpecific_UUID,
  hivDeathDate_UUID,
} from '../../../constants';

interface DeathTabListProps {
  patientUuid: string;
}

const columnsLab: EncounterListColumn[] = [
  {
    key: 'deathDate',
    header: 'Death Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, hivDeathDate_UUID, true);
    },
  },
  {
    key: 'deathCause',
    header: 'Cause of Death',
    getValue: encounter => {
      return getObsFromEncounter(encounter, causeOFDeath_UUID);
    },
  },
  {
    key: 'specificDeathCause',
    header: 'Specific cause of Death',
    getValue: encounter => {
      return getObsFromEncounter(encounter, deathSpecific_UUID);
    },
  },

  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      const baseActions = [
        {
          form: { name: 'death_form', package: 'hiv' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'death_form', package: 'hiv' },
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

const DeathTabList: React.FC<DeathTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('DeathTabList', 'Death');
  const displayText = t('DeathTabList', 'Death');
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={deathFormEncounterType_UUID}
      form={{ package: 'hiv', name: 'death_form' }}
      columns={columnsLab}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default DeathTabList;
