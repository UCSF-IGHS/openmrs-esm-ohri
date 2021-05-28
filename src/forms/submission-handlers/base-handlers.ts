import { EncounterContext } from '../ohri-form-context';
import { OHRIFormField, SubmissionHandler } from '../types';

/**
 * Obs handler
 */
export const ObsSubmissionHandler: SubmissionHandler = {
  handleFieldSubmission: (field: OHRIFormField, value: any, context: EncounterContext) => {
    return null;
  },
  getInitialValue: (encounter: any, field: OHRIFormField) => {
    const obs = encounter.obs.find(o => o.concept.uuid == field.questionOptions.concept);
    if (obs) {
      field['obs'] = obs;
      if (typeof obs.value == 'string' || typeof obs.value == 'number') {
        return field.questionOptions.rendering == 'date' ? new Date(obs.value) : obs.value;
      } else {
        if (field.questionOptions.rendering == 'multicheckbox') {
          field['obs'] = encounter.obs.filter(o => o.concept.uuid == field.questionOptions.concept);
          return field['obs'].map(o => o.value.uuid);
        }
        return obs.value.uuid;
      }
    }
    return '';
  },
};

/**
 * Encounter location handler
 */
export const EncounterLocationSubmissionHandler: SubmissionHandler = {
  handleFieldSubmission: (field: OHRIFormField, value: any, context: EncounterContext) => {
    return null;
  },
  getInitialValue: (encounter: any, field: OHRIFormField) => {
    return {
      display: encounter.location.name,
      uuid: encounter.location.uuid,
    };
  },
};
