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

function getARTDateConcept(encounter, startDate, switchDate, substitutionDate, stopDate, restartDate): string {
  let artStartDate = findObs(encounter, startDate);
  let artSwitchDate = findObs(encounter, switchDate);
  let artSubstitutionDate = findObs(encounter, substitutionDate);
  let artStopDate = findObs(encounter, stopDate);
  let artRestartDate = findObs(encounter, restartDate);

  artStartDate = artStartDate ? artStartDate.value : null;
  artSubstitutionDate = artSubstitutionDate ? artSubstitutionDate.value : null;
  artSwitchDate = artSwitchDate ? artSwitchDate.value : null;
  artStopDate = artStopDate ? artStopDate.value : null;
  artRestartDate = artRestartDate ? artRestartDate.value : null;

  let latestDateConcept: string = startDate;
  let latestDate = artStartDate;
  if (artSubstitutionDate != null) {
    latestDateConcept = substitutionDate;
    latestDate = artSubstitutionDate;
  }
  if (artSwitchDate != null) {
    latestDate = artSwitchDate;
    latestDateConcept = switchDate;
  }
  if (artStopDate != null) {
    latestDate = artStopDate;
    latestDateConcept = stopDate;
  }
  if (artRestartDate != null) {
    latestDate = artRestartDate;
    latestDateConcept = restartDate;
  }

  return latestDateConcept;
}

function getARTReasonConcept(encounter, startDate, switchDate, substitutionDate, stopDate, restartDate): string {
  const latestDateConcept: string = getARTDateConcept(
    encounter,
    startDate,
    switchDate,
    substitutionDate,
    stopDate,
    restartDate,
  );

  let artReaseonConcept;
  switch (latestDateConcept) {
    case startDate:
      artReaseonConcept = '';
      break;
    case substitutionDate:
      artReaseonConcept = substituteReasonUUID;
      break;
    case switchDate:
      artReaseonConcept = switchReasonUUID;
      break;
    case restartDate:
      artReaseonConcept = restartReasonUUID;
      break;
    default:
      artReaseonConcept = stopReasonUUID;
  }

  return artReaseonConcept;
}

const columns: EncounterListColumn[] = [
  {
    key: 'initiationDate',
    header: 'Date',
    getValue: encounter => {
      return getObsFromEncounter(
        encounter,
        getARTDateConcept(
          encounter,
          artTherapyDateTime_UUID,
          switchDateUUID,
          substitutionDateUUID,
          artStopDateUUID,
          dateRestartedUUID,
        ),
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
      const reasonConcept = getARTReasonConcept(
        encounter,
        artTherapyDateTime_UUID,
        switchDateUUID,
        substitutionDateUUID,
        artStopDateUUID,
        dateRestartedUUID,
      );
      return getObsFromEncounter(encounter, reasonConcept);
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
