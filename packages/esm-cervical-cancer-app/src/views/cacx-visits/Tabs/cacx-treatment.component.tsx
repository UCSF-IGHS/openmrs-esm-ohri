import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon, EncounterList, EncounterListColumn, getObsFromEncounter } from 'openmrs-esm-ohri-commons-lib';
import { cacxEncounterDateConcept, screeningMethodConcept, cacxTreatmentConcept, cacxTreatmentEncounterType_UUID, colopsyResultsConcept } from '../../../constants';

interface CacxTreatmentListProps {
  patientUuid: string;
}

const columnsLab: EncounterListColumn[] = [
  {
    key: 'encounterDate',
    header: 'Visit Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, cacxEncounterDateConcept, true);
    },
  },
  {
    key: 'screeningMethod',
    header: 'Screening Method',
    getValue: encounter => {
      return getObsFromEncounter(encounter, screeningMethodConcept);
    },
  },
  {
    key: 'colopsyResult',
    header: 'Screening Results',
    getValue: encounter => {
      return getObsFromEncounter(encounter, colopsyResultsConcept);
    },
  },
  {
    key: 'cacxTreatment',
    header: 'Cacx Treatment',
    getValue: encounter => {
      return getObsFromEncounter(encounter, cacxTreatmentConcept);
    },
  },

  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      const baseActions = [
        {
          form: { name: 'cacx_treatment_form', package: 'cacx' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'cacx_treatment_form', package: 'cacx' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'Edit Form',
          mode: 'edit',
        },
      ];
      return baseActions;
    },
  },
];

const CacxTreatmentList: React.FC<CacxTreatmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cacx treatment', 'CaCx Treatment');
  const displayText = t('cacx treatment', 'CaCx Treatment');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={cacxTreatmentEncounterType_UUID}
      form={{ package: 'cacx', name: 'cacx_treatment_form' }}
      columns={columnsLab}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default CacxTreatmentList;
