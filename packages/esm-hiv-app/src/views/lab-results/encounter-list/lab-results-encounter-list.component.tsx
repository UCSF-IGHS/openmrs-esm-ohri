import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterListColumn,
  getEncounterValues,
  getObsFromEncounter,
  EmptyState,
  EmptyStateComingSoon,
} from 'openmrs-esm-ohri-commons-lib';
import { hivCD4Count_UUID, hivCD4Result_UUID } from '../../../constants';

interface LabResultsOverviewListProps {
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
    key: 'reasonForViralLoad',
    header: 'Reason for Viral Load',
    getValue: encounter => {
      return getObsFromEncounter(encounter, hivCD4Result_UUID);
    },
  },
  {
    key: 'viralLoadResult',
    header: 'Viral Load Result',
    getValue: encounter => {
      return getObsFromEncounter(encounter, hivCD4Result_UUID);
    },
  },
  {
    key: 'viralLoadCopies',
    header: 'Viral Load Copies',
    getValue: encounter => {
      return getObsFromEncounter(encounter, hivCD4Count_UUID);
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

const LabResultsOverviewList: React.FC<LabResultsOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('labResults', 'Viral Load');
  const displayText = t('labResults', 'Viral Load');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default LabResultsOverviewList;
