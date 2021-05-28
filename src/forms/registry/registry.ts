import { OHRIContentSwitcher } from '../components/inputs/content-switcher/ohri-content-switcher.component';
import OHRIDate from '../components/inputs/date/ohri-date.component';
import { OHRIEncounterLocationPicker } from '../components/inputs/location/ohri-encounter-location.component';
import { OHRIMultiSelect } from '../components/inputs/multi-select/ohri-multi-select.component';
import OHRINumber from '../components/inputs/number/ohri-number.component';
import OHRIRadio from '../components/inputs/radio/ohri-radio.component';
import OHRIText from '../components/inputs/text/ohri-text.component';
import { EncounterLocationSubmissionHandler, ObsSubmissionHandler } from '../submission-handlers/base-handlers';
import { RenderType, SubmissionHandler } from '../types';

export const registry: Array<RegistryItem> = [
  {
    id: 'OHRIText',
    component: OHRIText,
    renderType: 'text',
  },
  {
    id: 'OHRIRadio',
    component: OHRIRadio,
    renderType: 'radio',
  },
  {
    id: 'OHRIDate',
    component: OHRIDate,
    renderType: 'date',
  },
  {
    id: 'OHRINumber',
    component: OHRINumber,
    renderType: 'number',
  },
  {
    id: 'OHRIMultiSelect',
    component: OHRIMultiSelect,
    renderType: 'multicheckbox',
  },
  {
    id: 'OHRIContentSwitcher',
    component: OHRIContentSwitcher,
    renderType: 'content-switcher',
  },
  {
    id: 'OHRIEncounterLocationPicker',
    component: OHRIEncounterLocationPicker,
    renderType: 'encounter-location',
  },
];

export const handlers = [
  {
    id: 'ObsSubmissionHandler',
    handler: ObsSubmissionHandler,
    type: 'obs',
  },
  {
    id: 'EncounterLocationSubmissionHandler',
    handler: EncounterLocationSubmissionHandler,
    type: 'encounterLocation',
  },
];

export const getFieldComponent = renderType => {
  return registry.find(item => item.renderType == renderType)?.component;
};

export function getHandler(type: string): SubmissionHandler {
  return handlers.find(handler => handler.type == type)?.handler;
}
export interface RegistryItem {
  id: string;
  component: any;
  renderType: RenderType;
}
