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
import { ancVisitsReportCount } from '../../../api/api';

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
          // return ancVisitsReportCount(pTrackerId, patientUuid).then((data) => {
          //   // let total = data.rows[0].total;
          //   console.log('data1', data);
          //   console.log('data2', data.rows);
          //   console.log('data2', data.rows[0]);
          //   // console.log('total', total);
          //   return '--';
          // });

          let tt = ancVisitsReportCount(pTrackerId, patientUuid).then((response) => {
            console.log('response1', response.data);
            console.log('response2', response.data.rows);
            console.log('response3', response.data.rows[0]);
            console.log('response4', response.data.rows[0].total);
            return response.data[0].total;
          });
          console.log('tt', tt);
          return '--';
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
            form: { name: 'labour_and_delivery', package: 'maternal_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View details'),
            mode: 'view',
          },
          {
            form: { name: 'labour_and_delivery', package: 'maternal_health' },
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

export default PreviousPregnancies;
