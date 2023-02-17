import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  basePath,
  EncounterList,
  EncounterListColumn,
  fetchPatientRelationships,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  pTrackerIdConcept,
  infantPostnatalEncounterType,
  nextVisitDate,
  artProphylaxisStatus,
  linkedToArt,
  breastfeedingStatus,
  outcomeStatus,
  childDateOfBirth,
} from '../../../constants';
import { moduleName } from '../../..';

interface InfantPostnatalListProps {
  patientUuid: string;
}

const InfantPostnatalList: React.FC<InfantPostnatalListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('infantPostnatalCare', 'Infant Postnatal Care');

  const [motherName, setMotherName] = useState('--');

  useEffect(() => {
    fetchMotherName();
  }, []);

  async function fetchMotherName() {
    let motherName = '--';
    const response = await fetchPatientRelationships(patientUuid);
    if (response.length) {
      motherName = response[0].personA.display;
    }
    return motherName;
  }

  const columns: EncounterListColumn[] = useMemo(() => {
    return [
      {
        key: 'pTrackerId',
        header: t('pTrackerId', 'Child PTracker ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, pTrackerIdConcept);
        },
      },
      {
        key: 'mothersName',
        header: t('mothersName', 'Mothers Name'),
        getValue: async (encounter) => {
          return await fetchMotherName();
        },
      },
      {
        key: 'artProphylaxisStatus',
        header: t('artProphylaxisStatus', 'ART Prophylaxis Status'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, artProphylaxisStatus);
        },
      },
      {
        key: 'linkedToArt',
        header: t('linkedToArt', 'Linked to ART'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, linkedToArt);
        },
      },
      {
        key: 'breastfeedingStatus',
        header: t('breastfeedingStatus', 'Breastfeeding status'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, breastfeedingStatus);
        },
      },
      {
        key: 'outcomeStatus',
        header: t('outcomeStatus', 'Outcome Status'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, outcomeStatus);
        },
      },
      {
        key: 'nextVisitDate',
        header: t('nextVisitDate', 'Next visit date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, nextVisitDate, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'infant_postnatal', package: 'child_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'infant_postnatal', package: 'child_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('editForm', 'Edit Form'),
            mode: 'edit',
          },
        ],
      },
    ];
  }, [motherName]);

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={infantPostnatalEncounterType}
      form={{ package: 'child_health', name: 'infant_postnatal' }}
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

export default InfantPostnatalList;
