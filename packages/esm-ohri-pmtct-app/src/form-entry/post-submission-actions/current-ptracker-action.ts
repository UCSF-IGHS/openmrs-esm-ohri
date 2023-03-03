import { PostSubmissionAction } from '@ohri/openmrs-ohri-form-engine-lib';
import { fetchPatientIdentifiers, saveIdentifier } from '../../api/api';
import { Patient, PatientIdentifier } from '../../api/types';
import { pTrackerIdConcept, PTrackerIdentifierType } from '../../constants';

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
  const inComingPTrackerID = encounter.obs.find((observation) => observation.concept.uuid === pTrackerIdConcept)?.value;
  if (!inComingPTrackerID) {
    return;
  }
  const patientIdentifiers = await fetchPatientIdentifiers(patientUuid);
  const existingPTrackers = patientIdentifiers.filter((id) => id.identifierType.uuid === PTrackerIdentifierType);
  if (existingPTrackers.some((ptracker) => ptracker.identifier === inComingPTrackerID)) {
    return;
  }

  //add current ptracker to identities
  const currentPTrackerObject: PatientIdentifier = {
    identifier: inComingPTrackerID,
    identifierType: PTrackerIdentifierType,
    location: encounterLocation,
    preferred: false,
  };
  saveIdentifier(currentPTrackerObject, patientUuid);
}

export default PTrackerSubmissionAction;
