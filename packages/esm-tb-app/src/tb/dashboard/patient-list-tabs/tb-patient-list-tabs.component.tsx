import React from 'react';
import { useTranslation } from 'react-i18next';
import { getPatientListTabsData, OHRIPatientListTabs } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';
import tbPatientListTabsConfig from './tb-patient-list.config.json';

function TbHomePatientTabs() {
  const { t } = useTranslation();
  const config = useConfig();
  const patientListTabs = getPatientListTabsData(tbPatientListTabsConfig, config);

  return <OHRIPatientListTabs patientListConfigs={patientListTabs} moduleName={moduleName} />;
}

export default TbHomePatientTabs;
