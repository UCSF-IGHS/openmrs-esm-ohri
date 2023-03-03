import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  antenatalEncounterType,
  artInitiationConcept,
  artNoConcept,
  eDDConcept,
  followUpDateConcept,
  hivTestResultConcept,
  pTrackerIdConcept,
  visitDateConcept,
  vLResultsConcept,
} from '../../../constants';
import { moduleName } from '../../../index';
import { getEstimatedDeliveryDate } from '../../../api/api';

interface AntenatalCareListProps {
  patientUuid: string;
}

const AntenatalCareList: React.FC<AntenatalCareListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('antenatalCare', 'Antenatal Care');

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
          return getObsFromEncounter(encounter, visitDateConcept, true);
        },
      },
      {
        key: 'hivTestResults',
        header: t('hivTestResults', 'HIV Test Results'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, hivTestResultConcept);
        },
      },
      {
        key: 'artNo',
        header: t('artNo', 'ART Unique Number'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, artNoConcept);
        },
      },
      {
        key: 'artLinkage',
        header: t('artLinkage', 'ART linkage (if positive)'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, artInitiationConcept);
        },
      },
      {
        key: 'edd',
        header: t('edd', 'EDD'),
        getValue: async (encounter) => {
          const currentPTrackerId = getObsFromEncounter(encounter, pTrackerIdConcept);
          const edd = await getEstimatedDeliveryDate(patientUuid, currentPTrackerId);
          return edd.rows.length ? edd.rows[0].estimated_delivery_date : '---';
        },
      },
      {
        key: 'facility',
        header: t('facility', 'Facility'),
        getValue: (encounter) => {
          return encounter.location.name;
        },
      },
      {
        key: 'followUpDate',
        header: t('followUpDate', 'Next follow-up date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, followUpDateConcept, true);
        },
      },
      {
        key: 'vlResults',
        header: t('vlResults', 'VL Results'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, vLResultsConcept);
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
      description={headerTitle}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: t('add', 'Add'),
        moduleName: moduleName,
      }}
    />
  );
};

export default AntenatalCareList;
