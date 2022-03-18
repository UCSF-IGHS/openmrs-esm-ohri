import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  covid_Assessment_EncounterUUID,
  covidReasonsForTestingConcep_UUID,
  covidOutcomeUUID,
  covidEncounterDateTime_UUID,
  covidSymptomsPresentation,
} from '../../constants';

import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
} from '../../components/encounter-list/encounter-list.component';

export const covidFormSlot = 'hts-encounter-form-slot';
export const covidEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

interface CovidAssessmentWidgetProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'encounterDate',
    header: 'Date of Assessment',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidEncounterDateTime_UUID, true);
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
    header: 'Presentation',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidSymptomsPresentation, false);
    },
  },
  {
    key: 'outcome',
    header: 'Outcome',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidOutcomeUUID);
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
        label: 'View Assessment',
        mode: 'view',
      },
      {
        form: { name: 'covid_assessment', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'View Case',
        mode: 'view',
      },
      {
        form: { name: 'covid_assessment', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Edit Assessment',
        mode: 'edit',
      },
      {
        form: { name: 'covid_case', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Edit Case',
        mode: 'edit',
      },
      {
        form: { name: 'covid_outcome', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Add/Edit Outcome',
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
      dropdownText="Add"
    />
  );
};

export default CovidAssessment;
