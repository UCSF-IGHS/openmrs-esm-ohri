import { OHRIContentSwitcher } from '../components/inputs/content-switcher/ohri-content-switcher.component';
import OHRIDate from '../components/inputs/date/ohri-date.component';
import { OHRIEncounterLocationPicker } from '../components/inputs/location/ohri-encounter-location.component';
import { OHRIMultiSelect } from '../components/inputs/multi-select/ohri-multi-select.component';
import OHRINumber from '../components/inputs/number/ohri-number.component';
import OHRIRadio from '../components/inputs/radio/ohri-radio.component';
import OHRIDropdown from '../components/inputs/select/ohri-dropdown.component';
import OHRIText from '../components/inputs/text/ohri-text.component';
import { EncounterLocationSubmissionHandler, ObsSubmissionHandler } from '../submission-handlers/base-handlers';
import { SubmissionHandler } from '../types';

const baseFieldComponents: Array<RegistryItem> = [
  {
    id: 'OHRIText',
    component: OHRIText,
    type: 'text',
  },
  {
    id: 'OHRIRadio',
    component: OHRIRadio,
    type: 'radio',
  },
  {
    id: 'OHRIDate',
    component: OHRIDate,
    type: 'date',
  },
  {
    id: 'OHRINumber',
    component: OHRINumber,
    type: 'number',
  },
  {
    id: 'OHRIMultiSelect',
    component: OHRIMultiSelect,
    type: 'multicheckbox',
  },
  {
    id: 'OHRIContentSwitcher',
    component: OHRIContentSwitcher,
    type: 'content-switcher',
  },
  {
    id: 'OHRIEncounterLocationPicker',
    component: OHRIEncounterLocationPicker,
    type: 'encounter-location',
  },
  {
    id: 'OHRIDropdown',
    component: OHRIDropdown,
    type: 'select',
  },
];

const baseHandlers: Array<RegistryItem> = [
  {
    id: 'ObsSubmissionHandler',
    component: ObsSubmissionHandler,
    type: 'obs',
  },
  {
    id: 'EncounterLocationSubmissionHandler',
    component: EncounterLocationSubmissionHandler,
    type: 'encounterLocation',
  },
];

export const getFieldComponent = renderType => {
  return baseFieldComponents.find(item => item.type == renderType)?.component;
};

export function getHandler(type: string): SubmissionHandler {
  return baseHandlers.find(handler => handler.type == type)?.component;
}

export function addHandler(handler: RegistryItem) {
  baseHandlers.push(handler);
}

export function addFieldComponent(fieldComponent: RegistryItem) {
  baseFieldComponents.push(fieldComponent);
}

export interface RegistryItem {
  id: string;
  component: any;
  type: string;
}
