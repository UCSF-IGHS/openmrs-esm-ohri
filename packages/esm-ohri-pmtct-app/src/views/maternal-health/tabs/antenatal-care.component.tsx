import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EmptyStateComingSoon,
  EncounterList,
  EncounterListColumn,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { antenatalEncounterType, pTrackerIdConcept } from '../../../constants';
import { moduleName } from '../../../index';

interface AntenatalCareListProps {
  patientUuid: string;
}

const AntenatalCareList: React.FC<AntenatalCareListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('antenatal_care_header', 'Antenatal Care');
  const displayText = t('antenatal_care_display', 'Antenatal Care');

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'pTrackerId',
        header: t('pTrackerId', 'PTracker Id'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, pTrackerIdConcept);
        },
      },
      {
        key: 'visitDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '', true);
        },
      },
      {
        key: 'hivTestResults',
        header: t('hivTestResults', 'HIV Test Results'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '');
        },
      },
      {
        key: 'artNo',
        header: t('artNo', 'ART Unique Number'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '');
        },
      },
      {
        key: 'arvLinkage',
        header: t('arvLinkage', 'ARV linkage (if positive)'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '');
        },
      },
      {
        key: 'currentTrimester',
        header: t('currentTrimester', 'Current Trimester'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '');
        },
      },
      {
        key: 'facility',
        header: t('facility', 'Facility'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '');
        },
      },
      {
        key: 'followUpDate',
        header: t('followUpDate', 'Next follow-up date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '');
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'antenatal', package: 'maternal_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'antenatal', package: 'maternal_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('editForm', 'Edit Form'),
            mode: 'edit',
          },
        ],
      },
    ],
    [],
  );

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={antenatalEncounterType}
      form={{ package: 'maternal_health', name: 'antenatal' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: t('add', 'Add'),
        moduleName: moduleName,
      }}
    />
  );
};

export default AntenatalCareList;
