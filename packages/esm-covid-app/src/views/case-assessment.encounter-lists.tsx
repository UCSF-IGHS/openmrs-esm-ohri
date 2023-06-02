import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { moduleName } from '../index';
import {
  covid_Assessment_EncounterUUID,
  covidReasonsForTestingConcep_UUID,
  covidOutcomeUUID,
  covidEncounterDateTime_UUID,
  covidSymptomsPresentation,
} from '../constants';
export const covidFormSlot = 'hts-encounter-form-slot';
export const covidEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

interface CovidAssessmentWidgetProps {
  patientUuid: string;
}

const CovidAssessment: React.FC<CovidAssessmentWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'encounterDate',
        header: t('encounterDate', 'Date of Assessment'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidEncounterDateTime_UUID, true);
        },
        link: {
          handleNavigate: (encounter) => {
            encounter.launchFormActions?.viewEncounter();
          },
        },
      },
      {
        key: 'reasonsForTesting',
        header: t('reasonsForTesting', 'Reason for testing'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidReasonsForTestingConcep_UUID);
        },
      },
      {
        key: 'symptomatic',
        header: t('symptomatic', 'Presentation'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidSymptomsPresentation, false);
        },
      },
      {
        key: 'outcome',
        header: t('outcome', 'Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidOutcomeUUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'covid_case', package: 'covid' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewAssessment', 'View Assessment'),
            mode: 'view',
          },
          {
            form: { name: 'covid_assessment', package: 'covid' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewAssessmentcase', 'View Case'),
            mode: 'view',
          },
          {
            form: { name: 'covid_assessment', package: 'covid' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('editAssessmentForm', 'Edit Assessment'),
            mode: 'edit',
          },
          {
            form: { name: 'covid_case', package: 'covid' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('editassessmentCase', 'Edit Case'),
            mode: 'edit',
          },
          {
            form: { name: 'covid_outcome', package: 'covid' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('addEditOutcome', 'Add/Edit Outcome'),
            mode: 'edit',
          },
        ],
      },
    ],
    [],
  );

  const headerTitle = t('covid_Assessments_Header', 'COVID Assessment');
  const displayText = t('covid_Assessments_Display', 'COVID Assessment');
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={covid_Assessment_EncounterUUID}
      formList={[
        { name: 'COVID Assessment Form', excludedIntents: ['COVID_LAB_ASSESSMENT_EMBED'] },
        { name: 'COVID Case Form', excludedIntents: [] },
      ]}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default CovidAssessment;
