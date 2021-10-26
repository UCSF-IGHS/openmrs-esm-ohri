import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../covid.scss';

import {
  covidRapidTestResultDate_UUID,
  covidReasonsForTestingConcep_UUID,
  covidSARS_TestResultConcept_UUID,
  covidSpecimentTestDate_UUID,
  covidTestResultConcept_UUID,
  covidTestResultUUID,
  covidTestStatusConcept_UUID,
  covidTestTypeUUID,
  covidTypeofTestConcept_UUID,
  covid_Assessment_EncounterUUID,
} from '../../constants';

interface OverviewListProps {
  patientUuid: string;
}

interface CovidOverviewListProps {
  patientUuid: string;
}

export const covidFormSlot = 'hts-encounter-form-slot';
export const covidEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

interface CovidLabWidgetProps {
  patientUuid: string;
}

//Generic Component Import
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
  getEncounterValues,
} from '../../components/encounter-list/encounter-list.component';

const columns: EncounterListColumn[] = [
  {
    key: 'encounterDate',
    header: 'Date of Lab Test',
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
    key: 'reasonsForTesting',
    header: 'Reason for testing',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidReasonsForTestingConcep_UUID);
    },
  },
  {
    key: 'testDate',
    header: 'Test Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidSpecimentTestDate_UUID, true);
    },
  },
  {
    key: 'testType',
    header: 'Test Type',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidTypeofTestConcept_UUID);
    },
  },
  {
    key: 'lastTestResult',
    header: 'Test Result',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidTestResultConcept_UUID);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: () => {},
  },
];

const CovidLabResults: React.FC<CovidLabWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('covidLabResults', 'Lab Results');
  const displayText = t('covidLabResults', 'Lab Results');
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={covid_Assessment_EncounterUUID}
      form={{ package: 'covid', name: 'covid_lab_test' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
      hideFormLauncher
    />
  );
};

export default CovidLabResults;
