import { getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { getConfig } from '@openmrs/esm-framework';
import { moduleName } from '.';

export async function getTbRegimen(encounter: any, tBEnrollmentType: string) {
    const config = await getConfig(moduleName);
    const regimen =
            tBEnrollmentType === config.obsConcepts.dsTBEnrollment
              ? config.obsConcepts.dSregimen
              : config.obsConcepts.dRregimen;

    return getObsFromEncounter(encounter, regimen);
}

export async function getTbTreatmentStartDate(encounter: any, tBEnrollmentType: string){
    const config = await getConfig(moduleName);
    const tBTreatmentStartDateConcept =
            tBEnrollmentType === config.obsConcepts.dsTBEnrollment
              ? config.obsConcepts.dSTreatmentStartDate
              : config.obsConcepts.dRTreatmentStartDate;

    return getObsFromEncounter(encounter, tBTreatmentStartDateConcept, true);
}

export async function getTbTreatmentId(encounter: any, tBEnrollmentType: string){
    const config = await getConfig(moduleName);
    const treatmentId =
            tBEnrollmentType === config.obsConcepts.dsTBEnrollment
              ? config.obsConcepts.dSTreatmentId
              : config.obsConcepts.dRTreatmentId;
    return getObsFromEncounter(encounter, treatmentId);
}