import React from 'react';
import OHRIDateObs from '../components/inputs/date/ohri-date-obs.component';
import OHRINumberObs from '../components/inputs/number/ohri-number-obs.component';
import OHRIRadioObs from '../components/inputs/radio/ohri-radio-obs.component';
import OHRITextObs from '../components/inputs/text/ohri-text-obs.component';
import { RenderType } from '../types';

export const registry: Array<RegistryItem> = [
  {
    id: 'OHRITextObs',
    component: OHRITextObs,
    renderType: 'text',
  },
  {
    id: 'OHRIRadioObs',
    component: OHRIRadioObs,
    renderType: 'radio',
  },
  {
    id: 'OHRIDateObs',
    component: OHRIDateObs,
    renderType: 'date',
  },
  {
    id: 'OHRINumberObs',
    component: OHRINumberObs,
    renderType: 'number',
  },
];

export const getFieldComponent = renderType => {
  return registry.find(item => item.renderType == renderType).component;
};

export interface RegistryItem {
  id: string;
  component: any;
  renderType: RenderType;
}
