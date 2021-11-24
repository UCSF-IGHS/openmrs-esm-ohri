import { ConceptFalse, ConceptTrue } from '../constants';
import { EncounterContext } from '../ohri-form-context';
import { getHandler } from '../registry/registry';
import { OHRIFormField, OHRIFormSection, SubmissionHandler } from '../types';
import { OHRIDefaultFieldValueValidator } from '../validators/default-value-validator';
import { isEmpty } from '../validators/ohri-form-validator';

export function cascadeVisibityToChildFields(
  visibility: boolean,
  section: OHRIFormSection,
  allFields: Array<OHRIFormField>,
) {
  const candidateIds = section.questions.map(q => q.id);
  allFields
    .filter(field => candidateIds.includes(field.id))
    .forEach(field => {
      field.isParentHidden = visibility;
    });
}

export function inferInitialValueFromDefaultFieldValue(
  field: OHRIFormField,
  context: EncounterContext,
  handler?: SubmissionHandler,
) {
  if (!isEmpty(field.questionOptions.defaultValue)) {
    if (field.questionOptions.rendering == 'toggle') {
      if (field.questionOptions.defaultValue == ConceptTrue) {
        return true;
      } else {
        return false;
      }
    }
    // validate default value
    if (!OHRIDefaultFieldValueValidator.validate(field, field.questionOptions.defaultValue).length) {
      // construct observation
      if (!handler) {
        handler = getHandler(field.type);
      }
      handler.handleFieldSubmission(field, field.questionOptions.defaultValue, context);
      return field.questionOptions.defaultValue;
    }
  }
}
