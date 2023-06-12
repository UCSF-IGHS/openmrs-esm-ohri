import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  LittleInterestConcept_UUID,
  DepressionConcept_UUID,
  PoorAppetiteConcept_UUID,
  PoorConcentrationConcept_UUID,
  MentalHealthAssessmentEncounter_UUID,
  screeningDate_UUID,
} from '../../../constants';
import { moduleName } from '../../../index';

interface MentalHealthAssessmentListProps {
  patientUuid: string;
}

const MentalHealthAssessmentList: React.FC<MentalHealthAssessmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'screeningDate',
        header: t('screeningDate', 'Screening Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, screeningDate_UUID, true);
        },
      },
      {
        key: 'littleInterest',
        header: t('littleInterest', 'Disinterested in Things'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, LittleInterestConcept_UUID);
        },
      },
      {
        key: 'depressed',
        header: t('depressed', 'Depressed'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, DepressionConcept_UUID);
        },
      },
      {
        key: 'appetite',
        header: t('poorAppetite', 'Poor Appetite'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PoorAppetiteConcept_UUID);
        },
      },
      {
        key: 'concentration',
        header: t('concentrationProblems', 'Concentration Problems'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PoorConcentrationConcept_UUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'mental_health_assessment', package: 'hiv' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: 'View Details',
            mode: 'view',
          },
          {
            form: { name: 'mental_health_assessment', package: 'hiv' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: 'Edit Form',
            mode: 'edit',
          },
        ],
      },
    ],
    [],
  );

  const headerTitle = t('mentalHealthAssessmentTitle', 'Mental Health Assessment');
  const displayText = t('mentalHealthAssessmentDisplay', 'Mental Health Assessment');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={MentalHealthAssessmentEncounter_UUID}
      formList={[{ name: 'Mental Health Assessment Form' }]}
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

export default MentalHealthAssessmentList;
