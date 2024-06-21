import { type PostSubmissionAction } from '@openmrs/openmrs-form-engine-lib';
import { getConfig } from '@openmrs/esm-framework';
import { fetchPatientIdentifiers, saveIdentifier } from '../api.resource';
import { type PatientIdentifier } from '../types';

const ArtSubmissionAction: PostSubmissionAction = {
  applyAction: async function ({ patient, encounters, sessionMode }) {
    const config = await getConfig('@ohri/openmrs-esm-ohri-pmtct-app');
    const encounter = encounters[0];
    const encounterLocation = encounter.location['uuid'];

    if (sessionMode !== 'enter') {
      return;
    }

    let artNumber = encounter.obs.find((observation) => observation.concept.uuid === config.obsConcepts.artNoConcept)
      ?.value;
    if (!artNumber) {
      return;
    }
    if (typeof artNumber !== 'string') {
      artNumber = artNumber.toString();
    }

    //Patient can only have one ART No.
    const patientIdentifiers = await fetchPatientIdentifiers(patient.id);
    const existingArtNumbers = patientIdentifiers.filter(
      (id) => id.identifierType.uuid === config.identifiersTypes.artUniqueNumberType,
    );
    if (existingArtNumbers.length > 0) {
      return;
    }

    //add current art number to identities
    const currentArtNumberObject: PatientIdentifier = {
      identifier: artNumber,
      identifierType: config.identifiersTypes.artUniqueNumberType,
      location: encounterLocation,
      preferred: false,
    };
    saveIdentifier(currentArtNumberObject, patient.id);
  },
};
export default ArtSubmissionAction;
