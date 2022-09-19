import React, { useEffect, useMemo, useState } from 'react';
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

const PatientTracingList: React.FC<PatientTracingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'contactDate',
        header: t('contactDate', 'Contact Date'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, ContactDate_UUID, true);
        },
      },
      {
        key: 'contactMethod',
        header: t('contactMethod', 'Contact Method'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, ContactMethod_UUID);
        },
      },
      {
        key: 'contactOutcome',
        header: t('contactOutcome', 'Contact Outcome'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, ContactOutcome_UUID);
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
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
              label: 'Edit Form',
              mode: 'edit',
            },
          ];
          return baseActions;
        },
      },
    ],
    [],
  );

  const headerTitle = t('patientTracingTitle', 'Patient Tracing');
  const displayText = t('patientTracingDisplay', 'Patient Tracing');

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
