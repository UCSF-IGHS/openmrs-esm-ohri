import React from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  clinicalVisitEncounterType,
  dateOfEncounterConcept,
  returnVisitDateConcept,
  tbScreeningOutcome,
  visitTypeConcept,
} from '../../../constants';
import { moduleName } from '../../../index';

interface ClinicalVisitListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'visitDate',
    header: 'Visit Date',
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, dateOfEncounterConcept, true);
    },
    link: {
      getUrl: (encounter) => encounter.url,
      handleNavigate: (encounter) => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
  {
    key: 'visitType',
    header: 'Visit Type',
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, visitTypeConcept);
    },
  },
  {
    key: 'screeningOutcome',
    header: 'TB Screening Outcome',
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, tbScreeningOutcome);
    },
  },
  {
    key: 'nextAppointmentDate',
    header: 'Next Appointment Date',
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, returnVisitDateConcept, true);
    },
  },
  {
    key: 'appointmentReason',
    header: 'Appointment Reason',
    getValue: (encounter) => {
      return '--';
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: (encounter) => {
      const baseActions = [
        {
          form: { name: 'clinical_visit', package: 'hiv' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'clinical_visit', package: 'hiv' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'Edit Form',
          mode: 'edit',
        },
      ];
      return baseActions;
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
      headerTitle={headerTitle}
      launchOptions={{
        moduleName: moduleName,
      }}
    />
  );
};

export default ClinicalVisitList;
