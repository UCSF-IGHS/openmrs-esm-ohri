import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';

import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface PatientTracingListProps {
  patientUuid: string;
}

const PatientTracingList: React.FC<PatientTracingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'contactDate',
        header: t('contactDate', 'Contact Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.ContactDate_UUID, true);
        },
      },
      {
        key: 'contactMethod',
        header: t('contactMethod', 'Contact Method'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.ContactMethod_UUID);
        },
      },
      {
        key: 'contactOutcome',
        header: t('contactOutcome', 'Contact Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.ContactOutcome_UUID);
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: config.formNames.PatientTracingFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'View Details',
              mode: 'view',
            },
            {
              form: { name: config.formNames.PatientTracingFormName, package: 'hiv' },
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

  const headerTitle = t('patientTracing', 'Patient Tracing');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={config.encounterTypes.PatientTracingEncounterType_UUID}
      formList={[{ name: config.formNames.PatientTracingFormName }]}
      columns={columnsLab}
      description={headerTitle}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default PatientTracingList;
