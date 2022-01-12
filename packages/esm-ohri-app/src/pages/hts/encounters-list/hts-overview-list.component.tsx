import React from 'react';
import { useTranslation } from 'react-i18next';
import { htsRetrospectiveEncounterType, hivTestResultConceptUUID } from '../../../constants';
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
  getEncounterValues,
} from '../../../components/encounter-list/encounter-list.component';

interface HtsOverviewWidgetProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'encounterDate',
    header: 'Date of HIV Test',
    getValue: encounter => {
      return getEncounterValues(encounter, 'encounterDatetime', true);
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
    key: 'hivTestResult',
    header: 'HIV Test Result',
    getValue: encounter => {
      return getObsFromEncounter(encounter, hivTestResultConceptUUID);
    },
  },
  {
    key: 'htsProvider',
    header: 'HTS Provider',
    getValue: encounter => {
      return encounter.encounterProviders.map(p => p.provider.name).join(' | ');
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: () => {},
  },
];

const HtsOverviewList: React.FC<HtsOverviewWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('htsSessions', 'HTS Sessions');
  const displayText = t('htsSessions', 'HTS Sessions');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={htsRetrospectiveEncounterType}
      form={{ package: 'hiv', name: 'hts' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
    />
  );
};

export default HtsOverviewList;
