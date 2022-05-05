import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  EmptyStateComingSoon,
  EncounterList,
  EncounterListColumn,
  getEncounterValues,
  getObsFromEncounter,
} from 'openmrs-esm-ohri-commons-lib';
import { hivCD4Result_UUID } from '../../../constants';

interface CD4OverviewListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'testResultDate',
    header: 'Test Result Date',
    getValue: encounter => {
      return getEncounterValues(encounter, 'encounterDateTime', true);
    },
    link: {
      handleNavigate: encounter => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
  {
    key: 'CD4Count',
    header: 'CD4 Count %',
    getValue: encounter => {
      return getObsFromEncounter(encounter, hivCD4Result_UUID);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      const baseActions = [
        {
          form: { name: '', package: '' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: '', package: '' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'Edit form',
          mode: 'edit',
        },
      ];
      return baseActions;
    },
  },
];

const CD4OverviewList: React.FC<CD4OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cd4', 'CD4');
  const displayText = t('cd4', 'CD4');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default CD4OverviewList;
