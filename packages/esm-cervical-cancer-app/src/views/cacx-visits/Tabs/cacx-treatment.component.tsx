import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EmptyStateComingSoon,
  EncounterList,
  EncounterListColumn,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  cacxEncounterDateConcept,
  screeningMethodConcept,
  cacxTreatmentConcept,
  cacxTreatmentEncounterType_UUID,
  colopsyResultsConcept,
} from '../../../constants';

interface CacxTreatmentListProps {
  patientUuid: string;
}

const CacxTreatmentList: React.FC<CacxTreatmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'encounterDate',
        header: t('encounterDate', 'Visit Date'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, cacxEncounterDateConcept, true);
        },
      },
      {
        key: 'screeningMethod',
        header: t('screeningMethod', 'Screening Method'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, screeningMethodConcept);
        },
      },
      {
        key: 'colopsyResult',
        header: t('colopsyResult', 'Screening Results'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, colopsyResultsConcept);
        },
      },
      {
        key: 'cacxTreatment',
        header: t('cacxTreatment', 'Cacx Treatment'),
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
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'cacx_treatment_form', package: 'cacx' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('editForm', 'Edit Form'),
              mode: 'edit',
            },
          ];
          return baseActions;
        },
      },
    ],
    [],
  );

  const headerTitle = t('cacx_treatment_header', 'CaCx Treatment');
  const displayText = t('cacx_treatment_display', 'CaCx Treatment');

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
