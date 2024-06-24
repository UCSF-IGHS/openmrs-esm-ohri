import React from 'react';
import { useTranslation } from 'react-i18next';
import { getPatientListTabsData, OHRIPatientListTabs } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';
import tptPatientListTabsConfig from './tpt-patient-list.config.json';

function TptPatientListTabs() {
  const { t } = useTranslation();
  const config = useConfig();
  const patientListTabs = getPatientListTabsData(tptPatientListTabsConfig, config);

  return <OHRIPatientListTabs patientListConfigs={patientListTabs} moduleName={moduleName} />;
}

export default TptPatientListTabs;
