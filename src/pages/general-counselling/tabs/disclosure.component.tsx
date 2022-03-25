import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
} from '../../../components/encounter-list/encounter-list.component';
import { deathFormEncounterType_UUID } from '../../../constants';

interface DisclosureListProps {
  patientUuid: string;
}

const columnsLab: EncounterListColumn[] = [
  {
    key: 'contactDate',
    header: 'Disclosure Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, true);
    },
  },
  {
    key: 'contactMethod',
    header: 'Disclosure Stage',
    getValue: encounter => {
      return getObsFromEncounter(encounter, true);
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
          label: 'Edit Details',
          mode: 'edit',
        },
      ];
      return baseActions;
    },
  },
];

const DisclosureList: React.FC<DisclosureListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('disclosure', 'Disclosure');
  const displayText = t('disclosure', 'Disclosure');

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

export default DisclosureList;
