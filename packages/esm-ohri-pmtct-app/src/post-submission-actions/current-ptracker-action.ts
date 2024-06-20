import { type PostSubmissionAction } from '@openmrs/openmrs-form-engine-lib';
import { fetchPatientIdentifiers, saveIdentifier } from '../api.resource';
import { type PatientIdentifier } from '../types';
import { getConfig } from '@openmrs/esm-framework';

export const PTrackerSubmissionAction: PostSubmissionAction = {
  applyAction: async function ({ patient, encounters, sessionMode }) {
    const encounter = encounters[0];
    const encounterLocation = encounter.location['uuid'];

    // Don't do post submission if action is view
    if (sessionMode === 'view') {
      return;
    }
    updatePatientPtracker(encounter, encounterLocation, patient.id);
  },
};

export async function updatePatientPtracker(encounter, encounterLocation, patientUuid) {
  const config = await getConfig('@ohri/openmrs-esm-ohri-pmtct-app');
  const inComingPTrackerID = encounter.obs.find(
    (observation) => observation.concept.uuid === config.obsConcepts.pTrackerIdConcept,
  )?.value;
  if (!inComingPTrackerID) {
    return;
  }
  const patientIdentifiers = await fetchPatientIdentifiers(patientUuid);
  const existingPTrackers = patientIdentifiers.filter(
    (id) => id.identifierType.uuid === config.identifiersTypes.ptrackerIdentifierType,
  );
  if (existingPTrackers.some((ptracker) => ptracker.identifier === inComingPTrackerID)) {
    return;
  }

  //add current ptracker to identities
  const currentPTrackerObject: PatientIdentifier = {
    identifier: inComingPTrackerID,
    identifierType: config.identifiersTypes.ptrackerIdentifierType,
    location: encounterLocation,
    preferred: false,
  };
  saveIdentifier(currentPTrackerObject, patientUuid);
}

export default PTrackerSubmissionAction;
