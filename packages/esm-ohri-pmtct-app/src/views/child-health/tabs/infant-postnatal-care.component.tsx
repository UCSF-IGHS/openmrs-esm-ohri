import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterList,
  EncounterListColumn,
  fetchPatientRelationships,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../..';
import { useConfig } from '@openmrs/esm-framework';

interface InfantPostnatalListProps {
  patientUuid: string;
}

const InfantPostnatalList: React.FC<InfantPostnatalListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const headerTitle = t('hivExposedInfant', 'HIV Exposed Infant');
  const InfantPNCEncounterTypeUUID = useConfig().encounterTypes.infantPostnatal;

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
          return getObsFromEncounter(encounter, config.encounterTypes.pTrackerIdConcept);
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
          return getObsFromEncounter(encounter, config.artProphylaxisStatus.artProphylaxisStatus);
        },
      },
      {
        key: 'linkedToArt',
        header: t('linkedToArt', 'Linked to ART'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.infantpnc.linkedToArt);
        },
      },
      {
        key: 'breastfeedingStatus',
        header: t('breastfeedingStatus', 'Breastfeeding status'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.infantpnc.breastfeedingStatus);
        },
      },
      {
        key: 'outcomeStatus',
        header: t('outcomeStatus', 'Outcome Status'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.infantpnc.outcomeStatus);
        },
      },
      {
        key: 'nextVisitDate',
        header: t('nextVisitDate', 'Next visit date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.infantpnc.nextVisitDate, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'Infant - Postanal Form', package: 'child_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'Infant - Postanal Form', package: 'child_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('editForm', 'Edit Form'),
            mode: 'edit',
          },
        ],
      },
    ];
  }, []);

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={InfantPNCEncounterTypeUUID}
      formList={[{ name: 'Infant - Postanal Form' }]}
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
