export interface QuestionOptionType {
  rendering: RenderType;
  concept?: string;
  max?: string;
  min?: string;
  showDate?: string;
  conceptMappings?: Array<Object>;
  answers?: Array<Object>;
  weeksList?: string;
  locationTag?: string;
}

export interface OhriAnswerOptionType {
  label: string;
  concept: string;
}

export interface OhriFormField {
  label: string;
  type: string;
  questionOptions: QuestionOptionType;
  id: string;
  hide?: string;
  isHidden?: boolean;
  dependant?: any;
  hideDeterminant?: string;
}

export interface OhriFormSection {
  label: string;
  isExpanded: string;
  questions: Array<OhriFormField>;
}

export interface OhriFormPage {
  label: string;
  sections: Array<OhriFormSection>;
}

export interface OhriForm {
  name: string;
  pages: Array<OhriFormPage>;
  processor: string;
  uuid: string;
  referencedForms: [];
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
