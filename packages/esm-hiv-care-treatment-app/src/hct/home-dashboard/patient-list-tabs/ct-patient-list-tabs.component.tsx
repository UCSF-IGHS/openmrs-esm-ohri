import React from 'react';
import { OHRIPatientListTabs, getPatientListTabsData } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';
import ctPatientListTabsConfig from './ct-patient-list-schema-config.json';

function CTHomePatientTabs() {
  const config = useConfig();

  const patientListTabs = getPatientListTabsData(ctPatientListTabsConfig, config);

  return <OHRIPatientListTabs patientListConfigs={patientListTabs} moduleName={moduleName} />;
}

export default CTHomePatientTabs;
