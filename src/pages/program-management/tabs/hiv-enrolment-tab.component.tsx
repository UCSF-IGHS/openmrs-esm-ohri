import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
} from '../../../components/encounter-list/encounter-list.component';
import {
  dateOfServiceEnrollmentConcept,
  studyPopulationTypeConcept,
  dateOfHIVDiagnosisConcept,
  careAndTreatmentEncounterType,
} from '../../../constants';

interface HIVEnrolmentTabListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'date',
    header: 'Date of Service Enrolment',
    getValue: encounter => {
      return getObsFromEncounter(encounter, dateOfServiceEnrollmentConcept, true);
    },
  },
  {
    key: 'clientPopulationCategory',
    header: 'Population Category',
    getValue: encounter => {
      return getObsFromEncounter(encounter, studyPopulationTypeConcept);
    },
  },
  {
    key: 'diagnosticHivTestType',
    header: 'Date Confirmed Positive',
    getValue: encounter => {
      return getObsFromEncounter(encounter, dateOfHIVDiagnosisConcept, true);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => [
      {
        form: { name: 'service_enrolment', package: 'hiv' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'View Details',
        mode: 'view',
      },
      {
        form: { name: 'service_enrolment', package: 'hiv' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Edit',
        mode: 'edit',
      },
    ],
  },
];

const HIVEnrolmentTabList: React.FC<HIVEnrolmentTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('hivEnrolment', 'HIV Enrolment');
  const displayText = t('hivEnrolment', 'HIV Enrolment');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={careAndTreatmentEncounterType}
      form={{ package: 'hiv', name: 'service_enrolment' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default HIVEnrolmentTabList;
