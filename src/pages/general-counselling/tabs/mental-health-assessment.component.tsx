import React from 'react';
import { useTranslation } from 'react-i18next';
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
} from '../../../components/encounter-list/encounter-list.component';
import {
  DepressionConcept_UUID,
  LittleInterestConcept_UUID,
  MentalHealthAssessmentEncounter_UUID,
  PoorAppetiteConcept_UUID,
  PoorConcentrationConcept_UUID,
} from '../../../constants';

interface MentalHealthAssessmentListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'littleInterest',
    header: 'Disinterested in Things',
    getValue: encounter => {
      return getObsFromEncounter(encounter, LittleInterestConcept_UUID);
    },
  },
  {
    key: 'depressed',
    header: 'Depressed',
    getValue: encounter => {
      return getObsFromEncounter(encounter, DepressionConcept_UUID);
    },
  },
  {
    key: 'appetite',
    header: 'Poor Appetite',
    getValue: encounter => {
      return getObsFromEncounter(encounter, PoorAppetiteConcept_UUID);
    },
  },
  {
    key: 'concentration',
    header: 'Concentration Problems',
    getValue: encounter => {
      return getObsFromEncounter(encounter, PoorConcentrationConcept_UUID);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => [
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
        label: 'Edit',
        mode: 'edit',
      },
    ],
  },
];

const MentalHealthAssessmentList: React.FC<MentalHealthAssessmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('mentalHealthAssessment', 'Mental Health Assessment');
  const displayText = t('mentalHealthAssessment', 'Mental Health Assessment');

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
