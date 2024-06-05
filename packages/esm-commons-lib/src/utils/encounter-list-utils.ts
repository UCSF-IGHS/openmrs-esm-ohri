import dayjs from 'dayjs';
import { formatDate, parseDate } from '@openmrs/esm-framework';

export function getEncounterValues(encounter, param: string, isDate?: Boolean) {
  if (isDate) return dayjs(encounter[param]).format('DD-MMM-YYYY');
  else return encounter[param] ? encounter[param] : '--';
}

export function formatDateTime(dateString: string): any {
  const format = 'YYYY-MM-DDTHH:mm:ss';
  if (dateString.includes('.')) {
    dateString = dateString.split('.')[0];
  }
  return dayjs(dateString, format, true).toDate();
}

export function obsArrayDateComparator(left, right) {
  return formatDateTime(right.obsDatetime) - formatDateTime(left.obsDatetime);
}

export function findObs(encounter, obsConcept): Record<string, any> {
  const allObs = encounter?.obs?.filter((observation) => observation.concept.uuid === obsConcept) || [];
  return allObs?.length == 1 ? allObs[0] : allObs?.sort(obsArrayDateComparator)[0];
}

export function getObsFromEncounters(encounters, obsConcept) {
  const filteredEnc = encounters?.find((enc) => enc.obs.find((obs) => obs.concept.uuid === obsConcept));
  return getObsFromEncounter(filteredEnc, obsConcept);
}

export function getMultipleObsFromEncounter(encounter, obsConcepts: Array<string>, type?: string) {
  let observations = [];
  obsConcepts.forEach((concept) => {
    let obs = getObsFromEncounter(encounter, concept);
    if (obs !== '--') {
      observations.push(obs);
    }
  });

  return observations.length ? observations.join(', ') : '--';
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

export function getObsFromEncounter(
  encounter,
  obsConcept,
  isDate?: Boolean,
  isTrueFalseConcept?: Boolean,
  type?: string,
  fallBackConcepts?: Array<string>,
  useMultipleObs?: Boolean,
) {
  if (useMultipleObs && Array.isArray(obsConcept)) {
    return getMultipleObsFromEncounter(encounter, obsConcept, type);
  }

  let obs = findObs(encounter, obsConcept);

  // if (type === 'artDate') {
  //   const artDateConcept = getARTDateConcept(encounter);
  //   obs = findObs(encounter, artDateConcept);
  // }

  // if (type === 'artReason') {
  //   const reasonConcept = getARTReasonConcept(
  //     encounter,
  //     artDateConcepts.artTherapyDateTime_UUID,
  //     artDateConcepts.switchDateUUID,
  //     artDateConcepts.substitutionDateUUID,
  //     artDateConcepts.artStopDateUUID,
  //     artDateConcepts.dateRestartedUUID,
  //   );
  //   const artReasonConcept = reasonConcept;
  //   obs = findObs(encounter, artReasonConcept);
  // }

  // if (type === 'artTherapy') {
  //   const therapyObs = findObs(encounter, obsConcept);
  //   return therapyObs ? artConcepts[therapyObs.value.uuid] : '--';
  // }

  // if (type === 'transferVerified') {
  //   const obs = findObs(encounter, obsConcept);
  //   return obs?.value?.name?.name === 'FALSE' ? 'No' : obs?.value?.name?.name;
  // }

  if (isTrueFalseConcept) {
    if (obs?.value?.uuid == 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3') {
      return 'Yes';
    } else {
      return 'No';
    }
  }

  if (type === 'location') {
    return encounter.location.name;
  }

  if (type === 'provider') {
    return encounter.encounterProviders.map((p) => p.provider.name).join(' | ');
  }

  if (!obs && fallBackConcepts?.length) {
    const concept = fallBackConcepts.find((c) => findObs(encounter, c) != null);
    obs = findObs(encounter, concept);
  }

  if (!obs) {
    return '--';
  }

  if (isDate) {
    return formatDate(parseDate(obs.value), { mode: 'wide' });
  }

  if (typeof obs.value === 'object' && obs.value?.names) {
    return (
      obs.value?.names?.find((conceptName) => conceptName.conceptNameType === 'SHORT')?.name || obs.value.name.name
    );
  }
  return obs.value;
}
