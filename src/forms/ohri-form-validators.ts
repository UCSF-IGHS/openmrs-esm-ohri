import { OHRIFormField, RequiredType } from './types';

export function validateFieldValue(value: any, question: OHRIFormField): { errCode: string; errMessage: string } {
  // check whether the value is truthy if field is required
  if (
    /**question.questionOptions.required == RequiredType.YES ||
    question.questionOptions.required == RequiredType.YES_WITH_UNSPECIFIED */
    // eslint-disable-next-line no-constant-condition
    true
  ) {
    if (value == undefined || value == null || value == '') {
      return { errCode: 'field.required', errMessage: 'Field is mandatory' };
    }
    if (typeof value == 'string' && !value?.trim()) {
      return { errCode: 'field.required', errMessage: 'Field is mandatory' };
    }
    if (Array.isArray(value) && !value.length) {
      return { errCode: 'field.required', errMessage: 'Field is mandatory' };
    }
  }
  return null;
}
