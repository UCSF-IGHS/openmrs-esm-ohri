import { EncounterContext } from './ohri-form-context';

/**
 * Defines logic that processes field submission and value binding while in edit mode
 */
export interface SubmissionHandler {
  /**
   * Abstraction of the extraction of initial field value from an `encounter`
   */
  getInitialValue: (encounter: any, field: OHRIFormField) => {};

  /**
   * Handles field submission.
   *
   * @should Construct a new submission value, edit and handle deletion by voiding.
   * @returns `submissionValue`
   */
  handleFieldSubmission: (field: OHRIFormField, value: any, context: EncounterContext) => {};
}
export interface OHRIFormSchema {
  name: string;
  pages: Array<OHRIFormPage>;
  processor: string;
  uuid: string;
  referencedForms: [];
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
  hide?: string;
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
}

export type SessionMode = 'edit' | 'enter';

export type RenderType =
  | 'select'
  | 'text'
  | 'date'
  | 'number'
  | 'multicheckbox'
  | 'radio'
  | 'ui-select-extended'
  | 'repeating'
  | 'group'
  | 'content-switcher'
  | 'encounter-location';
