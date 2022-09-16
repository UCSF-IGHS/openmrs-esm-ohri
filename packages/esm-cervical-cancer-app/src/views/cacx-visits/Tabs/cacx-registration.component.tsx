import React, { useEffect, useMemo, useState } from 'react';
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

const CacxRegistrationList: React.FC<CacxRegistrationListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'screeningDate',
        header: t('visitDate', 'Visit Date'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, cervicalCancerScreeningDateConcept, true);
        },
      },
      {
        key: 'previouslyScreened',
        header: t('previouslyScreened', 'Previously Screened for CaCx'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, previouslyScreenedConcept);
        },
      },
      {
        key: 'eligibleforScreening',
        header: t('eligibleforScreening', 'Eligible for CaCx Screening'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, eligibleForScreeningConcept);
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: encounter => {
          const baseActions = [
            {
              form: { name: 'cacx_registration_form', package: 'cacx' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'cacx_registration_form', package: 'cacx' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('EditForm', 'Edit Form'),
              mode: 'edit',
            },
          ];
          return baseActions;
        },
      },
    ],
    [],
  );

  const headerTitle = t('cacx_registration_header', 'CaCx Registration');
  const displayText = t('cacx_registration_display', 'CaCx Registration');

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
