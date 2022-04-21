import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
} from '../../../components/encounter-list/encounter-list.component';
import { DisclosureDate_UUID, DisclosureStage_UUID, PeadsDisclosureEncounterType_UUID } from '../../../constants';

interface DisclosureListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'disclosureDate',
    header: 'Disclosure Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, DisclosureDate_UUID, true);
    },
  },
  {
    key: 'disclosureStage',
    header: 'Disclosure Stage',
    getValue: encounter => {
      return getObsFromEncounter(encounter, DisclosureStage_UUID);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      const baseActions = [
        {
          form: { name: 'peads_disclosure', package: 'hiv' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'peads_disclosure', package: 'hiv' },
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

const DisclosureList: React.FC<DisclosureListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('disclosure', 'Disclosure');
  const displayText = t('disclosure', 'Disclosure');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={PeadsDisclosureEncounterType_UUID}
      form={{ package: 'hiv', name: 'peads_disclosure' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default DisclosureList;
