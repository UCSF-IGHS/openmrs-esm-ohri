import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterList,
  EncounterListColumn,
  PatientChartProps,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../..';
import {
  childDateOfBirth,
  artProphylaxisStatus,
  birthCountConcept,
  infantStatusAtBirthConcept,
  labourAndDeliveryEncounterType,
  pTrackerIdConcept,
} from '../../../constants';
import { getAncVisitCount } from '../../../api/api';

const PreviousPregnancies: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('previousPregnancies', 'Previous Pregnancies');

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
        key: 'ancVisits',
        header: t('ancVisits', 'ANC visits'),
        getValue: (encounter) => {
          let pTrackerId = getObsFromEncounter(encounter, pTrackerIdConcept);
          return getAncVisitCount(pTrackerId, patientUuid).then((response) => {
            return response.data.rows[0].total;
          });
        },
      },
      {
        key: 'deliveryDate',
        header: t('deliveryDate', 'Delivery Date"'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, childDateOfBirth, true);
        },
      },
      {
        key: 'statusAtBirth',
        header: t('statusAtBirth', 'Status at birth'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, infantStatusAtBirthConcept);
        },
      },
      {
        key: 'arvLinkage',
        header: t('arvLinkage', 'ARV linkage'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, artProphylaxisStatus);
        },
      },
      {
        key: 'birthCount',
        header: t('birthCount', 'Birth count'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, birthCountConcept);
        },
      },
      {
        key: 'pregancyOutcome',
        header: t('pregancyOutcome', 'Pregnancy outcome'),
        getValue: (encounter) => {
          return encounter.location.name;
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'Labour & Delivery Form', package: 'maternal_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View details'),
            mode: 'view',
          },
          {
            form: { name: 'Labour & Delivery Form', package: 'maternal_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('editForm', 'Edit form'),
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
      encounterType={labourAndDeliveryEncounterType}
      // TODO: replace with form name as configured in the backend.
      formList={[{ name: 'Labour & Delivery Form' }]}
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

export default PreviousPregnancies;
