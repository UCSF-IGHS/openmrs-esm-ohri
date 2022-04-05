import React from 'react';
import { useTranslation } from 'react-i18next';
import EmptyStateComingSoon from '../../../components/empty-state/empty-state-comingsoon.component';
import { EncounterListColumn } from '../../../components/encounter-list/encounter-list.component';
import MultipleEncounterList, {
  getObsFromMultipleEncounters,
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

const columns: EncounterListColumn[] = [
  {
    key: 'hivDiagnosisDate',
    header: 'HIV Diagnosis Date',
    getValue: encounter => {
      return getObsFromMultipleEncounters(encounter, dateOfHIVDiagnosisConcept, true);
    },
  },
  {
    key: 'enrollmentDate',
    header: 'Enrollment Date',
    getValue: encounter => {
      return getObsFromMultipleEncounters(encounter, dateOfServiceEnrollmentConcept, true);
    },
  },
  {
    key: 'artStartDate',
    header: 'ART Start Date',
    getValue: encounter => {
      return getObsFromMultipleEncounters(encounter, artTherapyDateTime_UUID, true);
    },
  },
  {
    key: 'tbScreening',
    header: 'Current TB Screening',
    getValue: encounter => {
      return getObsFromMultipleEncounters(encounter, tbScreeningOutcome, true);
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
    // <>
    //   <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    // </>
    <MultipleEncounterList
      patientUuid={patientUuid}
      encounterUuids={encounters}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
    />
  );
};

export default HivBaselineTabList;
