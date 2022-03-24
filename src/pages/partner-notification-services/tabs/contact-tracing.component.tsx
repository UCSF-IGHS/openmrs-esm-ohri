import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
} from '../../../components/encounter-list/encounter-list.component';
import {
  ContactTracingDate_UUID,
  ContactTracingEncounterType_UUID,
  ContactTracingMethod_UUID,
  ContactTracingOutcome_UUID,
} from '../../../constants';

interface ContactTracingListProps {
  patientUuid: string;
}

const columnsLab: EncounterListColumn[] = [
  {
    key: 'contactDate',
    header: 'Contact Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, ContactTracingDate_UUID, true);
    },
  },
  {
    key: 'contactMethod',
    header: 'Contact Method',
    getValue: encounter => {
      return getObsFromEncounter(encounter, ContactTracingMethod_UUID);
    },
  },
  {
    key: 'contactOutcome',
    header: 'Contact Outcome',
    getValue: encounter => {
      return getObsFromEncounter(encounter, ContactTracingOutcome_UUID);
    },
  },

  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
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
          label: 'Edit Details',
          mode: 'edit',
        },
      ];
      return baseActions;
    },
  },
];

const ContactTracingList: React.FC<ContactTracingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('contactTracing', 'Contact Tracing');
  const displayText = t('contactTracing', 'Contact Tracing');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={ContactTracingEncounterType_UUID}
      form={{ package: 'hiv', name: 'contact_tracing' }}
      columns={columnsLab}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default ContactTracingList;
