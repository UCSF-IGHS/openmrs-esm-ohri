import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  ancHivResultConcept,
  artInitiationConcept,
  birthCountConcept,
  bookedForAncConcept,
  labourAndDeliveryEncounterType,
  pTrackerIdConcept,
  visitDateConcept,
} from '../../../constants';
import { moduleName } from '../../../index';

interface LabourDeliveryListProps {
  patientUuid: string;
}

const LabourDeliveryList: React.FC<LabourDeliveryListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('labourAndDelivery', 'Labour and Delivery');

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
        key: 'deliveryDate',
        header: t('deliveryDate', 'Delivery Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, visitDateConcept, true);
        },
      },
      {
        key: 'bookedForANC',
        header: t('bookedForANC', 'Booked for ANC'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, bookedForAncConcept);
        },
      },
      {
        key: 'hivTestResults',
        header: t('hivTestResults', 'HIV Test Results'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, ancHivResultConcept);
        },
      },
      {
        key: 'artInitiation',
        header: t('artInitiation', 'ART Initiation'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, artInitiationConcept);
        },
      },
      {
        key: 'birthCount',
        header: t('birthCount', 'Birth Count'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, birthCountConcept);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'labour_and_delivery', package: 'maternal_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'labour_and_delivery', package: 'maternal_health' },
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
      encounterUuid={labourAndDeliveryEncounterType}
      form={{ package: 'maternal_health', name: 'labour_and_delivery' }}
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

export default LabourDeliveryList;
