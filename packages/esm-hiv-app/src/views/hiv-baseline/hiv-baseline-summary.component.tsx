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

  const config = useConfig();

  const encounters: Array<string> = [
    config.encounterTypes.careAndTreatmentEncounterType,
    config.encounterTypes.art_Therapy_EncounterUUID,
    config.encounterTypes.clinicalVisitEncounterType,
  ];
  const columns: MultipleEncounterListColumn[] = useMemo(
    () => [
      {
        key: 'hivDiagnosisDate',
        header: t('hivDiagnosisDate', 'HIV Diagnosis Date'),
        getValue: (encounters) => {
          return getObsFromEncounter(
            encounters[config.encounterTypes.careAndTreatmentEncounterType],
            config.obsConcepts.dateOfHIVDiagnosisConcept,
            true,
          );
        },
      },
      {
        key: 'enrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        getValue: (encounters) => {
          return getObsFromEncounter(
            encounters[config.encounterTypes.careAndTreatmentEncounterType],
            config.obsConcepts.dateOfServiceEnrollmentConcept,
            true,
          );
        },
      },
      {
        key: 'artStartDate',
        header: t('artStartDate', 'ART Start Date'),
        getValue: (encounters) => {
          return getObsFromEncounter(
            encounters[config.encounterTypes.art_Therapy_EncounterUUID],
            config.obsConcepts.artTherapyDateTime_UUID,
            true,
          );
        },
      },
      {
        key: 'tbScreening',
        header: t('tbScreening', 'Current TB Screening'),
        getValue: (encounters) => {
          return getObsFromEncounter(
            encounters[config.encounterTypes.clinicalVisitEncounterType],
            config.obsConcepts.tbScreeningOutcome,
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
