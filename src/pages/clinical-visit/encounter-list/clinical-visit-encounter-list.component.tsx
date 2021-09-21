import React from 'react';
import {
  clinicalVisitEncounterType,
  dateOfEncounterConcept,
  expressCareProgramStatusConcept,
  regimenConcept,
  returnVisitDateConcept,
  visitTypeConcept,
} from '../../../constants';
import EncounterList, { EncounterListColumn } from '../../../components/encounter-list/encounter-list.component';

interface ClinicalVisitWidgetProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    conceptUuid: dateOfEncounterConcept,
    key: 'visitDate',
    header: 'Visit Date',
    getValue: encounter => {
      return 'visit date';
    },
  },
  {
    conceptUuid: visitTypeConcept,
    key: 'visitType',
    header: 'Visit Type',
    getValue: encounter => {
      return 'visit type';
    },
  },
  {
    conceptUuid: regimenConcept,
    key: 'regimen',
    header: 'Regimen',
    getValue: encounter => {
      return 'regimen';
    },
  },
  {
    conceptUuid: expressCareProgramStatusConcept,
    key: 'differentiatedCareService',
    header: 'Differentiated Care Service',
    getValue: encounter => {
      return 'care service';
    },
  },
  {
    conceptUuid: returnVisitDateConcept,
    key: 'nextAppointmentDate',
    header: 'Next Appointment Date',
    getValue: encounter => {
      return 'next appointment';
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      return encounter.actions;
    },
  },
];

const ClinicalVisitWidget: React.FC<ClinicalVisitWidgetProps> = ({ patientUuid }) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={clinicalVisitEncounterType}
      form={{ package: 'hiv', name: 'clinical_visit' }}
      columns={columns}
      description="clinical visit encounters"
      headerTitle="Clinical Visits"
    />
  );
};

export default ClinicalVisitWidget;
