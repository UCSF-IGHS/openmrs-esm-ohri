import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

import EncounterList, {
  EncounterListColumn,
  getEncounterValues,
  getObsFromEncounter,
} from '../../../components/encounter-list/encounter-list.component';
import { hivLabResultsEncounterType_UUID, hivCD4Count_UUID, hivCD4Result_UUID } from '../../../constants';

interface LabResultsOverviewListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'encounterDate',
    header: 'Date of Test ordered',
    getValue: encounter => {
      return getEncounterValues(encounter, 'encounterDateTime', true);
    },
  },
  {
    key: 'location',
    header: 'Location',
    getValue: encounter => {
      return encounter.location.name || 'None';
    },
  },
  {
    key: 'hivLabResult',
    header: 'CD4 Date Result',
    getValue: encounter => {
      return getObsFromEncounter(encounter, hivCD4Result_UUID);
    },
  },
  {
    key: 'hivCD4Count',
    header: 'CD4 Count',
    getValue: encounter => {
      return getObsFromEncounter(encounter, hivCD4Count_UUID);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: () => {},
  },
];

const LabResultsOverviewList: React.FC<LabResultsOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('labResults', 'Viral Load');
  const displayText = t('labResults', 'Viral Load');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default LabResultsOverviewList;
