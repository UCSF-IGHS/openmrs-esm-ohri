import React from 'react';
import {
  getPatientListTabsData,
  OHRIPatientListTabs,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';
import covidPatientListConfig from './covid-patient-list-schema-config.json';

function CovidHomePatientTabs() {
  const config = useConfig();
  const patientListTabs = getPatientListTabsData(covidPatientListConfig, config);

  return <OHRIPatientListTabs patientListConfigs={patientListTabs} moduleName={moduleName} />;
}

export default CovidHomePatientTabs;
