import { FieldValidator, OHRIFormField } from './types';

export const OHRIFieldValidator: FieldValidator = {
  validate: (field: OHRIFormField, value: any) => {
    if (field['submission']?.specified) {
      return [];
    }
    if (field.required || field.unspecified) {
      if (isEmpty(value)) {
        return [{ errCode: 'field.required', errMessage: 'Field is mandatory' }];
      }
    }
    return [];
  },
};

export function isEmpty(value: any): boolean {
  if (value === undefined || value === null || value === '') {
    return true;
  }
  if (typeof value == 'string' && !value?.trim()) {
    return true;
  }
  if (Array.isArray(value) && !value.length) {
    return true;
  }
  return false;
}
