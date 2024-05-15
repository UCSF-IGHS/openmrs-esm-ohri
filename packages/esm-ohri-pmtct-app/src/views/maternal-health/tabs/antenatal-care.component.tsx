import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface AntenatalCareListProps {
  patientUuid: string;
}

const AntenatalCareList: React.FC<AntenatalCareListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const headerTitle = t('antenatalCare', 'Antenatal Care');
  const { encounterTypes, formNames, formUuids } = useConfig();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'pTrackerId',
        header: t('pTrackerId', 'PTracker Id'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.pTrackerIdConcept);
        },
      },
      {
        key: 'visitDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.visitDateConcept, true);
        },
      },
      {
        key: 'hivTestStatus',
        header: t('hivTestStatus', 'HIV Test Status'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.hivTestStatus);
        },
      },
      {
        key: 'artLinkage',
        header: t('artLinkage', 'ART linkage (if positive)'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.artInitiationConcept);
        },
      },
      {
        key: 'edd',
        header: t('edd', 'EDD'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.eDDConcept, true);
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
          return getObsFromEncounter(encounter, config.obsConcepts.followUpDateConcept, true);
        },
      },
      {
        key: 'vlResults',
        header: t('vlResults', 'VL Results'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.vLResultsConcept);
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
      encounterType={encounterTypes.antenatal.ANCEncounterTypeUUID}
      formList={[{ name: formNames.antenatal, uuid: formUuids.antenatal }]}
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
