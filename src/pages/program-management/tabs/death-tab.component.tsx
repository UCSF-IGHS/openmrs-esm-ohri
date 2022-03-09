import { Tab } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../program-management-summary.scss';
import EmptyState from '../../../components/empty-state/empty-state.component';
import EncounterList, { EncounterListColumn, getObsFromEncounter } from '../../../components/encounter-list/encounter-list.component';
import { causeOFDeath_UUID, deathFormEncounterType_UUID, deathSpecific_UUID, hivDeathDate_UUID } from '../../../constants';

interface DeathTabListProps {
  patientUuid: string;
}

const columnsLab: EncounterListColumn[] = [
  {
    key: 'orderDate',
    header: 'Date of Death',
    getValue: encounter => {
      return getObsFromEncounter(encounter, hivDeathDate_UUID, true);
    },
  },
  {
    key: 'reasonsForTesting',
    header: 'Cause of Death',
    getValue: encounter => {
      return getObsFromEncounter(encounter, causeOFDeath_UUID);
    },
  },
  {
    key: 'testType',
    header: 'Death Specific',
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
          form: { name: 'death_form', package: 'covid' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'death_form', package: 'covid' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'Edit Death Form',
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
