import { EncounterContext } from './ohri-form-context';

/**
 * Defines logic that processes field submission and value binding while in edit mode
 */
export interface SubmissionHandler {
  /**
   * Abstraction of the extraction of initial field value from an `encounter`
   *
   * @returns the `initialValue`
   */
  getInitialValue: (encounter: any, field: OHRIFormField) => {};

  /**
   * Handles field submission.
   *
   * @should Construct a new submission value, edit and handle deletion by voiding.
   * @returns the `submissionValue`
   */
  handleFieldSubmission: (field: OHRIFormField, value: any, context: EncounterContext) => {};

  /**
   * Extracts value to be displayed while in `view` mode
   *
   * @returns the `displayValue`
   */
  getDisplayValue: (field: OHRIFormField, value: any) => any;
}
export interface OHRIFormSchema {
  name: string;
  pages: Array<OHRIFormPage>;
  processor: string;
  uuid: string;
  referencedForms: [];
  encounterType?: string;
}

export interface OHRIFormPage {
  label: string;
  sections: Array<OHRIFormSection>;
}
export interface OHRIFormField {
  label: string;
  type: string;
  questionOptions: OHRIFormQuestionOptions;
  id: string;
  value?: any;
  hide?: any;
  isHidden?: boolean;
  dependant?: any;
  hideDeterminant?: string;
}

export interface OHRIFormFieldProps {
  question: OHRIFormField;
  onChange: (fieldName: string, value: any) => {};
  handler: SubmissionHandler;
}
export interface OHRIFormSection {
  label: string;
  isExpanded: string;
  questions: Array<OHRIFormField>;
}

export interface OHRIFormQuestionOptions {
  rendering: RenderType;
  concept?: string;
  max?: string;
  min?: string;
  showDate?: string;
  conceptMappings?: Array<Record<any, any>>;
  answers?: Array<Record<any, any>>;
  weeksList?: string;
  locationTag?: string;
  rows?: number;
  toggleOptions?: { labelTrue: string; labelFalse: string };
}

export type SessionMode = 'edit' | 'enter' | 'view';

export type RenderType =
  | 'select'
  | 'text'
  | 'date'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'ui-select-extended'
  | 'repeating'
  | 'group'
  | 'content-switcher'
  | 'encounter-location'
  | 'textarea'
  | 'toggle';
