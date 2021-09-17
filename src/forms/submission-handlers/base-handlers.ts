import moment from 'moment';
import { ConceptTrue } from '../constants';
import { EncounterContext } from '../ohri-form-context';
import { getConcept } from '../ohri-form.resource';
import { OHRIFormField, SubmissionHandler } from '../types';

/**
 * Obs handler
 */
export const ObsSubmissionHandler: SubmissionHandler = {
  handleFieldSubmission: (field: OHRIFormField, value: any, context: EncounterContext) => {
    if (field.questionOptions.rendering == 'checkbox') {
      return multiSelectObsHandler(field, value, context);
    }
    if (field.questionOptions.rendering == 'toggle') {
      return constructObs(value, context, field);
    }
    if (field.value) {
      if (context.sessionMode == 'edit' && !value) {
        field.value.voided = true;
      } else if (!value) {
        field.value = undefined;
      } else {
        field.value.value = value;
        field.value.voided = false;
      }
    } else {
      field.value = constructObs(value, context, field);
    }
    return field.value;
  },
  getInitialValue: (encounter: any, field: OHRIFormField, allFormFields: Array<OHRIFormField>) => {
    let obs = encounter.obs.find(o => o.concept.uuid == field.questionOptions.concept);
    let parentField = null;
    let obsGroup = null;
    if (!obs && field['groupId']) {
      parentField = allFormFields.find(f => f.id == field['groupId']);
      obsGroup = encounter.obs.find(o => o.concept.uuid == parentField.questionOptions.concept);
      if (obsGroup) {
        parentField.value = obsGroup;
        obs = obsGroup.groupMembers?.find(o => o.concept.uuid == field.questionOptions.concept);
      }
    }
    if (obs) {
      const rendering = field.questionOptions.rendering;
      field.value = obs;
      if (rendering == 'radio' || rendering == 'content-switcher') {
        getConcept(field.questionOptions.concept, 'custom:(uuid,display,datatype:(uuid,display,name))').subscribe(
          result => {
            if (result.datatype.name == 'Boolean') {
              field.value.value = obs.value.uuid;
            }
          },
        );
      }
      if (typeof obs.value == 'string' || typeof obs.value == 'number') {
        return field.questionOptions.rendering == 'date' ? moment(obs.value).toDate() : obs.value;
      }
      if (field.questionOptions.rendering == 'checkbox') {
        field.value = encounter.obs.filter(o => o.concept.uuid == field.questionOptions.concept);
        if (!field.value.length && field['groupId']) {
          field.value = obsGroup.groupMembers.filter(o => o.concept.uuid == field.questionOptions.concept);
        }
        return field.value.map(o => o.value.uuid);
      }
      if (field.questionOptions.rendering == 'toggle') {
        field.value.value = obs.value.uuid;
        return obs.value == ConceptTrue;
      }
      return obs.value?.uuid;
    }
    return '';
  },
  getDisplayValue: (field: OHRIFormField, value: any) => {
    const rendering = field.questionOptions.rendering;
    if (!field.value) {
      return null;
    }
    if (field.questionOptions.rendering == 'checkbox') {
      return value.map(
        chosenOption => field.questionOptions.answers.find(option => option.concept == chosenOption).label,
      );
    }
    if (rendering == 'content-switcher' || rendering == 'select' || rendering == 'toggle') {
      return field.questionOptions.answers.find(option => option.concept == field.value.value.uuid).label;
    }
    if (rendering == 'radio') {
      return field.questionOptions.answers.find(option => option.concept == value).label;
    }
    return value;
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
  getDisplayValue: (field: OHRIFormField, value) => {
    return value.display;
  },
};

///////////////////////////////
// Helpers
//////////////////////////////

const constructObs = (value: any, context: EncounterContext, field: OHRIFormField) => {
  return {
    person: context.patient.id,
    obsDatetime: context.date,
    concept: field.questionOptions.concept,
    location: context.location,
    order: null,
    groupMembers: [],
    voided: false,
    // formFieldNamespace: 'ohri-forms',
    // formFieldPath: 'field-id',
    value: value,
  };
};

const multiSelectObsHandler = (field: OHRIFormField, values: any, context: EncounterContext) => {
  if (!field.value) {
    field.value = [];
  }
  values.forEach(value => {
    const { checked, id } = value;

    if (checked) {
      const obs = field.value.find(o => o.value.uuid == id);
      if (obs && obs.voided) {
        obs.voided = false;
      } else {
        field.value.push(constructObs(id, context, field));
      }
    } else {
      const obs = field.value.find(v => v.value.uuid == id);
      if (obs && context.sessionMode == 'edit') {
        obs.voided = true;
      } else {
        field.value = field.value.filter(o => o.value !== id);
      }
    }
  });
  return field.value;
};
