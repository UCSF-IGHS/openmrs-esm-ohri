import {
  EncounterList,
  EncounterListColumn,
  getEncounterValues,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { moduleName } from '../index';
import { useConfig } from '@openmrs/esm-framework';

export const covidFormSlot = 'hts-encounter-form-slot';

interface CovidOutcomesWidgetProps {
  patientUuid: string;
}

const CovidOutcomes: React.FC<CovidOutcomesWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'encounterDate',
        header: t('dateOfAssessment', 'Date of Assessment'),
        getValue: (encounter) => {
          return getEncounterValues(encounter, 'encounterDatetime', true);
        },
        link: {
          handleNavigate: (encounter) => {
            encounter.launchFormActions?.viewEncounter();
          },
        },
      },
      {
        key: 'testType',
        header: t('testType', 'Test type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.covidTestTypeUUID);
        },
      },
      {
        key: 'testDate',
        header: t('testDate', 'Test date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.covidSpecimentTestDate_UUID, true);
        },
      },
      {
        key: 'outcome',
        header: t('outcomeStatus', 'Outcome status'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.covidOutcomeUUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: () => {},
      },
    ],
    [],
  );

  const headerTitle = t('covid_Outcomes_header', 'COVID Outcomes');
  const displayText = t('covid_Outcomes_display', 'COVID Outcomes');
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={config.encounterTypes.covid_Assessment_EncounterUUID}
      formList={[{ name: config.formNames.CovidCaseFormName }]}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
        hideFormLauncher: true,
      }}
    />
  );
};

export default CovidOutcomes;
