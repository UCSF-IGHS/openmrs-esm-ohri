import { PostSubmissionAction } from '@ohri/openmrs-ohri-form-engine-lib';
import { artNoConcept, artUniqueNumberType } from '../../constants';
import { fetchPatientIdentifiers, saveIdentifier } from '../../api/api';
import { PatientIdentifier } from '../../api/types';

const ArtSubmissionAction: PostSubmissionAction = {
  applyAction: async function ({ patient, encounters, sessionMode }) {
    const encounter = encounters[0];
    const encounterLocation = encounter.location['uuid'];
    // Only allow this action in enter mode
    if (sessionMode !== 'enter') {
      return;
    }
    // save Art Number to patient identifiers
    let artNumber = encounter.obs.find((observation) => observation.concept.uuid === artNoConcept)?.value;
    if (!artNumber) {
      return;
    }

    // convert art number to string
    if (typeof artNumber !== 'string') {
      artNumber = artNumber.toString();
    }

    const patientIdentifiers = await fetchPatientIdentifiers(patient.id);
    const existingArtNumbers = patientIdentifiers.filter((id) => id.identifierType.uuid === artNoConcept);
    if (existingArtNumbers.some((artNumber) => artNumber.identifier === artNumber)) {
      return;
    }

    //add current art number to identities
    const currentArtNumberObject: PatientIdentifier = {
      identifier: artNumber,
      identifierType: artUniqueNumberType,
      location: encounterLocation,
      preferred: false,
    };
    saveIdentifier(currentArtNumberObject, patient.id);
  },
};

export default ArtSubmissionAction;
