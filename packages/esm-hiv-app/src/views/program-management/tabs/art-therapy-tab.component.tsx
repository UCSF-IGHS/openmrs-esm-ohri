import React from 'react';
import { useTranslation } from 'react-i18next';

import { EncounterList, EncounterListColumn, getObsFromEncounter, findObs } from 'openmrs-esm-ohri-commons-lib';
import {
  artTherapyDateTime_UUID,
  art_Therapy_EncounterUUID,
  therapyPlanConcept,
  regimenLine_UUID,
  regimenConcept,
  artStopDateUUID,
  substitutionDateUUID,
  switchDateUUID,
  dateRestartedUUID,
  restartReasonUUID,
  stopReasonUUID,
  substituteReasonUUID,
  switchReasonUUID,
} from '../../../constants';

interface ArtTherapyTabListProps {
  patientUuid: string;
}

const artConcepts = new Map([
  ['1256AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'Start ART'],
  ['1258AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'Substitute ART Regimen'],
  ['1259AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'Switch ART Regimen Line'],
  ['1260AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'Stop ART'],
  ['3e69cb60-2943-410f-83d4-b359ae83fefd', 'Restart ART therapy'],
]);

interface ARTDateConcepts {
  artTherapyDateTime_UUID: string;
  switchDateUUID: string;
  substitutionDateUUID: string;
  artStopDateUUID: string;
  dateRestartedUUID: string;
}

function getLatestARTDateConcept(encounter, dateConcepts: ARTDateConcepts): string {
  let artStartDate = findObs(encounter, dateConcepts.artTherapyDateTime_UUID);
  let artSubstitutionDate = findObs(encounter, dateConcepts.substitutionDateUUID);
  let artSwitchDate = findObs(encounter, dateConcepts.switchDateUUID);
  let artStopDate = findObs(encounter, dateConcepts.artStopDateUUID);
  let artRestartDate = findObs(encounter, dateConcepts.dateRestartedUUID);

  artStartDate = artStartDate ? artStartDate.value : null;
  artSubstitutionDate = artSubstitutionDate ? artSubstitutionDate.value : null;
  artSwitchDate = artSwitchDate ? artSwitchDate.value : null;
  artStopDate = artStopDate ? artStopDate.value : null;
  artRestartDate = artRestartDate ? artRestartDate.value : null;

  let latestDateConcept: string = dateConcepts.artTherapyDateTime_UUID;
  let latestDate = artStartDate;
  if (artSubstitutionDate > latestDate) {
    latestDateConcept = dateConcepts.substitutionDateUUID;
    latestDate = artSubstitutionDate;
  }
  if (artSwitchDate > latestDate) {
    latestDate = artSwitchDate;
    latestDateConcept = dateConcepts.switchDateUUID;
  }
  if (artStopDate > latestDate) {
    latestDate = artStopDate;
    latestDateConcept = dateConcepts.artStopDateUUID;
  }
  if (artRestartDate > latestDate) {
    latestDate = artRestartDate;
    latestDateConcept = dateConcepts.dateRestartedUUID;
  }

  return latestDateConcept;
}

function getARTReasonConcept(encounter, dateConcepts: ARTDateConcepts): string {
  const latestDateConcept: string = getLatestARTDateConcept(encounter, dateConcepts);
  let artReaseonConcept = '';
  switch (latestDateConcept) {
    case dateConcepts.artStopDateUUID:
      artReaseonConcept = stopReasonUUID;
      break;
    case dateConcepts.substitutionDateUUID:
      artReaseonConcept = substituteReasonUUID;
      break;
    case dateConcepts.switchDateUUID:
      artReaseonConcept = switchReasonUUID;
      break;
    case dateConcepts.dateRestartedUUID:
      artReaseonConcept = restartReasonUUID;
      break;
    default:
      artReaseonConcept = '';
  }
  return artReaseonConcept;
}

const columns: EncounterListColumn[] = [
  {
    key: 'initiationDate',
    header: 'Date(ART Start, Stopped, Switched, Changed, Restarted)',
    getValue: encounter => {
      return getObsFromEncounter(
        encounter,
        getLatestARTDateConcept(encounter, {
          artTherapyDateTime_UUID,
          switchDateUUID,
          substitutionDateUUID,
          artStopDateUUID,
          dateRestartedUUID,
        }),
        true,
      );
    },
  },
  {
    key: 'therapyPlan',
    header: 'Therapy Plan',
    getValue: encounter => {
      const therapyPlanObs = findObs(encounter, therapyPlanConcept);
      return therapyPlanObs ? artConcepts.get(therapyPlanObs.value.uuid) : '--';
    },
  },
  {
    key: 'regimen',
    header: 'Regimen',
    getValue: encounter => {
      return getObsFromEncounter(encounter, regimenConcept);
    },
  },
  {
    key: 'regimenInitiated',
    header: 'Regimen line',
    getValue: encounter => {
      return getObsFromEncounter(encounter, regimenLine_UUID);
    },
  },
  {
    key: 'reason',
    header: 'Reason',
    getValue: encounter => {
      return getObsFromEncounter(
        encounter,
        getARTReasonConcept(encounter, {
          artTherapyDateTime_UUID,
          switchDateUUID,
          substitutionDateUUID,
          artStopDateUUID,
          dateRestartedUUID,
        }),
      );
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => [
      {
        form: { name: 'art_therapy', package: 'hiv' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'View Details',
        mode: 'view',
      },
      {
        form: { name: 'art_therapy', package: 'hiv' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Edit Form',
        mode: 'edit',
      },
    ],
  },
];

const ArtTherapyTabList: React.FC<ArtTherapyTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('artTherapy', 'ART Therapy');
  const displayText = t('artTherapy', 'ART Therapy');

  return (
    // <>
    //   <EmptyState displayText={displayText} headerTitle={headerTitle} />
    // </>
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={art_Therapy_EncounterUUID}
      form={{ package: 'hiv', name: 'art_therapy' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default ArtTherapyTabList;
