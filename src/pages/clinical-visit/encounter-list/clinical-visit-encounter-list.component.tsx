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
import moment from 'moment';

interface ClinicalVisitWidgetProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'visitDate',
    header: 'Visit Date',
    getValue: encounter => {
      let visitDate = encounter.obs.find(observation => observation.concept.uuid === dateOfEncounterConcept);
      return visitDate ? moment(visitDate.value.name.name).format('DD-MMM-YYYY') : '--';
    },
  },
  {
    key: 'visitType',
    header: 'Visit Type',
    getValue: encounter => {
      let visitType = encounter.obs.find(observation => observation.concept.uuid === visitTypeConcept);
      return visitType ? visitType.value.name.name : '--';
    },
  },
  {
    key: 'regimen',
    header: 'Regimen',
    getValue: encounter => {
      let regimen = encounter.obs.find(observation => observation.concept.uuid === regimenConcept);
      return regimen ? regimen.value.name.name : '--';
    },
  },
  {
    key: 'differentiatedCareService',
    header: 'Differentiated Care Service',
    getValue: encounter => {
      let differentiatedCareService = encounter.obs.find(
        observation => observation.concept.uuid === expressCareProgramStatusConcept,
      );
      return differentiatedCareService ? differentiatedCareService.value.name.name : '--';
    },
  },
  {
    key: 'nextAppointmentDate',
    header: 'Next Appointment Date',
    getValue: encounter => {
      let nextAppointmentDate = encounter.obs.find(observation => observation.concept.uuid === returnVisitDateConcept);
      return nextAppointmentDate ? nextAppointmentDate.value.name.name : '--';
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
