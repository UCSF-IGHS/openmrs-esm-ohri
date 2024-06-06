import { findObs, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';

export function getTransferVerifiedValue(encounter, obsConcept) {
  const obs = findObs(encounter, obsConcept);
  return obs?.value?.name?.name === 'FALSE' ? 'No' : obs?.value?.name?.name;
}

const artDateConcepts = {
  artTherapyDateTime_UUID: '159599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  artStopDateUUID: '162572AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  switchDateUUID: '164516AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  substitutionDateUUID: '164431AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  dateRestartedUUID: '160738AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
};

export const getARTDateConcept = (encounter): string => {
  let artStartDate = findObs(encounter, artDateConcepts.artTherapyDateTime_UUID);
  let artSwitchDate = findObs(encounter, artDateConcepts.switchDateUUID);
  let artSubstitutionDate = findObs(encounter, artDateConcepts.substitutionDateUUID);
  let artStopDate = findObs(encounter, artDateConcepts.artStopDateUUID);
  let artRestartDate = findObs(encounter, artDateConcepts.dateRestartedUUID);

  artStartDate = artStartDate ? artStartDate.value : null;
  artSubstitutionDate = artSubstitutionDate ? artSubstitutionDate.value : null;
  artSwitchDate = artSwitchDate ? artSwitchDate.value : null;
  artStopDate = artStopDate ? artStopDate.value : null;
  artRestartDate = artRestartDate ? artRestartDate.value : null;

  let latestDateConcept: string = artDateConcepts.artTherapyDateTime_UUID;
  let latestDate = artStartDate;
  if (artSubstitutionDate != null) {
    latestDateConcept = artDateConcepts.substitutionDateUUID;
    latestDate = artSubstitutionDate;
  }
  if (artSwitchDate != null) {
    latestDate = artSwitchDate;
    latestDateConcept = artDateConcepts.switchDateUUID;
  }
  if (artStopDate != null) {
    latestDate = artStopDate;
    latestDateConcept = artDateConcepts.artStopDateUUID;
  }
  if (artRestartDate != null) {
    latestDate = artRestartDate;
    latestDateConcept = artDateConcepts.dateRestartedUUID;
  }

  return latestDateConcept;
};

const artReasonConcepts = {
  switchReasonUUID: '160568AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  substituteReasonUUID: '160562AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  stopReasonUUID: '163513AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  freeTextCommentConcept: '161011AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
};

const getARTReasonConcept = (encounter, startDate, switchDate, substitutionDate, stopDate, restartDate): string => {
  const latestDateConcept: string = getARTDateConcept(encounter);

  let artReasonConcept;
  switch (latestDateConcept) {
    case startDate:
      artReasonConcept = '';
      break;
    case substitutionDate:
      artReasonConcept = artReasonConcepts.substituteReasonUUID;
      break;
    case switchDate:
      artReasonConcept = artReasonConcepts.switchReasonUUID;
      break;
    case restartDate:
      artReasonConcept = artReasonConcepts.freeTextCommentConcept;
      break;
    case stopDate:
      artReasonConcept = artReasonConcepts.stopReasonUUID;
    default:
      artReasonConcept = artReasonConcepts.stopReasonUUID;
  }

  return artReasonConcept;
};

const artConcepts: { [key: string]: string } = {
  '1256AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'Start ART',
  '1258AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'Substitute ART Regimen',
  '1259AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'Switch ART Regimen Line',
  '1260AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'Stop ART',
  '3e69cb60-2943-410f-83d4-b359ae83fefd': 'Restart ART therapy',
};

export function getARTDateValue(encounter) {
  const artDateConcept = getARTDateConcept(encounter);
  return getObsFromEncounter(encounter, artDateConcept, true);
}

export function getARTReasonValue(encounter) {
  const reasonConcept = getARTReasonConcept(
    encounter,
    artDateConcepts.artTherapyDateTime_UUID,
    artDateConcepts.switchDateUUID,
    artDateConcepts.substitutionDateUUID,
    artDateConcepts.artStopDateUUID,
    artDateConcepts.dateRestartedUUID,
  );
  const artReasonConcept = reasonConcept;
  return getObsFromEncounter(encounter, artReasonConcept);
}

export function getARTTherapyNameMappings(encounter, obsConcept) {
  const therapyObs = findObs(encounter, obsConcept);
  return therapyObs ? artConcepts[therapyObs.value.uuid] : '--';
}
