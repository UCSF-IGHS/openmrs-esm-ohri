import { PostSubmissionAction } from '@openmrs/openmrs-form-engine-lib';
import { generateIdentifier, savePatients, saveRelationship } from '../api/api';
import { Patient, PatientIdentifier } from '../api/types';
import { findObsByConcept, findChildObsInTree, getObsValueCoded } from '../utils/obs-encounter-utils';
import { updatePatientPtracker } from './current-ptracker-action';
import { getConfig } from '@openmrs/esm-framework';
import { getIdentifierAssignee } from '../utils/pmtct-helpers';

// necessary data points about an infact captured at birth
const infantDetailsGroup = '1c70c490-cafa-4c95-9fdd-a30b62bb78b8';
const infantGender = '1587AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const infantDOB = '164802AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const infantPTrackerId = '164803AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const infantLifeStatus = '159917AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const aliveStatus = '151849AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const PtrackerIdentifierType = '4da0a3fe-e546-463f-81fa-084f098ff06c';
const OpenmrsClassicIdentifierType = '05a29f94-c0ed-11e2-94be-8c13b969e334';
const MotherToChildRelationshipType = '8d91a210-c2cc-11de-8d13-0010c6dffd0f';

export const MotherToChildLinkageSubmissionAction: PostSubmissionAction = {
  applyAction: async function ({ patient, encounters, sessionMode }) {
    const encounter = encounters[0];
    const encounterLocation = encounter.location['uuid'];
    // only do this the first time the form is entered
    if (sessionMode === 'view') {
      return;
    }

    const preferredIdentifierSource = await getPreferredIdentifierSource();
    await updatePatientPtracker(encounter, encounterLocation, patient.id);
    const infantsToCreate = await Promise.all(
      findObsByConcept(encounter, infantDetailsGroup).map(async (obsGroup) =>
        constructPatientObjectFromObsData(obsGroup, encounterLocation, preferredIdentifierSource, sessionMode),
      ),
    );
    const newInfantsToCreate = await Promise.all(infantsToCreate.filter((infant) => infant !== null));
    const postResponse = await savePatients(newInfantsToCreate);
    postResponse.map(({ data }) =>
      saveRelationship({
        relationshipType: MotherToChildRelationshipType,
        personA: patient.id,
        personB: data.uuid,
      }),
    );
  },
};

async function getPreferredIdentifierSource() {
  const config = await getConfig('@ohri/openmrs-esm-ohri-pmtct');
  return config.identifiers.preferredIdentifierSource;
}

async function constructPatientObjectFromObsData(
  obsGroup,
  encounterLocation: string,
  preferredIdentifierSource: string,
  sessionMode: string,
): Promise<Patient> {
  // check if infant is alive
  const lifeStatusAtBirth = findChildObsInTree(obsGroup, infantLifeStatus);
   // the infant is alive hence eligible for registration
  if (getObsValueCoded(lifeStatusAtBirth) == aliveStatus) {

    const pTrackerId = findChildObsInTree(obsGroup, infantPTrackerId)?.value;
    const existingpTrackerAssignee = await getIdentifierAssignee(pTrackerId, PtrackerIdentifierType);
    if(existingpTrackerAssignee){
      if(sessionMode === 'enter'){
        throw new Error(`P Tracker Id (${pTrackerId}) already assigned to patient (${existingpTrackerAssignee})`);
      }
      else{
        return null;
      }
    }
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
