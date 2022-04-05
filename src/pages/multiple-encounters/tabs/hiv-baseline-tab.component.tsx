import React from 'react';
import { useTranslation } from 'react-i18next';
import { getObsFromEncounter } from '../../../components/encounter-list/encounter-list.component';
import MultipleEncounterList, {
  MultipleEncounterListColumn,
} from '../../../components/encounter-list/multiple-encounter-list.component';
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
      return getObsFromEncounter(encounters['7e54cd64-f9c3-11eb-8e6a-57478ce139b0'], dateOfHIVDiagnosisConcept, true);
    },
  },
  {
    key: 'enrollmentDate',
    header: 'Enrollment Date',
    getValue: encounter => {
      return getObsFromEncounter(
        encounter['7e54cd64-f9c3-11eb-8e6a-57478ce139b0'],
        dateOfServiceEnrollmentConcept,
        true,
      );
    },
  },
  {
    key: 'artStartDate',
    header: 'ART Start Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter['74bf4fe6-8fdb-4228-be39-680a93a9cf6d'], artTherapyDateTime_UUID, true);
    },
  },
  {
    key: 'tbScreening',
    header: 'Current TB Screening',
    getValue: encounter => {
      return getObsFromEncounter(encounter['cb0a65a7-0587-477e-89b9-cf2fd144f1d4'], tbScreeningOutcome, true);
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
