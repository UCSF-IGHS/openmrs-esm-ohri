import { PostSubmissionAction } from '@ohri/openmrs-ohri-form-engine-lib';
import { openmrsFetch } from '@openmrs/esm-framework';
import { Patient, PatientIdentifier, Relationship } from './types';

// necessary data points about an infact captured at birth
const infantDetailsGroup = '160632AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
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
        gender: '',
        birthdate: '',
        birthdateEstimated: false,
        dead: false,
        deathDate: null,
        causeOfDeath: '',
      },
    };
    let infantPtrackerIdObject: PatientIdentifier = null;
    patient.person.birthdate = findChildObsInTree(obsGroup, infantDOB)?.value;
    patient.person.gender = inferGenderFromObs(findChildObsInTree(obsGroup, infantGender));
    const pTrackerId = findChildObsInTree(obsGroup, infantPTrackerId)?.value;
    if (pTrackerId) {
      infantPtrackerIdObject = {
        identifier: pTrackerId,
        location: encounterLocation,
        identifierType: PtrackerIdentifierType,
        preferred: false,
      };
    }
    // generate the preferred identifier
    const preferredIdentifier: PatientIdentifier = {
      identifier: await (await generateIdentifier(preferredIdentifierSource)).data.identifier,
      identifierType: OpenmrsClassicIdentifierType,
      location: encounterLocation,
      preferred: true,
    };
    patient.identifiers = [preferredIdentifier, infantPtrackerIdObject];
    return patient;
  }
  return null;
}

function findObsByConcept(encounter: any, concept: string): Array<any> {
  return encounter?.obs?.filter((observation) => observation.concept.uuid === concept) || [];
}

function findChildObsInTree(parent: any, childConcept: string) {
  return parent.groupMembers?.find((obs) => obs.concept.uuid == childConcept);
}

function getObsValueCoded(obs) {
  return obs?.value?.uuid;
}

function inferGenderFromObs(obs) {
  const genderMap = {
    '1534AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'M',
    '1535AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'F',
  };
  return genderMap[getObsValueCoded(obs)];
}

export function generateIdentifier(source: string) {
  return openmrsFetch(`/ws/rest/v1/idgen/identifiersource/${source}/identifier`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: {},
  });
}

export function savePatient(patient: Patient) {
  return openmrsFetch(`/ws/rest/v1/patient`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: patient,
  });
}

export function savePatients(patients: Array<Patient>) {
  return Promise.all(patients.map((patient) => savePatient(patient)));
}

export function saveRelationship(relationship: Relationship) {
  return openmrsFetch('/ws/rest/v1/relationship', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: relationship,
  });
}

export default MotherToChildLinkageSubmissionAction;
