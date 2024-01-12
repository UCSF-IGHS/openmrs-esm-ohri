import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';

import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface MentalHealthAssessmentListProps {
  patientUuid: string;
}

const MentalHealthAssessmentList: React.FC<MentalHealthAssessmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames } = useConfig();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'screeningDate',
        header: t('screeningDate', 'Screening Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.dateOfEventConcept, true);
        },
      },
      {
        key: 'littleInterest',
        header: t('littleInterest', 'Disinterested in Things'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.LittleInterestConcept_UUID);
        },
      },
      {
        key: 'depressed',
        header: t('depressed', 'Depressed'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.DepressionConcept_UUID);
        },
      },
      {
        key: 'appetite',
        header: t('poorAppetite', 'Poor Appetite'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.PoorAppetiteConcept_UUID);
        },
      },
      {
        key: 'concentration',
        header: t('concentrationProblems', 'Concentration Problems'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.PoorConcentrationConcept_UUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: formNames.MentalHealthFormName, package: 'hiv' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: 'View Details',
            mode: 'view',
          },
          {
            form: { name: formNames.MentalHealthFormName, package: 'hiv' },
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

  const mentalHealthFilter = (encounter) => {
    return encounter?.form?.name === formNames.MentalHealthFormName;
  };

  return (
    <EncounterList
      patientUuid={patientUuid}
      filter={mentalHealthFilter}
      encounterType={encounterTypes.MentalHealthAssessmentEncounter_UUID}
      formList={[{ name: formNames.MentalHealthFormName }]}
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
