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

interface MentalHealthAssessmentListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'screeningDate',
    header: 'Screening Date',
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, screeningDate_UUID, true);
    },
  },
  {
    key: 'littleInterest',
    header: 'Disinterested in Things',
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, LittleInterestConcept_UUID);
    },
  },
  {
    key: 'depressed',
    header: 'Depressed',
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, DepressionConcept_UUID);
    },
  },
  {
    key: 'appetite',
    header: 'Poor Appetite',
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, PoorAppetiteConcept_UUID);
    },
  },
  {
    key: 'concentration',
    header: 'Concentration Problems',
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, PoorConcentrationConcept_UUID);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
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
];

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
        header: t('appetite', 'Poor Appetite'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PoorAppetiteConcept_UUID);
        },
      },
      {
        key: 'concentration',
        header: t('concentration', 'Concentration Problems'),
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
      encounterUuid={MentalHealthAssessmentEncounter_UUID}
      form={{ package: 'hiv', name: 'mental_health_assessment' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default MentalHealthAssessmentList;
