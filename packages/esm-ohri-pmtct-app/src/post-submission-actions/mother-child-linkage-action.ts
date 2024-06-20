import { type PostSubmissionAction } from '@openmrs/openmrs-form-engine-lib';
import { generateIdentifier, savePatients, saveRelationship } from '../api.resource';
import { type Patient, type PatientIdentifier } from '../types';
import { findObsByConcept, findChildObsInTree, getObsValueCoded } from '../utils/obs-encounter-utils';
import { updatePatientPtracker } from './current-ptracker-action';
import { getConfig } from '@openmrs/esm-framework';
import { getIdentifierAssignee } from '../utils/pmtct-helpers';
import { fetchPatientRelationships } from '@ohri/openmrs-esm-ohri-commons-lib';

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
    // only do this in enter or edit mode
    if (sessionMode === 'view') {
      return;
    }

    const preferredIdentifierSource = await getPreferredIdentifierSource();
    await updatePatientPtracker(encounter, encounterLocation, patient.id);
    const infantsToCreate = await Promise.all(
      findObsByConcept(encounter, infantDetailsGroup).map(async (obsGroup) =>
        constructPatientObjectFromObsData(obsGroup, encounterLocation, preferredIdentifierSource, sessionMode, patient),
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
  const config = await getConfig('@ohri/openmrs-esm-ohri-pmtct-app');
  return config.identifiers.preferredIdentifierSource;
}

async function constructPatientObjectFromObsData(
  obsGroup,
  encounterLocation: string,
  preferredIdentifierSource: string,
  sessionMode: string,
  parent: fhir.Patient,
): Promise<Patient> {
  // check if infant is alive
  const lifeStatusAtBirth = findChildObsInTree(obsGroup, infantLifeStatus);
  // the infant is alive hence eligible for registration
  if (getObsValueCoded(lifeStatusAtBirth) == aliveStatus) {
    const pTrackerId = findChildObsInTree(obsGroup, infantPTrackerId)?.value;
    if (pTrackerId) {
      const existingPTrackerAssignee = await getIdentifierAssignee(pTrackerId, PtrackerIdentifierType);
      if (Object.keys(existingPTrackerAssignee).length !== 0) {
        if (sessionMode === 'enter') {
          throw new Error(
            `PTracker Id (${pTrackerId}) already assigned to patient (${existingPTrackerAssignee.display})`,
          );
        } else {
          //In edit mode, only throw error if the patient with the existing PTracker is not linked with the current mother
          const parentRelationships = await fetchPatientRelationships(parent.id);
          const isAlreadyLinked = parentRelationships.some(
            (relationship) => relationship.personB.uuid === existingPTrackerAssignee.uuid,
          );
          if (!isAlreadyLinked) {
            throw new Error(
              `PTracker Id (${pTrackerId}) already assigned to patient (${existingPTrackerAssignee.display})`,
            );
          }
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

      patient.identifiers = [
        {
          identifier: pTrackerId,
          location: encounterLocation,
          identifierType: PtrackerIdentifierType,
          preferred: false,
        },
      ];
      // generate the preferred identifier
      const preferredIdentifier: PatientIdentifier = {
        identifier: await (await generateIdentifier(preferredIdentifierSource)).data.identifier,
        identifierType: OpenmrsClassicIdentifierType,
        location: encounterLocation,
        preferred: true,
      };
      patient.identifiers.push(preferredIdentifier);
      return patient;
    } else {
      throw new Error('Please provide child PTracker Id');
    }
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
