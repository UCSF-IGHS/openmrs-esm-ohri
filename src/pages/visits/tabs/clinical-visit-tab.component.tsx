import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
} from '../../../components/encounter-list/encounter-list.component';
import {
  clinicalVisitEncounterType,
  dateOfEncounterConcept,
  expressCareProgramStatusConcept,
  regimenConcept,
  returnVisitDateConcept,
  visitTypeConcept,
} from '../../../constants';

interface ClinicalVisitListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'visitDate',
    header: 'Visit Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, dateOfEncounterConcept, true);
    },
    link: {
      getUrl: encounter => encounter.url,
      handleNavigate: encounter => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
  {
    key: 'visitType',
    header: 'Visit Type',
    getValue: encounter => {
      return getObsFromEncounter(encounter, visitTypeConcept);
    },
  },
  {
    key: 'regimen',
    header: 'Regimen',
    getValue: encounter => {
      return getObsFromEncounter(encounter, regimenConcept);
    },
  },
  {
    key: 'differentiatedCareService',
    header: 'Differentiated Care Service',
    getValue: encounter => {
      return getObsFromEncounter(encounter, expressCareProgramStatusConcept);
    },
  },
  {
    key: 'nextAppointmentDate',
    header: 'Next Appointment Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, returnVisitDateConcept, true);
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

const ClinicalVisitList: React.FC<ClinicalVisitListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('clinicalVisit', 'Clinical Visit');
  const displayText = t('clinicalVisit', 'Clinical Visit');

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

export default ClinicalVisitList;
