import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getObsFromEncounter,
  MultipleEncounterList,
  MultipleEncounterListColumn,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';

interface HivBaselineTabListProps {
  patientUuid: string;
}

const HivBaselineTabList: React.FC<HivBaselineTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const { obsConcepts, encounterTypes } = useConfig();

  const encounters: Array<string> = [
    encounterTypes.careAndTreatmentEncounterType,
    encounterTypes.art_Therapy_EncounterUUID,
    encounterTypes.clinicalVisitEncounterType,
  ];
  const columns: MultipleEncounterListColumn[] = useMemo(
    () => [
      {
        key: 'hivDiagnosisDate',
        header: t('hivDiagnosisDate', 'HIV Diagnosis Date'),
        getValue: (encounters) => {
          return getObsFromEncounter(
            encounters[encounterTypes.careAndTreatmentEncounterType],
            obsConcepts.dateOfHIVDiagnosisConcept,
            true,
          );
        },
      },
      {
        key: 'enrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        getValue: (encounters) => {
          return getObsFromEncounter(
            encounters[encounterTypes.careAndTreatmentEncounterType],
            obsConcepts.dateOfServiceEnrollmentConcept,
            true,
          );
        },
      },
      {
        key: 'artStartDate',
        header: t('artStartDate', 'ART Start Date'),
        getValue: (encounters) => {
          return getObsFromEncounter(
            encounters[encounterTypes.art_Therapy_EncounterUUID],
            obsConcepts.artTherapyDateTime_UUID,
            true,
          );
        },
      },
      {
        key: 'tbScreening',
        header: t('tbScreening', 'Current TB Screening'),
        getValue: (encounters) => {
          return getObsFromEncounter(
            encounters[encounterTypes.clinicalVisitEncounterType],
            obsConcepts.tbScreeningOutcome,
          );
        },
      },
    ],
    [],
  );

  const headerTitle = t('hivBaseline', 'HIV Baseline');

  return (
    <MultipleEncounterList
      patientUuid={patientUuid}
      encounterTypeUuids={encounters}
      columns={columns}
      description={headerTitle}
      headerTitle={headerTitle}
    />
  );
};

export default HivBaselineTabList;
