import moment from 'moment';
import { ConceptTrue } from '../constants';
import { EncounterContext } from '../ohri-form-context';
import { OHRIFormField, SubmissionHandler } from '../types';

/**
 * Obs handler
 */
export const ObsSubmissionHandler: SubmissionHandler = {
  handleFieldSubmission: (field: OHRIFormField, value: any, context: EncounterContext) => {
    if (field.questionOptions.rendering == 'checkbox') {
      return multiSelectObsHandler(field, value, context);
    }
    if (field.value) {
      if (field.questionOptions.rendering == 'radio') {
        field.value.value = value;
      } else if (context.sessionMode == 'edit' && !value) {
        field.value.voided = true;
      } else if (!value) {
        field.value = undefined;
      } else {
        field.value.value = value;
        field.value.voided = false;
      }
    } else {
      field.value = {
        person: context.patient.id,
        obsDatetime: context.date,
        concept: field.questionOptions.concept,
        location: context.location,
        order: null,
        groupMembers: [],
        voided: false,
        value: value,
      };
    }
    return field.value;
  },
  getInitialValue: (encounter: any, field: OHRIFormField) => {
    const obs = encounter.obs.find(o => o.concept.uuid == field.questionOptions.concept);
    if (obs) {
      field.value = obs;
      if (typeof obs.value == 'string' || typeof obs.value == 'number') {
        return field.questionOptions.rendering == 'date' ? moment(obs.value).toDate() : obs.value;
      }
      if (field.questionOptions.rendering == 'checkbox') {
        field.value = encounter.obs.filter(o => o.concept.uuid == field.questionOptions.concept);
        return field.value.map(o => o.value.uuid);
      }
      if (field.questionOptions.rendering == 'toggle') {
        field.value.value = obs.value.uuid == ConceptTrue;
        return field.value.value;
      }
      return obs.value.uuid;
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

///////////////////////////////
// Helpers
//////////////////////////////

const multiSelectObsHandler = (field: OHRIFormField, value: any, context: EncounterContext) => {
  const { checked, id } = value;
  if (!field.value) {
    field.value = [];
  }
  if (checked) {
    const obs = field.value.find(o => o.value.uuid == id);
    if (obs && obs.voided) {
      obs.voided = false;
    } else {
      field.value.push({
        person: context.patient.id,
        obsDatetime: context.date,
        concept: field.questionOptions.concept,
        location: context.location,
        order: null,
        groupMembers: [],
        voided: false,
        value: id,
      });
    }
  } else {
    const obs = field.value.find(o => o.value.uuid == id);
    if (obs && context.sessionMode == 'edit') {
      obs.voided = true;
    } else {
      field.value = field.value.filter(o => o.value !== id);
    }
  }
  return field.value;
};
