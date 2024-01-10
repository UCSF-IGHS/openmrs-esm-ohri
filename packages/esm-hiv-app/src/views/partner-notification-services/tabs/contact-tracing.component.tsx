import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';

import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface ContactTracingListProps {
  patientUuid: string;
}

const ContactTracingList: React.FC<ContactTracingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames } = useConfig();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'contactDate',
        header: t('contactDate', 'Contact Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.ContactTracingDate_UUID, true);
        },
      },
      {
        key: 'contactMethod',
        header: t('contactMethod', 'Contact Method'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.ContactTracingMethod_UUID);
        },
      },
      {
        key: 'contactOutcome',
        header: t('contactOutcome', 'Contact Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.ContactTracingOutcome_UUID);
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: formNames.ContactTracingFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'View Details',
              mode: 'view',
            },
            {
              form: { name: formNames.ContactTracingFormName, package: 'hiv' },
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

  const headerTitle = t('contactTracing', 'Contact Tracing');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={encounterTypes.ContactTracingEncounterType_UUID}
      formList={[{ name: formNames.ContactTracingFormName }]}
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

export default ContactTracingList;
