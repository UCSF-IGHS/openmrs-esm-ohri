import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../..';
import {
  artLinkage,
  artUniqueNoConcept,
  hivTestStatus,
  MotherHivStatus,
  MotherNextVisitDate,
  motherPostnatalEncounterType,
  MotherViralLoadDate,
  MotherViralLoadResult,
  MothervisitDate,
  pTrackerIdConcept,
  recenctViralLoad,
  visitDate,
} from '../../../constants';
import moment from 'moment';

interface PostnatalCareListProps {
  patientUuid: string;
}

const PostnatalCareList: React.FC<PostnatalCareListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('postnatalCare', 'Postnatal Care');

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'pTrackerId',
        header: t('pTrackerId', 'PTracker ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, pTrackerIdConcept);
        },
      },
      {
        key: 'visitDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, visitDate, true);
        },
      },
      {
        key: 'currentHivStatus',
        header: t('currentHivStatus', 'Current HIV Status'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, MotherHivStatus);
        },
      },
      {
        key: 'recentViralLoadTestDate',
        header: t('recentViralLoadTestDate', 'Recent Viral load test date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, MotherViralLoadDate, true);
        },
      },
      {
        key: 'recentViralLoadResults',
        header: t('recentViralLoadResults', 'Recent Viral load results'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, MotherViralLoadResult);
        },
      },
      {
        key: 'nextVisitDate',
        header: t('nextVisitDate', 'Next visit date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, MotherNextVisitDate, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'mother_postnatal_form', package: 'maternal_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'mother_postnatal_form', package: 'maternal_health' },
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
      encounterType={motherPostnatalEncounterType}
      // TODO: replace with form name as configured in the backend.
      formList={[{ name: 'Mother - Postnatal Form' }]}
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

export default PostnatalCareList;
