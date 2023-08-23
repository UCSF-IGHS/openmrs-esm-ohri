import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
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
import { useConfig } from '@openmrs/esm-framework';

interface AntenatalCareListProps {
  patientUuid: string;
}

const AntenatalCareList: React.FC<AntenatalCareListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('antenatalCare', 'Antenatal Care');
  const ANCEncounterTypeUUID = useConfig().encounterTypes.antenatal;

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
        key: 'artLinkage',
        header: t('artLinkage', 'ART linkage (if positive)'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, artInitiationConcept);
        },
      },
      {
        key: 'edd',
        header: t('edd', 'EDD'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, eDDConcept, true);
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
            form: { name: 'Antenatal Form', package: 'maternal_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'Antenatal Form', package: 'maternal_health' },
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
      encounterType={ANCEncounterTypeUUID}
      formList={[{ name: 'Antenatal Form' }]}
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
