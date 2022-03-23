import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';
import EncounterList, {
  EncounterListColumn,
  findObs,
  getObsFromEncounter,
} from '../../../components/encounter-list/encounter-list.component';
import {
  dateOfServiceEnrollmentConcept,
  studyPopulationTypeConcept,
  dateOfHIVDiagnosisConcept,
  careAndTreatmentEncounterType,
  entryPointConcept,
  patientTypeEnrollmentConcept,
  re_enrolmentDateConcept,
  otherEntryPoint,
} from '../../../constants';

interface HIVEnrolmentTabListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'date',
    header: 'Enrollment/Re-enrollment Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, re_enrolmentDateConcept, true) !== '--'
        ? getObsFromEncounter(encounter, re_enrolmentDateConcept, true)
        : getObsFromEncounter(encounter, dateOfServiceEnrollmentConcept, true);
    },
  },
  {
    key: 'clientDescription',
    header: 'Patient Type at Enrollment',
    getValue: encounter => {
      return getObsFromEncounter(encounter, patientTypeEnrollmentConcept);
    },
  },
  {
    key: 'dateConfirmedPositive',
    header: 'Date Confirmed HIV Positive',
    getValue: encounter => {
      return getObsFromEncounter(encounter, dateOfHIVDiagnosisConcept, true);
    },
  },
  {
    key: 'entryPoint',
    header: 'Entry Point',
    getValue: encounter => {
      const obs = findObs(encounter, entryPointConcept);
      if (typeof obs !== undefined && obs) {
        if (typeof obs.value === 'object') {
          if (obs !== undefined) {
            const EntryPoint =
              obs.value.names?.find(conceptName => conceptName.conceptNameType === 'SHORT')?.name ||
              obs.value.name.name;
            if (EntryPoint === 'Other non-coded') {
              return getObsFromEncounter(encounter, otherEntryPoint);
            }
          }
        }
      }
      return getObsFromEncounter(encounter, entryPointConcept);
    },
  },
  {
    key: 'populationType',
    header: 'Population Type',
    getValue: encounter => {
      return getObsFromEncounter(encounter, studyPopulationTypeConcept);
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
