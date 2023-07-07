import { PostSubmissionAction } from '@openmrs/openmrs-form-engine-lib';
import { artNoConcept, artUniqueNumberType } from '../constants';
import { fetchPatientIdentifiers, saveIdentifier } from '../api/api';
import { PatientIdentifier } from '../api/types';

const ArtSubmissionAction: PostSubmissionAction = {
  applyAction: async function ({ patient, encounters, sessionMode }) {
    const encounter = encounters[0];
    const encounterLocation = encounter.location['uuid'];

    if (sessionMode !== 'enter') {
      return;
    }

    let artNumber = encounter.obs.find((observation) => observation.concept.uuid === artNoConcept)?.value;
    if (!artNumber) {
      return;
    }
    if (typeof artNumber !== 'string') {
      artNumber = artNumber.toString();
    }

    //Patient can only have one ART No.
    const patientIdentifiers = await fetchPatientIdentifiers(patient.id);
    const existingArtNumbers = patientIdentifiers.filter((id) => id.identifierType.uuid === artUniqueNumberType);
    if (existingArtNumbers.length > 0) {
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
