import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from 'openmrs-esm-ohri-commons-lib';
import {
  ContactDate_UUID,
  ContactMethod_UUID,
  ContactOutcome_UUID,
  PatientTracingEncounterType_UUID,
} from '../../../constants';

interface PatientTracingListProps {
  patientUuid: string;
}

const columnsLab: EncounterListColumn[] = [
  {
    key: 'contactDate',
    header: 'Contact Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, ContactDate_UUID, true);
    },
  },
  {
    key: 'contactMethod',
    header: 'Contact Method',
    getValue: encounter => {
      return getObsFromEncounter(encounter, ContactMethod_UUID);
    },
  },
  {
    key: 'contactOutcome',
    header: 'Contact Outcome',
    getValue: encounter => {
      return getObsFromEncounter(encounter, ContactOutcome_UUID);
    },
  },

  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      const baseActions = [
        {
          form: { name: 'patient_tracing', package: 'hiv' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'patient_tracing', package: 'hiv' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'Edit Details',
          mode: 'edit',
        },
      ];
      return baseActions;
    },
  },
];

const PatientTracingList: React.FC<PatientTracingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('patientTracing', 'Patient Tracing');
  const displayText = t('patientTracing', 'Patient Tracing');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={PatientTracingEncounterType_UUID}
      form={{ package: 'hiv', name: 'patient_tracing' }}
      columns={columnsLab}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default PatientTracingList;
