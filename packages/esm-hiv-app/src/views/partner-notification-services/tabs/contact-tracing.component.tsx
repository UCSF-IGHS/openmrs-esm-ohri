import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  ContactTracingDate_UUID,
  ContactTracingEncounterType_UUID,
  ContactTracingMethod_UUID,
  ContactTracingOutcome_UUID,
} from '../../../constants';
import { moduleName } from '../../../index';

interface ContactTracingListProps {
  patientUuid: string;
}

const ContactTracingList: React.FC<ContactTracingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'contactDate',
        header: t('contactDate', 'Contact Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, ContactTracingDate_UUID, true);
        },
      },
      {
        key: 'contactMethod',
        header: t('contactMethod', 'Contact Method'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, ContactTracingMethod_UUID);
        },
      },
      {
        key: 'contactOutcome',
        header: t('contactOutcome', 'Contact Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, ContactTracingOutcome_UUID);
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'contact_tracing', package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'View Details',
              mode: 'view',
            },
            {
              form: { name: 'contact_tracing', package: 'hiv' },
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
      encounterUuid={ContactTracingEncounterType_UUID}
      form={{ package: 'hiv', name: 'contact_tracing' }}
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
