import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  covid_Assessment_EncounterUUID,
  covidTestTypeUUID,
  covidVaccinationStatusUUID,
  covidSpecimentTestDate_UUID,
  covidOutcomeUUID,
} from '../constants';
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
  getEncounterValues,
} from '../../../esm-ohri-core-app/src/components/encounter-list/encounter-list.component';

export const covidFormSlot = 'hts-encounter-form-slot';

interface CovidOutcomesWidgetProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'encounterDate',
    header: 'Date of Assessment',
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
    key: 'testType',
    header: 'Test type',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidTestTypeUUID);
    },
  },
  {
    key: 'testDate',
    header: 'Test date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidSpecimentTestDate_UUID, true);
    },
  },
  {
    key: 'outcome',
    header: 'Outcome status',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidOutcomeUUID);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: () => {},
  },
];

const CovidOutcomes: React.FC<CovidOutcomesWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('covidOutcomes', 'COVID Outcomes');
  const displayText = t('covidOutcomes', 'COVID Outcomes');
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={covid_Assessment_EncounterUUID}
      form={{ package: 'covid', name: 'covid_outcome' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
      hideFormLauncher
    />
  );
};

export default CovidOutcomes;
