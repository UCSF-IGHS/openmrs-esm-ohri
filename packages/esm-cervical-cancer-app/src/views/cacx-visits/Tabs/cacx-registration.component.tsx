import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from 'openmrs-esm-ohri-commons-lib';
import {
  cacxRegistrationEncounterType_UUID,
  cervicalCancerScreeningDateConcept,
  eligibleForScreeningConcept,
  previouslyScreenedConcept,
} from '../../../constants';

interface CacxRegistrationListProps {
  patientUuid: string;
}

const columnsLab: EncounterListColumn[] = [
  {
    key: 'screeningDate',
    header: 'Visit Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, cervicalCancerScreeningDateConcept, true);
    },
  },
  {
    key: 'previouslyScreened',
    header: 'Previously Screened for CaCx',
    getValue: encounter => {
      return getObsFromEncounter(encounter, previouslyScreenedConcept);
    },
  },
  {
    key: 'eligibleforScreening',
    header: 'Eligible for CaCx Screening',
    getValue: encounter => {
      return getObsFromEncounter(encounter, eligibleForScreeningConcept);
    },
  },

  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      const baseActions = [
        {
          form: { name: 'cacx_registration_form', package: 'cacx' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'cacx_registration_form', package: 'cacx' },
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

const CacxRegistrationList: React.FC<CacxRegistrationListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cacx-registration', 'CaCx Registration');
  const displayText = t('cacx-registration', 'CaCx Registration');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={cacxRegistrationEncounterType_UUID}
      form={{ package: 'cacx', name: 'cacx_registration_form' }}
      columns={columnsLab}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default CacxRegistrationList;
