import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import EncounterList, {
  EncounterListColumn,
  getEncounterValues,
  getObsFromEncounter,
} from '../../../components/encounter-list/encounter-list.component';
import { hivLabResultsEncounterType_UUID, hivCD4Count_UUID, hivCD4Result_UUID } from '../../../constants';

interface CD4OverviewListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'encounterDate',
    header: 'Date of Test ordered',
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

const CD4OverviewList: React.FC<CD4OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cd4', 'CD4');
  const displayText = t('cd4', 'CD4');

  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterUuid={hivLabResultsEncounterType_UUID}
        form={{ package: 'hiv', name: 'lab_results' }}
        columns={columns}
        description={displayText}
        headerTitle={headerTitle}
      />
    </>
  );
};

export default CD4OverviewList;
