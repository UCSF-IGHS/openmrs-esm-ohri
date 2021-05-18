import React from 'react';
import { SessionMode } from './types';

type OHRIFormContextProps = {
  values: Record<string, any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  encounterContext: EncounterContext;
};

export interface EncounterContext {
  patient: any;
  encounter: any;
  location: any;
  sessionMode: SessionMode;
  date: Date;
}
export const OHRIFormContext = React.createContext<OHRIFormContextProps | undefined>(undefined);
