import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  covid_Assessment_EncounterUUID,
  covidReasonsForTestingConcep_UUID,
  covidSARS_TestResultConcept_UUID,
  covidPresentSymptonsConcept_UUID,
  covidUnderComorbidityConcept_UUID,
  covidPatientStatusConcept_UUID,
} from '../constants';

export const covidEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

interface CovidAssessmentWidgetProps {
  patientUuid: string;
}

//Generic Component Import

import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
  getEncounterValues,
} from '../components/encounter-list/encounter-list.component';

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
    key: 'reasonsForTesting',
    header: 'Reason for testing',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidReasonsForTestingConcep_UUID);
    },
  },
  {
    key: 'symptomatic',
    header: 'Symptomatic',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidPresentSymptonsConcept_UUID, false, true);
    },
  },
  {
    key: 'testDate',
    header: 'Comorbidity',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidUnderComorbidityConcept_UUID, false, true);
    },
  },
  {
    key: 'lastTestResult',
    header: 'Test Result',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidSARS_TestResultConcept_UUID);
    },
  },
  {
    key: 'outcome',
    header: 'Status',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidPatientStatusConcept_UUID);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => [
      {
        form: { name: 'covid_case', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'View Case Form',
        mode: 'view',
      },
      {
        form: { name: 'covid_case', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Edit Case Form',
        mode: 'edit',
      },
      {
        form: { name: 'covid_outcome', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Edit Outcome Form',
        mode: 'edit',
      },
    ],
  },
];

const CovidAssessment: React.FC<CovidAssessmentWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('covidAssessments', 'COVID Assessment');
  const displayText = t('covidAssessments', 'COVID Assessment');
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={covid_Assessment_EncounterUUID}
      form={{ package: 'covid', name: 'covid_assessment', view: 'covid_assessment_summary' }}
      forms={[
        { package: 'covid', name: 'covid_assessment', excludedIntents: ['COVID_LAB_ASSESSMENT_EMBED'] },
        { package: 'covid', name: 'covid_case', excludedIntents: [] },
      ]}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText='Add'
    />
  );
};

export default CovidAssessment;
