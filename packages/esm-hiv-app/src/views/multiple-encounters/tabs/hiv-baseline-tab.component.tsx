import React from 'react';
import { useTranslation } from 'react-i18next';
import { getObsFromEncounter, MultipleEncounterList, MultipleEncounterListColumn } from 'openmrs-esm-ohri-commons-lib';
import {
  artTherapyDateTime_UUID,
  art_Therapy_EncounterUUID,
  careAndTreatmentEncounterType,
  clinicalVisitEncounterType,
  dateOfHIVDiagnosisConcept,
  dateOfServiceEnrollmentConcept,
  tbScreeningOutcome,
} from '../../../constants';

interface HivBaselineTabListProps {
  patientUuid: string;
}

const columns: MultipleEncounterListColumn[] = [
  {
    key: 'hivDiagnosisDate',
    header: 'HIV Diagnosis Date',
    getValue: encounters => {
      return getObsFromEncounter(encounters[careAndTreatmentEncounterType], dateOfHIVDiagnosisConcept, true);
    },
  },
  {
    key: 'enrollmentDate',
    header: 'Enrollment Date',
    getValue: encounters => {
      return getObsFromEncounter(encounters[careAndTreatmentEncounterType], dateOfServiceEnrollmentConcept, true);
    },
  },
  {
    key: 'artStartDate',
    header: 'ART Start Date',
    getValue: encounters => {
      return getObsFromEncounter(encounters[art_Therapy_EncounterUUID], artTherapyDateTime_UUID, true);
    },
  },
  {
    key: 'tbScreening',
    header: 'Current TB Screening',
    getValue: encounters => {
      return getObsFromEncounter(encounters[clinicalVisitEncounterType], tbScreeningOutcome);
    },
  },
];

const HivBaselineTabList: React.FC<HivBaselineTabListProps> = ({ patientUuid }) => {
  const encounters: Array<string> = [
    careAndTreatmentEncounterType,
    art_Therapy_EncounterUUID,
    clinicalVisitEncounterType,
  ];

  const { t } = useTranslation();

  const headerTitle = t('hivBaseline', 'HIV Baseline');
  const displayText = t('hivBaseline', 'HIV Baseline');

  return (
    <MultipleEncounterList
      patientUuid={patientUuid}
      encounterTypeUuids={encounters}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
    />
  );
};

export default HivBaselineTabList;
