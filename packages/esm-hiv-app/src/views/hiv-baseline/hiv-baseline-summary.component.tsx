import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getObsFromEncounter,
  MultipleEncounterList,
  MultipleEncounterListColumn,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  artTherapyDateTime_UUID,
  art_Therapy_EncounterUUID,
  careAndTreatmentEncounterType,
  clinicalVisitEncounterType,
  dateOfHIVDiagnosisConcept,
  dateOfServiceEnrollmentConcept,
  tbScreeningOutcome,
} from '../../constants';

interface HivBaselineTabListProps {
  patientUuid: string;
}

const HivBaselineTabList: React.FC<HivBaselineTabListProps> = ({ patientUuid }) => {
  const encounters: Array<string> = [
    careAndTreatmentEncounterType,
    art_Therapy_EncounterUUID,
    clinicalVisitEncounterType,
  ];

  const { t } = useTranslation();

  const columns: MultipleEncounterListColumn[] = useMemo(
    () => [
      {
        key: 'hivDiagnosisDate',
        header: t('hivDiagnosisDate', 'HIV Diagnosis Date'),
        getValue: (encounters) => {
          return getObsFromEncounter(encounters[careAndTreatmentEncounterType], dateOfHIVDiagnosisConcept, true);
        },
      },
      {
        key: 'enrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        getValue: (encounters) => {
          return getObsFromEncounter(encounters[careAndTreatmentEncounterType], dateOfServiceEnrollmentConcept, true);
        },
      },
      {
        key: 'artStartDate',
        header: t('artStartDate', 'ART Start Date'),
        getValue: (encounters) => {
          return getObsFromEncounter(encounters[art_Therapy_EncounterUUID], artTherapyDateTime_UUID, true);
        },
      },
      {
        key: 'tbScreening',
        header: t('tbScreening', 'Current TB Screening'),
        getValue: (encounters) => {
          return getObsFromEncounter(encounters[clinicalVisitEncounterType], tbScreeningOutcome);
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
