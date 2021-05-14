import React from 'react';
import OHRIDateObs from '../components/inputs/OHRI-date-obs.component';
import OHRIRadioObs from '../components/inputs/OHRI-radio-obs.component';
import OHRITextObs from '../components/inputs/OHRI-text-obs.component';
import { RenderType } from '../types';

export const registry: Array<RegistryItem> = [
  {
    id: 'OHRITextObs',
    component: OHRITextObs,
    renderType: 'obs',
  },
  {
    id: 'OHRIRadioObs',
    component: OHRIRadioObs,
    renderType: 'obs',
  },
  {
    id: 'OHRIDateObs',
    component: OHRIDateObs,
    renderType: 'date',
  },
];

export const getField = () => {
  // From render type, determine component id
  // If render type is
  // return registry.find();
};

export interface RegistryItem {
  id: string;
  component: any;
  renderType: RenderType;
}
