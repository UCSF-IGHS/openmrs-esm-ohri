import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  pTrackerIdConcept,
  visitDate,
  hivTestStatus,
  artLinkage,
  recenctViralLoad,
  infantPostnatalEncounterType,
} from '../../../constants';
import { moduleName } from '../../..';

interface InfantPostnatalListProps {
  patientUuid: string;
}

const InfantPostnatalList: React.FC<InfantPostnatalListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('infant_postnatal_care_header', 'Infant Postnatal Care');
  const displayText = t('infant_postnatal_care_display', 'Infant Postnatal Care');

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
        key: 'bookedForANC',
        header: t('bookedForANC', 'Booked for ANC'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, visitDate, true);
        },
      },
      {
        key: 'ancHivStatus',
        header: t('ancHivStatus', 'ANC HIV status results'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, hivTestStatus);
        },
      },
      {
        key: 'artInitiation',
        header: t('artInitiation', 'ART Initiation'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, artLinkage);
        },
      },
      {
        key: 'birthCount',
        header: t('birthCount', 'Birth Count'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, recenctViralLoad);
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
      encounterUuid={infantPostnatalEncounterType}
      form={{ package: 'child_health', name: 'infant_postnatal' }}
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

export default InfantPostnatalList;
