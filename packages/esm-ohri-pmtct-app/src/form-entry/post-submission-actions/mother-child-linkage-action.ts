import { PostSubmissionAction } from '@ohri/openmrs-ohri-form-engine-lib';
import {
  fetchPatientIdentifiers,
  generateIdentifier,
  saveIdentifier,
  savePatients,
  saveRelationship,
} from '../../api/api';
import { Patient, PatientIdentifier } from '../../api/types';
import { pTrackerIdConcept, PTrackerIdentifierType } from '../../constants';
import { findObsByConcept, findChildObsInTree, getObsValueCoded } from '../../utils/obs-encounter-utils';
import { updatePatientPtracker } from './current-ptracker-action';

// necessary data points about an infact captured at birth
const infantDetailsGroup = '1c70c490-cafa-4c95-9fdd-a30b62bb78b8';
const infantGender = '1587AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const infantDOB = '164802AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const infantPTrackerId = '164803AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const infantLifeStatus = '159917AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const preferredIdentifierSource = '691eed12-c0f1-11e2-94be-8c13b969e334';
const aliveStatus = '151849AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const PtrackerIdentifierType = '4da0a3fe-e546-463f-81fa-084f098ff06c';
const OpenmrsClassicIdentifierType = '05a29f94-c0ed-11e2-94be-8c13b969e334';
const MotherToChildRelationshipType = '8d91a210-c2cc-11de-8d13-0010c6dffd0f';

export const MotherToChildLinkageSubmissionAction: PostSubmissionAction = {
  applyAction: async function ({ patient, encounters, sessionMode }) {
    const encounter = encounters[0];
    const encounterLocation = encounter.location['uuid'];
    // only do this the first time the form is entered
    if (sessionMode !== 'enter') {
      return;
    }
    await updatePatientPtracker(encounter, encounterLocation, patient.id);
    const infantsToCreate = await Promise.all(
      findObsByConcept(encounter, infantDetailsGroup).map(async (obsGroup) =>
        constructPatientObjectFromObsData(obsGroup, encounterLocation),
      ),
    );
    const postResponse = await savePatients(infantsToCreate);
    postResponse.map(({ data }) =>
      saveRelationship({
        relationshipType: MotherToChildRelationshipType,
        personA: patient.id,
        personB: data.uuid,
      }),
    );
  },
};

async function constructPatientObjectFromObsData(obsGroup, encounterLocation: string): Promise<Patient> {
  // check if infant is alive
  const lifeStatusAtBirth = findChildObsInTree(obsGroup, infantLifeStatus);
  if (getObsValueCoded(lifeStatusAtBirth) == aliveStatus) {
    // the infant is alive hence eligible for registration
    const patient: Patient = {
      identifiers: [],
      person: {
        names: [
          {
            givenName: 'TBD',
            middleName: 'TBD',
            familyName: 'TBD',
            preferred: true,
          },
        ],
        gender: inferGenderFromObs(findChildObsInTree(obsGroup, infantGender)),
        birthdate: findChildObsInTree(obsGroup, infantDOB)?.value,
        birthdateEstimated: false,
        dead: false,
        deathDate: null,
        causeOfDeath: '',
      },
    };
    // PTracker ID
    const pTrackerId = findChildObsInTree(obsGroup, infantPTrackerId)?.value;
    if (pTrackerId) {
      patient.identifiers = [
        {
          identifier: pTrackerId,
          location: encounterLocation,
          identifierType: PtrackerIdentifierType,
          preferred: false,
        },
      ];
    }
    // generate the preferred identifier
    const preferredIdentifier: PatientIdentifier = {
      identifier: await (await generateIdentifier(preferredIdentifierSource)).data.identifier,
      identifierType: OpenmrsClassicIdentifierType,
      location: encounterLocation,
      preferred: true,
    };
    patient.identifiers.push(preferredIdentifier);
    return patient;
  }
  return null;
}

////////////////////////
// Convinience functions
////////////////////////

function inferGenderFromObs(obs) {
  const genderMap = {
    '1534AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'M',
    '1535AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'F',
  };
  return genderMap[getObsValueCoded(obs)];
}

export default MotherToChildLinkageSubmissionAction;
